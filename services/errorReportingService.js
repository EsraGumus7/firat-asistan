/**
 * Error Reporting Service - Hataları dış servislere gönderir
 * Sentry, Crashlytics, Firebase Crashlytics gibi servislere entegrasyon
 */

// ========================================
// ERROR REPORTING CONFIGURATION
// ========================================

const REPORTING_CONFIG = {
  enabled: true,
  services: {
    sentry: {
      enabled: false, // Sentry entegrasyonu için true yapın
      dsn: process.env.SENTRY_DSN || '',
      environment: process.env.NODE_ENV || 'development'
    },
    firebase: {
      enabled: false, // Firebase Crashlytics için true yapın
      projectId: process.env.FIREBASE_PROJECT_ID || ''
    },
    custom: {
      enabled: true, // Custom error reporting
      endpoint: process.env.ERROR_REPORTING_ENDPOINT || ''
    }
  },
  batchSize: 10,
  flushInterval: 30000, // 30 saniye
  maxRetries: 3
};

// ========================================
// ERROR QUEUE
// ========================================

class ErrorQueue {
  constructor() {
    this.queue = [];
    this.isFlushing = false;
    this.startFlushTimer();
  }

  add(error) {
    this.queue.push({
      ...error,
      timestamp: new Date().toISOString(),
      id: this.generateId()
    });

    // Queue dolduysa hemen flush et
    if (this.queue.length >= REPORTING_CONFIG.batchSize) {
      this.flush();
    }
  }

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  startFlushTimer() {
    setInterval(() => {
      if (this.queue.length > 0 && !this.isFlushing) {
        this.flush();
      }
    }, REPORTING_CONFIG.flushInterval);
  }

  async flush() {
    if (this.isFlushing || this.queue.length === 0) return;

    this.isFlushing = true;
    const errorsToFlush = [...this.queue];
    this.queue = [];

    try {
      await this.sendErrors(errorsToFlush);
      console.log(`✅ ${errorsToFlush.length} hata başarıyla raporlandı`);
    } catch (error) {
      console.error('❌ Error reporting failed:', error);
      // Başarısız olan hataları tekrar queue'ya ekle
      this.queue.unshift(...errorsToFlush);
    } finally {
      this.isFlushing = false;
    }
  }

  async sendErrors(errors) {
    const promises = [];

    // Sentry'e gönder
    if (REPORTING_CONFIG.services.sentry.enabled) {
      promises.push(this.sendToSentry(errors));
    }

    // Firebase'e gönder
    if (REPORTING_CONFIG.services.firebase.enabled) {
      promises.push(this.sendToFirebase(errors));
    }

    // Custom endpoint'e gönder
    if (REPORTING_CONFIG.services.custom.enabled) {
      promises.push(this.sendToCustomEndpoint(errors));
    }

    await Promise.allSettled(promises);
  }

  async sendToSentry(errors) {
    // Sentry entegrasyonu burada yapılacak
    console.log('📤 Sentry\'e gönderiliyor:', errors.length, 'hata');
    // Sentry.captureException() kullanılacak
  }

  async sendToFirebase(errors) {
    // Firebase Crashlytics entegrasyonu burada yapılacak
    console.log('📤 Firebase\'e gönderiliyor:', errors.length, 'hata');
    // Firebase.crashlytics().recordError() kullanılacak
  }

  async sendToCustomEndpoint(errors) {
    if (!REPORTING_CONFIG.services.custom.endpoint) return;

    try {
      const response = await fetch(REPORTING_CONFIG.services.custom.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ERROR_REPORTING_TOKEN || ''}`
        },
        body: JSON.stringify({
          errors,
          metadata: {
            appVersion: '1.0.0',
            platform: 'react-native',
            timestamp: new Date().toISOString()
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('❌ Custom endpoint error:', error);
      throw error;
    }
  }
}

// ========================================
// ERROR REPORTING SERVICE
// ========================================

class ErrorReportingService {
  constructor() {
    this.queue = new ErrorQueue();
    this.isEnabled = REPORTING_CONFIG.enabled;
    this.retryCount = 0;
  }

  // Hata raporla
  reportError(error, context = {}) {
    if (!this.isEnabled) return;

    const errorReport = {
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code
      },
      context: {
        ...context,
        userAgent: 'React Native App',
        version: '1.0.0',
        platform: 'mobile',
        timestamp: new Date().toISOString()
      },
      severity: this.getSeverity(error),
      fingerprint: this.generateFingerprint(error, context)
    };

    this.queue.add(errorReport);
  }

  // Hata şiddetini belirle
  getSeverity(error) {
    if (error.name === 'TypeError' || error.name === 'ReferenceError') {
      return 'error';
    }
    if (error.message?.includes('network') || error.message?.includes('timeout')) {
      return 'warning';
    }
    if (error.message?.includes('validation') || error.message?.includes('input')) {
      return 'info';
    }
    return 'error';
  }

  // Hata parmak izi oluştur (duplicate detection için)
  generateFingerprint(error, context) {
    const key = `${error.name}:${error.message}:${context.endpoint || 'unknown'}`;
    return btoa(key).substring(0, 16);
  }

  // Servisi etkinleştir/devre dışı bırak
  setEnabled(enabled) {
    this.isEnabled = enabled;
    console.log(`📊 Error reporting ${enabled ? 'enabled' : 'disabled'}`);
  }

  // Queue'yu manuel olarak flush et
  async flush() {
    await this.queue.flush();
  }

  // Servis durumunu al
  getStatus() {
    return {
      enabled: this.isEnabled,
      queueSize: this.queue.queue.length,
      isFlushing: this.queue.isFlushing,
      config: REPORTING_CONFIG
    };
  }
}

// ========================================
// SINGLETON INSTANCE
// ========================================

const errorReportingService = new ErrorReportingService();

// ========================================
// EXPORTS
// ========================================

export default errorReportingService;

export const reportError = (error, context = {}) => {
  errorReportingService.reportError(error, context);
};

export const flushErrorReports = () => {
  return errorReportingService.flush();
};

export const setErrorReportingEnabled = (enabled) => {
  errorReportingService.setEnabled(enabled);
};

export const getErrorReportingStatus = () => {
  return errorReportingService.getStatus();
};

// ========================================
// INTEGRATION HELPERS
// ========================================

// Global error handler ile entegrasyon
export const integrateWithGlobalErrorHandler = () => {
  // Global error handler'dan gelen hataları otomatik raporla
  const originalConsoleError = console.error;
  console.error = (...args) => {
    originalConsoleError(...args);
    
    // Error objesi varsa raporla
    const error = args.find(arg => arg instanceof Error);
    if (error) {
      reportError(error, { source: 'console.error' });
    }
  };
};

// React Native error boundary ile entegrasyon
export const integrateWithErrorBoundary = (error, errorInfo) => {
  reportError(error, {
    source: 'error_boundary',
    componentStack: errorInfo.componentStack
  });
};

// API error'ları ile entegrasyon
export const integrateWithApiErrors = (error, endpoint, method) => {
  reportError(error, {
    source: 'api_error',
    endpoint,
    method,
    status: error.response?.status,
    statusText: error.response?.statusText
  });
};
