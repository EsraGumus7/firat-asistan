/**
 * API Key Rotation Service - API anahtarlarını güvenli şekilde döndürür
 * Otomatik key rotation, key validation ve key management
 */

// ========================================
// API KEY ROTATION CONFIGURATION
// ========================================

const ROTATION_CONFIG = {
  // Rotation intervals (milliseconds)
  intervals: {
    primary: 24 * 60 * 60 * 1000,    // 24 saat
    secondary: 7 * 24 * 60 * 60 * 1000, // 7 gün
    emergency: 60 * 60 * 1000        // 1 saat (acil durum)
  },
  
  // Key validation
  validation: {
    minLength: 32,
    maxLength: 128,
    requireSpecialChars: true,
    requireNumbers: true,
    requireUppercase: true,
    requireLowercase: true
  },
  
  // Key storage
  storage: {
    prefix: 'api_key_',
    backupPrefix: 'api_key_backup_',
    rotationLogPrefix: 'rotation_log_'
  }
};

// ========================================
// API KEY ROTATION SERVICE
// ========================================

class ApiKeyRotationService {
  constructor() {
    this.keys = new Map();
    this.rotationLog = [];
    this.isRotating = false;
    this.rotationCallbacks = [];
  }

  /**
   * API key oluştur
   */
  generateApiKey(type = 'primary', length = 64) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let key = '';
    
