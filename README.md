
# 🤖 Şeri - Fırat University AI Assistant

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

**Smart University Assistant Powered by 613+ API Endpoints, Used in Live Production Environment**

[Features](#-features) • [Technical Details](#-technical-details) • [Installation](#-installation) • [Screenshots](#-screenshots)

</div>

---

## 🎯 About the Project

**Şeri** is a modern AI assistant application **used live** by Fırat University and actively utilized by thousands of students and staff. This project manages over 613 API endpoints to provide access to all university-related information and instantly answers user queries using natural language processing.

### 🌟 Project Importance

- ✅ **Live Production Environment**: Actively used as the official mobile application of Fırat University.
- ✅ **High Scalability**: Serves thousands of users.
- ✅ **Comprehensive API Integration**: Works with 613+ different API endpoints.
- ✅ **Real-Time Data**: Live data stream for weather, dining menus, announcements, and events.

---

## 📸 Screenshots

<div align="center">

<table>
<tr>
<td align="center" width="33%">
<img src="docs/images/fm1.jpeg" alt="Home Screen - Chat Interface" width="100%"/>
<br><strong>Home Screen - Chat Interface</strong>
</td>
<td align="center" width="33%">
<img src="docs/images/fm2.jpeg" alt="Weather Widget and Language Selection" width="100%"/>
<br><strong>Weather Widget</strong>
</td>
<td align="center" width="33%">
<img src="docs/images/fm3.jpeg" alt="Faculty Announcements and API Integration" width="100%"/>
<br><strong>Faculty Announcements</strong>
</td>
</tr>
</table>

</div>

---

## 💼 Skills and Technologies Acquired

### 🎨 **Frontend Development**
- **React Native** - Cross-platform mobile application development
- **Expo Framework** - Modern React Native development environment
- **TypeScript** - Type-safe coding
- **State Management** - Advanced state control and management
- **Component Architecture** - Reusable component architecture
- **Responsive Design** - Design compatible with different screen sizes

### ⚙️ **Backend Development**
- **Node.js & Express.js** - RESTful API development
- **API Gateway Pattern** - Management of 613+ endpoints
- **Microservices Architecture** - Modular service structure
- **Route Management** - Dynamic route creation and management
- **Middleware Development** - Custom middleware development

### 🤖 **AI and Natural Language Processing**
- **Google Gemini AI** - Advanced AI integration
- **Natural Language Processing** - Natural language understanding and processing
- **Intent Recognition** - User intent recognition
- **Context-Aware Responses** - Context-aware replies

### 🔄 **API Integration and Management**
- **613+ API Endpoint Management** - Large-scale API integration
- **RESTful API Design** - Standard API design principles
- **API Gateway Implementation** - Centralized API management
- **Third-Party API Integration** - Weather API, Gemini AI integration
- **Rate Limiting** - API usage optimization
- **Error Handling** - Comprehensive error management

### 💾 **Cache and Performance Optimization**
- **Hybrid Cache System** - Memory + Persistent cache strategy
- **LRU Cache Algorithm** - Cleaning least used items
- **Cache Invalidation** - Smart cache cleaning mechanism
- **Performance Optimization** - Application performance optimization
- **Memory Management** - Memory leak protection

### 🌐 **Network and Security**
- **Retry Mechanism** - Automatic retry with exponential backoff
- **Network Status Monitoring** - Network status tracking
- **Error Recovery** - Error recovery mechanisms
- **Input Validation & Sanitization** - Secure data entry
- **XSS & SQL Injection Protection** - Security measures

### 🌍 **Multi-Language Support**
- **i18n Implementation** - Internationalization
- **Turkish Support** - Full Turkish language support
- **English Support** - Full English language support
- **Foreign Language Support** - Extensible language architecture
- **Dynamic Language Switching** - Dynamic language switching

### 🧪 **Testing and Quality Assurance**
- **Unit Testing** - Unit tests
- **Integration Testing** - Integration tests
- **Error Handling Testing** - Error management tests
- **Performance Testing** - Performance tests

### 📱 **Mobile Application Features**
- **Voice Input** - Voice input support
- **Text-to-Speech** - Voice response
- **Offline Support** - Offline operation support
- **Push Notifications** - Notification system
- **Deep Linking** - Deep link support

---

## ✨ Features

### 🤖 **AI Assistant Features**
- **Gemini AI Integration** - Natural language processing with Google's most advanced AI model
- **Smart Message Analysis** - Analyzing user messages and routing to the correct endpoint
- **Fuzzy Search** - Smart search algorithm with Fuse.js
- **Context Awareness** - Context-aware responses
- **Multi-turn Conversations** - Support for multi-turn conversations

### 🏛️ **University Data Integration (613+ APIs)**
- **🍽️ Dining Menu** - Daily dining menu information (real-time)
- **🎉 Events** - All university events (Turkish/English)
- **📢 Announcements** - Faculty and general announcements (600+ faculties)
- **📰 News** - University news
- **📚 Library** - Library floors and table occupancy status
- **🏛️ Faculty Announcements** - Announcements from all faculties (613+ endpoints)

### 🌤️ **Weather API Integration**
- **Real-Time Weather** - WeatherAPI.com integration
- **Daily Forecast** - 7-day weather forecast
- **Hourly Forecast** - 24-hour detailed forecast
- **Widget Display** - Weather widget on the home screen
- **Smart Alerts** - Automatic suggestions based on weather conditions

### 🎨 **User Interface**
- **WhatsApp-like UI** - Modern and familiar chat interface
- **Gradient Design** - Modern gradient backgrounds
- **Animations** - Smooth transition animations
- **Avatar Animations** - Avatar animations during conversation
- **Responsive Layout** - Compatible with all screen sizes

### 🔧 **Technical Features**
- **Hybrid Cache System** - Memory + Persistent (AsyncStorage) cache
- **State Control** - Advanced state management and control
- **Retry Mechanism** - Automatic retry with exponential backoff
- **Error Handling** - Comprehensive global error management
- **Input Validation** - Secure data entry and sanitization
- **Memory Leak Protection** - Protection against memory leaks
- **Network Status** - Network status tracking and offline support

### 🌍 **Multi-Language Support**
- **Turkish** - Full Turkish language support
- **English** - Full English language support
- **Foreign Language Support** - Extensible language architecture
- **Dynamic Language Switching** - Instant language switching within the app
- **Localization** - Localization for all content

---

## 🏗️ Technical Details

### 📊 **Architectural Structure**

```
Frontend (React Native/Expo)
├── State Management (Context API + Hooks)
├── Service Layer (API, Cache, Analysis)
├── Component Architecture
└── Error Boundary & Global Error Handler

Backend (Node.js/Express)
├── API Gateway (613+ Endpoint Management)
├── Controller Layer
├── Service Layer
└── Route Management (Dynamic Routes)
```

### 🔄 **API Management System**

- **613+ Endpoints** - Automatic endpoint discovery and management
- **Dynamic Routing** - Dynamic route creation
- **Fuzzy Matching** - Smart endpoint finding with Fuse.js
- **Category Management** - Category-based endpoint organization
- **Caching Strategy** - Endpoint-based cache strategies

### 💾 **Cache Strategy**

- **Memory Cache** - RAM cache for fast access (100MB limit)
- **Persistent Cache** - Permanent cache with AsyncStorage (500MB limit)
- **Hybrid Strategy** - Combination of Memory + Persistent
- **LRU Algorithm** - Cleaning least used items
- **TTL Management** - Category-based TTL management
- **Auto Cleanup** - Automatic cache cleanup

### 🔁 **Retry Mechanism**

- **Exponential Backoff** - Exponential backoff algorithm
- **Network Error Retry** - Automatic retry on network errors
- **Timeout Handling** - Timeout management
- **Max Retry Limit** - Maximum retry count control

### 🛡️ **Security Features**

- **Input Validation** - Comprehensive input validation
- **XSS Protection** - Cross-site scripting protection
- **SQL Injection Prevention** - Prevention of SQL injection
- **Sanitization** - Data cleaning and sanitization
- **Rate Limiting** - Request rate limiting

---

## 🚀 Installation

### Requirements
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android)
- Xcode (for iOS)

