/**
 * Retry Utilities - API çağrıları için retry mekanizması
 * Exponential backoff stratejisi ile otomatik tekrar deneme
 */

/**
 * Retry konfigürasyonu
 */
const DEFAULT_RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000, // 1 saniye
  maxDelay: 10000, // 10 saniye
  backoffMultiplier: 2,
  jitter: true, // Rastgele gecikme ekle
  retryCondition: (error) => {
    // Hangi hatalar için retry yapılacağını belirle
    return (
      error.code === 'NETWORK_ERROR' ||
      error.code === 'TIMEOUT' ||
      error.code === 'ECONNABORTED' ||
      error.code === 'ERR_NETWORK' ||
      (error.response && error.response.status >= 500) // 5xx sunucu hataları
    );
  }
};

/**
 * Exponential backoff ile gecikme hesapla
 */
const calculateDelay = (attempt, config) => {
  const { baseDelay, maxDelay, backoffMultiplier, jitter } = config;
  
  // Exponential backoff: baseDelay * (backoffMultiplier ^ attempt)
  let delay = baseDelay * Math.pow(backoffMultiplier, attempt);
  
  // Maksimum gecikmeyi aşma
  delay = Math.min(delay, maxDelay);
  
  // Jitter ekle (rastgele gecikme)
  if (jitter) {
    delay = delay * (0.5 + Math.random() * 0.5); // %50-100 arası rastgele
  }
  
  return Math.floor(delay);
};

/**
 * Belirtilen süre kadar bekle
 */
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry mekanizması ile fonksiyon çalıştır
 * @param {Function} fn - Çalıştırılacak fonksiyon
 * @param {Object} config - Retry konfigürasyonu
 * @param {string} context - Hata loglama için context
 * @returns {Promise} Sonuç
 */
export const retryWithBackoff = async (fn, config = {}, context = 'retry') => {
  const finalConfig = { ...DEFAULT_RETRY_CONFIG, ...config };
  const { maxRetries, retryCondition } = finalConfig;
  
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Retry attempt ${attempt + 1}/${maxRetries + 1} (${context})`);
      
      const result = await fn();
      
      if (attempt > 0) {
        console.log(`✅ Retry başarılı (${context}) - ${attempt + 1} deneme sonunda`);
      }
      
      return result;
      
    } catch (error) {
      lastError = error;
      
      console.log(`❌ Retry attempt ${attempt + 1} failed (${context}):`, error.message);
      
      // Son deneme ise hatayı fırlat
      if (attempt === maxRetries) {
        console.log(`💥 Tüm retry denemeleri başarısız (${context})`);
        throw error;
      }
      
      // Retry koşulunu kontrol et
      if (!retryCondition(error)) {
        console.log(`🚫 Retry koşulu sağlanmadı (${context}):`, error.message);
        throw error;
      }
      
      // Gecikme hesapla ve bekle
      const delay = calculateDelay(attempt, finalConfig);
      console.log(`⏳ ${delay}ms bekleniyor (${context})...`);
      
      await sleep(delay);
    }
  }
  
  throw lastError;
};

/**
 * API çağrısı için özel retry fonksiyonu
 * @param {Function} apiCall - API çağrısı fonksiyonu
 * @param {Object} options - Seçenekler
 * @returns {Promise} API sonucu
 */
export const retryApiCall = async (apiCall, options = {}) => {
  const config = {
    maxRetries: options.maxRetries || 3,
    baseDelay: options.baseDelay || 1000,
    context: options.context || 'api_call'
  };
  
  return retryWithBackoff(apiCall, config, config.context);
};

/**
 * Network hatası için retry
 * @param {Function} fn - Çalıştırılacak fonksiyon
 * @param {Object} options - Seçenekler
 * @returns {Promise} Sonuç
 */
export const retryOnNetworkError = async (fn, options = {}) => {
  const config = {
    maxRetries: options.maxRetries || 2,
    baseDelay: options.baseDelay || 2000,
    retryCondition: (error) => {
      return (
        error.code === 'NETWORK_ERROR' ||
        error.code === 'ERR_NETWORK' ||
        error.message?.includes('Network Error') ||
        error.message?.includes('timeout')
      );
    },
    context: options.context || 'network_retry'
  };
  
  return retryWithBackoff(fn, config, config.context);
};

/**
 * Timeout hatası için retry
 * @param {Function} fn - Çalıştırılacak fonksiyon
 * @param {Object} options - Seçenekler
 * @returns {Promise} Sonuç
 */
export const retryOnTimeout = async (fn, options = {}) => {
  const config = {
    maxRetries: options.maxRetries || 2,
    baseDelay: options.baseDelay || 1500,
    retryCondition: (error) => {
      return (
        error.code === 'TIMEOUT' ||
        error.code === 'ECONNABORTED' ||
        error.message?.includes('timeout')
      );
    },
    context: options.context || 'timeout_retry'
  };
  
  return retryWithBackoff(fn, config, config.context);
};

/**
 * Sunucu hatası için retry
 * @param {Function} fn - Çalıştırılacak fonksiyon
 * @param {Object} options - Seçenekler
 * @returns {Promise} Sonuç
 */
export const retryOnServerError = async (fn, options = {}) => {
  const config = {
    maxRetries: options.maxRetries || 2,
    baseDelay: options.baseDelay || 2000,
    retryCondition: (error) => {
      return (
        error.response && 
        error.response.status >= 500 && 
        error.response.status < 600
      );
    },
    context: options.context || 'server_error_retry'
  };
  
  return retryWithBackoff(fn, config, config.context);
};

/**
 * Retry istatistikleri
 */
class RetryStats {
  constructor() {
    this.stats = {
      totalAttempts: 0,
      successfulRetries: 0,
      failedRetries: 0,
      retryTypes: {}
    };
  }
  
  recordAttempt(type, success) {
    this.stats.totalAttempts++;
    
    if (!this.stats.retryTypes[type]) {
      this.stats.retryTypes[type] = { attempts: 0, successes: 0, failures: 0 };
    }
    
    this.stats.retryTypes[type].attempts++;
    
    if (success) {
      this.stats.successfulRetries++;
      this.stats.retryTypes[type].successes++;
    } else {
      this.stats.failedRetries++;
      this.stats.retryTypes[type].failures++;
    }
  }
  
  getStats() {
    return { ...this.stats };
  }
  
  reset() {
    this.stats = {
      totalAttempts: 0,
      successfulRetries: 0,
      failedRetries: 0,
      retryTypes: {}
    };
  }
}

// Singleton instance
const retryStats = new RetryStats();

/**
 * Retry istatistiklerini al
 */
export const getRetryStats = () => {
  return retryStats.getStats();
};

/**
 * Retry istatistiklerini sıfırla
 */
export const resetRetryStats = () => {
  retryStats.reset();
};

export default {
  retryWithBackoff,
  retryApiCall,
  retryOnNetworkError,
  retryOnTimeout,
  retryOnServerError,
  getRetryStats,
  resetRetryStats
};