    for (let i = 0; i < length; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    // Key validation
    if (!this.validateApiKey(key)) {
      return this.generateApiKey(type, length); // Retry if invalid
    }
    
    return {
      key,
      type,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + ROTATION_CONFIG.intervals[type] || ROTATION_CONFIG.intervals.primary),
      isActive: true,
      usageCount: 0,
      lastUsed: null
    };
  }

  /**
   * API key validation
   */
  validateApiKey(key) {
    const config = ROTATION_CONFIG.validation;
    
    if (!key || typeof key !== 'string') return false;
    if (key.length < config.minLength || key.length > config.maxLength) return false;
    
    if (config.requireUppercase && !/[A-Z]/.test(key)) return false;
    if (config.requireLowercase && !/[a-z]/.test(key)) return false;
    if (config.requireNumbers && !/[0-9]/.test(key)) return false;
    if (config.requireSpecialChars && !/[!@#$%^&*]/.test(key)) return false;
    
    return true;
  }

  /**
   * API key kaydet
   */
  async storeApiKey(keyId, keyData) {
    try {
      // Mevcut key'i backup'la
      const existingKey = this.keys.get(keyId);
      if (existingKey) {
        await this.backupApiKey(keyId, existingKey);
      }
      
      // Yeni key'i kaydet
      this.keys.set(keyId, keyData);
      
      // Local storage'a kaydet (React Native için AsyncStorage)
      if (typeof global !== 'undefined' && global.AsyncStorage) {
        await global.AsyncStorage.setItem(
          `${ROTATION_CONFIG.storage.prefix}${keyId}`,
          JSON.stringify(keyData)
        );
      }
      
      // Rotation log'a kaydet
      this.logRotation(keyId, 'key_stored', keyData);
      
      return true;
    } catch (error) {
      console.error('❌ API key storage failed:', error);
      return false;
    }
  }

  /**
   * API key al
   */
  async getApiKey(keyId) {
    try {
      // Memory'den al
      let keyData = this.keys.get(keyId);
      
      if (!keyData) {
        // Local storage'dan al
        if (typeof global !== 'undefined' && global.AsyncStorage) {
          const stored = await global.AsyncStorage.getItem(`${ROTATION_CONFIG.storage.prefix}${keyId}`);
          if (stored) {
            keyData = JSON.parse(stored);
            this.keys.set(keyId, keyData);
          }
        }
      }
      
      if (!keyData) {
        throw new Error(`API key not found: ${keyId}`);
      }
      
      // Key expiration kontrolü
      if (new Date() > new Date(keyData.expiresAt)) {
        console.warn(`⚠️ API key expired: ${keyId}`);
        await this.rotateApiKey(keyId);
        return this.getApiKey(keyId); // Recursive call with new key
      }
      
      // Usage tracking
      keyData.usageCount++;
      keyData.lastUsed = new Date();
      
      return keyData;
    } catch (error) {
      console.error('❌ API key retrieval failed:', error);
      throw error;
    }
  }

  /**
   * API key rotate et
   */
  async rotateApiKey(keyId, force = false) {
    if (this.isRotating) {
      console.warn('⚠️ Rotation already in progress');
      return false;
    }
    
    this.isRotating = true;
    
    try {
      console.log(`🔄 Rotating API key: ${keyId}`);
      
      // Mevcut key'i al
      const currentKey = await this.getApiKey(keyId);
      
      // Yeni key oluştur
      const newKey = this.generateApiKey(currentKey.type);
      
      // Yeni key'i kaydet
      await this.storeApiKey(keyId, newKey);
      
      // Rotation callback'lerini çağır
      this.rotationCallbacks.forEach(callback => {
        try {
          callback(keyId, currentKey, newKey);
        } catch (error) {
          console.error('❌ Rotation callback failed:', error);
        }
      });
      
      // Rotation log'a kaydet
      this.logRotation(keyId, 'key_rotated', { from: currentKey, to: newKey });
      
      console.log(`✅ API key rotated successfully: ${keyId}`);
      return true;
      
    } catch (error) {
      console.error('❌ API key rotation failed:', error);
      return false;
    } finally {
      this.isRotating = false;
    }
  }

  /**
   * API key backup'la
   */
  async backupApiKey(keyId, keyData) {
    try {
      const backupKey = `${ROTATION_CONFIG.storage.backupPrefix}${keyId}_${Date.now()}`;
      
      if (typeof global !== 'undefined' && global.AsyncStorage) {
        await global.AsyncStorage.setItem(backupKey, JSON.stringify(keyData));
      }
      
      console.log(`💾 API key backed up: ${keyId}`);
      return true;
    } catch (error) {
      console.error('❌ API key backup failed:', error);
      return false;
    }
  }

  /**
   * Rotation log kaydet
   */
  logRotation(keyId, action, data) {
    const logEntry = {
      keyId,
      action,
      timestamp: new Date(),
      data: {
        ...data,
        // Sensitive data'yı maskele
        key: data.key ? this.maskApiKey(data.key) : undefined
      }
    };
    
    this.rotationLog.push(logEntry);
    
    // Log'u local storage'a kaydet
    if (typeof global !== 'undefined' && global.AsyncStorage) {
      const logKey = `${ROTATION_CONFIG.storage.rotationLogPrefix}${Date.now()}`;
      global.AsyncStorage.setItem(logKey, JSON.stringify(logEntry));
    }
    
    // Log boyutunu sınırla
    if (this.rotationLog.length > 100) {
      this.rotationLog = this.rotationLog.slice(-50);
    }
  }

  /**
   * API key'i maskele (güvenlik için)
   */
  maskApiKey(key) {
    if (!key || key.length < 8) return '***';
    return key.substring(0, 4) + '***' + key.substring(key.length - 4);
  }

  /**
   * Rotation callback ekle
   */
  onRotation(callback) {
    this.rotationCallbacks.push(callback);
  }

  /**
   * Otomatik rotation başlat
   */
  startAutoRotation(keyId, interval = ROTATION_CONFIG.intervals.primary) {
    const rotationInterval = setInterval(async () => {
      try {
        await this.rotateApiKey(keyId);
      } catch (error) {
        console.error('❌ Auto rotation failed:', error);
      }
    }, interval);
    
    console.log(`🔄 Auto rotation started for ${keyId} (${interval}ms)`);
    return rotationInterval;
  }

  /**
   * Otomatik rotation durdur
   */
  stopAutoRotation(intervalId) {
    if (intervalId) {
      clearInterval(intervalId);
      console.log('🛑 Auto rotation stopped');
    }
  }

  /**
   * Rotation istatistikleri
   */
  getRotationStats() {
    return {
      totalKeys: this.keys.size,
      rotationLogCount: this.rotationLog.length,
      isRotating: this.isRotating,
      lastRotation: this.rotationLog[this.rotationLog.length - 1]?.timestamp,
      rotationCallbacks: this.rotationCallbacks.length
    };
  }

  /**
   * Tüm key'leri temizle
   */
  async clearAllKeys() {
    try {
      this.keys.clear();
      this.rotationLog = [];
      
      if (typeof global !== 'undefined' && global.AsyncStorage) {
        const keys = await global.AsyncStorage.getAllKeys();
        const apiKeys = keys.filter(key => 
          key.startsWith(ROTATION_CONFIG.storage.prefix) ||
          key.startsWith(ROTATION_CONFIG.storage.backupPrefix) ||
          key.startsWith(ROTATION_CONFIG.storage.rotationLogPrefix)
        );
        
        await global.AsyncStorage.multiRemove(apiKeys);
      }
      
      console.log('🗑️ All API keys cleared');
      return true;
    } catch (error) {
      console.error('❌ Clear keys failed:', error);
      return false;
    }
  }
}

// ========================================
// SINGLETON INSTANCE
// ========================================

const apiKeyRotationService = new ApiKeyRotationService();

// ========================================
// EXPORTS
// ========================================

export default apiKeyRotationService;

export const generateApiKey = (type, length) => {
  return apiKeyRotationService.generateApiKey(type, length);
};

export const storeApiKey = (keyId, keyData) => {
  return apiKeyRotationService.storeApiKey(keyId, keyData);
};

export const getApiKey = (keyId) => {
  return apiKeyRotationService.getApiKey(keyId);
};

export const rotateApiKey = (keyId, force) => {
  return apiKeyRotationService.rotateApiKey(keyId, force);
};

export const startAutoRotation = (keyId, interval) => {
  return apiKeyRotationService.startAutoRotation(keyId, interval);
};

export const stopAutoRotation = (intervalId) => {
  return apiKeyRotationService.stopAutoRotation(intervalId);
};

export const getRotationStats = () => {
  return apiKeyRotationService.getRotationStats();
};

export const onRotation = (callback) => {
  return apiKeyRotationService.onRotation(callback);
};