### 1. Clone the Project
```bash
git clone <repository-url>
cd firat-asistan
```

### 2. Install Dependencies

**Frontend (React Native/Expo):**
```bash
npm install
```

**Backend (Node.js):**
```bash
cd backend
npm install
```

### 3. Set Environment Variables

**Create a `.env` file for Backend:**
```env
PORT=3000
NODE_ENV=development
FIRAT_DDYO_URL=https://ddyo.firat.edu.tr
FIRAT_MAIN_URL=https://www.firat.edu.tr
MAIN_TOKEN=your_token_here
GEMINI_API_KEY=your_gemini_key_here
WEATHER_API_KEY=your_weather_key_here
```

**Create a `.env` file for Frontend:**
```env
EXPO_PUBLIC_BACKEND_URL=http://your-ip:3000/api
EXPO_PUBLIC_API_BASE_URL=http://your-ip:3000
```

### 4. Run the Application

**Start the Backend:**
```bash
cd backend
npm start
```

**Start the Frontend:**
```bash
npm start
```

---

## 📱 Usage

### Basic Usage
1. Open the application
2. Select your language (Turkish/English)
3. Type your question or ask via voice
4. The AI assistant will respond to you

### Sample Questions
- "What's on the menu today?"
- "Architecture faculty announcements"
- "Library table status"
- "What are the events this week?"
- "Medical faculty announcements"
- "How is the weather?"

