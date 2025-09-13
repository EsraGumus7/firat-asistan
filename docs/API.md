# 🔌 API Dokümantasyonu

Bu dokümantasyon, Şeri AI Asistanı'nın kullandığı 613+ API endpoint'ini detaylı olarak açıklar.

## 📋 İçindekiler

- [Genel Bilgiler](#-genel-bilgiler)
- [Authentication](#-authentication)
- [Endpoint Kategorileri](#-endpoint-kategorileri)
- [Response Formatları](#-response-formatları)
- [Hata Kodları](#-hata-kodları)
- [Rate Limiting](#-rate-limiting)
- [Örnekler](#-örnekler)

---

## 🌐 Genel Bilgiler

### Base URL
```
Backend: http://192.168.1.93:3000/api
Frontend: http://192.168.1.93:3000
```

### Desteklenen HTTP Metodları
- `GET` - Veri alma
- `POST` - Veri gönderme
- `PUT` - Veri güncelleme
- `DELETE` - Veri silme

### Content-Type
```
Content-Type: application/json
```

---

## 🔐 Authentication

Şu anda authentication sistemi aktif değildir. Tüm endpoint'ler public olarak erişilebilir.

**Gelecek sürümlerde:**
- JWT token tabanlı authentication
- API key sistemi
- Rate limiting

---

## 📂 Endpoint Kategorileri

### 🍽️ **1. Yemek (Food) Kategorisi**

Üniversite yemekhane ve kafeterya bilgileri.

#### Endpoints

| Endpoint | Method | Açıklama | Parametreler |
|----------|--------|----------|--------------|
| `/food/api` | GET | Günlük yemek menüsü | - |

#### Örnek Response
```json
{
  "success": true,
  "data": {
    "food": [
      "Pilav",
      "Tavuk",
      "Salata",
      "Çorba"
    ]
  }
}
```

---

### 🎉 **2. Ana Etkinlikler (Main) Kategorisi**

Üniversite genel etkinlikleri, duyurular ve haberler.

#### Endpoints

| Endpoint | Method | Açıklama | Parametreler |
|----------|--------|----------|--------------|
| `/main/get_all_events_tr` | GET | Türkçe etkinlikler | - |
| `/main/get_all_events_en` | GET | İngilizce etkinlikler | - |
| `/main/announcement_tr` | GET | Türkçe duyurular | - |
| `/main/announcement_en` | GET | İngilizce duyurular | - |
| `/main/news_tr` | GET | Türkçe haberler | - |
| `/main/news_en` | GET | İngilizce haberler | - |

#### Örnek Response
```json
{
  "success": true,
  "data": {
    "Success": [
      {
        "title": "Etkinlik Başlığı",
        "content_page_url": "https://example.com/etkinlik",
        "date": "2024-01-15",
        "translations": [
          {
            "title": "Event Title",
            "lang": "en"
          }
        ]
      }
    ]
  }
}
```

---

### 📚 **3. Kütüphane (Library) Kategorisi**

Kütüphane katları, masa durumu ve genel bilgiler.

#### Endpoints

| Endpoint | Method | Açıklama | Parametreler |
|----------|--------|----------|--------------|
| `/library/library` | GET | Kütüphane genel bilgileri | - |
| `/library/floors` | GET | Kütüphane katları | - |
| `/library/desks/{id}` | GET | Masa durumu | `id` (kat numarası) |

#### Örnek Response - Masa Durumu
```json
{
  "success": true,
  "data": {
    "masalar": [
      {
        "masa_no": 1,
        "dolu_mu": 0,
        "kat": "Zemin Kat"
      },
      {
        "masa_no": 2,
        "dolu_mu": 1,
        "kat": "Zemin Kat"
      }
    ],
    "kat_adi": "Zemin Kat",
    "kapasite": 50
  }
}
```

---

### 🏛️ **4. Fakülte Duyuruları (Faculty Announcements) Kategorisi**

Tüm fakültelerin duyuruları.

#### Endpoints

| Endpoint | Method | Açıklama | Parametreler |
|----------|--------|----------|--------------|
| `/faculty_announcements/{faculty_id}` | GET | Fakülte duyuruları | `faculty_id` (fakülte kodu) |

#### Fakülte Kodları

| Fakülte | Kod | Açıklama |
|---------|-----|----------|
| Mimarlık | `tr_13` | Mimarlık Fakültesi |
| Tıp | `tr_14` | Tıp Fakültesi |
| Mühendislik | `tr_15` | Mühendislik Fakültesi |
| Eğitim | `tr_16` | Eğitim Fakültesi |
| İktisadi ve İdari Bilimler | `tr_17` | İİBF |
| Veterinerlik | `tr_18` | Veterinerlik Fakültesi |
| İletişim | `tr_19` | İletişim Fakültesi |
| Su Ürünleri | `tr_20` | Su Ürünleri Fakültesi |

#### Örnek Response
```json
{
  "success": true,
  "data": {
    "success": [
      {
        "title": "Fakülte Duyurusu",
        "date": "2024-01-15",
        "link": "https://example.com/duyuru",
        "faculty": "Mimarlık Fakültesi"
      }
    ]
  }
}
```

---

### 🤖 **5. AI Servisleri Kategorisi**

Gemini AI entegrasyonu ve akıllı mesaj analizi.

#### Endpoints

| Endpoint | Method | Açıklama | Parametreler |
|----------|--------|----------|--------------|
| `/gemini` | POST | Gemini AI çağrısı | `message`, `language` |
| `/gemini/health` | GET | Gemini sağlık kontrolü | - |
| `/mapping/find` | POST | Akıllı mesaj analizi | `message`, `language` |
| `/mapping/stats` | GET | Mapping istatistikleri | - |

#### Gemini API Request
```json
{
  "message": "Bugün ne yemek var?",
  "language": "tr"
}
```

#### Gemini API Response
```json
{
  "success": true,
  "response": "Bugünün yemek menüsü: Pilav, Tavuk, Salata, Çorba",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### 🏥 **6. Sistem Endpoint'leri**

Sistem sağlığı ve yönetim endpoint'leri.

#### Endpoints

| Endpoint | Method | Açıklama | Parametreler |
|----------|--------|----------|--------------|
| `/health` | GET | Sistem sağlık kontrolü | - |
| `/endpoints` | GET | Tüm endpoint listesi | - |
| `/categories` | GET | Kategori listesi | - |

#### Health Check Response
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "services": {
    "database": "connected",
    "gemini": "available",
    "cache": "active"
  }
}
```

---

## 📊 Response Formatları

### Başarılı Response
```json
{
  "success": true,
  "data": {
    // Endpoint'e özel veri
  },
  "timestamp": "2024-01-15T10:30:00Z",
  "_fromCache": false,
  "_cacheSource": "network"
}
```

### Hata Response
```json
{
  "success": false,
  "error": "Hata mesajı",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-15T10:30:00Z",
  "details": {
    // Hata detayları (development modunda)
  }
}
```

---

## ❌ Hata Kodları

| Kod | HTTP Status | Açıklama |
|-----|-------------|----------|
| `NETWORK_ERROR` | 503 | Ağ bağlantı hatası |
| `TIMEOUT_ERROR` | 408 | İstek zaman aşımı |
| `NOT_FOUND` | 404 | Endpoint bulunamadı |
| `SERVER_ERROR` | 500 | Sunucu hatası |
| `VALIDATION_ERROR` | 400 | Geçersiz parametre |
| `RATE_LIMIT_EXCEEDED` | 429 | Rate limit aşıldı |

---

## ⚡ Rate Limiting

**Şu anda rate limiting aktif değildir.**

**Gelecek sürümlerde:**
- IP başına dakikada 100 istek
- API key başına günlük 1000 istek
- Burst limit: 10 istek/saniye

---

## 💡 Örnekler

### JavaScript/React Native

```javascript
// Yemek menüsü alma
const getFoodMenu = async () => {
  try {
    const response = await fetch('http://192.168.1.93:3000/api/food/api');
    const data = await response.json();
    
    if (data.success) {
      console.log('Yemek menüsü:', data.data.food);
      return data.data.food;
    } else {
      console.error('Hata:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Network hatası:', error);
    return null;
  }
};

// Gemini AI çağrısı
const askGemini = async (message, language = 'tr') => {
  try {
    const response = await fetch('http://192.168.1.93:3000/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        language: language
      })
    });
    
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Gemini hatası:', error);
    return 'Üzgünüm, şu anda cevap veremiyorum.';
  }
};
```

### cURL

```bash
# Yemek menüsü alma
curl -X GET "http://192.168.1.93:3000/api/food/api"

# Gemini AI çağrısı
curl -X POST "http://192.168.1.93:3000/api/gemini" \
  -H "Content-Type: application/json" \
  -d '{"message": "Bugün ne yemek var?", "language": "tr"}'

# Kütüphane masa durumu
curl -X GET "http://192.168.1.93:3000/api/library/desks/1"
```

### Python

```python
import requests
import json

# Yemek menüsü alma
def get_food_menu():
    url = "http://192.168.1.93:3000/api/food/api"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        if data['success']:
            return data['data']['food']
    return None

# Gemini AI çağrısı
def ask_gemini(message, language='tr'):
    url = "http://192.168.1.93:3000/api/gemini"
    payload = {
        "message": message,
        "language": language
    }
    
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        data = response.json()
        return data['response']
    return "Üzgünüm, şu anda cevap veremiyorum."
```

---

## 🔄 Cache Stratejisi

### Cache Türleri
- **Memory Cache**: Hızlı erişim için RAM'de
- **Persistent Cache**: Uygulama kapanıp açılsa bile kalıcı
- **Hybrid Cache**: Her ikisini de kullanan akıllı sistem

### Cache Süreleri
- **Yemek menüsü**: 1 saat
- **Etkinlikler**: 30 dakika
- **Duyurular**: 15 dakika
- **Kütüphane**: 5 dakika
- **AI cevapları**: Cache edilmez

### Cache Kontrolü
```javascript
// Cache'den veri alma
const data = await hybridCache.get('food', 'api', {}, 'cache_first');

// Cache'e veri kaydetme
await hybridCache.set('food', 'api', responseData, {});
```

---

## 📈 Monitoring ve Analytics

### Loglama
- Tüm API çağrıları loglanır
- Hata durumları detaylı loglanır
- Performance metrikleri toplanır

### Metrics
- Response time
- Success rate
- Cache hit rate
- Error rate

---

## 🚀 Gelecek Özellikler

### v2.0 Planları
- [ ] Authentication sistemi
- [ ] Rate limiting
- [ ] WebSocket desteği
- [ ] Real-time notifications
- [ ] Advanced caching
- [ ] API versioning

### v3.0 Planları
- [ ] GraphQL API
- [ ] Microservices architecture
- [ ] Kubernetes deployment
- [ ] Advanced analytics
- [ ] Machine learning integration

---

## 📞 Destek

API ile ilgili sorularınız için:
- **GitHub Issues**: [Repository Issues](https://github.com/username/yeto/issues)
- **Email**: support@example.com
- **Discord**: [Community Server](https://discord.gg/example)

---

<div align="center">

**📚 Bu dokümantasyon sürekli güncellenmektedir.**

**Son güncelleme**: 2024-01-15

</div>
