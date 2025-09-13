// ========================================
// PERSISTENT CACHE SERVICE - ASYNCSTORAGE CACHE
// ========================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    CACHE_CLEANUP_CONFIG,
    CACHE_ERRORS,
    CACHE_STATS_INIT,
    PERSISTENT_CACHE_CONFIG
} from '../config/cacheConfig';

/**
 * Persistent Cache Entry
 * AsyncStorage'da saklanan veri yapısı
 */
class PersistentCacheEntry {
  constructor(data, ttl = PERSISTENT_CACHE_CONFIG.defaultTTL) {
    this.data = data;
    this.timestamp = Date.now();
    this.ttl = ttl;
    this.accessCount = 0;
    this.lastAccessed = Date.now();
    this.size = this.calculateSize();
    this.compressed = false;
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

  /**
   * Veriyi sıkıştır (basit string sıkıştırma)
   */
  compress() {
    try {
      if (this.compressed) return true;
      
      const jsonString = JSON.stringify(this.data);
      // Basit sıkıştırma: tekrarlayan karakterleri kısalt
      const compressed = jsonString
        .replace(/(.)\1{2,}/g, (match, char) => `${char}*${match.length}`)
        .replace(/\s+/g, ' '); // Fazla boşlukları kısalt
      
      this.data = compressed;
      this.compressed = true;
      this.size = compressed.length * 2;
      return true;
    } catch (error) {
      console.warn('⚠️ Veri sıkıştırma hatası:', error);
      return false;
    }
  }

  /**
   * Veriyi aç (sıkıştırılmış veriyi geri döndür)
   */
  decompress() {
    try {
      if (!this.compressed) return true;
      
      let decompressed = this.data;
      // Sıkıştırılmış veriyi aç
      decompressed = decompressed
        .replace(/(.)\*(\d+)/g, (match, char, count) => char.repeat(parseInt(count)))
        .replace(/\s+/g, ' '); // Boşlukları düzenle
      
      this.data = JSON.parse(decompressed);
      this.compressed = false;
      this.size = this.calculateSize();
      return true;
    } catch (error) {
      console.warn('⚠️ Veri açma hatası:', error);
      return false;
    }
  }
}

/**
 * Persistent Cache Service
 * AsyncStorage tabanlı kalıcı cache yönetimi
 */
class PersistentCacheService {
  constructor() {
    this.stats = { ...CACHE_STATS_INIT };
    this.cleanupInterval = null;
    this.isInitialized = false;
    this.storageKey = 'persistent_cache_';
    this.metadataKey = 'persistent_cache_metadata';
    
    console.log('💾 Persistent Cache Service başlatılıyor...');
    this.initialize();
  }

  /**
   * Cache servisini başlat
   */
  async initialize() {
    if (this.isInitialized) {
      console.warn('⚠️ Persistent Cache zaten başlatılmış');
      return;
    }

    try {
      // Metadata'yı yükle
      await this.loadMetadata();
      
      // Otomatik temizleme başlat
      this.startCleanupInterval();
      
      this.isInitialized = true;
      console.log('✅ Persistent Cache Service başlatıldı');
      console.log(`📊 Maksimum boyut: ${this.formatSize(PERSISTENT_CACHE_CONFIG.maxSize)}`);
      console.log(`📊 Sıkıştırma: ${PERSISTENT_CACHE_CONFIG.compression ? 'Açık' : 'Kapalı'}`);
      
    } catch (error) {
      console.error('❌ Persistent Cache başlatma hatası:', error);
      this.stats.errors++;
    }
  }

  /**
   * Metadata'yı yükle
   */
  async loadMetadata() {
    try {
      const metadata = await AsyncStorage.getItem(this.metadataKey);
      if (metadata) {
        const parsed = JSON.parse(metadata);
        this.stats = { ...CACHE_STATS_INIT, ...parsed };
        console.log('📊 Metadata yüklendi:', this.stats);
      }
    } catch (error) {
      console.warn('⚠️ Metadata yükleme hatası:', error);
      this.stats = { ...CACHE_STATS_INIT };
    }
  }

