/**
 * Error Test Utilities - Geliştirme sırasında hata testleri için
 * Bu dosya sadece geliştirme ortamında kullanılmalıdır
 */

import { logError } from '../services/globalErrorHandler';

/**
 * Test hataları oluştur
 */
export const ErrorTestUtils = {
  /**
   * JavaScript hatası oluştur
   */
  createJavaScriptError() {
    try {
      // Kasıtlı olarak hata oluştur
      const obj = null;
      obj.someProperty.nestedProperty;
    } catch (error) {
      logError(error, {
        type: 'test_javascript_error',
        test: true
      });
      return error;
    }
  },

  /**
   * Promise rejection hatası oluştur
   */
  createPromiseRejectionError() {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Test Promise Rejection Error'));
      }, 100);
    });

    // Unhandled promise rejection oluştur
    promise.catch(() => {
      // Catch etmeyerek unhandled rejection oluştur
    });

    return promise;
  },

  /**
   * Network hatası oluştur
   */
  createNetworkError() {
    const error = new Error('Network Error - Test');
    error.code = 'NETWORK_ERROR';
    error.name = 'NetworkError';
    
    logError(error, {
      type: 'test_network_error',
      test: true
    });
    
    return error;
  },

  /**
   * Timeout hatası oluştur
   */
  createTimeoutError() {
    const error = new Error('Request Timeout - Test');
    error.code = 'TIMEOUT';
    error.name = 'TimeoutError';
    
    logError(error, {
      type: 'test_timeout_error',
      test: true
    });
    
    return error;
  },

  /**
   * API hatası oluştur
   */
  createAPIError() {
    const error = new Error('API Error - Test');
    error.code = 'API_ERROR';
    error.name = 'APIError';
    error.response = {
      status: 500,
      statusText: 'Internal Server Error',
      data: { message: 'Test API Error' }
    };
    
    logError(error, {
      type: 'test_api_error',
      test: true
    });
    
    return error;
  },

  /**
   * Tüm test hatalarını çalıştır
   */
  runAllTests() {
    console.log('🧪 Error Test Utils - Tüm testler çalıştırılıyor...');
    
    try {
      this.createJavaScriptError();
      this.createNetworkError();
      this.createTimeoutError();
      this.createAPIError();
      this.createPromiseRejectionError();
      
      console.log('✅ Tüm test hataları oluşturuldu');
    } catch (error) {
      console.error('❌ Test hataları oluşturulurken hata:', error);
    }
  }
};

// Geliştirme ortamında global olarak erişilebilir yap
if (__DEV__) {
  global.ErrorTestUtils = ErrorTestUtils;
}

export default ErrorTestUtils;
