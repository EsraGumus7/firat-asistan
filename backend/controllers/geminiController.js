console.log('>>> geminiController.js yüklendi');

const axios = require('axios');
require('dotenv').config();

/**
 * Gemini API Controller
 * Frontend'den gelen istekleri Gemini API'ye yönlendirir
 */
class GeminiController {
  constructor() {
    console.log('🤖 Gemini Controller başlatılıyor...');
    this.geminiApiKey = process.env.GEMINI_API_KEY;
    this.geminiApiUrl = process.env.GEMINI_API_URL;
    
    if (!this.geminiApiKey) {
      console.error('❌ GEMINI_API_KEY environment variable bulunamadı!');
    }
    if (!this.geminiApiUrl) {
      console.error('❌ GEMINI_API_URL environment variable bulunamadı!');
    }
  }

  /**
   * Gemini API'den cevap al
   * @param {object} req - Express request objesi
   * @param {object} res - Express response objesi
   */
  getGeminiResponse = async (req, res) => {
    try {
      const { message, language = 'tr' } = req.body;
      
      console.log(`🤖 Gemini API çağrısı: ${message} (dil: ${language})`);
      
      if (!message || message.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Mesaj boş olamaz',
          timestamp: new Date().toISOString()
        });
      }

      if (!this.geminiApiKey) {
        return res.status(500).json({
          success: false,
          error: 'Gemini API anahtarı yapılandırılmamış',
          timestamp: new Date().toISOString()
        });
      }

      // Sistem mesajları
      const systemMessages = {
        tr: 'Sen bir Türkçe asistanısın. Bundan sonra tüm cevaplarını Türkçe ver.',
        en: 'You are an English assistant. Please answer only in English from now on.'
      };

      // Gemini API'ye istek gönder
      const fullApiUrl = `${this.geminiApiUrl}?key=${this.geminiApiKey}`;
      
      const response = await axios.post(fullApiUrl, {
        contents: [
          {
            parts: [
              { text: systemMessages[language] || systemMessages.tr },
              { text: message }
            ]
          }
        ]
      }, {
        timeout: 10000, // 10 saniye timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Gemini response'unu parse et
      const geminiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!geminiResponse) {
        return res.status(500).json({
          success: false,
          error: 'Gemini API\'den geçerli cevap alınamadı',
          timestamp: new Date().toISOString()
        });
      }

      console.log(`✅ Gemini cevabı alındı: ${geminiResponse.substring(0, 100)}...`);
      
      res.json({
        success: true,
        response: geminiResponse,
        language,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error(`❌ Gemini API hatası:`, error.message);
      this.handleError(error, req, res);
    }
  }

  /**
   * Gemini API sağlık kontrolü
   * @param {object} req - Express request objesi
   * @param {object} res - Express response objesi
   */
  healthCheck = async (req, res) => {
    try {
      console.log('🏥 Gemini API sağlık kontrolü yapılıyor');
      
      const isConfigured = !!(this.geminiApiKey && this.geminiApiUrl);
      
      res.json({
        success: true,
        status: 'healthy',
        configured: isConfigured,
        hasApiKey: !!this.geminiApiKey,
        hasApiUrl: !!this.geminiApiUrl,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error(`❌ Gemini sağlık kontrolü hatası:`, error.message);
      this.handleError(error, req, res);
    }
  }

  /**
   * Hata yönetimi
   * @param {Error} error - Hata objesi
   * @param {object} req - Express request objesi
   * @param {object} res - Express response objesi
   */
  handleError = (error, req, res) => {
    console.error('❌ Gemini Controller hata detayı:', error);
    
    let statusCode = 500;
    let errorMessage = 'Bilinmeyen hata';
    
    if (error.response) {
      // HTTP hata kodu varsa
      statusCode = error.response.status;
      errorMessage = error.response.data?.error?.message || error.message;
    } else if (error.code === 'ECONNABORTED') {
      // Timeout hatası
      statusCode = 408;
      errorMessage = 'İstek zaman aşımına uğradı';
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      // Bağlantı hatası
      statusCode = 503;
      errorMessage = 'Gemini API\'ye bağlanılamıyor';
    }
    
    const errorResponse = {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    };

    res.status(statusCode).json(errorResponse);
  }
}

// Singleton instance
const geminiController = new GeminiController();

module.exports = geminiController;
