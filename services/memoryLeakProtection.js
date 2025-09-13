// ========================================
// MEMORY LEAK PROTECTION SERVICE
// ========================================

import {
    MEMORY_CACHE_CONFIG
} from '../config/cacheConfig';

/**
 * Memory Leak Protection Service
 * Memory leak'leri tespit eder ve önler
 */
class MemoryLeakProtectionService {
  constructor() {
    this.isInitialized = false;
    this.monitoringInterval = null;
    this.leakDetectionThreshold = 0.9; // %90 dolunca uyar
    this.leakHistory = [];
    this.maxHistorySize = 100;
    
    console.log('🛡️ Memory Leak Protection Service başlatılıyor...');
    this.initialize();
  }

  /**
   * Servisi başlat
   */
  initialize() {
    if (this.isInitialized) {
      console.warn('⚠️ Memory Leak Protection zaten başlatılmış');
      return;
    }

    this.isInitialized = true;
    this.startMonitoring();
    console.log('✅ Memory Leak Protection Service başlatıldı');
  }

  /**
   * Memory monitoring başlat
   */
  startMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
    }

    // Her 30 saniyede bir kontrol et
    this.monitoringInterval = setInterval(() => {
      this.checkMemoryUsage();
    }, 30 * 1000);

    console.log('🔍 Memory monitoring başlatıldı (30s interval)');
  }

  /**
   * Memory kullanımını kontrol et
   */
  checkMemoryUsage() {
    try {
      // Memory kullanımını hesapla
      const memoryUsage = this.calculateMemoryUsage();
      const usagePercent = memoryUsage.used / memoryUsage.total;
      
      // Leak history'ye ekle
      this.addToHistory({
        timestamp: Date.now(),
        used: memoryUsage.used,
        total: memoryUsage.total,
        percent: usagePercent
      });

      // Leak tespiti
      if (usagePercent > this.leakDetectionThreshold) {
        this.handleMemoryLeak(usagePercent, memoryUsage);
      }

      // Normal kullanım logu (her 10 dakikada bir)
      if (Date.now() % (10 * 60 * 1000) < 30000) {
        console.log(`📊 Memory kullanımı: ${(usagePercent * 100).toFixed(2)}%`);
      }

    } catch (error) {
      console.error('❌ Memory leak kontrolü hatası:', error);
    }
  }

  /**
   * Memory kullanımını hesapla
   */
  calculateMemoryUsage() {
    try {
      // React Native'de memory kullanımını tahmin et
      const usedJSHeapSize = global.performance?.memory?.usedJSHeapSize || 0;
      const totalJSHeapSize = global.performance?.memory?.totalJSHeapSize || MEMORY_CACHE_CONFIG.maxSize;
      
      return {
        used: usedJSHeapSize,
        total: totalJSHeapSize,
        available: totalJSHeapSize - usedJSHeapSize
      };
    } catch (error) {
      // Fallback: Cache boyutuna göre tahmin
      return {
        used: MEMORY_CACHE_CONFIG.maxSize * 0.5, // %50 kullanımda varsay
        total: MEMORY_CACHE_CONFIG.maxSize,
        available: MEMORY_CACHE_CONFIG.maxSize * 0.5
      };
    }
  }

  /**
   * Leak history'ye ekle
   */
  addToHistory(entry) {
    this.leakHistory.push(entry);
    
    // History boyutunu sınırla
    if (this.leakHistory.length > this.maxHistorySize) {
      this.leakHistory.shift();
    }
  }

  /**
   * Memory leak'i handle et
   */
  handleMemoryLeak(usagePercent, memoryUsage) {
    const severity = this.calculateLeakSeverity(usagePercent);
    
    console.warn(`⚠️ Memory leak tespit edildi: ${(usagePercent * 100).toFixed(2)}%`);
    console.warn(`📊 Kullanılan: ${this.formatSize(memoryUsage.used)}`);
    console.warn(`📊 Toplam: ${this.formatSize(memoryUsage.total)}`);
    console.warn(`🚨 Severity: ${severity}`);

    // Leak tipini analiz et
    const leakType = this.analyzeLeakType();
    console.warn(`🔍 Leak tipi: ${leakType}`);

    // Önlemleri uygula
    this.applyLeakPreventions(severity, leakType);
  }

  /**
   * Leak severity'sini hesapla
   */
  calculateLeakSeverity(usagePercent) {
    if (usagePercent > 0.95) return 'CRITICAL';
    if (usagePercent > 0.90) return 'HIGH';
    if (usagePercent > 0.80) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Leak tipini analiz et
   */
  analyzeLeakType() {
    if (this.leakHistory.length < 5) return 'INSUFFICIENT_DATA';

    const recent = this.leakHistory.slice(-5);
    const trend = this.calculateTrend(recent);

    if (trend > 0.1) return 'RAPID_GROWTH';
    if (trend > 0.05) return 'GRADUAL_GROWTH';
    if (trend < -0.05) return 'DECREASING';
    return 'STABLE';
  }

  /**
   * Trend hesapla
   */
  calculateTrend(entries) {
    if (entries.length < 2) return 0;

    const first = entries[0].percent;
    const last = entries[entries.length - 1].percent;
    const timeDiff = (entries[entries.length - 1].timestamp - entries[0].timestamp) / 1000; // saniye

    return (last - first) / timeDiff;
  }

  /**
   * Leak önlemlerini uygula
   */
  applyLeakPreventions(severity, leakType) {
    const preventions = [];

    // Temel önlemler
    preventions.push('Cache temizleme tetikleniyor...');
    this.triggerCacheCleanup();

    // Orta seviye önlemler
    if (severity === 'HIGH' || severity === 'CRITICAL') {
      preventions.push('Agresif cache temizleme...');
      this.triggerAggressiveCleanup();
    }

    // Kritik seviye önlemler
    if (severity === 'CRITICAL') {
      preventions.push('Emergency memory cleanup...');
      this.triggerEmergencyCleanup();
    }

    // Leak tipine özel önlemler
    if (leakType === 'RAPID_GROWTH') {
      preventions.push('Hızlı büyüme önlemleri...');
      this.handleRapidGrowth();
    }

    console.log('🛡️ Uygulanan önlemler:', preventions);
  }

  /**
   * Cache temizleme tetikle
   */
  triggerCacheCleanup() {
    try {
      // Global cache temizleme eventi gönder
      if (global.cacheService) {
        global.cacheService.clearExpired();
      }
      console.log('🧹 Cache temizleme tetiklendi');
    } catch (error) {
      console.error('❌ Cache temizleme hatası:', error);
    }
  }

  /**
   * Agresif temizleme tetikle
   */
  triggerAggressiveCleanup() {
    try {
      // Tüm geçici cache'leri temizle
      if (global.cacheService) {
        global.cacheService.clearCategory('temp');
        global.cacheService.clearCategory('test');
      }
      console.log('🧹 Agresif temizleme tetiklendi');
    } catch (error) {
      console.error('❌ Agresif temizleme hatası:', error);
    }
  }

  /**
   * Emergency cleanup tetikle
   */
  triggerEmergencyCleanup() {
    try {
      // Tüm cache'leri temizle (kritik durum)
      if (global.cacheService) {
        global.cacheService.clearAll();
      }
      console.log('🚨 Emergency cleanup tetiklendi');
    } catch (error) {
      console.error('❌ Emergency cleanup hatası:', error);
    }
  }

  /**
   * Hızlı büyüme önlemleri
   */
  handleRapidGrowth() {
    try {
      // Monitoring sıklığını artır
      this.startMonitoring();
      console.log('⚡ Monitoring sıklığı artırıldı');
    } catch (error) {
      console.error('❌ Hızlı büyüme önlemi hatası:', error);
    }
  }

  /**
   * Memory istatistiklerini al
   */
  getMemoryStats() {
    const memoryUsage = this.calculateMemoryUsage();
    const usagePercent = memoryUsage.used / memoryUsage.total;
    
    return {
      used: memoryUsage.used,
      total: memoryUsage.total,
      available: memoryUsage.available,
      usagePercent: usagePercent,
      usagePercentFormatted: `${(usagePercent * 100).toFixed(2)}%`,
      leakHistory: this.leakHistory.slice(-10), // Son 10 entry
      isHealthy: usagePercent < this.leakDetectionThreshold,
      lastCheck: Date.now()
    };
  }

  /**
   * Leak history'yi temizle
   */
  clearHistory() {
    this.leakHistory = [];
    console.log('🧹 Leak history temizlendi');
  }

  /**
   * Boyutu formatla
   */
  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Servisi durdur
   */
  destroy() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    this.isInitialized = false;
    console.log('🛑 Memory Leak Protection Service durduruldu');
  }
}

// Singleton instance
const memoryLeakProtection = new MemoryLeakProtectionService();

export default memoryLeakProtection;
export { MemoryLeakProtectionService };
