// ========================================
// API SERVICE - YENİ BACKEND SİSTEMİ
// ========================================

import axios from 'axios';
import {
    API_RESPONSE_FORMATS,
    API_TIMEOUT,
    BACKEND_URL,
    createEndpointUrl,
    ERROR_MESSAGES
} from '../config/apiConfig';
import { retryApiCall } from '../utils/retryUtils';
import hybridCache from './hybridCache';

// Generic API client
const apiClient = axios.create({
  baseURL: BACKEND_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ========================================
// GENERIC ENDPOINT ÇAĞRILARI
// ========================================

// Network kontrolü
const checkNetworkConnection = async () => {
  try {
    // Basit network kontrolü - fetch ile test
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 saniye timeout
    
    await fetch('https://www.google.com', {
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return true;
  } catch (error) {
    console.warn('⚠️ Network bağlantısı kontrol edilemedi:', error.message);
    // Network kontrolü başarısız olsa bile API çağrısına devam et
    // Retry mekanizması network hatalarını yakalayacak
    return true;
  }
};

// Herhangi bir endpoint'i çağır (Hybrid Cache ile entegre)
export const callEndpoint = async (category, endpointKey, params = {}, cacheStrategy = 'cache_first') => {
  try {
    // 1. Önce hybrid cache'den kontrol et
    console.log(`🔍 Hybrid cache kontrolü: ${category}/${endpointKey}`);
    const cachedData = await hybridCache.get(category, endpointKey, params, cacheStrategy);
    
    if (cachedData) {
      console.log(`🎯 Hybrid cache hit: ${category}/${endpointKey} (${cachedData.source})`);
      return {
        ...cachedData.data,
        _fromCache: true,
        _cacheSource: cachedData.source,
        _cacheTimestamp: cachedData.timestamp
      };
    }

    // 2. Cache'de yok, network'ten al
    console.log(`🌐 Network çağrısı: ${category}/${endpointKey}`);
    
    const apiCall = async () => {
      console.log(`API çağrısı: ${category}/${endpointKey}`, params);
      
      // Network bağlantısını kontrol et
      await checkNetworkConnection();
      
      const url = createEndpointUrl(category, endpointKey);
      const response = await apiClient.get(url, { params });
      
      return response;
    };

    // Retry mekanizması ile API çağrısı yap
    const response = await retryApiCall(apiCall, {
      context: `${category}/${endpointKey}`,
      maxRetries: 2
    });
    
    console.log(`API cevabı (${category}/${endpointKey}):`, response.data);
    
    // 3. Response'u işle
    let result;
    if (response.data && response.data.success) {
      result = {
        status: API_RESPONSE_FORMATS.SUCCESS,
        data: response.data.data, // Backend'den gelen data kısmını al
        category,
        endpointKey,
        _fromCache: false,
        _networkTimestamp: Date.now()
      };
    } else {
      result = {
        status: API_RESPONSE_FORMATS.ERROR,
        data: response.data,
        category,
        endpointKey,
        _fromCache: false,
        _networkTimestamp: Date.now()
      };
    }

    // 4. Başarılı response'u hybrid cache'e kaydet
    if (result.status === API_RESPONSE_FORMATS.SUCCESS) {
      console.log(`💾 Hybrid cache'e kaydediliyor: ${category}/${endpointKey}`);
      await hybridCache.set(category, endpointKey, result, params);
    }

    return result;

  } catch (error) {
    console.error(`API Hatası (${category}/${endpointKey}):`, error);
    throw handleApiError(error);
  }
};

// ========================================
// ÖZEL ENDPOINT FONKSİYONLARI
// ========================================

// Yemek menüsü çekme
export const getFoodMenu = async () => {
  return await callEndpoint('food', 'api');
};

// Etkinlikler
export const getEvents = async () => {
  return await callEndpoint('main', 'get_all_events_tr');
};

// Duyurular
export const getAnnouncements = async () => {
  return await callEndpoint('main', 'announcement_tr');
};

// Haberler
export const getNews = async () => {
  return await callEndpoint('main', 'news_tr');
};

// Kütüphane
export const getLibrary = async () => {
  return await callEndpoint('library', 'library');
};

// Fakülte duyuruları
export const getFacultyAnnouncements = async (endpointKey) => {
  return await callEndpoint('faculty_announcements', endpointKey);
};

// ========================================
// SİSTEM ENDPOINT'LERİ
// ========================================

// Sistem sağlığı kontrolü
export const checkSystemHealth = async () => {
  const healthCheck = async () => {
    const response = await apiClient.get('/health');
    return response;
  };

  try {
    const response = await retryApiCall(healthCheck, {
      context: 'system_health',
      maxRetries: 1
    });
    
    return {
      status: API_RESPONSE_FORMATS.SUCCESS,
      data: response.data
    };
  } catch (error) {
    throw handleApiError(error);
  }
};

// Tüm endpoint'leri listele
export const getAllEndpoints = async () => {
  const getEndpoints = async () => {
    const response = await apiClient.get('/endpoints');
    return response;
  };

  try {
    const response = await retryApiCall(getEndpoints, {
      context: 'get_all_endpoints',
      maxRetries: 2
    });
    
    return {
      status: API_RESPONSE_FORMATS.SUCCESS,
      data: response.data
    };
  } catch (error) {
    throw handleApiError(error);
  }
};

// Kategorileri listele
export const getCategories = async () => {
  const getCategoriesCall = async () => {
    const response = await apiClient.get('/categories');
    return response;
  };

  try {
    const response = await retryApiCall(getCategoriesCall, {
      context: 'get_categories',
      maxRetries: 2
    });
    
    return {
      status: API_RESPONSE_FORMATS.SUCCESS,
      data: response.data
    };
  } catch (error) {
    throw handleApiError(error);
  }
};

// ========================================
// HATA YÖNETİMİ
// ========================================

const handleApiError = (error) => {
  console.error('API Hata Detayı:', {
    message: error.message,
    code: error.code,
    status: error.response?.status,
    data: error.response?.data
  });

  if (error.code === 'ECONNABORTED') {
    return new Error(ERROR_MESSAGES.TIMEOUT_ERROR);
  }
  
  if (error.response) {
    switch (error.response.status) {
      case 404:
        return new Error(ERROR_MESSAGES.NOT_FOUND);
      case 500:
        return new Error(ERROR_MESSAGES.SERVER_ERROR);
      default:
        return new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  }
  
  if (error.request) {
    return new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
  
  return new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
};

// ========================================
// BATCH İŞLEMLER
// ========================================

// Birden fazla endpoint'i aynı anda çağır
export const callMultipleEndpoints = async (endpoints) => {
  const promises = endpoints.map(({ category, endpointKey, params }) => 
    callEndpoint(category, endpointKey, params)
  );
  
  try {
    const results = await Promise.allSettled(promises);
    return results.map((result, index) => ({
      endpoint: endpoints[index],
      status: result.status,
      data: result.status === 'fulfilled' ? result.value : result.reason
    }));
  } catch (error) {
    throw handleApiError(error);
  }
}; 