---

## 📊 Project Statistics

- **613+ API Endpoints** - Number of managed endpoints
- **600+ Faculties** - Announcement system integration
- **3 Language Support** - Turkish, English, Foreign languages
- **100MB Memory Cache** - For fast access
- **500MB Persistent Cache** - Permanent data storage
- **Live Usage** - Active usage by Fırat University

---

## 🛠️ Developer Guide

For detailed developer documentation:
- [API Documentation](docs/API.md)
- [Code Documentation](docs/CODE_DOCUMENTATION.md)
- [Developer Guide](docs/DEVELOPER_GUIDE.md)


## 📄 License

This project is licensed under the MIT License.

---

## 👥 Developer

**Esra** - Fırat University AI Assistant Project

This project was developed as the official mobile application of Fırat University and is actively used in a live production environment.

---

<div align="center">

**⭐ If you liked this project, don't forget to give it a star!**

Made with ❤️ for Fırat University

</div>
```
```


```




























# 🤖 Şeri - Fırat Üniversitesi AI Asistanı

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

**613+ API Endpoint ile Güçlendirilmiş, Canlı Üretim Ortamında Kullanılan Akıllı Üniversite Asistanı**

[Özellikler](#-özellikler) • [Teknik Detaylar](#-teknik-detaylar) • [Kurulum](#-kurulum) • [Ekran Görüntüleri](#-ekran-görüntüleri)

</div>

---

## 🎯 Proje Hakkında

**Şeri**, Fırat Üniversitesi tarafından **canlı olarak kullanılan** ve binlerce öğrenci ve personel tarafından aktif şekilde kullanılan modern bir AI asistan uygulamasıdır. Bu proje, 613'ten fazla API endpoint'ini yöneterek üniversiteyle ilgili tüm bilgilere erişim sağlar ve kullanıcıların sorularını doğal dil işleme ile anlayarak anında yanıtlar.

### 🌟 Proje Önemi

- ✅ **Canlı Üretim Ortamı**: Fırat Üniversitesi'nin resmi mobil uygulaması olarak aktif kullanılmaktadır
- ✅ **Yüksek Ölçeklenebilirlik**: Binlerce kullanıcıya hizmet vermektedir
- ✅ **Kapsamlı API Entegrasyonu**: 613+ farklı API endpoint'i ile çalışmaktadır
- ✅ **Gerçek Zamanlı Veri**: Hava durumu, yemek menüsü, duyurular ve etkinlikler için canlı veri akışı

---

## 📸 Ekran Görüntüleri

<div align="center">

<table>
<tr>
<td align="center" width="33%">
<img src="docs/images/fm1.jpeg" alt="Ana Ekran - Chat Arayüzü" width="100%"/>
<br><strong>Ana Ekran - Chat Arayüzü</strong>
</td>
<td align="center" width="33%">
<img src="docs/images/fm2.jpeg" alt="Hava Durumu Widget ve Dil Seçimi" width="100%"/>
<br><strong>Hava Durumu Widget</strong>
</td>
<td align="center" width="33%">
<img src="docs/images/fm3.jpeg" alt="Fakülte Duyuruları ve API Entegrasyonu" width="100%"/>
<br><strong>Fakülte Duyuruları</strong>
</td>
</tr>
</table>

</div>

---

## 💼 Edinilen Beceriler ve Teknolojiler

### 🎨 **Frontend Geliştirme**
- **React Native** - Cross-platform mobil uygulama geliştirme
- **Expo Framework** - Modern React Native geliştirme ortamı
- **TypeScript** - Tip güvenli kod yazımı
- **State Management** - Gelişmiş state kontrolü ve yönetimi
- **Component Architecture** - Yeniden kullanılabilir bileşen mimarisi
- **Responsive Design** - Farklı ekran boyutlarına uyumlu tasarım

### ⚙️ **Backend Geliştirme**
- **Node.js & Express.js** - RESTful API geliştirme
- **API Gateway Pattern** - 613+ endpoint yönetimi
- **Microservices Architecture** - Modüler servis yapısı
- **Route Management** - Dinamik route oluşturma ve yönetimi
- **Middleware Development** - Custom middleware geliştirme

### 🤖 **AI ve Doğal Dil İşleme**
- **Google Gemini AI** - Gelişmiş AI entegrasyonu
- **Natural Language Processing** - Doğal dil anlama ve işleme
- **Intent Recognition** - Kullanıcı niyet tanıma
- **Context-Aware Responses** - Bağlam farkındalıklı yanıtlar

### 🔄 **API Entegrasyonu ve Yönetimi**
- **613+ API Endpoint Yönetimi** - Büyük ölçekli API entegrasyonu
- **RESTful API Design** - Standart API tasarım prensipleri
- **API Gateway Implementation** - Merkezi API yönetimi
- **Third-Party API Integration** - Hava Durumu API, Gemini AI entegrasyonu
- **Rate Limiting** - API kullanım optimizasyonu
- **Error Handling** - Kapsamlı hata yönetimi

### 💾 **Cache ve Performans Optimizasyonu**
- **Hybrid Cache System** - Memory + Persistent cache stratejisi
- **LRU Cache Algorithm** - En az kullanılan öğeleri temizleme
- **Cache Invalidation** - Akıllı cache temizleme mekanizması
- **Performance Optimization** - Uygulama performans optimizasyonu
- **Memory Management** - Bellek sızıntısı koruması

### 🌐 **Network ve Güvenlik**
- **Retry Mechanism** - Exponential backoff ile otomatik tekrar deneme
- **Network Status Monitoring** - Ağ durumu takibi
- **Error Recovery** - Hata kurtarma mekanizmaları
- **Input Validation & Sanitization** - Güvenli veri girişi
- **XSS & SQL Injection Protection** - Güvenlik önlemleri

### 🌍 **Çoklu Dil Desteği**
- **i18n Implementation** - Uluslararasılaştırma
- **Türkçe Desteği** - Tam Türkçe dil desteği
- **İngilizce Desteği** - Tam İngilizce dil desteği
- **Yabancı Dil Desteği** - Genişletilebilir dil mimarisi
- **Dynamic Language Switching** - Dinamik dil değiştirme

### 🧪 **Test ve Kalite Güvencesi**
- **Unit Testing** - Birim testleri
- **Integration Testing** - Entegrasyon testleri
- **Error Handling Testing** - Hata yönetimi testleri
- **Performance Testing** - Performans testleri

### 📱 **Mobil Uygulama Özellikleri**
- **Voice Input** - Sesli giriş desteği
- **Text-to-Speech** - Sesli yanıt verme
- **Offline Support** - Çevrimdışı çalışma desteği
- **Push Notifications** - Bildirim sistemi
- **Deep Linking** - Derin bağlantı desteği

---

## ✨ Özellikler

### 🤖 **AI Asistan Özellikleri**
- **Gemini AI Entegrasyonu** - Google'ın en gelişmiş AI modeli ile doğal dil işleme
- **Akıllı Mesaj Analizi** - Kullanıcı mesajlarını analiz ederek doğru endpoint'e yönlendirme
- **Fuzzy Search** - Fuse.js ile akıllı arama algoritması
- **Context Awareness** - Bağlam farkındalıklı yanıtlar
- **Multi-turn Conversations** - Çoklu tur konuşma desteği

### 🏛️ **Üniversite Veri Entegrasyonu (613+ API)**
- **🍽️ Yemek Menüsü** - Günlük yemek menüsü bilgileri (gerçek zamanlı)
- **🎉 Etkinlikler** - Tüm üniversite etkinlikleri (Türkçe/İngilizce)
- **📢 Duyurular** - Fakülte ve genel duyurular (600+ fakülte)
- **📰 Haberler** - Üniversite haberleri
- **📚 Kütüphane** - Kütüphane katları ve masa durumu
- **🏛️ Fakülte Duyuruları** - Tüm fakültelerin duyuruları (613+ endpoint)

### 🌤️ **Hava Durumu API Entegrasyonu**
- **Gerçek Zamanlı Hava Durumu** - WeatherAPI.com entegrasyonu
- **Günlük Tahmin** - 7 günlük hava durumu tahmini
- **Saatlik Tahmin** - 24 saatlik detaylı tahmin
- **Widget Gösterimi** - Ana ekranda hava durumu widget'ı
- **Akıllı Uyarılar** - Hava durumuna göre otomatik öneriler

### 🎨 **Kullanıcı Arayüzü**
- **WhatsApp Benzeri UI** - Modern ve tanıdık chat arayüzü
- **Gradient Tasarım** - Modern gradient arka planlar
- **Animasyonlar** - Akıcı geçiş animasyonları
- **Avatar Animasyonları** - Konuşma sırasında avatar animasyonları
- **Responsive Layout** - Tüm ekran boyutlarına uyumlu

### 🔧 **Teknik Özellikler**
- **Hybrid Cache Sistemi** - Memory + Persistent (AsyncStorage) cache
- **State Control** - Gelişmiş state yönetimi ve kontrolü
- **Retry Mekanizması** - Exponential backoff ile otomatik tekrar deneme
- **Error Handling** - Kapsamlı global hata yönetimi
- **Input Validation** - Güvenli veri girişi ve sanitization
- **Memory Leak Protection** - Bellek sızıntısı koruması
- **Network Status** - Ağ durumu takibi ve offline desteği

### 🌍 **Çoklu Dil Desteği**
- **Türkçe** - Tam Türkçe dil desteği
- **İngilizce** - Tam İngilizce dil desteği
- **Yabancı Dil Desteği** - Genişletilebilir dil mimarisi
- **Dinamik Dil Değiştirme** - Uygulama içinde anlık dil değiştirme
- **Yerelleştirme** - Tüm içerikler için yerelleştirme

---

## 🏗️ Teknik Detaylar

### 📊 **Mimari Yapı**

```
Frontend (React Native/Expo)
├── State Management (Context API + Hooks)
├── Service Layer (API, Cache, Analysis)
├── Component Architecture
└── Error Boundary & Global Error Handler

