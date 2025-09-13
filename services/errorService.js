// ========================================
// ERROR SERVICE - YENİ BACKEND SİSTEMİ
// ========================================

import { API_STATUS, ERROR_MESSAGES, RESPONSE_TYPES } from '../config/constants';

// ========================================
// API HATA YÖNETİMİ
// ========================================

// Backend API hatalarını yakalayıp kullanıcı dostu mesaj döndüren fonksiyon
export const handleBackendError = (error, apiName = 'API', endpoint = '') => {
  console.error(`❌ ${apiName} Hatası (${endpoint}):`, error);
  
  // Timeout hatası
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return {
      type: RESPONSE_TYPES.ERROR,
      status: API_STATUS.TIMEOUT,
      message: `${apiName} zaman aşımına uğradı. Lütfen tekrar deneyin.`,
      details: 'İstek çok uzun sürdü, sunucu yanıt vermedi.'
    };
  }
  
  // Network hatası
  if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
    return {
      type: RESPONSE_TYPES.ERROR,
      status: API_STATUS.ERROR,
      message: ERROR_MESSAGES.NETWORK_ERROR,
      details: 'İnternet bağlantınızı kontrol edin.'
    };
  }
  
  // HTTP hata kodları
  if (error.response) {
    const { status, statusText, data } = error.response;
    
    switch (status) {
      case 400:
        return {
          type: RESPONSE_TYPES.ERROR,
          status: API_STATUS.ERROR,
          message: `Geçersiz istek: ${statusText}`,
          details: data?.message || 'İstek formatı hatalı.'
        };
        
      case 401:
        return {
          type: RESPONSE_TYPES.ERROR,
          status: API_STATUS.ERROR,
          message: 'Yetkilendirme hatası',
          details: 'Bu işlem için yetkiniz bulunmuyor.'
        };
        
      case 403:
        return {
          type: RESPONSE_TYPES.ERROR,
          status: API_STATUS.ERROR,
          message: 'Erişim reddedildi',
          details: 'Bu kaynağa erişim izniniz yok.'
        };
        
      case 404:
        return {
          type: RESPONSE_TYPES.ERROR,
          status: API_STATUS.ERROR,
          message: ERROR_MESSAGES.NOT_FOUND,
          details: `Endpoint bulunamadı: ${endpoint}`
        };
        
      case 500:
        return {
          type: RESPONSE_TYPES.ERROR,
          status: API_STATUS.ERROR,
          message: ERROR_MESSAGES.SERVER_ERROR,
          details: 'Sunucu iç hatası oluştu.'
        };
        
      default:
        return {
          type: RESPONSE_TYPES.ERROR,
          status: API_STATUS.ERROR,
          message: `${apiName} hatası: ${status} - ${statusText}`,
          details: data?.message || 'Bilinmeyen sunucu hatası.'
        };
    }
  }
  
  // Genel hata
  return {
    type: RESPONSE_TYPES.ERROR,
    status: API_STATUS.ERROR,
    message: ERROR_MESSAGES.UNKNOWN_ERROR,
    details: error.message || 'Bilinmeyen bir hata oluştu.'
  };
};

// ========================================
// MAPPING SİSTEMİ HATA YÖNETİMİ
// ========================================

// Mapping sistemi hatalarını yönet
export const handleMappingError = (error, userMessage = '') => {
  console.error('❌ Mapping Sistemi Hatası:', error);
  
  if (error.code === 'ERR_NETWORK') {
    return {
      type: RESPONSE_TYPES.ERROR,
      status: API_STATUS.ERROR,
      message: 'Mapping sistemi bağlantı hatası',
      details: 'Endpoint bulma sistemi şu anda kullanılamıyor.'
    };
  }
  
  if (error.response?.status === 404) {
    return {
      type: RESPONSE_TYPES.ERROR,
      status: API_STATUS.ERROR,
      message: ERROR_MESSAGES.MAPPING_NOT_FOUND,
      details: `"${userMessage}" için uygun endpoint bulunamadı.`
    };
  }
  
  return {
    type: RESPONSE_TYPES.ERROR,
    status: API_STATUS.ERROR,
    message: 'Mapping sistemi hatası',
    details: 'Endpoint bulma işlemi başarısız oldu.'
  };
};

// ========================================
// ENDPOINT HATA YÖNETİMİ
// ========================================

