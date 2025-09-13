# 📚 Kod Dokümantasyonu

Bu dokümantasyon, Şeri AI Asistanı projesinin kod yapısını, mimarisini ve geliştirici rehberini detaylı olarak açıklar.

## 📋 İçindekiler

- [Proje Mimarisi](#-proje-mimarisi)
- [Klasör Yapısı](#-klasör-yapısı)
- [Ana Bileşenler](#-ana-bileşenler)
- [Servis Katmanı](#-servis-katmanı)
- [Utility Fonksiyonları](#-utility-fonksiyonları)
- [Backend Mimarisi](#-backend-mimarisi)
- [Veri Akışı](#-veri-akışı)
- [Güvenlik](#-güvenlik)
- [Performans](#-performans)
- [Geliştirici Rehberi](#-geliştirici-rehberi)

---

## 🏗️ Proje Mimarisi

### Genel Mimari
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   External      │
│   (React Native)│    │   (Node.js)     │    │   APIs          │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │   UI Layer  │ │    │ │  API Layer  │ │    │ │   Fırat     │ │
│ │             │ │    │ │             │ │    │ │   APIs      │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ Service     │ │◄───┤ │ Controller  │ │◄───┤ │   Gemini    │ │
│ │ Layer       │ │    │ │ Layer       │ │    │ │   AI        │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │                 │
│ │ Cache       │ │    │ │ Service     │ │    │                 │
│ │ Layer       │ │    │ │ Layer       │ │    │                 │
│ └─────────────┘ │    │ └─────────────┘ │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Katmanlar

#### 1. **Frontend Katmanları**
- **UI Layer**: React Native bileşenleri
- **Service Layer**: API çağrıları ve business logic
- **Cache Layer**: Veri önbellekleme
- **State Layer**: Context API ile state yönetimi

#### 2. **Backend Katmanları**
- **API Layer**: Express.js route'ları
- **Controller Layer**: İş mantığı kontrolü
- **Service Layer**: Business logic
- **Data Layer**: External API entegrasyonları

---

## 📁 Klasör Yapısı

```
yeto/
├── 📱 app/                          # Expo Router sayfaları
│   ├── (tabs)/                     # Tab navigation
│   │   ├── _layout.tsx            # Tab layout
│   │   ├── index.tsx              # Ana sayfa
│   │   ├── explore.tsx            # Keşfet sayfası
│   │   └── profile.tsx            # Profil sayfası
│   ├── _layout.tsx                # Root layout
│   ├── +not-found.tsx             # 404 sayfası
│   ├── AnaEkran.js                # Ana chat ekranı
│   └── DilContext.js              # Dil yönetimi context'i
│
├── 🔧 backend/                     # Node.js backend
│   ├── config/                     # Konfigürasyon
│   │   ├── config.js              # Ana config
│   │   └── endpoints.js           # 613 endpoint listesi
│   ├── controllers/                # API controller'ları
│   │   ├── geminiController.js    # Gemini AI controller
│   │   └── genericController.js   # Genel API controller
│   ├── routes/                     # API route'ları
│   │   └── autoRoutes.js          # Otomatik route oluşturucu
│   ├── services/                   # Business logic
│   │   └── genericApiClient.js    # API client
│   ├── utils/                      # Yardımcı fonksiyonlar
│   ├── index.js                    # Ana server dosyası
│   └── package.json               # Backend dependencies
│
├── 🧩 components/                   # React Native bileşenleri
│   ├── ui/                        # UI bileşenleri
│   │   ├── IconSymbol.tsx         # Icon bileşeni
│   │   ├── TabBarBackground.tsx   # Tab bar arka planı
│   │   └── ...
│   ├── Avatar.js                  # Avatar bileşeni
│   ├── ErrorBoundary.js           # Hata yakalama
│   ├── NetworkStatus.js           # Ağ durumu
│   └── DebugDashboard.js          # Debug paneli
│
├── ⚙️ services/                     # Frontend servisleri
│   ├── apiService.js              # API çağrıları
│   ├── analysisService.js         # Mesaj analizi
│   ├── cacheService.js            # Cache yönetimi
│   ├── hybridCache.js             # Hybrid cache sistemi
│   ├── memoryCache.js             # Memory cache
│   ├── persistentCache.js         # Persistent cache
│   ├── errorService.js            # Hata yönetimi
│   ├── globalErrorHandler.js      # Global hata yakalama
│   ├── promptService.js           # Prompt yönetimi
│   ├── mappingApiService.js       # API mapping servisi
│   └── ...
│
├── 🛠️ utils/                       # Yardımcı fonksiyonlar
│   ├── retryUtils.js              # Retry mekanizması
│   ├── validationUtils.js         # Input validation
│   └── ...
│
├── 📄 config/                      # Frontend konfigürasyonu
│   ├── apiConfig.js               # API ayarları
│   └── constants.js               # Sabitler
│
├── 📚 docs/                        # Dokümantasyon
│   ├── API.md                     # API dokümantasyonu
│   ├── CODE_DOCUMENTATION.md      # Kod dokümantasyonu
│   └── DEVELOPER_GUIDE.md         # Geliştirici rehberi
│
├── 🧪 test/                        # Test dosyaları
│   └── cacheTest.js               # Cache testleri
│
└── 📄 README.md                    # Ana dokümantasyon
```

---

## 🧩 Ana Bileşenler

### 1. **AnaEkran.js** - Ana Chat Ekranı

```javascript
/**
 * Ana chat ekranı bileşeni
 * WhatsApp benzeri UI ile kullanıcı etkileşimi sağlar
 * 
 * @component
 * @example
 * <AnaEkran />
 */
export default function AnaEkran() {
  // State management
  const [mesaj, setMesaj] = useState('');
  const [sohbet, setSohbet] = useState([]);
  
  // Ana fonksiyonlar
  const mesajGonder = async (gelenMesaj) => {
    // Mesaj gönderme logic'i
  };
  
  const geminiCevapAl = async (message, language) => {
    // Gemini API çağrısı
  };
}
```

**Özellikler:**
- ✅ Real-time chat arayüzü
- ✅ Ses tanıma ve TTS
- ✅ Animasyonlar ve geçişler
- ✅ Keyboard handling
- ✅ URL detection ve linking

### 2. **ErrorBoundary.js** - Hata Yakalama

```javascript
/**
 * React Native için Error Boundary bileşeni
 * JavaScript hatalarını yakalar ve kullanıcı dostu hata ekranı gösterir
 * 
 * @component
 * @example
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Hata loglama
    this.logError(error, errorInfo);
  }
}
```

**Özellikler:**
- ✅ JavaScript hatalarını yakalar
- ✅ Kullanıcı dostu hata ekranı
- ✅ Retry mekanizması
- ✅ Hata loglama
- ✅ Development mode debug bilgileri

### 3. **Avatar.js** - Avatar Bileşeni

```javascript
/**
 * Konuşan avatar bileşeni
 * AI asistanın konuşma durumunu görsel olarak gösterir
 * 
 * @component
 * @param {boolean} konusuyorMu - Avatar konuşuyor mu?
 * @example
 * <Avatar konusuyorMu={true} />
 */
export default function Avatar({ konusuyorMu = false }) {
  // Avatar animasyon logic'i
}
```

---

## ⚙️ Servis Katmanı

### 1. **apiService.js** - API Çağrıları

```javascript
/**
 * Generic API client
 * Tüm API çağrıları için merkezi servis
 */
const apiClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: API_TIMEOUT,
  headers: { 'Content-Type': 'application/json' }
});

/**
 * Herhangi bir endpoint'i çağır
 * @param {string} category - Endpoint kategorisi
 * @param {string} endpointKey - Endpoint anahtarı
 * @param {object} params - Query parametreleri
 * @param {string} cacheStrategy - Cache stratejisi
 * @returns {Promise<object>} API response
 */
export const callEndpoint = async (category, endpointKey, params = {}, cacheStrategy = 'cache_first') => {
  // Implementation
};
```

### 2. **analysisService.js** - Mesaj Analizi

```javascript
/**
 * Kullanıcı mesaj analizi servisi
 * Mesajları analiz ederek doğru endpoint'e yönlendirir
 * 
 * @param {string} message - Kullanıcı mesajı
 * @param {string} lang - Dil kodu (tr/en)
 * @returns {Promise<string>} Analiz sonucu
 */
export const analyzeUserMessage = async (message, lang = 'tr') => {
  // 1. Keyword mapping ile endpoint bul
  const result = await mappingApiService.findEndpointByMessage(message, lang);
  
  // 2. Smart search ile arama
  const smartResult = await mappingApiService.smartSearch(message, lang);
  
  // 3. Manuel keyword kontrolü
  return await handleManualKeywords(message, lang);
};
```

### 3. **hybridCache.js** - Hybrid Cache Sistemi

```javascript
/**
 * Hybrid cache sistemi
 * Memory ve persistent cache'i birlikte kullanır
 */
class HybridCache {
  constructor() {
    this.memoryCache = new MemoryCache();
    this.persistentCache = new PersistentCache();
  }
  
  /**
   * Cache'den veri al
   * @param {string} category - Kategori
   * @param {string} key - Anahtar
   * @param {object} params - Parametreler
   * @param {string} strategy - Cache stratejisi
   * @returns {Promise<object|null>} Cache verisi
   */
  async get(category, key, params, strategy) {
    // Cache stratejisine göre veri alma
  }
  
  /**
   * Cache'e veri kaydet
   * @param {string} category - Kategori
   * @param {string} key - Anahtar
   * @param {object} data - Veri
   * @param {object} params - Parametreler
   */
  async set(category, key, data, params) {
    // Her iki cache'e de kaydet
  }
}
```

---

## 🛠️ Utility Fonksiyonları

### 1. **retryUtils.js** - Retry Mekanizması

```javascript
/**
 * Exponential backoff ile retry mekanizması
 * Network hatalarında otomatik tekrar deneme
 * 
 * @param {Function} fn - Çalıştırılacak fonksiyon
 * @param {Object} config - Retry konfigürasyonu
 * @param {string} context - Hata loglama için context
 * @returns {Promise} Sonuç
 */
export const retryWithBackoff = async (fn, config = {}, context = 'retry') => {
  const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  
  for (let attempt = 0; attempt <= finalConfig.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === finalConfig.maxRetries) throw error;
      if (!finalConfig.retryCondition(error)) throw error;
      
      const delay = calculateDelay(attempt, finalConfig);
      await sleep(delay);
    }
  }
};
```

### 2. **validationUtils.js** - Input Validation

```javascript
/**
 * Mesaj validation fonksiyonu
 * XSS, SQL injection ve diğer güvenlik kontrolleri
 * 
 * @param {string} message - Validasyon edilecek mesaj
 * @returns {Object} Validation sonucu
 */
export const validateMessage = (message) => {
  const errors = [];
  
  // XSS koruması
  const xssPattern = /<script|javascript:|on\w+\s*=/i;
  if (xssPattern.test(message)) {
    errors.push('Güvenlik nedeniyle bu mesaj gönderilemez');
  }
  
  // SQL injection koruması
  const sqlPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER)\b)/i;
  if (sqlPattern.test(message)) {
    errors.push('Geçersiz karakterler tespit edildi');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
```

---

## 🔧 Backend Mimarisi

### 1. **index.js** - Ana Server

```javascript
/**
 * Express.js ana server dosyası
 * Tüm route'ları ve middleware'leri yapılandırır
 */
const express = require('express');
const cors = require('cors');
const app = express();

// CORS ayarları
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Global error handling
app.use((error, req, res, next) => {
  console.error('🚨 Global Error Handler:', error);
  res.status(500).json({
    success: false,
    error: 'Sunucu iç hatası',
    message: error.message
  });
});
```

### 2. **geminiController.js** - Gemini AI Controller

```javascript
/**
 * Gemini AI Controller
 * Frontend'den gelen istekleri Gemini API'ye yönlendirir
 */
class GeminiController {
  constructor() {
    this.geminiApiKey = process.env.GEMINI_API_KEY;
    this.geminiApiUrl = process.env.GEMINI_API_URL;
  }
  
  /**
   * Gemini API'den cevap al
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   */
  getGeminiResponse = async (req, res) => {
    const { message, language } = req.body;
    
    try {
      const response = await axios.post(this.geminiApiUrl, {
        contents: [{ parts: [{ text: message }] }]
      }, {
        params: { key: this.geminiApiKey }
      });
      
      const geminiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      res.json({
        success: true,
        response: geminiResponse
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Gemini API hatası'
      });
    }
  };
}
```

---

## 🔄 Veri Akışı

### 1. **Kullanıcı Mesajı Akışı**

```
Kullanıcı Mesajı
       ↓
Input Validation
       ↓
Analysis Service
       ↓
┌─────────────────┐
│  Backend API    │
│  (613 endpoint) │
└─────────────────┘
       ↓
Response Formatting
       ↓
Cache Storage
       ↓
UI Update
```

### 2. **Cache Akışı**

```
API Request
       ↓
Hybrid Cache Check
       ↓
┌─────────────────┐
│  Memory Cache   │
│  (Hızlı)        │
└─────────────────┘
       ↓ (Miss)
┌─────────────────┐
│ Persistent Cache│
│  (Kalıcı)       │
└─────────────────┘
       ↓ (Miss)
┌─────────────────┐
│  Network Call   │
│  (Yavaş)        │
└─────────────────┘
       ↓
Cache Storage
       ↓
Response
```

---

## 🔒 Güvenlik

### 1. **Input Validation**
- XSS koruması
- SQL injection koruması
- Length validation
- Character filtering

### 2. **Error Handling**
- Global error boundary
- Sensitive data filtering
- Error logging
- User-friendly messages

### 3. **API Security**
- CORS configuration
- Rate limiting (gelecek)
- Authentication (gelecek)
- HTTPS enforcement (gelecek)

---

## ⚡ Performans

### 1. **Caching Strategy**
- **Memory Cache**: Hızlı erişim
- **Persistent Cache**: Kalıcı veri
- **Hybrid Cache**: Akıllı seçim

### 2. **Retry Mechanism**
- Exponential backoff
- Network error handling
- Timeout management

### 3. **Memory Management**
- Memory leak protection
- Garbage collection
- Resource cleanup

---

## 🧪 Test Stratejisi

### 1. **Unit Tests**
- Utility functions
- Service functions
- Component logic

### 2. **Integration Tests**
- API endpoints
- Cache system
- Error handling

### 3. **E2E Tests**
- User flows
- Cross-platform testing
- Performance testing

---

## 📈 Monitoring

### 1. **Logging**
- Console logging
- Error tracking
- Performance metrics

### 2. **Analytics**
- API usage
- Cache hit rates
- Error rates

---

## 🚀 Gelecek Geliştirmeler

### v2.0
- [ ] Authentication system
- [ ] Rate limiting
- [ ] WebSocket support
- [ ] Advanced caching

### v3.0
- [ ] Microservices
- [ ] GraphQL API
- [ ] Machine learning
- [ ] Real-time analytics

---

<div align="center">

**📚 Bu dokümantasyon sürekli güncellenmektedir.**

**Son güncelleme**: 2024-01-15

</div>
