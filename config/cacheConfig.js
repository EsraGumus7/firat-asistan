// ========================================
// CACHE CONFIGURATION - MEMORY CACHE SİSTEMİ
// ========================================

// Cache türleri
export const CACHE_TYPES = {
  MEMORY: 'memory',
  PERSISTENT: 'persistent',
  NETWORK: 'network'
};

// Cache kategorileri ve TTL süreleri (milisaniye)
// Optimize edilmiş süreler - gerçek kullanım senaryolarına göre
export const CACHE_DURATIONS = {
  // Yemek menüsü - 2 saat (gün içinde değişmez)
  food: 2 * 60 * 60 * 1000,
  
  // Ana üniversite verileri - 30 dakika (sık güncellenir)
  main: 30 * 60 * 1000,
  
  // Kütüphane verileri - 4 saat (nadiren değişir)
  library: 4 * 60 * 60 * 1000,
  
  // Fakülte duyuruları - 1 saat (orta sıklıkta güncellenir)
  faculty_announcements: 60 * 60 * 1000,
  
  // Sistem verileri - 10 dakika (sık kontrol edilir)
  system: 10 * 60 * 1000,
  
  // Kullanıcı profili - 30 dakika (orta sıklıkta güncellenir)
  user_profile: 30 * 60 * 1000,
  
  // Ayarlar - 6 saat (nadiren değişir)
  settings: 6 * 60 * 60 * 1000,
  
  // Test verileri - 5 dakika (hızlı test için)
  test: 5 * 60 * 1000,
  
  // API yanıtları - 15 dakika (genel API cache)
  api: 15 * 60 * 1000,
  
  // Varsayılan - 15 dakika (güvenli orta süre)
  default: 15 * 60 * 1000
};

// Memory cache ayarları - Optimize edilmiş
export const MEMORY_CACHE_CONFIG = {
  // Maksimum cache boyutu (100MB) - artırıldı
  maxSize: 100 * 1024 * 1024,
  
  // Varsayılan TTL (15 dakika) - optimize edildi
  defaultTTL: 15 * 60 * 1000,
  
  // LRU temizleme eşiği (%75) - daha agresif temizleme
  cleanupThreshold: 0.75,
  
  // Maksimum entry sayısı (2000) - artırıldı
  maxEntries: 2000,
  
  // Cache istatistikleri
  enableStats: true,
  
  // Otomatik temizleme sıklığı (2 dakika)
  cleanupInterval: 2 * 60 * 1000,
  
  // Memory leak koruması
  enableLeakProtection: true
};

// Persistent cache ayarları (AsyncStorage) - Optimize edilmiş
export const PERSISTENT_CACHE_CONFIG = {
  // Maksimum cache boyutu (500MB) - artırıldı
  maxSize: 500 * 1024 * 1024,
  
  // Varsayılan TTL (48 saat) - uzatıldı
  defaultTTL: 48 * 60 * 60 * 1000,
  
  // LRU temizleme eşiği (%85) - daha az agresif
  cleanupThreshold: 0.85,
  
  // Veri sıkıştırma - optimize edildi
  compression: true,
  compressionLevel: 6, // 1-9 arası, 6 optimal
  
  // Cache istatistikleri
  enableStats: true,
  
  // Otomatik temizleme sıklığı (10 dakika)
  cleanupInterval: 10 * 60 * 1000,
  
  // Metadata yedekleme
  enableMetadataBackup: true,
  
  // Veri bütünlüğü kontrolü
  enableIntegrityCheck: true
};

// Cache stratejileri
export const CACHE_STRATEGIES = {
  // Cache-first: Önce cache'den kontrol et
  CACHE_FIRST: 'cache_first',
  
  // Network-first: Önce network'ten al
  NETWORK_FIRST: 'network_first',
  
  // Stale-while-revalidate: Cache'i göster, arka planda güncelle
  STALE_WHILE_REVALIDATE: 'stale_while_revalidate'
};

// Cache key prefix'leri
export const CACHE_PREFIXES = {
  API: 'api_cache_',
  IMAGE: 'image_cache_',
  USER: 'user_cache_',
  SETTING: 'setting_cache_'
};

// Cache istatistikleri
export const CACHE_STATS_INIT = {
  hits: 0,
  misses: 0,
  sets: 0,
  deletes: 0,
  cleanups: 0,
  errors: 0,
  totalSize: 0,
  entryCount: 0
};

// Hata mesajları
export const CACHE_ERRORS = {
  INVALID_KEY: 'Geçersiz cache key',
  INVALID_DATA: 'Geçersiz cache verisi',
  SIZE_EXCEEDED: 'Cache boyutu aşıldı',
  TTL_EXPIRED: 'Cache süresi doldu',
  STORAGE_FULL: 'Depolama alanı dolu',
  NETWORK_ERROR: 'Network hatası'
};

// Cache temizleme ayarları - Optimize edilmiş
export const CACHE_CLEANUP_CONFIG = {
  // Otomatik temizleme aralığı (3 dakika) - daha sık
  interval: 3 * 60 * 1000,
  
  // Temizleme batch boyutu (50) - optimize edildi
  batchSize: 50,
  
  // Eski entry'leri temizleme eşiği (30 dakika) - daha agresif
  oldEntryThreshold: 30 * 60 * 1000,
  
  // Akıllı temizleme algoritması
  smartCleanup: true,
  
  // Memory pressure kontrolü
  enableMemoryPressureDetection: true,
  memoryPressureThreshold: 0.9, // %90 dolunca agresif temizleme
  
  // Temizleme öncelikleri
  cleanupPriorities: {
    high: ['temp', 'test'], // Yüksek öncelik (hemen sil)
    medium: ['api', 'main'], // Orta öncelik
    low: ['user_profile', 'settings'] // Düşük öncelik (son sil)
  },
  
  // Korunacak entry'ler
  protectedEntries: ['user_profile', 'settings', 'system']
};

export default {
  CACHE_TYPES,
  CACHE_DURATIONS,
  MEMORY_CACHE_CONFIG,
  CACHE_STRATEGIES,
  CACHE_PREFIXES,
  CACHE_STATS_INIT,
  CACHE_ERRORS,
  CACHE_CLEANUP_CONFIG
};
