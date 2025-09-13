console.log('>>> autoRoutes.js yüklendi');

const express = require('express');
const router = express.Router();

const genericController = require('../controllers/genericController');
const geminiController = require('../controllers/geminiController');

/**
 * Yeni Endpoint Sistemi Routes
 * Fakülte adına göre endpoint bulma ve çağırma
 */
class AutoRoutes {
  constructor() {
    console.log('🛣️ Yeni Auto Routes başlatılıyor...');
    this.initializeRoutes();
  }

  /**
   * Tüm route'ları oluştur
   */
  initializeRoutes() {
    console.log('🔧 Route\'lar oluşturuluyor...');
    
    // Request logging middleware
    router.use((req, res, next) => {
      console.log(`📥 ${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
      next();
    });
    
    // Ana endpoint bulma ve çağırma
    router.post('/find', this.wrapAsync(genericController.findAndCallEndpoint));
    
    // Kategori endpoint'leri
    router.get('/category/:category', this.wrapAsync(genericController.getEndpointsByCategory));
    
    // Endpoint arama
    router.get('/search', this.wrapAsync(genericController.searchEndpoints));
    
    // İstatistikler
    router.get('/stats', this.wrapAsync(genericController.getStats));
    
    // Tüm endpoint'ler
    router.get('/endpoints', this.wrapAsync(genericController.listAllEndpoints));
    
    // Sağlık kontrolü
    router.get('/health', this.wrapAsync(genericController.healthCheck));
    
    // Gemini API endpoint'leri
    router.post('/gemini', this.wrapAsync(geminiController.getGeminiResponse));
    router.get('/gemini/health', this.wrapAsync(geminiController.healthCheck));
    
    // 404 handler - tanımlanmamış route'lar için
    router.use((req, res) => {
      console.error(`❌ 404 - Route bulunamadı: ${req.method} ${req.originalUrl}`);
      res.status(404).json({
        success: false,
        error: 'Route bulunamadı',
        method: req.method,
        url: req.originalUrl,
        timestamp: new Date().toISOString()
      });
    });
    
    // Route seviyesinde error handler
    router.use((error, req, res, next) => {
      console.error('🚨 Route Error Handler yakaladı:', {
        message: error.message,
        stack: error.stack,
        url: req.originalUrl,
        method: req.method,
        body: req.body,
        query: req.query,
        timestamp: new Date().toISOString()
      });

      // Hata tipine göre status code belirle
      let statusCode = 500;
      let errorMessage = 'Route işleme hatası';

      if (error.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = 'Geçersiz veri formatı';
      } else if (error.name === 'UnauthorizedError') {
        statusCode = 401;
        errorMessage = 'Yetkilendirme hatası';
      } else if (error.name === 'CastError') {
        statusCode = 400;
        errorMessage = 'Geçersiz veri tipi';
      } else if (error.code === 'ECONNREFUSED') {
        statusCode = 503;
        errorMessage = 'Bağlantı hatası';
      } else if (error.code === 'ETIMEDOUT') {
        statusCode = 408;
        errorMessage = 'İstek zaman aşımına uğradı';
      }

      res.status(statusCode).json({
        success: false,
        error: errorMessage,
        message: error.message,
        timestamp: new Date().toISOString(),
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
      });
    });
    
    console.log('✅ Tüm route\'lar başarıyla oluşturuldu');
  }

  /**
   * Async fonksiyonları wrap eder - hata yakalama için
   * @param {Function} fn - Async fonksiyon
   * @returns {Function} Wrapped fonksiyon
   */
  wrapAsync(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

// AutoRoutes instance'ını oluştur
const autoRoutes = new AutoRoutes();

console.log('📊 Route İstatistikleri:');
console.log('  🔍 POST /api/find - Fakülte adına göre endpoint bul ve çağır');
console.log('  📂 GET /api/category/:category - Kategori endpoint\'leri');
console.log('  🔎 GET /api/search - Endpoint arama');
console.log('  📊 GET /api/stats - İstatistikler');
console.log('  📋 GET /api/endpoints - Tüm endpoint\'ler');
console.log('  🏥 GET /api/health - Sağlık kontrolü');
console.log('  🤖 POST /api/gemini - Gemini API çağrısı');
console.log('  🏥 GET /api/gemini/health - Gemini API sağlık kontrolü');

module.exports = router; 