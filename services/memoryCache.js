// ========================================
// MEMORY CACHE SERVICE - RAM CACHE SİSTEMİ
// ========================================

import {
    CACHE_CLEANUP_CONFIG,
    CACHE_ERRORS,
    CACHE_STATS_INIT,
    MEMORY_CACHE_CONFIG
} from '../config/cacheConfig';
import memoryLeakProtection from './memoryLeakProtection';

/**
 * Memory Cache Entry
 * Her cache entry'si için veri yapısı
 */
class CacheEntry {
  constructor(data, ttl = MEMORY_CACHE_CONFIG.defaultTTL) {
    this.data = data;
    this.timestamp = Date.now();
    this.ttl = ttl;
    this.accessCount = 0;
    this.lastAccessed = Date.now();
    this.size = this.calculateSize();
  }

  /**
   * Entry boyutunu hesapla
   */
  calculateSize() {
    try {
      return JSON.stringify(this.data).length * 2; // Unicode karakterler için 2x
    } catch (error) {
      return 0;
    }
  }

  /**
   * Entry'nin geçerli olup olmadığını kontrol et
   */
  isValid() {
    return Date.now() - this.timestamp < this.ttl;
  }

  /**
   * Entry'ye erişim kaydet
   */
  access() {
    this.accessCount++;
    this.lastAccessed = Date.now();
  }

  /**
   * Entry'nin yaşını al (milisaniye)
   */
  getAge() {
    return Date.now() - this.timestamp;
  }
}

/**
 * Memory Cache Service
 * RAM'de hızlı cache yönetimi
 */
class MemoryCacheService {
  constructor() {
    this.cache = new Map();
    this.stats = { ...CACHE_STATS_INIT };
    this.cleanupInterval = null;
    this.isInitialized = false;
    this.leakProtection = memoryLeakProtection;
    
    console.log('🧠 Memory Cache Service başlatılıyor...');
    this.initialize();
  }

  /**
   * Cache servisini başlat
   */
  initialize() {
    if (this.isInitialized) {
      console.warn('⚠️ Memory Cache zaten başlatılmış');
      return;
    }

    // Otomatik temizleme başlat
    this.startCleanupInterval();
    
    // Memory leak protection başlat
    if (MEMORY_CACHE_CONFIG.enableLeakProtection) {
      this.leakProtection.initialize();
    }
    
    this.isInitialized = true;
    console.log('✅ Memory Cache Service başlatıldı');
    console.log(`📊 Maksimum boyut: ${this.formatSize(MEMORY_CACHE_CONFIG.maxSize)}`);
    console.log(`📊 Maksimum entry: ${MEMORY_CACHE_CONFIG.maxEntries}`);
    console.log(`🛡️ Leak protection: ${MEMORY_CACHE_CONFIG.enableLeakProtection ? 'Açık' : 'Kapalı'}`);
  }

  /**
   * Cache'e veri ekle
   * @param {string} key - Cache key
   * @param {any} data - Cache'lenecek veri
   * @param {number} ttl - Yaşam süresi (ms)
   * @returns {boolean} Başarı durumu
   */
  set(key, data, ttl = MEMORY_CACHE_CONFIG.defaultTTL) {
    try {
      // Key validation
      if (!key || typeof key !== 'string') {
        throw new Error(CACHE_ERRORS.INVALID_KEY);
      }

      // Data validation
      if (data === undefined || data === null) {
        throw new Error(CACHE_ERRORS.INVALID_DATA);
      }

      // Yeni entry oluştur
      const entry = new CacheEntry(data, ttl);
      
      // Boyut kontrolü
      if (entry.size > MEMORY_CACHE_CONFIG.maxSize) {
        console.warn(`⚠️ Entry çok büyük: ${this.formatSize(entry.size)}`);
        return false;
      }

      // Eski entry varsa boyutunu çıkar
      if (this.cache.has(key)) {
        const oldEntry = this.cache.get(key);
        this.stats.totalSize -= oldEntry.size;
        this.stats.entryCount--;
      }

      // Cache'e ekle
      this.cache.set(key, entry);
      
      // İstatistikleri güncelle
      this.stats.sets++;
      this.stats.totalSize += entry.size;
      this.stats.entryCount++;

      // Boyut kontrolü yap
      this.checkSizeLimit();

      console.log(`💾 Cache'e eklendi: ${key} (${this.formatSize(entry.size)})`);
      return true;

    } catch (error) {
      console.error('❌ Cache set hatası:', error.message);
      this.stats.errors++;
      return false;
    }
  }