Backend (Node.js/Express)
├── API Gateway (613+ Endpoint Management)
├── Controller Layer
├── Service Layer
└── Route Management (Dynamic Routes)
```

### 🔄 **API Yönetim Sistemi**

- **613+ Endpoint** - Otomatik endpoint keşfi ve yönetimi
- **Dynamic Routing** - Dinamik route oluşturma
- **Fuzzy Matching** - Fuse.js ile akıllı endpoint bulma
- **Category Management** - Kategori bazlı endpoint organizasyonu
- **Caching Strategy** - Endpoint bazlı cache stratejileri

### 💾 **Cache Stratejisi**

- **Memory Cache** - Hızlı erişim için RAM cache (100MB limit)
- **Persistent Cache** - AsyncStorage ile kalıcı cache (500MB limit)
- **Hybrid Strategy** - Memory + Persistent kombinasyonu
- **LRU Algorithm** - En az kullanılan öğeleri temizleme
- **TTL Management** - Kategori bazlı TTL yönetimi
- **Auto Cleanup** - Otomatik cache temizleme

### 🔁 **Retry Mekanizması**

- **Exponential Backoff** - Üstel geri çekilme algoritması
- **Network Error Retry** - Ağ hatalarında otomatik tekrar
- **Timeout Handling** - Zaman aşımı yönetimi
- **Max Retry Limit** - Maksimum tekrar sayısı kontrolü

### 🛡️ **Güvenlik Özellikleri**

- **Input Validation** - Kapsamlı girdi doğrulama
- **XSS Protection** - Cross-site scripting koruması
- **SQL Injection Prevention** - SQL enjeksiyon önleme
- **Sanitization** - Veri temizleme ve sanitization
- **Rate Limiting** - İstek hızı sınırlama

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
cd firat-asistan
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
PORT=3000
NODE_ENV=development
FIRAT_DDYO_URL=https://ddyo.firat.edu.tr
FIRAT_MAIN_URL=https://www.firat.edu.tr
MAIN_TOKEN=your_token_here
GEMINI_API_KEY=your_gemini_key_here
WEATHER_API_KEY=your_weather_key_here
```

