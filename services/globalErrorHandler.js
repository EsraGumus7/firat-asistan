/**
 * Global Error Handler - Uygulama genelinde oluşan hataları yakalar ve loglar
 * JavaScript hataları, Promise rejection'ları ve diğer beklenmeyen hataları yönetir
 */

// Hata loglama servisi
class ErrorLoggingService {
  constructor() {
    this.errorLogs = [];
    this.maxLogs = 100; // Maksimum log sayısı
  }

  // Hatayı logla
  logError(error, context = {}) {
    const errorLog = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      error: {
        message: error.message || 'Bilinmeyen hata',
        stack: error.stack || 'Stack trace yok',
        name: error.name || 'Error',
        code: error.code || null
      },
      context: {
        ...context,
        userAgent: 'React Native App',
        version: '1.0.0',
        platform: 'mobile'
      },
      severity: this.getErrorSeverity(error)
    };

    // Console'a logla
    console.error('🚨 Global Error:', errorLog);

    // Memory'de sakla
    this.errorLogs.unshift(errorLog);
    
    // Maksimum log sayısını aş
    if (this.errorLogs.length > this.maxLogs) {
      this.errorLogs = this.errorLogs.slice(0, this.maxLogs);
    }

    // Burada hata raporlama servisine gönderebilirsiniz
    // Örnek: Sentry, Crashlytics, Firebase Crashlytics, vb.
    this.sendToErrorReportingService(errorLog);

    return errorLog;
  }

  // Hata şiddetini belirle
  getErrorSeverity(error) {
    if (error.name === 'TypeError' || error.name === 'ReferenceError') {
      return 'high';
    }
    if (error.message && error.message.includes('Network')) {
      return 'medium';
    }
    return 'low';
  }

  // Hata raporlama servisine gönder
  sendToErrorReportingService(errorLog) {
    // Burada gerçek hata raporlama servisine gönderebilirsiniz
    // Şimdilik sadece console'a logluyoruz
    console.log('📊 Error Report Sent:', {
      id: errorLog.id,
      severity: errorLog.severity,
      message: errorLog.error.message
    });
  }

  // Hata loglarını al
  getErrorLogs() {
    return this.errorLogs;
  }

  // Hata loglarını temizle
  clearErrorLogs() {
    this.errorLogs = [];
  }

  // Hata istatistikleri
  getErrorStats() {
    const total = this.errorLogs.length;
    const bySeverity = this.errorLogs.reduce((acc, log) => {
      acc[log.severity] = (acc[log.severity] || 0) + 1;
      return acc;
    }, {});

    return {
      total,
      bySeverity,
      lastError: this.errorLogs[0] || null
    };
  }
}

// Singleton instance
const errorLoggingService = new ErrorLoggingService();

/**
 * Global Error Handler sınıfı
 */
class GlobalErrorHandler {
  constructor() {
    this.isInitialized = false;
    this.originalConsoleError = console.error;
  }

  /**
   * Global error handler'ı başlat
   */
  initialize() {
    if (this.isInitialized) {
      console.warn('Global Error Handler zaten başlatılmış');
      return;
    }

    console.log('🚀 Global Error Handler başlatılıyor...');

    // JavaScript hatalarını yakala
    this.setupGlobalErrorHandler();
    
    // Promise rejection'ları yakala
    this.setupUnhandledRejectionHandler();
    
    // Console error'ları yakala
    this.setupConsoleErrorHandler();

    this.isInitialized = true;
    console.log('✅ Global Error Handler başarıyla başlatıldı');
  }

  /**
   * Global JavaScript hata yakalayıcısı
   */
  setupGlobalErrorHandler() {
    const originalHandler = global.ErrorUtils?.getGlobalHandler?.();

    global.ErrorUtils?.setGlobalHandler?.((error, isFatal) => {
      console.error('🚨 Global JavaScript Error:', error);
      
      errorLoggingService.logError(error, {
        type: 'global_javascript_error',
        isFatal,
        handler: 'global_error_handler'
      });

      // Orijinal handler'ı çağır
      if (originalHandler) {
        originalHandler(error, isFatal);
      }
    });
  }

  /**
   * Unhandled Promise Rejection yakalayıcısı
   */
  setupUnhandledRejectionHandler() {
    // React Native'de Promise rejection'ları yakalamak için
    const originalHandler = global.onunhandledrejection;

    global.onunhandledrejection = (event) => {
      console.error('🚨 Unhandled Promise Rejection:', event.reason);
      
      errorLoggingService.logError(event.reason, {
        type: 'unhandled_promise_rejection',
        promise: event.promise,
        handler: 'unhandled_rejection_handler'
      });

      // Orijinal handler'ı çağır
      if (originalHandler) {
        originalHandler(event);
      }
    };
  }

  /**
   * Console error yakalayıcısı
   */
  setupConsoleErrorHandler() {
    console.error = (...args) => {
      // Orijinal console.error'ı çağır
      this.originalConsoleError.apply(console, args);

      // Error objesi varsa logla
      const error = args.find(arg => arg instanceof Error);
      if (error) {
        errorLoggingService.logError(error, {
          type: 'console_error',
          args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)),
          handler: 'console_error_handler'
        });
      }
    };
  }

  /**
   * Hata loglarını al
   */
  getErrorLogs() {
    return errorLoggingService.getErrorLogs();
  }

  /**
   * Hata istatistiklerini al
   */
  getErrorStats() {
    return errorLoggingService.getErrorStats();
  }

  /**
   * Hata loglarını temizle
   */
  clearErrorLogs() {
    errorLoggingService.clearErrorLogs();
  }

  /**
   * Manuel hata loglama
   */
  logError(error, context = {}) {
    return errorLoggingService.logError(error, context);
  }

  /**
   * Global error handler'ı durdur
   */
  destroy() {
    if (!this.isInitialized) {
      return;
    }

    console.log('🛑 Global Error Handler durduruluyor...');
    
    // Console.error'ı orijinal haline döndür
    console.error = this.originalConsoleError;
    
    this.isInitialized = false;
    console.log('✅ Global Error Handler durduruldu');
  }
}

// Singleton instance
const globalErrorHandler = new GlobalErrorHandler();

// Export functions
export const initializeGlobalErrorHandler = () => {
  globalErrorHandler.initialize();
};

export const getErrorLogs = () => {
  return globalErrorHandler.getErrorLogs();
};

export const getErrorStats = () => {
  return globalErrorHandler.getErrorStats();
};

export const clearErrorLogs = () => {
  globalErrorHandler.clearErrorLogs();
};

export const logError = (error, context = {}) => {
  return globalErrorHandler.logError(error, context);
};

export const destroyGlobalErrorHandler = () => {
  globalErrorHandler.destroy();
};

export default globalErrorHandler;
