// ========================================
// HYBRID CACHE SERVICE - MEMORY + PERSISTENT
// ========================================

import {
    CACHE_DURATIONS,
    CACHE_PREFIXES,
    CACHE_STRATEGIES
} from '../config/cacheConfig';
import memoryCache from './memoryCache';
import persistentCache from './persistentCache';

/**
 * Hybrid Cache Service
 * Memory + Persistent cache entegrasyonu
 */
class HybridCacheService {
  constructor() {
    this.memoryCache = memoryCache;
    this.persistentCache = persistentCache;
    this.isInitialized = false;
    this.defaultStrategy = CACHE_STRATEGIES.CACHE_FIRST;
    
    console.log('🔄 Hybrid Cache Service başlatılıyor...');
    this.initialize();
  }

  /**
   * Cache servisini başlat
   */
  async initialize() {
    if (this.isInitialized) {
      console.warn('⚠️ Hybrid Cache Service zaten başlatılmış');
      return;
    }

    // Persistent cache'in başlatılmasını bekle
    await this.persistentCache.initialize();
    
    this.isInitialized = true;
    console.log('✅ Hybrid Cache Service başlatıldı');
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
      console.error('❌ Hybrid cache key oluşturma hatası:', error);
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
   * Cache'den veri al (Hybrid strateji)
   * @param {string} category - API kategorisi
   * @param {string} endpointKey - Endpoint anahtarı
   * @param {object} params - Query parametreleri
   * @param {string} strategy - Cache stratejisi
   * @returns {any|null} Cache'lenmiş veri veya null
   */
  async get(category, endpointKey, params = {}, strategy = this.defaultStrategy) {
    try {
      const cacheKey = this.generateCacheKey(category, endpointKey, params);
      
      switch (strategy) {
        case CACHE_STRATEGIES.CACHE_FIRST:
          return await this.cacheFirstStrategy(cacheKey, category, endpointKey, params);
          
        case CACHE_STRATEGIES.NETWORK_FIRST:
          return await this.networkFirstStrategy(cacheKey, category, endpointKey, params);
          
        case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
          return await this.staleWhileRevalidateStrategy(cacheKey, category, endpointKey, params);
          
        case CACHE_STRATEGIES.NO_CACHE:
          return null;
          
        default:
          return await this.cacheFirstStrategy(cacheKey, category, endpointKey, params);
      }

    } catch (error) {
      console.error('❌ Hybrid cache get hatası:', error);
      return null;
    }
  }

  /**
   * Cache First Stratejisi
   * 1. Memory cache kontrol et
   * 2. Persistent cache kontrol et
   * 3. Null döndür (network'ten alınacak)
   */
  async cacheFirstStrategy(cacheKey, category, endpointKey, params) {
    // 1. Memory cache kontrol et
    const memoryData = this.memoryCache.get(cacheKey);
    if (memoryData) {
      console.log(`🎯 Memory cache hit: ${category}/${endpointKey}`);
      return {
        data: memoryData,
        source: 'memory',
        cacheKey,
        timestamp: Date.now()
      };
    }

    // 2. Persistent cache kontrol et
    const persistentData = await this.persistentCache.get(cacheKey);
    if (persistentData) {
      console.log(`💾 Persistent cache hit: ${category}/${endpointKey}`);
      
      // Memory cache'e de kaydet (hızlı erişim için)
      const ttl = this.getTTLForCategory(category);
      this.memoryCache.set(cacheKey, persistentData, ttl);
      
      return {
        data: persistentData,
        source: 'persistent',
        cacheKey,
        timestamp: Date.now()
      };
    }

    console.log(`❌ Cache miss: ${category}/${endpointKey}`);
    return null;
  }

  /**
   * Network'ten veri al
   * @param {string} category - API kategorisi
   * @param {string} endpointKey - Endpoint anahtarı
   * @param {object} params - Query parametreleri
   * @returns {any} Network verisi
   */
  async fetchFromNetwork(category, endpointKey, params) {
    try {
      // API service'den veri al
      const apiService = require('./apiService');
      const result = await apiService.callEndpoint(category, endpointKey, params, 'no_cache');
      
      if (result && result.status === 'success') {
        return result.data;
      }
      
      return null;
    } catch (error) {
      console.error(`❌ Network fetch error: ${category}/${endpointKey}`, error);
      throw error;
    }
  }

  /**
   * Network First Stratejisi
   * 1. Network'ten al (API çağrısı)
   * 2. Başarısızsa memory cache kontrol et
   * 3. Başarısızsa persistent cache kontrol et
   */
  async networkFirstStrategy(cacheKey, category, endpointKey, params) {
    try {
      console.log(`🌐 Network First Strategy: ${category}/${endpointKey}`);
      
      // 1. Önce network'ten veri al
      const networkData = await this.fetchFromNetwork(category, endpointKey, params);
      
      if (networkData) {
        // 2. Başarılı network yanıtını cache'e kaydet
        await this.set(category, endpointKey, networkData, params);
        
        return {
          data: networkData,
          source: 'network',
          timestamp: Date.now(),
          strategy: 'network_first'
        };
      }
      
      // 3. Network başarısız, cache'den döndür
      console.log(`⚠️ Network failed, falling back to cache: ${category}/${endpointKey}`);
      const cachedData = await this.cacheFirstStrategy(cacheKey, category, endpointKey, params);
      
      if (cachedData) {
        return {
          ...cachedData,
          source: 'cache_fallback',
          strategy: 'network_first'
        };
      }
      
      return null;
      
    } catch (error) {
      console.error(`❌ Network First Strategy error: ${category}/${endpointKey}`, error);
      
      // Hata durumunda cache'den döndür
      const cachedData = await this.cacheFirstStrategy(cacheKey, category, endpointKey, params);
      if (cachedData) {
        return {
          ...cachedData,
          source: 'cache_fallback',
          strategy: 'network_first',
          error: error.message
        };
      }
      
      throw error;
    }
  }

  /**
   * Stale While Revalidate Stratejisi
   * 1. Memory cache kontrol et (varsa hemen döndür)
   * 2. Persistent cache kontrol et (varsa hemen döndür)
   * 3. Arka planda network'ten güncelle
   */
  async staleWhileRevalidateStrategy(cacheKey, category, endpointKey, params) {
    try {
      console.log(`⚡ Stale While Revalidate Strategy: ${category}/${endpointKey}`);
      
      // Önce cache'den al
      const cachedData = await this.cacheFirstStrategy(cacheKey, category, endpointKey, params);
      
      if (cachedData) {
        // Arka planda güncelleme başlat (async)
        this.backgroundRevalidate(cacheKey, category, endpointKey, params);
        
        return {
          ...cachedData,
          source: 'stale_while_revalidate',
          strategy: 'stale_while_revalidate'
        };
      }
      
      // Cache'de yok, network'ten al
      const networkData = await this.fetchFromNetwork(category, endpointKey, params);
      
      if (networkData) {
        // Network verisini cache'e kaydet
        await this.set(category, endpointKey, networkData, params);
        
        return {
          data: networkData,
          source: 'network',
          timestamp: Date.now(),
          strategy: 'stale_while_revalidate'
        };
      }
      
      return null;
      
    } catch (error) {
      console.error(`❌ Stale While Revalidate Strategy error: ${category}/${endpointKey}`, error);
      throw error;
    }
  }

  /**
   * Arka planda cache güncelleme
   */
  async backgroundRevalidate(cacheKey, category, endpointKey, params) {
    try {
      console.log(`🔄 Arka plan güncelleme: ${category}/${endpointKey}`);
      
      // Network'ten yeni veri al
      const networkData = await this.fetchFromNetwork(category, endpointKey, params);
      
      if (networkData) {
        // Cache'i güncelle
        await this.set(category, endpointKey, networkData, params);
        console.log(`✅ Arka plan güncelleme tamamlandı: ${category}/${endpointKey}`);
      } else {
        console.log(`⚠️ Arka plan güncelleme başarısız: ${category}/${endpointKey}`);
      }
    } catch (error) {
      console.warn('⚠️ Arka plan güncelleme hatası:', error);
    }
  }

  /**
   * Cache invalidation - Akıllı temizleme
   * @param {string} category - Temizlenecek kategori (opsiyonel)
   * @param {string} endpointKey - Temizlenecek endpoint (opsiyonel)
   * @param {object} params - Temizlenecek parametreler (opsiyonel)
   * @returns {boolean} Başarı durumu
   */
  async invalidateCache(category = null, endpointKey = null, params = {}) {
    try {
      console.log(`🗑️ Cache invalidation başlatılıyor: ${category || 'all'}/${endpointKey || 'all'}`);
      
      if (category && endpointKey) {
        // Belirli endpoint'i temizle
        const cacheKey = this.generateCacheKey(category, endpointKey, params);
        const memorySuccess = this.memoryCache.delete(cacheKey);
        const persistentSuccess = await this.persistentCache.delete(cacheKey);
        
        console.log(`✅ Specific cache invalidated: ${category}/${endpointKey}`);
        return memorySuccess && persistentSuccess;
        
      } else if (category) {
        // Kategori bazlı temizleme
        await this.clearCategory(category);
        console.log(`✅ Category cache invalidated: ${category}`);
        return true;
        
      } else {
        // Tüm cache'i temizle
        await this.clearAll();
        console.log(`✅ All cache invalidated`);
        return true;
      }
      
    } catch (error) {
      console.error('❌ Cache invalidation hatası:', error);
      return false;
    }
  }

  /**
   * Cache'e veri kaydet (Hybrid)
   * @param {string} category - API kategorisi
   * @param {string} endpointKey - Endpoint anahtarı
   * @param {any} data - Cache'lenecek veri
   * @param {object} params - Query parametreleri
   * @param {number} ttl - Özel TTL süresi (opsiyonel)
   * @returns {boolean} Başarı durumu
   */
  async set(category, endpointKey, data, params = {}, ttl = null) {
    try {
      const cacheKey = this.generateCacheKey(category, endpointKey, params);
      const cacheTTL = ttl || this.getTTLForCategory(category);
      
      // Memory cache'e kaydet
      const memorySuccess = this.memoryCache.set(cacheKey, data, cacheTTL);
      
      // Persistent cache'e kaydet
      const persistentSuccess = await this.persistentCache.set(cacheKey, data, cacheTTL);
      
      const success = memorySuccess && persistentSuccess;
      
      if (success) {
        console.log(`💾 Hybrid cache'e kaydedildi: ${category}/${endpointKey} (TTL: ${cacheTTL / 1000}s)`);
      } else {
        console.warn(`⚠️ Hybrid cache kaydetme kısmen başarısız: ${category}/${endpointKey}`);
      }

      return success;

    } catch (error) {
      console.error('❌ Hybrid cache set hatası:', error);
      return false;
    }
  }

  /**
   * Cache'den veri sil (Hybrid)
   * @param {string} category - API kategorisi
   * @param {string} endpointKey - Endpoint anahtarı
   * @param {object} params - Query parametreleri
   * @returns {boolean} Başarı durumu
   */
  async delete(category, endpointKey, params = {}) {
    try {
      const cacheKey = this.generateCacheKey(category, endpointKey, params);
      
      // Memory cache'den sil
      const memorySuccess = this.memoryCache.delete(cacheKey);
      
      // Persistent cache'den sil
      const persistentSuccess = await this.persistentCache.delete(cacheKey);
      
      const success = memorySuccess && persistentSuccess;
      
      if (success) {
        console.log(`🗑️ Hybrid cache'den silindi: ${category}/${endpointKey}`);
      }

      return success;

    } catch (error) {
      console.error('❌ Hybrid cache delete hatası:', error);
      return false;
    }
  }

  /**
   * Kategoriye göre cache temizle (Hybrid)
   * @param {string} category - API kategorisi
   * @returns {number} Silinen entry sayısı
   */
  async clearCategory(category) {
    try {
      // Memory cache'den temizle
      const memoryDeleted = this.memoryCache.clearCategory(category);
      
      // Persistent cache'den temizle
      const persistentDeleted = await this.persistentCache.clearCategory(category);
      
      const totalDeleted = memoryDeleted + persistentDeleted;
      
      console.log(`🧹 Hybrid kategori temizlendi: ${category} (${totalDeleted} entry)`);
      return totalDeleted;

    } catch (error) {
      console.error('❌ Hybrid kategori temizleme hatası:', error);
      return 0;
    }
  }

  /**
   * Tüm cache'i temizle (Hybrid)
   * @returns {number} Silinen entry sayısı
   */
  async clearAll() {
    try {
      // Memory cache'i temizle
      const memoryDeleted = this.memoryCache.clear();
      
      // Persistent cache'i temizle
      const persistentDeleted = await this.persistentCache.clear();
      
      const totalDeleted = memoryDeleted + persistentDeleted;
      
      console.log(`🧹 Hybrid cache temizlendi: ${totalDeleted} entry`);
      return totalDeleted;

    } catch (error) {
      console.error('❌ Hybrid cache temizleme hatası:', error);
      return 0;
    }
  }

  /**
   * Cache istatistiklerini al (Hybrid)
   * @returns {object} Cache istatistikleri
   */
  getStats() {
    const memoryStats = this.memoryCache.getStats();
    const persistentStats = this.persistentCache.getStats();
    
    return {
      memory: memoryStats,
      persistent: persistentStats,
      hybrid: {
        totalHits: memoryStats.hits + persistentStats.hits,
        totalMisses: memoryStats.misses + persistentStats.misses,
        totalSets: memoryStats.sets + persistentStats.sets,
        totalDeletes: memoryStats.deletes + persistentStats.deletes,
        totalErrors: memoryStats.errors + persistentStats.errors,
        totalSize: memoryStats.totalSize + persistentStats.totalSize,
        totalEntryCount: memoryStats.entryCount + persistentStats.entryCount,
        hitRate: this.calculateHybridHitRate(memoryStats, persistentStats),
        memoryUsage: this.formatSize(memoryStats.totalSize + persistentStats.totalSize)
      }
    };
  }

  /**
   * Hybrid hit rate hesapla
   */
  calculateHybridHitRate(memoryStats, persistentStats) {
    const totalHits = memoryStats.hits + persistentStats.hits;
    const totalMisses = memoryStats.misses + persistentStats.misses;
    const totalRequests = totalHits + totalMisses;
    
    if (totalRequests === 0) return '0.00%';
    
    return ((totalHits / totalRequests) * 100).toFixed(2) + '%';
  }

  /**
   * Cache durumunu al (Hybrid)
   * @returns {object} Cache durumu
   */
  getStatus() {
    const memoryStatus = this.memoryCache.getStatus();
    const persistentStatus = this.persistentCache.getStatus();
    
    return {
      memory: memoryStatus,
      persistent: persistentStatus,
      hybrid: {
        isInitialized: this.isInitialized && memoryStatus.isInitialized && persistentStatus.isInitialized,
        isHealthy: memoryStatus.isHealthy && persistentStatus.isHealthy,
        totalEntryCount: memoryStatus.entryCount + persistentStatus.entryCount,
        totalSize: memoryStatus.totalSize + persistentStatus.totalSize,
        memoryUsage: this.formatSize(memoryStatus.totalSize + persistentStatus.totalSize)
      }
    };
  }

  /**
   * Cache sağlık kontrolü (Hybrid)
   * @returns {object} Sağlık durumu
   */
  getHealth() {
    const status = this.getStatus();
    const stats = this.getStats();
    
    return {
      isHealthy: status.hybrid.isHealthy,
      memoryUsage: status.hybrid.memoryUsage,
      hitRate: stats.hybrid.hitRate,
      entryCount: status.hybrid.totalEntryCount,
      errors: stats.hybrid.totalErrors,
      recommendations: this.getHybridRecommendations(stats)
    };
  }

  /**
   * Hybrid cache önerileri
   * @param {object} stats - Cache istatistikleri
   * @returns {array} Öneriler
   */
  getHybridRecommendations(stats) {
    const recommendations = [];
    
    // Hit rate kontrolü
    const hitRate = parseFloat(stats.hybrid.hitRate);
    if (hitRate < 50) {
      recommendations.push('Hybrid cache hit rate düşük (%50 altında). Cache stratejisini gözden geçirin.');
    }
    
    // Memory usage kontrolü
    const memoryUsagePercent = parseFloat(stats.memory.memoryUsagePercent);
    const persistentUsagePercent = parseFloat(stats.persistent.storageUsagePercent);
    
    if (memoryUsagePercent > 80) {
      recommendations.push('Memory cache kullanımı yüksek (%80 üzerinde). Temizleme gerekebilir.');
    }
    
    if (persistentUsagePercent > 80) {
      recommendations.push('Persistent cache kullanımı yüksek (%80 üzerinde). Temizleme gerekebilir.');
    }
    
    // Error kontrolü
    if (stats.hybrid.totalErrors > 0) {
      recommendations.push(`${stats.hybrid.totalErrors} cache hatası tespit edildi. Logları kontrol edin.`);
    }

    return recommendations;
  }

  /**
   * Boyutu formatla
   * @param {number} bytes - Byte cinsinden boyut
   * @returns {string} Formatlanmış boyut
   */
  formatSize(bytes) {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Cache servisini durdur (Hybrid)
   */
  destroy() {
    this.memoryCache.destroy();
    this.persistentCache.destroy();
    this.isInitialized = false;
    console.log('🛑 Hybrid Cache Service durduruldu');
  }
}

// Singleton instance
const hybridCache = new HybridCacheService();

export default hybridCache;
export { HybridCacheService };
