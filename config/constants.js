// ========================================
// CONSTANTS - YENİ BACKEND SİSTEMİ
// ========================================

// ========================================
// MESAJ TİPLERİ
// ========================================

export const MESSAGE_TYPES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
  ERROR: 'error'
};

// ========================================
// ASİSTAN KOMUTLARI (YENİ SİSTEM)
// ========================================

export const ASSISTANT_COMMANDS = {
  // Yemek komutları
  FOOD: [
    'yemek', 'menü', 'bugün ne yemek', 'yemekhane', 'kafeterya',
    'food', 'menu', 'what is for food today', 'what is for lunch', 'what is for dinner',
    'cafeteria', 'dining'
  ],
  
  // Etkinlik komutları
  EVENTS: [
    'etkinlik', 'etkinlikler', 'event', 'events', 'activities',
    'program', 'programlar', 'seminer', 'konferans'
  ],
  
  // Duyuru komutları
  ANNOUNCEMENTS: [
    'duyuru', 'duyurular', 'announcement', 'announcements',
    'haber', 'haberler', 'news', 'bildirim'
  ],
  
  // Kütüphane komutları
  LIBRARY: [
    'kütüphane', 'kütüphane', 'library', 'kitap', 'kitaplar',
    'book', 'books', 'okuma', 'study'
  ],
  
  // Fakülte komutları
  FACULTY: [
    'fakülte', 'fakultesi', 'faculty', 'bölüm', 'bolum',
    'department', 'mimarlık', 'tıp', 'mühendislik'
  ]
};

// ========================================
// ENDPOINT KATEGORİLERİ
// ========================================

export const ENDPOINT_CATEGORIES = {
  FOOD: 'food',
  MAIN: 'main',
  LIBRARY: 'library',
  FACULTY_ANNOUNCEMENTS: 'faculty_announcements'
};

// ========================================
// API DURUMLARI
// ========================================

export const API_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
  TIMEOUT: 'timeout'
};

// ========================================
// RESPONSE TİPLERİ
// ========================================

export const RESPONSE_TYPES = {
  BACKEND: 'backend',
  GEMINI: 'gemini',
  ERROR: 'error',
  FALLBACK: 'fallback'
};

// ========================================
// HATA MESAJLARI
// ========================================

export const ERROR_MESSAGES = {
  // API hataları
  API_ERROR: 'API bağlantı hatası',
  NETWORK_ERROR: 'Ağ bağlantı hatası',
  TIMEOUT_ERROR: 'İstek zaman aşımına uğradı',
  SERVER_ERROR: 'Sunucu hatası',
  
  // Kullanıcı hataları
  INVALID_INPUT: 'Geçersiz giriş',
  EMPTY_MESSAGE: 'Mesaj boş olamaz',
  
  // Mapping hataları
  MAPPING_NOT_FOUND: 'Aradığınız bilgi bulunamadı',
  ENDPOINT_NOT_FOUND: 'Endpoint bulunamadı',
  
  // Genel hatalar
  UNKNOWN_ERROR: 'Bilinmeyen bir hata oluştu',
  SERVICE_UNAVAILABLE: 'Servis şu anda kullanılamıyor'
};

// ========================================
// UI SABİTLERİ
// ========================================

export const UI_CONSTANTS = {
  // Mesaj limitleri
  MAX_MESSAGE_LENGTH: 1000,
  MAX_CONVERSATION_HISTORY: 50,
  
  // Timeout değerleri
  TYPING_TIMEOUT: 1000,
  API_TIMEOUT: 10000,
  
  // Animasyon süreleri
  FADE_DURATION: 300,
  SLIDE_DURATION: 250,
  
  // Sayfa boyutları
  ITEMS_PER_PAGE: 10,
  MAX_ITEMS_DISPLAY: 5
};

// ========================================
// EMOJİ SABİTLERİ
// ========================================

export const EMOJIS = {
  FOOD: '🍽️',
  EVENTS: '🎉',
  ANNOUNCEMENTS: '📢',
  LIBRARY: '📚',
  FACULTY: '🏛️',
  NEWS: '📰',
  ERROR: '❌',
  SUCCESS: '✅',
  LOADING: '⏳',
  INFO: 'ℹ️'
};

// ========================================
// MAPPING ÖNCELİKLERİ
// ========================================

export const MAPPING_PRIORITIES = {
  HIGH: 'high',      // Core mapping'ler
  MEDIUM: 'medium',  // Manuel mapping'ler
  LOW: 'low',        // Otomatik mapping'ler
  AUTO: 'auto'       // Otomatik oluşturulan
};

// ========================================
// SİSTEM SABİTLERİ
// ========================================

export const SYSTEM_CONSTANTS = {
  // Backend URL'leri
  BACKEND_BASE_URL: 'http://10.41.169.14:3000',
  API_BASE_PATH: '/api',
  
  // Mapping endpoint'leri
  MAPPING_FIND_PATH: '/mapping/find',
  MAPPING_STATS_PATH: '/mapping/stats',
  
  // Sistem endpoint'leri
  HEALTH_PATH: '/health',
  ENDPOINTS_PATH: '/endpoints',
  CATEGORIES_PATH: '/categories',
  
  // HTTP metodları
  HTTP_METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  },
  
  // Content type'ları
  CONTENT_TYPES: {
    JSON: 'application/json',
    FORM: 'application/x-www-form-urlencoded',
    MULTIPART: 'multipart/form-data'
  }
};

// ========================================
// TEST SABİTLERİ
// ========================================

export const TEST_CONSTANTS = {
  // Test mesajları
  TEST_MESSAGES: [
    'yemek menüsü',
    'mimarlık fakültesi',
    'etkinlikler',
    'kütüphane',
    'duyurular'
  ],
  
  // Test endpoint'leri
  TEST_ENDPOINTS: [
    { category: 'food', endpoint: 'api' },
    { category: 'main', endpoint: 'get_all_events_tr' },
    { category: 'faculty_announcements', endpoint: 'tr_13' }
  ],
  
  // Test timeout'ları
  TEST_TIMEOUT: 5000,
  BATCH_TEST_TIMEOUT: 15000
}; 