  /**
   * Metadata'yı kaydet
   */
  async saveMetadata() {
    try {
      await AsyncStorage.setItem(this.metadataKey, JSON.stringify(this.stats));
    } catch (error) {
      console.warn('⚠️ Metadata kaydetme hatası:', error);
    }
  }

  /**
   * Cache'e veri ekle
   * @param {string} key - Cache key
   * @param {any} data - Cache'lenecek veri
   * @param {number} ttl - Yaşam süresi (ms)
   * @returns {boolean} Başarı durumu
   */
  async set(key, data, ttl = PERSISTENT_CACHE_CONFIG.defaultTTL) {
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
      const entry = new PersistentCacheEntry(data, ttl);
      
      // Boyut kontrolü
      if (entry.size > PERSISTENT_CACHE_CONFIG.maxSize) {
        console.warn(`⚠️ Entry çok büyük: ${this.formatSize(entry.size)}`);
        return false;
      }

      // Sıkıştırma uygula
      if (PERSISTENT_CACHE_CONFIG.compression) {
        entry.compress();
      }

      // Eski entry varsa boyutunu çıkar
      const oldEntry = await this.getEntry(key);
      if (oldEntry) {
        this.stats.totalSize -= oldEntry.size;
        this.stats.entryCount--;
      }

      // AsyncStorage'a kaydet
      const storageKey = this.storageKey + key;
      await AsyncStorage.setItem(storageKey, JSON.stringify(entry));
      
      // İstatistikleri güncelle
      this.stats.sets++;
      this.stats.totalSize += entry.size;
      this.stats.entryCount++;
      
      // Metadata'yı kaydet
      await this.saveMetadata();

      // Boyut kontrolü yap
      await this.checkSizeLimit();

      console.log(`💾 Persistent cache'e eklendi: ${key} (${this.formatSize(entry.size)})`);
      return true;

    } catch (error) {
      console.error('❌ Persistent cache set hatası:', error.message);
      this.stats.errors++;
      return false;
    }
  }

  /**
   * Cache'den veri al
   * @param {string} key - Cache key
   * @returns {any|null} Cache'lenmiş veri veya null
   */
  async get(key) {
    try {
      // Key validation
      if (!key || typeof key !== 'string') {
        throw new Error(CACHE_ERRORS.INVALID_KEY);
      }

      const entry = await this.getEntry(key);
      
      if (!entry) {
        this.stats.misses++;
        await this.saveMetadata();
        return null;
      }

      // TTL kontrolü
      if (!entry.isValid()) {
        console.log(`⏰ Persistent cache süresi doldu: ${key}`);
        await this.delete(key);
        this.stats.misses++;
        await this.saveMetadata();
        return null;
      }

      // Sıkıştırılmış veriyi aç
      if (entry.compressed) {
        entry.decompress();
      }

      // Erişim kaydet
      entry.access();
      this.stats.hits++;

      // Güncellenmiş entry'yi kaydet
      const storageKey = this.storageKey + key;
      await AsyncStorage.setItem(storageKey, JSON.stringify(entry));
      await this.saveMetadata();

      console.log(`🎯 Persistent cache hit: ${key} (${entry.accessCount}. erişim)`);
      return entry.data;

    } catch (error) {
      console.error('❌ Persistent cache get hatası:', error.message);
      this.stats.errors++;
      await this.saveMetadata();
      return null;
    }
  }

  /**
   * Entry'yi AsyncStorage'dan al
   * @param {string} key - Cache key
   * @returns {PersistentCacheEntry|null} Entry veya null
   */
  async getEntry(key) {
    try {
      const storageKey = this.storageKey + key;
      const entryData = await AsyncStorage.getItem(storageKey);
      
      if (!entryData) return null;
      
      const parsed = JSON.parse(entryData);
      const entry = new PersistentCacheEntry(parsed.data, parsed.ttl);
      entry.accessCount = parsed.accessCount || 0;
      entry.lastAccessed = parsed.lastAccessed || parsed.timestamp;
      entry.compressed = parsed.compressed || false;
      entry.timestamp = parsed.timestamp;
      
      return entry;
    } catch (error) {
      console.warn('⚠️ Entry alma hatası:', error);
      return null;
    }
  }

