// ========================================
// CACHE SERVICE - ANA CACHE YÖNETİMİ
// ========================================

import {
    CACHE_DURATIONS,
    CACHE_PREFIXES
} from '../config/cacheConfig';
import memoryCache from './memoryCache';

/**
 * Cache Service - Ana cache yönetim servisi
 * Memory cache'i API çağrıları ile entegre eder
 */
class CacheService {
  constructor() {
    this.memoryCache = memoryCache;
    this.isInitialized = false;
    
    console.log('🚀 Cache Service başlatılıyor...');
    this.initialize();
  }

  /**
   * Cache servisini başlat
   */
  initialize() {
    if (this.isInitialized) {
      console.warn('⚠️ Cache Service zaten başlatılmış');
      return;
    }

    this.isInitialized = true;
    console.log('✅ Cache Service başlatıldı');
  }

  /**
   * Cache key oluştur
   * @param {string} category - API kategorisi
   * @param {string} endpointKey - Endpoint anahtarı
   * @param {object} params - Query parametreleri
   * @returns {string} Cache key
   */
  generateCacheKey(category, endpointKey, params = {}) {
    try {
      // Parametreleri sıralı hale getir (tutarlı key için)
      const sortedParams = Object.keys(params)
        .sort()
        .reduce((result, key) => {
          result[key] = params[key];
          return result;
        }, {});

      // Key oluştur
      const paramString = JSON.stringify(sortedParams);
      const key = `${CACHE_PREFIXES.API}${category}_${endpointKey}_${paramString}`;
      
      return key;
    } catch (error) {
      console.error('❌ Cache key oluşturma hatası:', error);
      return `${CACHE_PREFIXES.API}${category}_${endpointKey}_${Date.now()}`;
    }
  }

  /**
   * Kategori için TTL al
   * @param {string} category - API kategorisi
   * @returns {number} TTL süresi (ms)
   */
  getTTLForCategory(category) {
    return CACHE_DURATIONS[category] || CACHE_DURATIONS.default;
  }

  /**
   * Cache'den veri al
   * @param {string} category - API kategorisi
   * @param {string} endpointKey - Endpoint anahtarı
   * @param {object} params - Query parametreleri
   * @returns {any|null} Cache'lenmiş veri veya null
   */
  get(category, endpointKey, params = {}) {
    try {
      const cacheKey = this.generateCacheKey(category, endpointKey, params);
      const data = this.memoryCache.get(cacheKey);
      
      if (data) {
        console.log(`🎯 Cache hit: ${category}/${endpointKey}`);
        return {
          data,
          source: 'cache',
          cacheKey,
          timestamp: Date.now()
        };
      }

      console.log(`❌ Cache miss: ${category}/${endpointKey}`);
      return null;

    } catch (error) {
      console.error('❌ Cache get hatası:', error);
      return null;
    }
  }

  /**
   * Cache'e veri kaydet
   * @param {string} category - API kategorisi
   * @param {string} endpointKey - Endpoint anahtarı
   * @param {any} data - Cache'lenecek veri
   * @param {object} params - Query parametreleri
   * @param {number} ttl - Özel TTL süresi (opsiyonel)
   * @returns {boolean} Başarı durumu
   */
  set(category, endpointKey, data, params = {}, ttl = null) {
    try {
      const cacheKey = this.generateCacheKey(category, endpointKey, params);
      const cacheTTL = ttl || this.getTTLForCategory(category);
      
      const success = this.memoryCache.set(cacheKey, data, cacheTTL);
      
      if (success) {
        console.log(`💾 Cache'e kaydedildi: ${category}/${endpointKey} (TTL: ${cacheTTL / 1000}s)`);
      }

      return success;

    } catch (error) {
      console.error('❌ Cache set hatası:', error);
      return false;
    }
  }

  /**
   * Cache'den veri sil
   * @param {string} category - API kategorisi
   * @param {string} endpointKey - Endpoint anahtarı
   * @param {object} params - Query parametreleri
   * @returns {boolean} Başarı durumu
   */
  delete(category, endpointKey, params = {}) {
    try {
      const cacheKey = this.generateCacheKey(category, endpointKey, params);
      const success = this.memoryCache.delete(cacheKey);
      
      if (success) {
        console.log(`🗑️ Cache'den silindi: ${category}/${endpointKey}`);
      }

      return success;

    } catch (error) {
      console.error('❌ Cache delete hatası:', error);
      return false;
    }
  }

