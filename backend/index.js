console.log('index.js dosyası başladı');
require('dotenv').config();
console.log('dotenv yüklendi');
console.log('FIRAT_DDYO_URL:', process.env.FIRAT_DDYO_URL);
console.log('MAIN_TOKEN:', process.env.MAIN_TOKEN ? 'Token mevcut' : 'Token yok');

const express = require('express');
const cors = require('cors');
const app = express();

// CORS ayarları
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

console.log('autoRoutes yükleniyor...');
const autoRoutes = require('./routes/autoRoutes');
console.log('autoRoutes yüklendi:', typeof autoRoutes);
console.log('autoRoutes içeriği:', Object.keys(autoRoutes));

console.log('weatherRoutes yükleniyor...');
const weatherRoutes = require('./routes/weatherRoutes');
console.log('weatherRoutes yüklendi:', typeof weatherRoutes);
console.log('weatherRoutes içeriği:', Object.keys(weatherRoutes));

console.log('weatherController yükleniyor...');
const weatherController = require('./controllers/weatherController');
console.log('weatherController yüklendi:', typeof weatherController);

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test route - ÖNCE tanımla
app.get('/api/test', (req, res) => {
  console.log('✅ /api/test route çağrıldı!');
  res.json({ message: 'Test route çalışıyor!' });
});

// Weather route'ları - ÖNCE tanımla
app.get('/api/weather/current', (req, res) => weatherController.getCurrentWeather(req, res));
app.get('/api/weather/daily', (req, res) => weatherController.getDailyWeather(req, res));
app.get('/api/weather/hourly', (req, res) => weatherController.getHourlyWeather(req, res));
app.get('/api/weather', (req, res) => weatherController.getCurrentWeather(req, res));

// Basit root route
app.get('/', (req, res) => {
  console.log('✅ Root route çağrıldı!');
  res.json({ message: 'Backend çalışıyor!' });
});

app.use('/api', autoRoutes);

// Route'ları kontrol et
console.log('🔍 Express route\'ları:');
console.log('autoRoutes stack:', autoRoutes.stack ? autoRoutes.stack.length : 'undefined');
console.log('weatherRoutes stack:', weatherRoutes.stack ? weatherRoutes.stack.length : 'undefined');

// ========================================
// GLOBAL ERROR HANDLING MIDDLEWARE
// ========================================

// 404 handler - tanımlanmamış route'lar için
app.use((req, res) => {
  console.error(`❌ 404 - Route bulunamadı: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    error: 'Route bulunamadı',
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

// Global error handler - tüm hataları yakalar
app.use((error, req, res, next) => {
  console.error('🚨 Global Error Handler yakaladı:', {
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
  let errorMessage = 'Sunucu iç hatası';

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

// ========================================
// UNHANDLED PROMISE REJECTIONS
// ========================================

process.on('unhandledRejection', (reason, promise) => {
  console.error('🚨 Unhandled Promise Rejection:', {
    reason: reason,
    promise: promise,
    timestamp: new Date().toISOString()
  });
  
  // Uygulamayı kapatmak yerine logla ve devam et
  // Production'da crash reporting servisine gönderilebilir
});

process.on('uncaughtException', (error) => {
  console.error('🚨 Uncaught Exception:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
  
  // Kritik hata - uygulamayı güvenli şekilde kapat
  process.exit(1);
});

// ========================================
// GRACEFUL SHUTDOWN
// ========================================

const gracefulShutdown = (signal) => {
  console.log(`\n🛑 ${signal} sinyali alındı. Sunucu kapatılıyor...`);
  
  server.close((err) => {
    if (err) {
      console.error('❌ Sunucu kapatılırken hata:', err);
      process.exit(1);
    }
    
    console.log('✅ Sunucu başarıyla kapatıldı');
    process.exit(0);
  });
  
  // 10 saniye sonra zorla kapat
  setTimeout(() => {
    console.error('❌ Zorla kapatma - timeout');
    process.exit(1);
  }, 10000);
};

// Graceful shutdown sinyallerini dinle
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

console.log('Backend sunucu başlatılıyor...');

// HTTP server başlat
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 HTTP Sunucu ${PORT} portunda çalışıyor`);
  console.log(`🌐 Erişim URL: http://localhost:${PORT}`);
  console.log(`🌐 Erişim URL: http://10.41.169.14:${PORT}`);
  console.log('🛡️ Global Error Handler aktif');
  console.log('🔄 Graceful Shutdown hazır');
  
  // Server başladıktan sonra route'ları kontrol et
  console.log('🔍 Express app stack (server başladıktan sonra):');
  console.log('app.stack length:', app.stack ? app.stack.length : 'undefined');
  console.log('app._router:', app._router ? 'Mevcut' : 'Yok');
  
  // Route'ları test et
  console.log('🧪 Route test başlatılıyor...');
  const testRoutes = [
    '/api/test',
    '/api/weather/current',
    '/api/weather/daily',
    '/api/weather/hourly'
  ];
  
  testRoutes.forEach(route => {
    console.log(`Testing route: ${route}`);
  });
});

