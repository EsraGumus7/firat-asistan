const express = require('express');
console.log('weatherController yükleniyor...');
const weatherController = require('../controllers/weatherController');
console.log('weatherController yüklendi:', typeof weatherController);

const router = express.Router();

/**
 * Hava Durumu Route'ları
 * Elazığ'ın hava durumu verilerini sağlar
 */

// Mevcut hava durumu
router.get('/current', weatherController.getCurrentWeather);

// Günlük hava durumu (5 günlük tahmin)
router.get('/daily', weatherController.getDailyWeather);

// Saatlik hava durumu (24 saat)
router.get('/hourly', weatherController.getHourlyWeather);

// Hava durumu ana endpoint (mevcut + günlük)
router.get('/', weatherController.getCurrentWeather);

module.exports = router;