  /**
   * Kategoriye göre cache temizle
   * @param {string} category - API kategorisi
   * @returns {number} Silinen entry sayısı
   */
  clearCategory(category) {
    try {
      let deletedCount = 0;
      const prefix = `${CACHE_PREFIXES.API}${category}_`;
      
      // Memory cache'deki tüm key'leri kontrol et
      for (const key of this.memoryCache.cache.keys()) {
        if (key.startsWith(prefix)) {
          if (this.memoryCache.delete(key)) {
            deletedCount++;
          }
        }
      }

      console.log(`🧹 Kategori temizlendi: ${category} (${deletedCount} entry)`);
      return deletedCount;

    } catch (error) {
      console.error('❌ Kategori temizleme hatası:', error);
      return 0;
    }
  }

  /**
   * Pattern'e göre cache temizle
   * @param {string} pattern - Temizlenecek pattern
   * @returns {number} Silinen entry sayısı
   */
  clearPattern(pattern) {
    try {
      let deletedCount = 0;
      
      for (const key of this.memoryCache.cache.keys()) {
        if (key.includes(pattern)) {
          if (this.memoryCache.delete(key)) {
            deletedCount++;
          }
        }
      }

      console.log(`🧹 Pattern temizlendi: ${pattern} (${deletedCount} entry)`);
      return deletedCount;

    } catch (error) {
      console.error('❌ Pattern temizleme hatası:', error);
      return 0;
    }
  }

  /**
   * Tüm cache'i temizle
   * @returns {number} Silinen entry sayısı
   */
  clearAll() {
    try {
      const deletedCount = this.memoryCache.clear();
      console.log(`🧹 Tüm cache temizlendi: ${deletedCount} entry`);
      return deletedCount;

    } catch (error) {
      console.error('❌ Cache temizleme hatası:', error);
      return 0;
    }
  }

  /**
   * Cache istatistiklerini al
   * @returns {object} Cache istatistikleri
   */
  getStats() {
    return this.memoryCache.getStats();
  }

  /**
   * Cache durumunu al
   * @returns {object} Cache durumu
   */
  getStatus() {
    return this.memoryCache.getStatus();
  }

  /**
   * Cache sağlık kontrolü
   * @returns {object} Sağlık durumu
   */
  getHealth() {
    const status = this.getStatus();
    const stats = this.getStats();
    
    return {
      isHealthy: status.isHealthy,
      memoryUsage: status.memoryUsage,
      hitRate: stats.hitRate,
      entryCount: status.entryCount,
      errors: stats.errors,
      recommendations: this.getRecommendations(stats)
    };
  }

  /**
   * Cache önerileri
   * @param {object} stats - Cache istatistikleri
   * @returns {array} Öneriler
   */
  getRecommendations(stats) {
    const recommendations = [];
    
    // Hit rate kontrolü
    const hitRate = parseFloat(stats.hitRate);
    if (hitRate < 50) {
      recommendations.push('Cache hit rate düşük (%50 altında). Cache stratejisini gözden geçirin.');
    }
    
    // Memory usage kontrolü
    const memoryUsagePercent = parseFloat(stats.memoryUsagePercent);
    if (memoryUsagePercent > 80) {
      recommendations.push('Memory kullanımı yüksek (%80 üzerinde). Cache temizleme gerekebilir.');
    }
    
    // Error kontrolü
    if (stats.errors > 0) {
      recommendations.push(`${stats.errors} cache hatası tespit edildi. Logları kontrol edin.`);
    }

    return recommendations;
  }

  /**
   * Cache servisini durdur
   */
  destroy() {
    this.memoryCache.destroy();
    this.isInitialized = false;
    console.log('🛑 Cache Service durduruldu');
  }
}

// Singleton instance
const cacheService = new CacheService();

export default cacheService;
export { CacheService };
