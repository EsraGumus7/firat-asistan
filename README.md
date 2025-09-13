<<<<<<< HEAD
# 🤖 Şeri - Fırat Üniversitesi AI Asistanı

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

**613+ API Endpoint ile Güçlendirilmiş Akıllı Üniversite Asistanı**

[Kurulum](#-kurulum) • [Özellikler](#-özellikler) • [API Dokümantasyonu](#-api-dokümantasyonu) • [Geliştirici Rehberi](#-geliştirici-rehberi)

</div>

---

## 📖 Proje Hakkında

**Şeri**, Fırat Üniversitesi için geliştirilmiş modern bir AI asistan uygulamasıdır. 613+ API endpoint ile üniversiteyle ilgili tüm bilgilere erişim sağlar ve kullanıcıların sorularını doğal dil işleme ile anlayarak yanıtlar.

### 🎯 Ana Hedefler
- Üniversite öğrencileri ve personeli için tek noktadan bilgi erişimi
- Doğal dil ile etkileşim kurulabilen akıllı asistan
- 613+ API endpoint ile kapsamlı veri entegrasyonu
- Çoklu dil desteği (Türkçe/İngilizce)
- Modern ve kullanıcı dostu arayüz

---

## ✨ Özellikler

### 🤖 **AI Asistan Özellikleri**
- **Gemini AI** entegrasyonu ile doğal dil işleme
- **Akıllı mesaj analizi** - kullanıcı mesajlarını analiz ederek doğru endpoint'e yönlendirme
- **Çoklu dil desteği** - Türkçe ve İngilizce
- **Ses tanıma** - Voice input desteği
- **Text-to-Speech** - Sesli yanıt verme
- **WhatsApp benzeri UI** - Modern chat arayüzü

### 🏛️ **Üniversite Veri Entegrasyonu**
- **🍽️ Yemek Menüsü** - Günlük yemek menüsü bilgileri
- **🎉 Etkinlikler** - Tüm üniversite etkinlikleri
- **📢 Duyurular** - Fakülte ve genel duyurular
- **📰 Haberler** - Üniversite haberleri
- **📚 Kütüphane** - Kütüphane katları ve masa durumu
- **🏛️ Fakülte Duyuruları** - Tüm fakültelerin duyuruları

### 🔧 **Teknik Özellikler**
- **Hybrid Cache Sistemi** - Memory + Persistent cache
- **Retry Mekanizması** - Exponential backoff ile otomatik tekrar deneme
- **Error Handling** - Kapsamlı hata yönetimi
- **Input Validation** - Güvenli veri girişi
- **Memory Leak Protection** - Bellek sızıntısı koruması
- **Network Status** - Ağ durumu takibi

---

## 🚀 Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn
- Expo CLI
- Android Studio (Android için)
- Xcode (iOS için)

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd yeto
```

### 2. Bağımlılıkları Yükleyin

**Frontend (React Native/Expo):**
```bash
npm install
```

**Backend (Node.js):**
```bash
cd backend
npm install
```

### 3. Environment Variables Ayarlayın

**Backend için `.env` dosyası oluşturun:**
```env
# Backend Configuration
PORT=3000
NODE_ENV=development

# API URLs
FIRAT_DDYO_URL=https://ddyo.firat.edu.tr
FIRAT_MAIN_URL=https://www.firat.edu.tr
FIRAT_ABS_URL=https://abs.firat.edu.tr

# API Keys
MAIN_TOKEN=your_main_token_here
ABS_TOKEN=your_abs_token_here
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://192.168.1.93:3000
```

**Frontend için `.env` dosyası oluşturun:**
```env
# Frontend Configuration
EXPO_PUBLIC_BACKEND_URL=http://192.168.1.93:3000/api
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.93:3000
EXPO_PUBLIC_DEV_MODE=true
```

### 4. Uygulamayı Çalıştırın

**Backend'i başlatın:**
```bash
cd backend
npm start
```

**Frontend'i başlatın:**
```bash
npm start
```

### 5. Platform Seçimi
- **Android**: `npm run android`
- **iOS**: `npm run ios`
- **Web**: `npm run web`
- **Expo Go**: QR kodu tarayın

---

## 📱 Kullanım

### Temel Kullanım
1. Uygulamayı açın
2. Dil seçiminizi yapın (Türkçe/İngilizce)
3. Sorunuzu yazın veya sesli olarak sorun
4. AI asistan size yanıt verecek

### Örnek Sorular
- "Bugün ne yemek var?"
- "Mimarlık fakültesi duyuruları"
- "Kütüphane masa durumu"
- "Bu hafta etkinlikler neler?"
- "Tıp fakültesi duyuruları"

### Sesli Kullanım
- Mikrofon butonuna basın
- Sorunuzu söyleyin
- Asistan sesli yanıt verecek

---

## 🏗️ Proje Yapısı

```
yeto/
├── 📱 app/                    # Expo Router sayfaları
│   ├── (tabs)/               # Tab navigation
│   ├── _layout.tsx           # Root layout
│   └── AnaEkran.js           # Ana chat ekranı
├── 🔧 backend/               # Node.js backend
│   ├── config/               # Konfigürasyon dosyaları
│   ├── controllers/          # API controller'ları
│   ├── routes/               # API route'ları
│   └── services/             # Business logic
├── 🧩 components/            # React Native bileşenleri
│   ├── ui/                   # UI bileşenleri
│   └── ErrorBoundary.js      # Hata yakalama
├── ⚙️ services/              # Frontend servisleri
│   ├── apiService.js         # API çağrıları
│   ├── analysisService.js    # Mesaj analizi
│   └── cacheService.js       # Cache yönetimi
├── 🛠️ utils/                 # Yardımcı fonksiyonlar
│   ├── retryUtils.js         # Retry mekanizması
│   └── validationUtils.js    # Input validation
└── 📄 config/                # Frontend konfigürasyonu
    ├── apiConfig.js          # API ayarları
    └── constants.js          # Sabitler
```

---

## 🔌 API Dokümantasyonu

### Endpoint Kategorileri

#### 🍽️ **Yemek (Food)**
- `GET /api/food/api` - Günlük yemek menüsü

#### 🎉 **Ana Etkinlikler (Main)**
- `GET /api/main/get_all_events_tr` - Türkçe etkinlikler
- `GET /api/main/get_all_events_en` - İngilizce etkinlikler
- `GET /api/main/announcement_tr` - Türkçe duyurular
- `GET /api/main/announcement_en` - İngilizce duyurular
- `GET /api/main/news_tr` - Türkçe haberler
- `GET /api/main/news_en` - İngilizce haberler

#### 📚 **Kütüphane (Library)**
- `GET /api/library/library` - Kütüphane genel bilgileri
- `GET /api/library/floors` - Kütüphane katları
- `GET /api/library/desks/{id}` - Masa durumu

#### 🏛️ **Fakülte Duyuruları (Faculty Announcements)**
- `GET /api/faculty_announcements/{faculty_id}` - Fakülte duyuruları

#### 🤖 **AI Servisleri**
- `POST /api/gemini` - Gemini AI çağrısı
- `GET /api/gemini/health` - Gemini sağlık kontrolü

### Örnek API Çağrısı

```javascript
// Yemek menüsü alma
const response = await fetch('http://192.168.1.93:3000/api/food/api');
const data = await response.json();
console.log(data);
```

---

## 🛠️ Geliştirici Rehberi

### Yeni Endpoint Ekleme

1. **Backend'de endpoint tanımlayın:**
```javascript
// backend/routes/autoRoutes.js
router.get('/yeni-endpoint', (req, res) => {
  // Endpoint logic
});
```

2. **Frontend'de servis oluşturun:**
```javascript
// services/apiService.js
export const getYeniEndpoint = async () => {
  return await callEndpoint('category', 'endpoint_key');
};
```

3. **Analysis service'e ekleyin:**
```javascript
// services/analysisService.js
if (lowerMessage.includes('yeni-kelime')) {
  const result = await mappingApiService.findAndCallEndpoint('Yeni Endpoint', lang);
  return formatResponse(result.data, 'category', 'Yeni Endpoint', message);
}
```

### Cache Stratejisi

```javascript
// Hybrid cache kullanımı
const data = await hybridCache.get('category', 'endpoint', params, 'cache_first');
```

### Error Handling

```javascript
// Global error handler
try {
  const result = await apiCall();
} catch (error) {
  logError(error, {
    type: 'api_error',
    context: 'function_name'
  });
}
```

---

## 🧪 Test

### Unit Testler
```bash
# Frontend testleri
npm test

# Backend testleri
cd backend
npm test
```

### Test Coverage
- **Hedef**: %80+ coverage
- **Test edilen alanlar**: Utility functions, services, components

---

## 🚀 Deployment

### Development
```bash
npm run start
```

### Production
```bash
# Frontend build
npm run build

# Backend production
cd backend
NODE_ENV=production npm start
```

---

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

---

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 👥 Geliştirici

**Esra** - Fırat Üniversitesi AI Asistanı Projesi

---

## 📞 İletişim

- **Proje Linki**: [GitHub Repository]
- **Sorunlar**: [Issues](https://github.com/username/yeto/issues)
- **Öneriler**: [Discussions](https://github.com/username/yeto/discussions)

---

<div align="center">

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

Made with ❤️ for Fırat University

</div>
=======
# firat-asistan
>>>>>>> f74362d1a63f08ca3de0ca5005e4ed8b30a40cab
