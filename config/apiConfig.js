// ========================================
// API KONFİGÜRASYONU - YENİ BACKEND SİSTEMİ
// ========================================

//çok yoruldummmmmmmmmm

// Backend API URL'leri
export const BACKEND_URL = 'http://192.168.1.75:3000/api';
export const API_BASE_URL = 'http://192.168.1.75:3000';

// Gemini API endpoint'i
export const GEMINI_API_ENDPOINT = `${BACKEND_URL}/gemini`;

// API Timeout ayarı
export const API_TIMEOUT = 10000; // 10 saniye

// Endpoint kategorileri
export const ENDPOINT_CATEGORIES = {
  FOOD: 'food',
  MAIN: 'main', 
  LIBRARY: 'library',
  FACULTY_ANNOUNCEMENTS: 'faculty_announcements'
};

// API endpoint'leri
export const API_ENDPOINTS = {
  // Yemek endpoint'i
  FOOD: `${API_BASE_URL}/api/get-dailyFood`,
  
  // Ana üniversite endpoint'leri
  EVENTS: `${BACKEND_URL}/main/get_all_events_tr`,
  ANNOUNCEMENTS: `${BACKEND_URL}/main/announcement_tr`,
  NEWS: `${BACKEND_URL}/main/news_tr`,
  
  // Kütüphane endpoint'leri
  LIBRARY: `${BACKEND_URL}/library/library`,
  
  // Fakülte duyuruları (dinamik)
  FACULTY_ANNOUNCEMENTS: `${BACKEND_URL}/faculty_announcements`
};

// Generic endpoint çağrısı için template
export const createEndpointUrl = (category, endpointKey) => {
  return `${BACKEND_URL}/${category}/${endpointKey}`;
};

// Mapping sistemi için endpoint
export const MAPPING_ENDPOINT = `${BACKEND_URL}/mapping`;

// Sistem endpoint'leri
export const SYSTEM_ENDPOINTS = {
  HEALTH: `${BACKEND_URL}/health`,
  ENDPOINTS: `${BACKEND_URL}/endpoints`,
  CATEGORIES: `${BACKEND_URL}/categories`
};

// Hata mesajları
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.',
  TIMEOUT_ERROR: 'İstek zaman aşımına uğradı.',
  NOT_FOUND: 'Aradığınız bilgi bulunamadı.',
  SERVER_ERROR: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
  UNKNOWN_ERROR: 'Bilinmeyen bir hata oluştu.'
};

// API response formatları
export const API_RESPONSE_FORMATS = {
  SUCCESS: 'success',
  ERROR: 'error',
  LOADING: 'loading'
}; 