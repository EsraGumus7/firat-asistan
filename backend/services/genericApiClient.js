console.log('>>> genericApiClient.js yüklendi');

const axios = require('axios');
const { BASE_URLS, TOKENS } = require('../config/config');
const { endpoints } = require('../config/endpoints');

/**
 * Generic API Client - Tüm endpoint'ler için tek API client
 * endpoints.js'den endpoint bilgilerini alır
 * config.js'den URL ve token bilgilerini kullanır
 */
class GenericApiClient {
  constructor() {
    this.clients = {};
    this.initializeClients();
  }

  /**
   * Her servis için ayrı axios client oluştur
   */
  initializeClients() {
    console.log('🔧 Generic API Client başlatılıyor...');
    
    // Her servis için ayrı client oluştur
    Object.keys(BASE_URLS).forEach(service => {
      if (BASE_URLS[service]) {
        this.clients[service] = axios.create({
          baseURL: BASE_URLS[service],
          headers: {
            'Content-Type': 'application/json',
            ...(TOKENS[service] && { Authorization: `Bearer ${TOKENS[service]}` }),
            ...(service === 'ddyo' && TOKENS.main && { Authorization: `Bearer ${TOKENS.main}` })
          },
          timeout: 10000, // 10 saniye timeout
        });
        
        console.log(`✅ ${service} servisi için client oluşturuldu: ${BASE_URLS[service]}`);
      } else {
        console.warn(`⚠️ ${service} servisi için URL tanımlanmamış`);
      }
    });
  }

  /**
   * Endpoint çağrısı yap
   * @param {string} category - Endpoint kategorisi (food, main, library, faculty_announcements)
   * @param {string} endpointKey - Endpoint anahtarı
   * @param {object} params - Query parametreleri (opsiyonel)
   * @returns {Promise} API response
   */
  async callEndpoint(category, endpointKey, params = {}) {
    try {
      console.log(`📡 API çağrısı: ${category}.${endpointKey}`);
      
      // Endpoint bilgisini al
      const endpoint = this.getEndpointConfig(category, endpointKey);
      if (!endpoint) {
        throw new Error(`Endpoint bulunamadı: ${category}.${endpointKey}`);
      }

      // Servis client'ını al
      const client = this.getClient(endpoint.service);
      if (!client) {
        throw new Error(`Servis client'ı bulunamadı: ${endpoint.service}`);
      }

      console.log(`🔗 ${endpoint.service} servisine çağrı: ${endpoint.url}`);
      console.log(`📝 Method: ${endpoint.method}`);
      console.log(`📋 Açıklama: ${endpoint.description}`);

      // API çağrısı yap
      let response;
      switch (endpoint.method.toUpperCase()) {
        case 'GET':
          response = await client.get(endpoint.url, { params });
          break;
        case 'POST':
          response = await client.post(endpoint.url, params);
          break;
        case 'PUT':
          response = await client.put(endpoint.url, params);
          break;
        case 'DELETE':
          response = await client.delete(endpoint.url, { params });
          break;
        default:
          throw new Error(`Desteklenmeyen HTTP method: ${endpoint.method}`);
      }

      console.log(`✅ API çağrısı başarılı: ${category}.${endpointKey}`);
      return response.data;

    } catch (error) {
      console.error(`❌ API çağrısı hatası: ${category}.${endpointKey}`, error.message);
      throw this.handleError(error, category, endpointKey);
    }
  }

  /**
   * Endpoint konfigürasyonunu al
   * @param {string} category - Kategori
   * @param {string} endpointKey - Endpoint anahtarı
   * @returns {object|null} Endpoint konfigürasyonu
   */
  getEndpointConfig(category, endpointKey) {
    try {
      console.log(`🔍 Endpoint aranıyor: ${category}.${endpointKey}`);
      
      // Yeni formatta endpoint ara
      let endpoint = endpoints.find(ep => 
        ep.category === category && 
        ep.url.includes(`/${endpointKey}`)
      );
      
      // Nokta ile dene (duyuru endpoint'leri için)
      if (!endpoint) {
        endpoint = endpoints.find(ep => 
          ep.category === category && 
          ep.url.includes(`/${endpointKey}.`)
        );
      }
      
      if (!endpoint) {
        console.error(`❌ Endpoint bulunamadı: ${category}.${endpointKey}`);
        return null;
      }

      // Yeni formatta dönüştür
      return {
        url: endpoint.url,
        method: 'GET', // Varsayılan olarak GET
        description: endpoint.faculty,
        service: this.getServiceFromBaseURL(endpoint.baseURL)
      };
    } catch (error) {
      console.error(`❌ Endpoint konfigürasyonu alınırken hata:`, error.message);
      return null;
    }
  }

  /**
   * BaseURL'den servis adını çıkar
   * @param {string} baseURL - Base URL
   * @returns {string} Servis adı
   */
  getServiceFromBaseURL(baseURL) {
    if (baseURL.includes('ddyo.firat.edu.tr')) {
      return 'ddyo';
    } else if (baseURL.includes('www.firat.edu.tr')) {
      return 'main';
    }
    return 'ddyo'; // Varsayılan
  }

  /**
   * Servis client'ını al
   * @param {string} service - Servis adı
   * @returns {object|null} Axios client
   */
  getClient(service) {
    const client = this.clients[service];
    if (!client) {
      console.error(`❌ Servis client'ı bulunamadı: ${service}`);
      return null;
    }
    return client;
  }

  /**
   * Hata yönetimi
   * @param {Error} error - Hata objesi
   * @param {string} category - Kategori
   * @param {string} endpointKey - Endpoint anahtarı
   * @returns {Error} İşlenmiş hata
   */
  handleError(error, category, endpointKey) {
    let errorMessage = `API çağrısı başarısız: ${category}.${endpointKey}`;
    
    if (error.response) {
      // Sunucu hatası
      errorMessage += ` - HTTP ${error.response.status}: ${error.response.statusText}`;
      console.error(`🌐 Sunucu hatası:`, error.response.data);
    } else if (error.request) {
      // Ağ hatası
      errorMessage += ' - Ağ bağlantısı hatası';
      console.error(`🌐 Ağ hatası:`, error.request);
    } else {
      // Diğer hatalar
      errorMessage += ` - ${error.message}`;
    }

    const customError = new Error(errorMessage);
    customError.originalError = error;
    customError.category = category;
    customError.endpointKey = endpointKey;
    
    return customError;
  }

  /**
   * Tüm endpoint'leri listele
   * @returns {object} Endpoint listesi
   */
  listEndpoints() {
    const endpointList = {};
    
    endpoints.forEach(ep => {
      if (!endpointList[ep.category]) {
        endpointList[ep.category] = [];
      }
      endpointList[ep.category].push(ep.key);
    });
    
    return endpointList;
  }

  /**
   * Endpoint bilgisini al
   * @param {string} category - Kategori
   * @param {string} endpointKey - Endpoint anahtarı
   * @returns {object|null} Endpoint bilgisi
   */
  getEndpointInfo(category, endpointKey) {
    return this.getEndpointConfig(category, endpointKey);
  }
}

// Singleton instance oluştur
const genericApiClient = new GenericApiClient();

module.exports = genericApiClient; 