  /**
   * Cache'den veri sil
   * @param {string} key - Cache key
   * @returns {boolean} Başarı durumu
   */
  async delete(key) {
    try {
      if (!key || typeof key !== 'string') {
        throw new Error(CACHE_ERRORS.INVALID_KEY);
      }

      const entry = await this.getEntry(key);
      if (entry) {
        this.stats.totalSize -= entry.size;
        this.stats.entryCount--;
      }

      const storageKey = this.storageKey + key;
      await AsyncStorage.removeItem(storageKey);
      
      this.stats.deletes++;
      await this.saveMetadata();

      console.log(`🗑️ Persistent cache'den silindi: ${key}`);
      return true;

    } catch (error) {
      console.error('❌ Persistent cache delete hatası:', error.message);
      this.stats.errors++;
      await this.saveMetadata();
      return false;
    }
  }

  /**
   * Cache'i temizle
   * @param {boolean} force - Zorla temizleme
   * @returns {number} Silinen entry sayısı
   */
  async clear(force = false) {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.storageKey));
      
      const deletedCount = cacheKeys.length;
      
      // Cache key'lerini sil
      await AsyncStorage.multiRemove(cacheKeys);
      
      // Metadata'yı sıfırla
      this.stats.totalSize = 0;
      this.stats.entryCount = 0;
      this.stats.cleanups++;
      
      await this.saveMetadata();

      console.log(`🧹 Persistent cache temizlendi: ${deletedCount} entry silindi`);
      return deletedCount;

    } catch (error) {
      console.error('❌ Persistent cache clear hatası:', error.message);
      this.stats.errors++;
      await this.saveMetadata();
      return 0;
    }
  }

  /**
   * Belirli bir kategoriye ait cache'leri temizle
   * @param {string} category - Kategori adı
   * @returns {number} Silinen entry sayısı
   */
  async clearCategory(category) {
    try {
      if (!category || typeof category !== 'string') {
        throw new Error('Geçersiz kategori adı');
      }

      const categoryPrefix = `${category}/`;
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.storageKey));
      
      const keysToDelete = [];
      let deletedSize = 0;

      // Kategoriye ait key'leri bul
      for (const key of cacheKeys) {
        const entryKey = key.replace(this.storageKey, '');
        if (entryKey.startsWith(categoryPrefix)) {
          keysToDelete.push(key);
          const entry = await this.getEntry(entryKey);
          if (entry) {
            deletedSize += entry.size;
          }
        }
      }

      // Key'leri sil
      if (keysToDelete.length > 0) {
        await AsyncStorage.multiRemove(keysToDelete);
        this.stats.entryCount -= keysToDelete.length;
        this.stats.totalSize -= deletedSize;
        this.stats.cleanups++;
        await this.saveMetadata();
      }

      console.log(`🧹 Persistent kategori temizlendi: ${category} (${keysToDelete.length} entry, ${this.formatSize(deletedSize)})`);
      return keysToDelete.length;

    } catch (error) {
      console.error('❌ Persistent cache kategori temizleme hatası:', error.message);
      this.stats.errors++;
      await this.saveMetadata();
      return 0;
    }
  }

  /**
   * Cache boyut kontrolü
   */
  async checkSizeLimit() {
    // Boyut kontrolü
    if (this.stats.totalSize > PERSISTENT_CACHE_CONFIG.maxSize) {
      console.log('⚠️ Persistent cache boyutu aşıldı, temizleme başlatılıyor...');
      await this.cleanupBySize();
    }

    // Entry sayısı kontrolü
    if (this.stats.entryCount > 1000) { // AsyncStorage için makul limit
      console.log('⚠️ Maksimum entry sayısı aşıldı, temizleme başlatılıyor...');
      await this.cleanupByCount();
    }
  }

  /**
   * Boyuta göre temizleme (LRU)
   */
  async cleanupBySize() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.storageKey));
      
      const entries = [];
      for (const key of cacheKeys) {
        const entry = await this.getEntry(key.replace(this.storageKey, ''));
        if (entry) {
          entries.push([key.replace(this.storageKey, ''), entry]);
        }
      }
      
      // Son erişim zamanına göre sırala (LRU)
      entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
      
      let deletedSize = 0;
      const targetSize = PERSISTENT_CACHE_CONFIG.maxSize * PERSISTENT_CACHE_CONFIG.cleanupThreshold;
      
      for (const [key, entry] of entries) {
        if (this.stats.totalSize - deletedSize <= targetSize) break;
        
        await this.delete(key);
        deletedSize += entry.size;
      }

      console.log(`🧹 Persistent cache boyut temizleme tamamlandı: ${this.formatSize(deletedSize)} silindi`);
      
    } catch (error) {
      console.error('❌ Boyut temizleme hatası:', error);
    }
  }

  /**
   * Entry sayısına göre temizleme (LRU)
   */
  async cleanupByCount() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.storageKey));
      
      const entries = [];
      for (const key of cacheKeys) {
        const entry = await this.getEntry(key.replace(this.storageKey, ''));
        if (entry) {
          entries.push([key.replace(this.storageKey, ''), entry]);
        }
      }
      
      // Son erişim zamanına göre sırala (LRU)
      entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
      
      const targetCount = 1000 * PERSISTENT_CACHE_CONFIG.cleanupThreshold;
      const toDelete = this.stats.entryCount - targetCount;
      
      for (let i = 0; i < toDelete && i < entries.length; i++) {
        await this.delete(entries[i][0]);
      }

      console.log(`🧹 Persistent cache entry temizleme tamamlandı: ${toDelete} entry silindi`);
      
    } catch (error) {
      console.error('❌ Entry temizleme hatası:', error);
    }
  }

  /**
   * Otomatik temizleme başlat
   */
  startCleanupInterval() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    this.cleanupInterval = setInterval(async () => {
      await this.cleanupExpired();
    }, CACHE_CLEANUP_CONFIG.interval);

    console.log(`⏰ Persistent cache otomatik temizleme başlatıldı: ${CACHE_CLEANUP_CONFIG.interval / 1000}s`);
  }

  /**
   * Süresi dolmuş entry'leri temizle
   */
  async cleanupExpired() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.storageKey));
      
      const expiredKeys = [];
      
      for (const key of cacheKeys) {
        const entry = await this.getEntry(key.replace(this.storageKey, ''));
        if (entry && !entry.isValid()) {
          expiredKeys.push(key.replace(this.storageKey, ''));
        }
      }
      
      for (const key of expiredKeys) {
        await this.delete(key);
      }
      
      if (expiredKeys.length > 0) {
        console.log(`🧹 Persistent cache süresi dolmuş entry'ler temizlendi: ${expiredKeys.length}`);
      }
      
    } catch (error) {
      console.error('❌ Süresi dolmuş entry temizleme hatası:', error);
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
      storageUsage: this.formatSize(this.stats.totalSize),
      maxStorage: this.formatSize(PERSISTENT_CACHE_CONFIG.maxSize),
      storageUsagePercent: ((this.stats.totalSize / PERSISTENT_CACHE_CONFIG.maxSize) * 100).toFixed(2) + '%'
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
      storageUsage: this.formatSize(this.stats.totalSize),
      isHealthy: this.stats.totalSize < PERSISTENT_CACHE_CONFIG.maxSize && 
                 this.stats.entryCount < 1000
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

    this.isInitialized = false;
    console.log('🛑 Persistent Cache Service durduruldu');
  }
}

// Singleton instance
const persistentCache = new PersistentCacheService();

export default persistentCache;
export { PersistentCacheEntry, PersistentCacheService };