// Endpoint çağrısı hatalarını yönet
export const handleEndpointError = (error, category = '', endpointKey = '') => {
  const endpoint = `${category}/${endpointKey}`;
  
  console.error(`❌ Endpoint Hatası (${endpoint}):`, error);
  
  // Endpoint bulunamadı
  if (error.response?.status === 404) {
    return {
      type: RESPONSE_TYPES.ERROR,
      status: API_STATUS.ERROR,
      message: ERROR_MESSAGES.ENDPOINT_NOT_FOUND,
      details: `Endpoint mevcut değil: ${endpoint}`
    };
  }
  
  // Endpoint erişim hatası
  if (error.response?.status === 403) {
    return {
      type: RESPONSE_TYPES.ERROR,
      status: API_STATUS.ERROR,
      message: 'Endpoint erişim hatası',
      details: `Bu endpoint'e erişim izniniz yok: ${endpoint}`
    };
  }
  
  // Genel endpoint hatası
  return handleBackendError(error, 'Endpoint', endpoint);
};

// ========================================
// KULLANICI MESAJI HATA YÖNETİMİ
// ========================================

// Kullanıcı mesajı analizi hatalarını yönet
export const handleMessageAnalysisError = (error, userMessage = '') => {
  console.error('❌ Mesaj Analizi Hatası:', error);
  
  return {
    type: RESPONSE_TYPES.ERROR,
    status: API_STATUS.ERROR,
    message: 'Mesaj analizi hatası',
    details: `"${userMessage}" mesajınız analiz edilemedi. Lütfen farklı bir şekilde sorun.`
  };
};

// ========================================
// VERİ FORMATI HATA YÖNETİMİ
// ========================================

// Veri formatı hatalarını yönet
export const handleDataFormatError = (error, dataType = 'veri') => {
  console.error(`❌ Veri Formatı Hatası (${dataType}):`, error);
  
  return {
    type: RESPONSE_TYPES.ERROR,
    status: API_STATUS.ERROR,
    message: 'Veri formatı hatası',
    details: `${dataType} beklenmeyen formatta geldi.`
  };
};

// ========================================
// GENEL HATA YÖNETİMİ
// ========================================

// Genel hataları yakala ve formatla
export const handleGeneralError = (error, context = '') => {
  console.error(`❌ Genel Hata (${context}):`, error);
  
  // Axios hataları
  if (error.isAxiosError) {
    return handleBackendError(error, context);
  }
  
  // TypeError (undefined/null)
  if (error instanceof TypeError) {
    return {
      type: RESPONSE_TYPES.ERROR,
      status: API_STATUS.ERROR,
      message: 'Veri işleme hatası',
      details: 'Beklenmeyen veri formatı.'
    };
  }
  
  // ReferenceError
  if (error instanceof ReferenceError) {
    return {
      type: RESPONSE_TYPES.ERROR,
      status: API_STATUS.ERROR,
      message: 'Kod hatası',
      details: 'Sistem iç hatası oluştu.'
    };
  }
  
  // Genel hata
  return {
    type: RESPONSE_TYPES.ERROR,
    status: API_STATUS.ERROR,
    message: ERROR_MESSAGES.UNKNOWN_ERROR,
    details: error.message || 'Bilinmeyen bir hata oluştu.'
  };
};

// ========================================
// HATA MESAJI FORMATLAMA
// ========================================

// Hata mesajını kullanıcı dostu formata çevir
export const formatErrorMessage = (errorResponse) => {
  if (!errorResponse) {
    return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
  
  if (typeof errorResponse === 'string') {
    return errorResponse;
  }
  
  if (errorResponse.message) {
    return errorResponse.message;
  }
  
  return ERROR_MESSAGES.UNKNOWN_ERROR;
};

// ========================================
// HATA LOGLAMA
// ========================================

// Hataları detaylı logla
export const logError = (error, context = '', additionalInfo = {}) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    error: {
      message: error.message,
      stack: error.stack,
      code: error.code,
      response: error.response?.data
    },
    additionalInfo
  };
  
  console.error('📋 HATA LOGU:', JSON.stringify(errorLog, null, 2));
  
  // Error reporting service'e gönder
  try {
    const { reportError } = require('./errorReportingService');
    reportError(error, { context, ...additionalInfo });
  } catch (reportingError) {
    console.warn('⚠️ Error reporting failed:', reportingError.message);
  }
};

// ========================================
// HATA İSTATİSTİKLERİ
// ========================================

// Hata istatistiklerini tut
const errorStats = {
  totalErrors: 0,
  errorTypes: {},
  endpoints: {},
  networkErrors: 0,
  offlineErrors: 0,
  recoveryAttempts: 0,
  successfulRecoveries: 0,
  timeRange: {
    start: new Date(),
    lastError: null
  },
  hourlyStats: {},
  dailyStats: {}
};