  /**
   * Cache'den veri al
   * @param {string} key - Cache key
   * @returns {any|null} Cache'lenmiş veri veya null
   */
  get(key) {
    try {
      // Key validation
      if (!key || typeof key !== 'string') {
        throw new Error(CACHE_ERRORS.INVALID_KEY);
      }

      const entry = this.cache.get(key);
      
      if (!entry) {
        this.stats.misses++;
        return null;
      }

      // TTL kontrolü
      if (!entry.isValid()) {
        console.log(`⏰ Cache süresi doldu: ${key}`);
        this.delete(key);
        this.stats.misses++;
        return null;
      }

      // Erişim kaydet
      entry.access();
      this.stats.hits++;

      console.log(`🎯 Cache hit: ${key} (${entry.accessCount}. erişim)`);
      return entry.data;

    } catch (error) {
      console.error('❌ Cache get hatası:', error.message);
      this.stats.errors++;
      return null;
    }
  }

  /**
   * Cache'den veri sil
   * @param {string} key - Cache key
   * @returns {boolean} Başarı durumu
   */
  delete(key) {
    try {
      if (!key || typeof key !== 'string') {
        throw new Error(CACHE_ERRORS.INVALID_KEY);
      }

      const entry = this.cache.get(key);
      if (entry) {
        this.stats.totalSize -= entry.size;
        this.stats.entryCount--;
      }

      const deleted = this.cache.delete(key);
      if (deleted) {
        this.stats.deletes++;
        console.log(`🗑️ Cache'den silindi: ${key}`);
      }

      return deleted;

    } catch (error) {
      console.error('❌ Cache delete hatası:', error.message);
      this.stats.errors++;
      return false;
    }
  }

  /**
   * Cache'i temizle
   * @param {boolean} force - Zorla temizleme
   * @returns {number} Silinen entry sayısı
   */
  clear(force = false) {
    try {
      const deletedCount = this.cache.size;
      
      this.cache.clear();
      this.stats.totalSize = 0;
      this.stats.entryCount = 0;
      this.stats.cleanups++;

      console.log(`🧹 Cache temizlendi: ${deletedCount} entry silindi`);
      return deletedCount;

    } catch (error) {
      console.error('❌ Cache clear hatası:', error.message);
      this.stats.errors++;
      return 0;
    }
  }

  /**
   * Belirli bir kategoriye ait cache'leri temizle
   * @param {string} category - Kategori adı
   * @returns {number} Silinen entry sayısı
   */
  clearCategory(category) {
    try {
      if (!category || typeof category !== 'string') {
        throw new Error('Geçersiz kategori adı');
      }

      const categoryPrefix = `${category}/`;
      const keysToDelete = [];
      let deletedSize = 0;

      // Kategoriye ait key'leri bul
      for (const [key, entry] of this.cache.entries()) {
        if (key.startsWith(categoryPrefix)) {
          keysToDelete.push(key);
          deletedSize += entry.size;
        }
      }

      // Key'leri sil
      keysToDelete.forEach(key => {
        this.cache.delete(key);
        this.stats.entryCount--;
        this.stats.totalSize -= this.cache.get(key)?.size || 0;
      });

      this.stats.cleanups++;
      console.log(`🧹 Kategori temizlendi: ${category} (${keysToDelete.length} entry, ${this.formatSize(deletedSize)})`);
      return keysToDelete.length;

    } catch (error) {
      console.error('❌ Cache kategori temizleme hatası:', error.message);
      this.stats.errors++;
      return 0;
    }
  }