**Frontend için `.env` dosyası oluşturun:**
```env
EXPO_PUBLIC_BACKEND_URL=http://your-ip:3000/api
EXPO_PUBLIC_API_BASE_URL=http://your-ip:3000
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
- "Hava durumu nasıl?"

---

## 📊 Proje İstatistikleri

- **613+ API Endpoint** - Yönetilen endpoint sayısı
- **600+ Fakülte** - Duyuru sistemi entegrasyonu
- **3 Dil Desteği** - Türkçe, İngilizce, Yabancı diller
- **100MB Memory Cache** - Hızlı erişim için
- **500MB Persistent Cache** - Kalıcı veri depolama
- **Canlı Kullanım** - Fırat Üniversitesi tarafından aktif kullanım

---

## 🛠️ Geliştirici Rehberi

Detaylı geliştirici dokümantasyonu için:
- [API Dokümantasyonu](docs/API.md)
- [Kod Dokümantasyonu](docs/CODE_DOCUMENTATION.md)
- [Geliştirici Rehberi](docs/DEVELOPER_GUIDE.md)


## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

## 👥 Geliştirici

**Esra** - Fırat Üniversitesi AI Asistanı Projesi

Bu proje, Fırat Üniversitesi'nin resmi mobil uygulaması olarak geliştirilmiş ve canlı üretim ortamında aktif olarak kullanılmaktadır.

---

<div align="center">

**⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!**

Made with ❤️ for Fırat University

</div>