// Hata istatistiği ekle
export const addErrorStat = (errorType, endpoint = '', additionalInfo = {}) => {
  errorStats.totalErrors++;
  errorStats.errorTypes[errorType] = (errorStats.errorTypes[errorType] || 0) + 1;
  
  if (endpoint) {
    errorStats.endpoints[endpoint] = (errorStats.endpoints[endpoint] || 0) + 1;
  }
  
  // Network error tracking
  if (errorType === 'network' || errorType === 'timeout') {
    errorStats.networkErrors++;
  }
  
  if (additionalInfo.isOffline) {
    errorStats.offlineErrors++;
  }
  
  // Hourly stats
  const hour = new Date().getHours();
  if (!errorStats.hourlyStats[hour]) {
    errorStats.hourlyStats[hour] = 0;
  }
  errorStats.hourlyStats[hour]++;
  
  // Daily stats
  const today = new Date().toDateString();
  if (!errorStats.dailyStats[today]) {
    errorStats.dailyStats[today] = 0;
  }
  errorStats.dailyStats[today]++;
  
  errorStats.timeRange.lastError = new Date();
};

// Hata istatistiklerini al
export const getErrorStats = () => {
  return {
    ...errorStats,
    timeRange: {
      ...errorStats.timeRange,
      duration: errorStats.timeRange.lastError 
        ? errorStats.timeRange.lastError - errorStats.timeRange.start
        : 0
    }
  };
};

// ========================================
// HATA ÖNERİLERİ
// ========================================

// Hata türüne göre öneri ver
export const getErrorSuggestion = (errorType, context = '') => {
  const suggestions = {
    'network': 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.',
    'timeout': 'İstek çok uzun sürdü, daha sonra tekrar deneyin.',
    'not_found': 'Aradığınız bilgi bulunamadı, farklı kelimeler deneyin.',
    'server_error': 'Sunucu geçici olarak kullanılamıyor, daha sonra tekrar deneyin.',
    'mapping_error': 'Mesajınızı farklı bir şekilde yazmayı deneyin.',
    'data_format': 'Veri formatı hatası, sistem yöneticisi bilgilendirildi.',
    'offline': 'İnternet bağlantınız yok. Bağlantı sağlandığında otomatik olarak tekrar denenecek.',
    'recovery_success': 'Hata başarıyla düzeltildi ve işlem tamamlandı.'
  };
  
  return suggestions[errorType] || 'Bilinmeyen hata, lütfen daha sonra tekrar deneyin.';
};

// ========================================
// NETWORK ERROR HANDLING
// ========================================

// Network durumu kontrolü
export const checkNetworkStatus = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    await fetch('https://www.google.com', {
      method: 'HEAD',
      mode: 'no-cors',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return { isOnline: true, connectionType: 'unknown' };
  } catch (error) {
    return { isOnline: false, connectionType: 'none', error: error.message };
  }
};

// Offline durumu yönetimi
export const handleOfflineError = (error, context = '') => {
  console.warn('📱 Offline durumu tespit edildi:', context);
  
  addErrorStat('offline', context, { isOffline: true });
  
  return {
    type: 'offline',
    message: 'İnternet bağlantınız yok',
    suggestion: 'Bağlantı sağlandığında otomatik olarak tekrar denenecek',
    canRetry: true,
    retryAfter: 5000 // 5 saniye sonra tekrar dene
  };
};

// ========================================
// ERROR RECOVERY MECHANISM
// ========================================

// Recovery attempt tracking
export const recordRecoveryAttempt = (errorType, context = '') => {
  errorStats.recoveryAttempts++;
  console.log(`🔄 Recovery attempt #${errorStats.recoveryAttempts} for ${errorType} in ${context}`);
};

// Successful recovery tracking
export const recordSuccessfulRecovery = (errorType, context = '') => {
  errorStats.successfulRecoveries++;
  console.log(`✅ Successful recovery #${errorStats.successfulRecoveries} for ${errorType} in ${context}`);
  
  addErrorStat('recovery_success', context);
};

// Recovery success rate hesapla
export const getRecoverySuccessRate = () => {
  if (errorStats.recoveryAttempts === 0) return 0;
  return (errorStats.successfulRecoveries / errorStats.recoveryAttempts) * 100;
};

// ========================================
// ENHANCED ERROR ANALYTICS
// ========================================

// Detaylı error analytics
export const getDetailedErrorAnalytics = () => {
  const stats = getErrorStats();
  
  return {
    ...stats,
    recoveryRate: getRecoverySuccessRate(),
    networkErrorRate: stats.totalErrors > 0 ? (stats.networkErrors / stats.totalErrors) * 100 : 0,
    offlineErrorRate: stats.totalErrors > 0 ? (stats.offlineErrors / stats.totalErrors) * 100 : 0,
    mostCommonErrorType: Object.keys(stats.errorTypes).reduce((a, b) => 
      stats.errorTypes[a] > stats.errorTypes[b] ? a : b, 'none'
    ),
    peakErrorHour: Object.keys(stats.hourlyStats).reduce((a, b) => 
      stats.hourlyStats[a] > stats.hourlyStats[b] ? a : b, 'none'
    )
  };
}; 