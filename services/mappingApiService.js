import { API_BASE_URL } from '../config/apiConfig';
import { retryApiCall } from '../utils/retryUtils';
import hybridCache from './hybridCache';

/**
 * Yeni Endpoint API Service - Fuse.js ile akıllı arama
 */
class MappingApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  /**
   * Fakülte adına göre endpoint bul ve çağır (Cache ile entegre)
   * @param {string} facultyName - Fakülte adı
   * @param {string} lang - Dil (tr/en)
   * @returns {Promise<object>} Endpoint sonucu
   */
  async findAndCallEndpoint(facultyName, lang = 'tr') {
    try {
      // 1. Önce cache'den kontrol et
      console.log(`🔍 Cache kontrolü: mapping_find_${facultyName}`);
      const cachedData = await hybridCache.get('mapping', `find_${facultyName}`, { lang }, 'cache_first');
      
      if (cachedData) {
        console.log(`🎯 Cache hit: mapping_find_${facultyName} (${cachedData.source})`);
        return {
          ...cachedData.data,
          _fromCache: true,
          _cacheSource: cachedData.source,
          _cacheTimestamp: cachedData.timestamp
        };
      }

      // 2. Cache'de yok, API'ye git
      console.log(`🌐 API çağrısı: mapping_find_${facultyName}`);
      
      const apiCall = async () => {
        console.log('🔍 Fakülte aranıyor:', facultyName, lang);
        
        const response = await fetch(`${this.baseUrl}/api/find`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ facultyName, lang }),
          timeout: 10000 // 10 saniye timeout
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ Fakülte sonucu:', result);
        
        return result;
      };

      // Retry mekanizması ile API çağrısı yap
      const result = await retryApiCall(apiCall, {
        context: `mapping_find_${facultyName}`,
        maxRetries: 2,
        baseDelay: 1000
      });

      // 3. Başarılı response'u cache'e kaydet
      if (result.success) {
        console.log(`💾 Cache'e kaydediliyor: mapping_find_${facultyName}`);
        await hybridCache.set('mapping', `find_${facultyName}`, result, { lang });
      }
      
      return {
        ...result,
        _fromCache: false,
        _networkTimestamp: Date.now()
      };
      
    } catch (error) {
      console.log('❌ Fakülte hatası (retry sonrası):', error);
      
      // Kullanıcı dostu hata mesajı döndür
      return {
        success: false,
        error: 'Fakülte bilgisi alınamadı',
        message: 'Bağlantı hatası nedeniyle fakülte bilgisi alınamadı. Lütfen daha sonra tekrar deneyin.',
        facultyName,
        lang,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Kategori endpoint'lerini al
   * @param {string} category - Kategori adı
   * @returns {Promise<object>} Kategori endpoint'leri
   */
  async getEndpointsByCategory(category) {
    const apiCall = async () => {
      console.log('📂 Kategori endpoint\'leri:', category);
      
      const response = await fetch(`${this.baseUrl}/api/category/${category}`, {
        timeout: 10000 // 10 saniye timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Kategori endpoint\'leri alındı:', result);
      
      return result;
    };

    try {
      // Retry mekanizması ile API çağrısı yap
      const result = await retryApiCall(apiCall, {
        context: `mapping_category_${category}`,
        maxRetries: 2,
        baseDelay: 1000
      });
      
      return result;
    } catch (error) {
      console.log('❌ Kategori endpoint hatası (retry sonrası):', error);
      
      // Kullanıcı dostu hata mesajı döndür
      return {
        success: false,
        error: 'Kategori bilgisi alınamadı',
        message: 'Bağlantı hatası nedeniyle kategori bilgisi alınamadı. Lütfen daha sonra tekrar deneyin.',
        category,
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Endpoint arama
   * @param {string} query - Arama sorgusu
   * @param {string} lang - Dil (tr/en)
   * @returns {Promise<object>} Arama sonuçları
   */
  async searchEndpoints(query, lang = null) {
    const apiCall = async () => {
      console.log('🔎 Endpoint arama:', query, '(dil:', lang || 'tümü', ')');
      
      let url = `${this.baseUrl}/api/search?query=${encodeURIComponent(query)}`;
      if (lang) {
        url += `&lang=${lang}`;
      }
      
      const response = await fetch(url, {
        timeout: 10000 // 10 saniye timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Arama sonuçları:', result);
      
      return result;
    };

    try {
      // Retry mekanizması ile API çağrısı yap
      const result = await retryApiCall(apiCall, {
        context: `mapping_search_${query}`,
        maxRetries: 2,
        baseDelay: 1000
      });
      
      return result;
    } catch (error) {
      console.log('❌ Arama hatası (retry sonrası):', error);
      
      // Kullanıcı dostu hata mesajı döndür
      return {
        success: false,
        error: 'Arama yapılamadı',
        message: 'Bağlantı hatası nedeniyle arama yapılamadı. Lütfen daha sonra tekrar deneyin.',
        query,
        lang,
        results: [],
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Endpoint istatistikleri al
   * @returns {Promise<object>} İstatistikler
   */
  async getStats() {
    try {
      console.log('📊 İstatistikler alınıyor');
      
      const response = await fetch(`${this.baseUrl}/api/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ İstatistikler alındı:', result);
      
      return result;
    } catch (error) {
      console.log('❌ İstatistik hatası:', error);
      throw error;
    }
  }

  /**
   * Tüm endpoint'leri al
   * @returns {Promise<object>} Tüm endpoint'ler
   */
  async getAllEndpoints() {
    const apiCall = async () => {
      console.log('📋 Tüm endpoint\'ler alınıyor');
      
      const response = await fetch(`${this.baseUrl}/api/endpoints`, {
        timeout: 15000 // 15 saniye timeout (daha uzun çünkü büyük veri)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Tüm endpoint\'ler alındı:', result);
      
      return result;
    };

    try {
      // Retry mekanizması ile API çağrısı yap
      const result = await retryApiCall(apiCall, {
        context: 'mapping_get_all_endpoints',
        maxRetries: 2,
        baseDelay: 2000
      });
      
      return result;
    } catch (error) {
      console.log('❌ Endpoint listesi hatası (retry sonrası):', error);
      
      // Kullanıcı dostu hata mesajı döndür
      return {
        success: false,
        error: 'Endpoint listesi alınamadı',
        message: 'Bağlantı hatası nedeniyle endpoint listesi alınamadı. Lütfen daha sonra tekrar deneyin.',
        endpoints: {},
        timestamp: new Date().toISOString()
      };
    }
  }

  /**
   * Sağlık kontrolü
   * @returns {Promise<object>} Sağlık durumu
   */
  async healthCheck() {
    try {
      console.log('🏥 Sağlık kontrolü yapılıyor');
      
      const response = await fetch(`${this.baseUrl}/api/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Sağlık kontrolü:', result);
      
      return result;
    } catch (error) {
      console.log('❌ Sağlık kontrolü hatası:', error);
      throw error;
    }
  }

  /**
   * Mesajdan endpoint bul (eski sistem uyumluluğu için)
   * @param {string} message - Kullanıcı mesajı
   * @param {string} lang - Dil (tr/en)
   * @returns {Promise<object>} Endpoint sonucu
   */
  async findEndpointByMessage(message, lang = 'tr') {
    try {
      console.log('🔍 Mesajdan endpoint aranıyor:', message, '(dil:', lang, ')');
      
      // Hava durumu kontrolü - eğer hava durumu sorusu ise direkt hata döndür (retry yapma)
      const isWeather = this.isWeatherMessage(message, lang);
      console.log('🔍 Weather kontrolü:', message, '→', isWeather);
      if (isWeather) {
        console.log('🌤️ Hava durumu sorusu tespit edildi, endpoint aranmıyor');
        return {
          success: false,
          error: 'Hava durumu sorusu',
          message: 'Bu mesaj hava durumu kategorisinde, endpoint aranmıyor',
          isWeather: true
        };
      }

      // Basit sohbet kontrolü - eğer basit sohbet ise direkt hata döndür (retry yapma)
      const isSimpleChat = this.isSimpleChatMessage(message, lang);
      if (isSimpleChat) {
        console.log('🎯 Basit sohbet tespit edildi, endpoint aranmıyor');
        return {
          success: false,
          error: 'Basit sohbet mesajı',
          message: 'Bu mesaj basit sohbet kategorisinde, endpoint aranmıyor',
          isSimpleChat: true
        };
      }
      
      // Basit keyword mapping
      const keywordMap = {
        'yemek': 'Günlük Yemek Menüsü',
        'menü': 'Günlük Yemek Menüsü',
        'yemek menüsü': 'Günlük Yemek Menüsü',
        'etkinlik': 'Tüm Etkinlikler',
        'duyuru': 'Duyurular',
        'haber': 'Haberler',
        'kütüphane': 'Kütüphane Katları',
        'kütüphane katları': 'Kütüphane Katları',
        'zemin': 'Kütüphane Masa 1',
        'zemin kat': 'Kütüphane Masa 1',
        '1. kat': 'Kütüphane Masa 2',
        'kat 1': 'Kütüphane Masa 2',
        '1 kat': 'Kütüphane Masa 2',
        'birinci kat': 'Kütüphane Masa 2',
        '2. kat': 'Kütüphane Masa 3',
        'kat 2': 'Kütüphane Masa 3',
        '2 kat': 'Kütüphane Masa 3',
        'ikinci kat': 'Kütüphane Masa 3',
        '3. kat': 'Kütüphane Masa 4',
        'kat 3': 'Kütüphane Masa 4',
        '3 kat': 'Kütüphane Masa 4',
        'üçüncü kat': 'Kütüphane Masa 4',
        'ground': 'Kütüphane Masa 1',
        'floor': 'Kütüphane Katları',
        // Fakülte duyuruları
        'tıp': 'Tıp Fakültesi',
        'tıp fakültesi': 'Tıp Fakültesi',
        'tıp duyuruları': 'Tıp Fakültesi',
        'tip': 'Tıp Fakültesi',
        'tip fakultesi': 'Tıp Fakültesi',
        'tip duyurulari': 'Tıp Fakültesi',
        'mimarlık': 'Mimarlık Fakültesi',
        'mimarlık fakültesi': 'Mimarlık Fakültesi',
        'mimarlık duyuruları': 'Mimarlık Fakültesi',
        'mimarlik': 'Mimarlık Fakültesi',
        'mimarlik fakultesi': 'Mimarlık Fakültesi',
        'mimarlik duyurulari': 'Mimarlık Fakültesi',
        'mühendislik': 'Mühendislik Fakültesi',
        'mühendislik fakültesi': 'Mühendislik Fakültesi',
        'mühendislik duyuruları': 'Mühendislik Fakültesi',
        'muhendislik': 'Mühendislik Fakültesi',
        'muhendislik fakultesi': 'Mühendislik Fakültesi',
        'muhendislik duyurulari': 'Mühendislik Fakültesi'
      };
      
      const lowerMessage = message.toLowerCase();
      let targetFaculty = null;
      let bestMatch = '';
      
      // Keyword eşleştirmesi - uzun eşleşmeleri öncele
      const sortedKeywords = Object.keys(keywordMap).sort((a, b) => b.length - a.length);
      
      for (const keyword of sortedKeywords) {
        // Tam kelime eşleşmesi için regex kullan
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        if (regex.test(lowerMessage)) {
          targetFaculty = keywordMap[keyword];
          bestMatch = keyword;
          console.log('🎯 En iyi eşleşme bulundu:', keyword, '→', targetFaculty);
          break;
        }
      }
      
      if (targetFaculty) {
        return await this.findAndCallEndpoint(targetFaculty, lang);
      }
      
      // Keyword bulunamazsa akıllı arama yap
      return await this.smartSearch(message, lang);
      
    } catch (error) {
      console.log('❌ Mesaj analizi hatası:', error);
      throw error;
    }
  }

  /**
   * Akıllı arama - Fuse.js ile bulanık arama
   * @param {string} query - Arama sorgusu
   * @param {string} lang - Dil
   * @returns {Promise<object>} Arama ve endpoint sonucu
   */
  async smartSearch(query, lang = 'tr') {
    try {
      console.log('🧠 Fuse.js akıllı arama:', query, lang);
      
      // Önce tam eşleşme dene
      const exactResult = await this.findAndCallEndpoint(query, lang);
      
      if (exactResult.success) {
        return {
          success: true,
          type: 'exact',
          data: exactResult.data,
          endpoint: exactResult.endpoint
        };
      }

      // Tam eşleşme yoksa Fuse.js ile bulanık arama yap
      const searchResult = await this.searchEndpoints(query, lang);
      
      if (searchResult.success && searchResult.results.length > 0) {
        return {
          success: true,
          type: 'fuzzy',
          suggestions: searchResult.results,
          message: `"${query}" için ${searchResult.results.length} sonuç bulundu`,
          totalResults: searchResult.totalResults
        };
      }

      return {
        success: false,
        message: 'Aradığınız fakülte bulunamadı',
        suggestions: []
      };
    } catch (error) {
      console.log('❌ Akıllı arama hatası:', error);
      throw error;
    }
  }

  /**
   * Hava durumu mesajı mı kontrol et
   * @param {string} message - Kullanıcı mesajı
   * @param {string} lang - Dil (tr/en)
   * @returns {boolean} Hava durumu sorusu mu?
   */
  isWeatherMessage(message, lang = 'tr') {
    const weatherPatterns = [
      // Türkçe - Spesifik hava durumu sorguları
      'hava durumu', 'hava durumu nasıl', 'hava durumu nasil', 'hava durumu nasıl?', 'hava durumu nasil?',
      'elazığ hava durumu', 'elazig hava durumu', 'elazığ hava nasıl', 'elazig hava nasil',
      // Genel hava durumu sorguları (daha spesifik)
      'hava nasıl', 'hava nasil', 'hava nasıl?', 'hava nasil?',
      'sıcaklık', 'sicaklik', 'sıcaklık kaç', 'sicaklik kac',
      'yağmur', 'yagmur', 'yağmur var mı', 'yagmur var mi',
      'kar', 'kar var mı', 'kar var mi', 'kar yağıyor mu',
      'rüzgar', 'ruzgar', 'rüzgar var mı', 'ruzgar var mi',
      'nem', 'nem oranı', 'nem orani',
      // Hava durumu detayları (daha spesifik)
      'hava durumu nasıl', 'hava durumu nasil', 'hava durumu sıcak mı', 'hava durumu sicak mi',
      'hava durumu güneşli mi', 'hava durumu gunesli mi', 'hava durumu bulutlu mu',
      'hava durumu yağmurlu mu', 'hava durumu yagmurlu mu', 'hava durumu karlı mı', 'hava durumu karli mi',
      'hava durumu fırtınalı mı', 'hava durumu firtinali mi', 'hava durumu sisli mi',
      'hava durumu tahmini', 'hava durumu tahmini', 'hava durumu raporu',
      'bugün hava durumu', 'bugun hava durumu', 'yarın hava durumu', 'yarin hava durumu',
      'hava durumu kaç derece', 'hava durumu kac derece', 'hava durumu derece',
      'hava durumu raporu', 'hava durumu bilgisi',
      // Genel hava durumu sorguları
      'hava nasıl', 'hava nasil', 'hava nasıl?', 'hava nasil?',
      'hava sıcak mı', 'hava sicak mi', 'hava sıcak', 'hava sicak',
      'güneşli mi', 'gunesli mi', 'güneşli', 'gunesli',
      'bulutlu mu', 'bulutlu', 'bulutlu hava',
      'soğuk mu', 'soguk mu', 'soğuk', 'soguk',
      'sıcak mı', 'sicak mi', 'sıcak', 'sicak',
      'yağmurlu mu', 'yagmurlu mu', 'yağmurlu', 'yagmurlu',
      'karlı mı', 'karli mi', 'karlı', 'karli',
      'fırtınalı mı', 'firtinali mi', 'fırtınalı', 'firtinali',
      'sisli mi', 'sisli', 'sis var mı', 'sis var mi',
      'hava tahmini', 'hava raporu',
      'bugün hava', 'bugun hava', 'yarın hava', 'yarin hava',
      'kaç derece', 'kac derece', 'derece kaç', 'derece kac',
      'hava raporu',
      // İngilizce
      'weather', 'weather today', 'weather forecast', 'temperature',
      'rain', 'snow', 'wind', 'humidity', 'how is weather',
      'is it hot', 'is it cold', 'is it sunny', 'is it cloudy',
      'is it rainy', 'is it snowy', 'is it windy', 'is it foggy',
      'weather report', 'weather prediction', 'weather forecast',
      'how hot', 'how cold', 'degrees', 'celsius', 'fahrenheit'
    ];

    const lowerMessage = message.toLowerCase().trim();
    return weatherPatterns.some(pattern => lowerMessage.includes(pattern.toLowerCase()));
  }

  /**
   * Basit sohbet mesajı kontrolü
   * @param {string} message - Kullanıcı mesajı
   * @param {string} lang - Dil (tr/en)
   * @returns {boolean} Basit sohbet mi?
   */
  isSimpleChatMessage(message, lang = 'tr') {
    const simpleChatPatterns = [
      // Türkçe
      'nasılsın', 'nasilsin', 'nasılsın?', 'nasilsin?',
      'merhaba', 'selam', 'selamlar', 'hey',
      'teşekkür', 'teşekkürler', 'sağol', 'sağolun',
      'görüşürüz', 'hoşça kal', 'bay bay', 'bye',
      'iyi günler', 'iyi akşamlar', 'iyi geceler',
      'ne haber', 'naber', 'neler yapıyorsun',
      'napiyon', 'napıyon', 'ne yapıyorsun', 'ne yapıyon',
      'ne var', 'ne haber', 'nasıl gidiyor', 'nasıl gidiyor',
      'ne yapıyorsun', 'ne yapıyorsun?', 'ne yapıyorsun',
      'nasılsın', 'nasılsın?', 'nasılsın',
      'ne yapıyorsun', 'ne yapıyorsun?', 'ne yapıyorsun',
      'ne yapıyorsun', 'ne yapıyorsun?', 'ne yapıyorsun',
      // İngilizce
      'hello', 'hi', 'hey', 'how are you', 'how are you?',
      'thanks', 'thank you', 'bye', 'goodbye',
      'good morning', 'good afternoon', 'good evening', 'good night',
      'what\'s up', 'how\'s it going', 'how do you do',
      'what are you doing', 'what are you doing?', 'what are you doing'
    ];

    const lowerMessage = message.toLowerCase().trim();
    const cleanMessage = lowerMessage.replace(/[.,!?;:]/g, '');
    
    return simpleChatPatterns.some(pattern => 
      cleanMessage.includes(pattern.toLowerCase())
    );
  }
}

// Singleton instance
const mappingApiService = new MappingApiService();

export default mappingApiService; 