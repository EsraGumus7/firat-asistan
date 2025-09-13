# 👨‍💻 Geliştirici Rehberi

Bu rehber, Şeri AI Asistanı projesinde geliştirme yapmak isteyen geliştiriciler için hazırlanmıştır.

## 📋 İçindekiler

- [Geliştirme Ortamı](#-geliştirme-ortamı)
- [Proje Kurulumu](#-proje-kurulumu)
- [Geliştirme Workflow](#-geliştirme-workflow)
- [Kod Standartları](#-kod-standartları)
- [Yeni Özellik Ekleme](#-yeni-özellik-ekleme)
- [API Geliştirme](#-api-geliştirme)
- [Test Yazma](#-test-yazma)
- [Debugging](#-debugging)
- [Performance Optimizasyonu](#-performance-optimizasyonu)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

---

## 🛠️ Geliştirme Ortamı

### Gereksinimler

#### **Temel Araçlar**
- **Node.js**: v16 veya üzeri
- **npm**: v8 veya üzeri
- **Git**: v2.30 veya üzeri
- **VS Code**: Önerilen IDE

#### **Mobile Development**
- **Expo CLI**: `npm install -g @expo/cli`
- **Android Studio**: Android geliştirme için
- **Xcode**: iOS geliştirme için (macOS)

#### **Backend Development**
- **Node.js**: v16+
- **Express.js**: v4.18+
- **MongoDB**: Veritabanı (opsiyonel)

### IDE Konfigürasyonu

#### **VS Code Extensions**
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "ms-vscode.vscode-json",
    "ms-vscode.vscode-react-native",
    "expo.vscode-expo-tools"
  ]
}
```

#### **VS Code Settings**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

---

## 🚀 Proje Kurulumu

### 1. Repository'yi Klonlayın
```bash
git clone <repository-url>
cd yeto
```

### 2. Dependencies Yükleyin

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 3. Environment Variables Ayarlayın

**Backend `.env`:**
```env
PORT=3000
NODE_ENV=development
FIRAT_DDYO_URL=https://ddyo.firat.edu.tr
FIRAT_MAIN_URL=https://www.firat.edu.tr
FIRAT_ABS_URL=https://abs.firat.edu.tr
MAIN_TOKEN=your_token_here
ABS_TOKEN=your_token_here
GEMINI_API_KEY=your_gemini_key_here
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
ALLOWED_ORIGINS=http://localhost:3000,http://192.168.1.93:3000
```

**Frontend `.env`:**
```env
EXPO_PUBLIC_BACKEND_URL=http://192.168.1.93:3000/api
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.93:3000
EXPO_PUBLIC_DEV_MODE=true
```

### 4. Projeyi Çalıştırın

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
npm start
```

---

## 🔄 Geliştirme Workflow

### 1. **Branch Stratejisi**
```bash
# Ana branch'ten yeni feature branch oluştur
git checkout main
git pull origin main
git checkout -b feature/yeni-ozellik

# Geliştirme yap
git add .
git commit -m "feat: yeni özellik eklendi"

# Push et
git push origin feature/yeni-ozellik

# Pull Request oluştur
```

### 2. **Commit Mesajları**
```bash
# Format: type(scope): description
feat(api): yeni endpoint eklendi
fix(ui): button click hatası düzeltildi
docs(readme): kurulum rehberi güncellendi
refactor(service): cache logic iyileştirildi
test(utils): retry fonksiyonu testleri eklendi
```

### 3. **Code Review Süreci**
1. **Self Review**: Kendi kodunuzu gözden geçirin
2. **Unit Tests**: Testleri çalıştırın
3. **Linting**: ESLint kontrolü yapın
4. **Pull Request**: Detaylı açıklama yazın
5. **Review**: En az 1 kişi review etsin

---

## 📝 Kod Standartları

### 1. **JavaScript/TypeScript**

#### **Naming Conventions**
```javascript
// Variables: camelCase
const userName = 'john';
const isLoggedIn = true;

// Functions: camelCase
const getUserData = () => {};
const validateInput = (input) => {};

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;

// Classes: PascalCase
class ApiService {}
class ErrorHandler {}

// Files: camelCase
apiService.js
errorHandler.js
```

#### **Function Documentation**
```javascript
/**
 * Kullanıcı mesajını analiz eder ve doğru endpoint'e yönlendirir
 * @param {string} message - Kullanıcı mesajı
 * @param {string} language - Dil kodu (tr/en)
 * @param {Object} options - Ek seçenekler
 * @param {boolean} options.useCache - Cache kullanılsın mı?
 * @param {number} options.timeout - Timeout süresi (ms)
 * @returns {Promise<Object>} Analiz sonucu
 * @throws {Error} Mesaj analiz edilemezse
 * @example
 * const result = await analyzeMessage('yemek menüsü', 'tr');
 * console.log(result.endpoint); // 'food/api'
 */
export const analyzeMessage = async (message, language = 'tr', options = {}) => {
  // Implementation
};
```

### 2. **React Native Components**

#### **Component Structure**
```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Avatar bileşeni - AI asistanın konuşma durumunu gösterir
 * @param {Object} props - Component props
 * @param {boolean} props.isSpeaking - Konuşuyor mu?
 * @param {string} props.size - Boyut (small, medium, large)
 * @param {Function} props.onPress - Tıklama handler'ı
 */
const Avatar = ({ isSpeaking = false, size = 'medium', onPress }) => {
  // State
  const [animationValue] = useState(new Animated.Value(1));
  
  // Effects
  useEffect(() => {
    if (isSpeaking) {
      startSpeakingAnimation();
    } else {
      stopSpeakingAnimation();
    }
  }, [isSpeaking]);
  
  // Handlers
  const handlePress = () => {
    onPress?.();
  };
  
  // Render
  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Animated.View style={[styles.avatar, { transform: [{ scale: animationValue }] }]}>
        <Text style={styles.emoji}>🤖</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6c63ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 32,
  },
});

export default Avatar;
```

### 3. **Error Handling**

#### **Service Layer**
```javascript
/**
 * API çağrısı yapar ve hataları yönetir
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} API response
 */
export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      timeout: 10000,
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return { success: true, data };
    
  } catch (error) {
    // Error logging
    console.error('API Call Error:', {
      endpoint,
      error: error.message,
      timestamp: new Date().toISOString()
    });
    
    // Global error handler'a gönder
    globalErrorHandler.handle(error, {
      type: 'api_error',
      endpoint,
      context: 'apiCall'
    });
    
    return { 
      success: false, 
      error: error.message,
      code: 'API_ERROR'
    };
  }
};
```

---

## 🆕 Yeni Özellik Ekleme

### 1. **Frontend Özellik Ekleme**

#### **Adım 1: Component Oluştur**
```bash
# Yeni component oluştur
touch components/NewFeature.js
```

```javascript
// components/NewFeature.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Yeni özellik bileşeni
 */
const NewFeature = ({ title, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewFeature;
```

#### **Adım 2: Service Oluştur**
```javascript
// services/newFeatureService.js
import { apiCall } from './apiService';

/**
 * Yeni özellik servisi
 */
export const newFeatureService = {
  /**
   * Yeni özellik verisi al
   * @param {Object} params - Parametreler
   * @returns {Promise<Object>} Veri
   */
  getData: async (params = {}) => {
    const response = await apiCall('/api/new-feature', {
      method: 'GET',
      params
    });
    
    return response;
  },
  
  /**
   * Yeni özellik verisi kaydet
   * @param {Object} data - Kaydedilecek veri
   * @returns {Promise<Object>} Sonuç
   */
  saveData: async (data) => {
    const response = await apiCall('/api/new-feature', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    
    return response;
  }
};
```

#### **Adım 3: Test Yaz**
```javascript
// components/__tests__/NewFeature.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import NewFeature from '../NewFeature';

describe('NewFeature Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<NewFeature title="Test Title" />);
    expect(getByText('Test Title')).toBeTruthy();
  });
  
  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <NewFeature title="Test Title" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Title'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
```

### 2. **Backend API Ekleme**

#### **Adım 1: Controller Oluştur**
```javascript
// backend/controllers/newFeatureController.js
/**
 * Yeni özellik controller'ı
 */
class NewFeatureController {
  /**
   * Yeni özellik verisi al
   * @param {Object} req - Express request
   * @param {Object} res - Express response
   */
  getData = async (req, res) => {
    try {
      const { params } = req.query;
      
      // Business logic
      const data = await this.processData(params);
      
      res.json({
        success: true,
        data: data,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('NewFeature Controller Error:', error);
      res.status(500).json({
        success: false,
        error: 'Veri alınamadı',
        message: error.message
      });
    }
  };
  
  /**
   * Veri işleme
   * @param {Object} params - Parametreler
   * @returns {Promise<Object>} İşlenmiş veri
   */
  processData = async (params) => {
    // Implementation
    return { processed: true, params };
  };
}

module.exports = new NewFeatureController();
```

#### **Adım 2: Route Ekle**
```javascript
// backend/routes/autoRoutes.js
const newFeatureController = require('../controllers/newFeatureController');

// Route'ları ekle
router.get('/new-feature', this.wrapAsync(newFeatureController.getData));
router.post('/new-feature', this.wrapAsync(newFeatureController.saveData));
```

---

## 🧪 Test Yazma

### 1. **Unit Test Örnekleri**

#### **Utility Function Test**
```javascript
// utils/__tests__/validationUtils.test.js
import { validateMessage, sanitizeMessage } from '../validationUtils';

describe('Validation Utils', () => {
  describe('validateMessage', () => {
    it('should validate normal message', () => {
      const result = validateMessage('Normal mesaj');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
    
    it('should reject XSS attempts', () => {
      const result = validateMessage('<script>alert("xss")</script>');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Güvenlik nedeniyle bu mesaj gönderilemez');
    });
    
    it('should reject SQL injection attempts', () => {
      const result = validateMessage("'; DROP TABLE users; --");
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Geçersiz karakterler tespit edildi');
    });
  });
  
  describe('sanitizeMessage', () => {
    it('should remove dangerous characters', () => {
      const input = 'Normal <script>mesaj</script>';
      const result = sanitizeMessage(input);
      expect(result).toBe('Normal mesaj');
    });
  });
});
```

#### **Service Test**
```javascript
// services/__tests__/apiService.test.js
import { callEndpoint, getFoodMenu } from '../apiService';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('callEndpoint', () => {
    it('should call API successfully', async () => {
      const mockResponse = {
        data: { success: true, data: { food: ['Pilav'] } }
      };
      
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue(mockResponse)
      });
      
      const result = await callEndpoint('food', 'api');
      
      expect(result.status).toBe('success');
      expect(result.data.food).toContain('Pilav');
    });
    
    it('should handle API errors', async () => {
      const mockError = new Error('Network Error');
      mockedAxios.create.mockReturnValue({
        get: jest.fn().mockRejectedValue(mockError)
      });
      
      await expect(callEndpoint('food', 'api')).rejects.toThrow('Network Error');
    });
  });
});
```

### 2. **Integration Test Örnekleri**

#### **API Integration Test**
```javascript
// test/integration/api.test.js
import request from 'supertest';
import app from '../../backend/index';

describe('API Integration Tests', () => {
  describe('GET /api/food/api', () => {
    it('should return food menu', async () => {
      const response = await request(app)
        .get('/api/food/api')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('food');
    });
  });
  
  describe('POST /api/gemini', () => {
    it('should process gemini request', async () => {
      const response = await request(app)
        .post('/api/gemini')
        .send({
          message: 'Test message',
          language: 'tr'
        })
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('response');
    });
  });
});
```

---

## 🐛 Debugging

### 1. **Frontend Debugging**

#### **React Native Debugger**
```bash
# React Native Debugger kur
npm install -g react-native-debugger

# Debugger'ı başlat
react-native-debugger
```

#### **Console Logging**
```javascript
// Debug logging
console.log('🔍 Debug Info:', {
  component: 'AnaEkran',
  state: { mesaj, sohbet },
  props: { dil }
});

// Error logging
console.error('❌ Error:', {
  message: error.message,
  stack: error.stack,
  context: 'mesajGonder'
});
```

#### **Network Debugging**
```javascript
// API çağrılarını logla
const apiCall = async (endpoint, options) => {
  console.log('🌐 API Call:', { endpoint, options });
  
  try {
    const response = await fetch(endpoint, options);
    console.log('✅ API Response:', response);
    return response;
  } catch (error) {
    console.error('❌ API Error:', error);
    throw error;
  }
};
```

### 2. **Backend Debugging**

#### **Express Debugging**
```javascript
// Request logging middleware
app.use((req, res, next) => {
  console.log('📥 Request:', {
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    timestamp: new Date().toISOString()
  });
  next();
});

// Response logging middleware
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    console.log('📤 Response:', {
      status: res.statusCode,
      data: data,
      timestamp: new Date().toISOString()
    });
    originalSend.call(this, data);
  };
  next();
});
```

---

## ⚡ Performance Optimizasyonu

### 1. **Frontend Optimizasyonu**

#### **Component Memoization**
```javascript
import React, { memo, useMemo, useCallback } from 'react';

// Component memoization
const ExpensiveComponent = memo(({ data, onPress }) => {
  // Expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }, [data]);
  
  // Callback memoization
  const handlePress = useCallback((id) => {
    onPress(id);
  }, [onPress]);
  
  return (
    <View>
      {processedData.map(item => (
        <TouchableOpacity key={item.id} onPress={() => handlePress(item.id)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
});
```

#### **Image Optimization**
```javascript
import { Image } from 'expo-image';

// Optimized image component
const OptimizedImage = ({ source, style }) => {
  return (
    <Image
      source={source}
      style={style}
      contentFit="cover"
      transition={200}
      cachePolicy="memory-disk"
    />
  );
};
```

### 2. **Backend Optimizasyonu**

#### **Caching Strategy**
```javascript
// Redis cache implementation
const redis = require('redis');
const client = redis.createClient();

const cacheMiddleware = (duration = 300) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cached = await client.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      // Store original send function
      const originalSend = res.send;
      
      // Override send function
      res.send = function(data) {
        // Cache the response
        client.setex(key, duration, data);
        originalSend.call(this, data);
      };
      
      next();
    } catch (error) {
      console.error('Cache error:', error);
      next();
    }
  };
};
```

---

## 🚀 Deployment

### 1. **Development Deployment**

#### **Local Development**
```bash
# Backend
cd backend
npm run dev

# Frontend
npm start
```

### 2. **Production Deployment**

#### **Backend Deployment**
```bash
# Build
cd backend
npm run build

# Start production
NODE_ENV=production npm start
```

#### **Frontend Deployment**
```bash
# Build for production
npm run build

# Deploy to Expo
expo publish
```

---

## 🔧 Troubleshooting

### 1. **Yaygın Sorunlar**

#### **Metro Bundler Hatası**
```bash
# Cache'i temizle
npx expo start --clear

# Node modules'ı yeniden yükle
rm -rf node_modules
npm install
```

#### **Android Build Hatası**
```bash
# Gradle cache'i temizle
cd android
./gradlew clean
cd ..

# Metro cache'i temizle
npx expo start --clear
```

#### **iOS Build Hatası**
```bash
# Pods'u yeniden yükle
cd ios
pod install
cd ..

# Xcode cache'i temizle
rm -rf ~/Library/Developer/Xcode/DerivedData
```

### 2. **Debug Komutları**

```bash
# React Native debug
npx react-native log-android
npx react-native log-ios

# Expo debug
expo logs

# Backend debug
cd backend
DEBUG=* npm start
```

---

## 📚 Faydalı Kaynaklar

### **Dokümantasyon**
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [Express.js Docs](https://expressjs.com/)

### **Araçlar**
- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Flipper](https://fbflipper.com/)
- [React Native Performance](https://reactnative.dev/docs/performance)

### **Best Practices**
- [React Native Performance](https://reactnative.dev/docs/performance)
- [JavaScript Best Practices](https://github.com/airbnb/javascript)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

<div align="center">

**👨‍💻 Bu rehber sürekli güncellenmektedir.**

**Son güncelleme**: 2024-01-15

**Sorularınız için**: [GitHub Issues](https://github.com/username/yeto/issues)

</div>