  /**
   * Cache boyut kontrolü
   */
  checkSizeLimit() {
    // Boyut kontrolü
    if (this.stats.totalSize > MEMORY_CACHE_CONFIG.maxSize) {
      console.log('⚠️ Cache boyutu aşıldı, temizleme başlatılıyor...');
      this.cleanupBySize();
    }

    // Entry sayısı kontrolü
    if (this.stats.entryCount > MEMORY_CACHE_CONFIG.maxEntries) {
      console.log('⚠️ Maksimum entry sayısı aşıldı, temizleme başlatılıyor...');
      this.cleanupByCount();
    }
  }

  /**
   * Boyuta göre temizleme (LRU)
   */
  cleanupBySize() {
    const entries = Array.from(this.cache.entries());
    
    // Son erişim zamanına göre sırala (LRU)
    entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
    
    let deletedSize = 0;
    const targetSize = MEMORY_CACHE_CONFIG.maxSize * MEMORY_CACHE_CONFIG.cleanupThreshold;
    
    for (const [key, entry] of entries) {
      if (this.stats.totalSize - deletedSize <= targetSize) break;
      
      this.delete(key);
      deletedSize += entry.size;
    }

    console.log(`🧹 Boyut temizleme tamamlandı: ${this.formatSize(deletedSize)} silindi`);
  }

  /**
   * Entry sayısına göre temizleme (LRU)
   */
  cleanupByCount() {
    const entries = Array.from(this.cache.entries());
    
    // Son erişim zamanına göre sırala (LRU)
    entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
    
    const targetCount = MEMORY_CACHE_CONFIG.maxEntries * MEMORY_CACHE_CONFIG.cleanupThreshold;
    const toDelete = this.stats.entryCount - targetCount;
    
    for (let i = 0; i < toDelete && i < entries.length; i++) {
      this.delete(entries[i][0]);
    }

    console.log(`🧹 Entry temizleme tamamlandı: ${toDelete} entry silindi`);
  }

  /**
   * Otomatik temizleme başlat
   */
  startCleanupInterval() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    this.cleanupInterval = setInterval(() => {
      this.cleanupExpired();
    }, CACHE_CLEANUP_CONFIG.interval);

    console.log(`⏰ Otomatik temizleme başlatıldı: ${CACHE_CLEANUP_CONFIG.interval / 1000}s`);
  }

  /**
   * Süresi dolmuş entry'leri temizle
   */
  cleanupExpired() {
    const now = Date.now();
    const expiredKeys = [];

    for (const [key, entry] of this.cache.entries()) {
      if (!entry.isValid()) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => this.delete(key));
    
    if (expiredKeys.length > 0) {
      console.log(`🧹 Süresi dolmuş entry'ler temizlendi: ${expiredKeys.length}`);
    }
  }

  /**
   * Cache istatistiklerini al
   * @returns {object} Cache istatistikleri
   */
  getStats() {
    const hitRate = this.stats.hits + this.stats.misses > 0 
      ? (this.stats.hits / (this.stats.hits + this.stats.misses) * 100).toFixed(2)
      : 0;

    return {
      ...this.stats,
      hitRate: `${hitRate}%`,
      averageEntrySize: this.stats.entryCount > 0 
        ? Math.round(this.stats.totalSize / this.stats.entryCount)
        : 0,
      memoryUsage: this.formatSize(this.stats.totalSize),
      maxMemory: this.formatSize(MEMORY_CACHE_CONFIG.maxSize),
      memoryUsagePercent: ((this.stats.totalSize / MEMORY_CACHE_CONFIG.maxSize) * 100).toFixed(2) + '%'
    };
  }

  /**
   * Cache durumunu al
   * @returns {object} Cache durumu
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      entryCount: this.stats.entryCount,
      totalSize: this.stats.totalSize,
      memoryUsage: this.formatSize(this.stats.totalSize),
      isHealthy: this.stats.totalSize < MEMORY_CACHE_CONFIG.maxSize && 
                 this.stats.entryCount < MEMORY_CACHE_CONFIG.maxEntries
    };
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
   * Cache servisini durdur
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }

    this.clear();
    this.isInitialized = false;
    console.log('🛑 Memory Cache Service durduruldu');
  }
}

// Singleton instance
const memoryCache = new MemoryCacheService();

export default memoryCache;
export { CacheEntry, MemoryCacheService };

