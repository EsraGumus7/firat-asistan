console.log('>>> genericController.js yüklendi');

const genericApiClient = require('../services/genericApiClient');
const endpointsConfig = require('../config/endpoints');
const { endpoints, findEndpointByFaculty, findEndpointsByCategory, searchEndpoints, getEndpointStats } = endpointsConfig;

/**
 * Generic Controller - Tüm endpoint'ler için tek controller
 * Yeni endpoint yapısını kullanır
 */
class GenericController {
  constructor() {
    console.log('🎮 Generic Controller başlatılıyor...');
  }

  /**
   * Fakülte adına göre endpoint bul ve çağır
   * @param {object} req - Express request objesi
   * @param {object} res - Express response objesi
   */
  async findAndCallEndpoint(req, res) {
    try {
      const { facultyName, lang = 'tr' } = req.body;
      
      console.log(`🔍 Fakülte aranıyor: ${facultyName} (${lang})`);
      
      // Karakter kodlama sorununu çöz - normalize et
      const normalizedFacultyName = facultyName.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      
      // Endpoint'i bul - önce tam eşleşme, sonra fuzzy search
      let endpoint = findEndpointByFaculty(facultyName, lang);
      
      if (!endpoint) {
        // Fuzzy search ile bul
        const suggestions = searchEndpoints(facultyName, lang);
        if (suggestions.length > 0) {
          endpoint = findEndpointByFaculty(suggestions[0].faculty, lang);
        }
      }
      
      if (!endpoint) {
        return res.status(404).json({
          success: false,
          error: 'Fakülte bulunamadı',
          facultyName,
          lang,
          suggestions: searchEndpoints(facultyName, lang).slice(0, 5)
        });
      }

      console.log(`✅ Endpoint bulundu: ${endpoint.url}`);
      
      // API çağrısı yap - URL'den endpoint key'ini çıkar ve noktayı kaldır
      const urlParts = endpoint.url.split('/');
      let endpointKey = urlParts[urlParts.length - 1]; // Son kısım
      
      // Noktayı kaldır (duyuru endpoint'leri için)
      if (endpointKey.endsWith('.')) {
        endpointKey = endpointKey.slice(0, -1);
      }
      
      console.log(`🔗 API çağrısı: ${endpoint.category}.${endpointKey}`);
      const data = await genericApiClient.callEndpoint(endpoint.category, endpointKey, req.query);
      
      console.log(`✅ Response gönderiliyor: ${endpoint.faculty}`);
      res.json({
        success: true,
        endpoint,
        data,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error(`❌ Controller hatası:`, error.message);
      this.handleError(error, req, res);
    }
  }

  /**
   * Kategoriye göre endpoint'leri listele
   * @param {object} req - Express request objesi
   * @param {object} res - Express response objesi
   */
  async getEndpointsByCategory(req, res) {
    try {
      const { category } = req.params;
      
      console.log(`📂 Kategori endpoint'leri: ${category}`);
      
      const categoryEndpoints = findEndpointsByCategory(category);
      
      res.json({
        success: true,
        category,
        totalEndpoints: categoryEndpoints.length,
        endpoints: categoryEndpoints,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error(`❌ Kategori hatası:`, error.message);
      this.handleError(error, req, res);
    }
  }

  /**
   * Endpoint arama
   * @param {object} req - Express request objesi
   * @param {object} res - Express response objesi
   */
  async searchEndpoints(req, res) {
    try {
      const { q, query, lang } = req.query;
      const searchQuery = q || query;
      
      console.log(`🔍 Endpoint arama: ${searchQuery} (dil: ${lang || 'tümü'})`);
      
      const results = searchEndpoints(searchQuery, lang);
      
      res.json({
        success: true,
        query: searchQuery,
        lang: lang || 'tümü',
        totalResults: results.length,
        results: results.slice(0, 20), // İlk 20 sonuç
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error(`❌ Arama hatası:`, error.message);
      this.handleError(error, req, res);
    }
  }

  /**
   * Endpoint istatistikleri
   * @param {object} req - Express request objesi
   * @param {object} res - Express response objesi
   */
  async getStats(req, res) {
    try {
      console.log('📊 Endpoint istatistikleri alınıyor');
      
      const stats = getEndpointStats();
      
      res.json({
        success: true,
        stats,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error(`❌ İstatistik hatası:`, error.message);
      this.handleError(error, req, res);
    }
  }

  /**
   * Tüm endpoint'leri listele
   * @param {object} req - Express request objesi
   * @param {object} res - Express response objesi
   */
  async listAllEndpoints(req, res) {
    try {
      console.log('📋 Tüm endpoint\'ler listeleniyor');
      
      res.json({
        success: true,
        totalEndpoints: endpoints.length,
        endpoints: endpoints.slice(0, 50), // İlk 50 endpoint
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error(`❌ Listeleme hatası:`, error.message);
      this.handleError(error, req, res);
    }
  }

  /**
   * Sağlık kontrolü
   * @param {object} req - Express request objesi
   * @param {object} res - Express response objesi
   */
  async healthCheck(req, res) {
    try {
      console.log('🏥 Sağlık kontrolü yapılıyor');
      
      res.json({
        success: true,
        status: 'healthy',
        totalEndpoints: endpoints.length,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error(`❌ Sağlık kontrolü hatası:`, error.message);
      this.handleError(error, req, res);
    }
  }

  /**
   * Hata yönetimi
   * @param {Error} error - Hata objesi
   * @param {object} req - Express request objesi
   * @param {object} res - Express response objesi
   */
  handleError(error, req, res) {
    console.error('❌ Hata detayı:', error);
    
    const errorResponse = {
      success: false,
      error: error.message || 'Bilinmeyen hata',
      timestamp: new Date().toISOString()
    };

    if (error.response) {
      errorResponse.status = error.response.status;
      errorResponse.data = error.response.data;
    }

    res.status(500).json(errorResponse);
  }
}

// Singleton instance
const genericController = new GenericController();

module.exports = genericController; 