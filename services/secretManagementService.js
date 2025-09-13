/**
 * Secret Management Service - Hassas verileri güvenli şekilde yönetir
 * Encryption, decryption, secure storage ve secret rotation
 */

// ========================================
// SECRET MANAGEMENT CONFIGURATION
// ========================================

const SECRET_CONFIG = {
  // Encryption settings
  encryption: {
    algorithm: 'AES-256-GCM',
    keyLength: 32,
    ivLength: 16,
    tagLength: 16
  },
  
  // Storage settings
  storage: {
    prefix: 'secret_',
    encryptedPrefix: 'encrypted_secret_',
    keyPrefix: 'secret_key_',
    backupPrefix: 'secret_backup_'
  },
  
  // Security settings
  security: {
    maxRetries: 3,
    lockoutDuration: 300000, // 5 dakika
    keyRotationInterval: 24 * 60 * 60 * 1000, // 24 saat
    auditLogRetention: 30 * 24 * 60 * 60 * 1000 // 30 gün
  },
  
  // Secret types
  types: {
    API_KEY: 'api_key',
    PASSWORD: 'password',
    TOKEN: 'token',
    CERTIFICATE: 'certificate',
    PRIVATE_KEY: 'private_key',
    DATABASE_URL: 'database_url',
    ENCRYPTION_KEY: 'encryption_key'
  }
};

// ========================================
// SECRET MANAGEMENT SERVICE
// ========================================

class SecretManagementService {
  constructor() {
    this.secrets = new Map();
    this.encryptionKeys = new Map();
    this.auditLog = [];
    this.failedAttempts = new Map();
    this.isLocked = false;
    this.lockoutUntil = null;
  }

  /**
   * Encryption key oluştur
   */
  generateEncryptionKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = '';
    
    for (let i = 0; i < SECRET_CONFIG.encryption.keyLength; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return key;
  }

  /**
   * IV (Initialization Vector) oluştur
   */
  generateIV() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let iv = '';
    
    for (let i = 0; i < SECRET_CONFIG.encryption.ivLength; i++) {
      iv += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return iv;
  }

  /**
   * Basit encryption (production'da crypto library kullanılmalı)
   */
  encrypt(plaintext, key) {
    try {
      // Basit XOR encryption (demo için)
      // Production'da crypto-js veya native crypto kullanın
      let encrypted = '';
      for (let i = 0; i < plaintext.length; i++) {
        encrypted += String.fromCharCode(
          plaintext.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
      }
      
      return btoa(encrypted); // Base64 encode
    } catch (error) {
      console.error('❌ Encryption failed:', error);
      throw new Error('Encryption failed');
    }
  }

  /**
   * Basit decryption (production'da crypto library kullanılmalı)
   */
  decrypt(encryptedText, key) {
    try {
      const encrypted = atob(encryptedText); // Base64 decode
      let decrypted = '';
      
      for (let i = 0; i < encrypted.length; i++) {
        decrypted += String.fromCharCode(
          encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length)
        );
      }
      
      return decrypted;
    } catch (error) {
      console.error('❌ Decryption failed:', error);
      throw new Error('Decryption failed');
    }
  }

  /**
   * Secret kaydet
   */
  async storeSecret(secretId, secretValue, secretType = SECRET_CONFIG.types.API_KEY, metadata = {}) {
    try {
      // Lockout kontrolü
      if (this.isLocked && new Date() < this.lockoutUntil) {
        throw new Error('Service is locked due to failed attempts');
      }
      
      // Encryption key oluştur veya al
      let encryptionKey = this.encryptionKeys.get(secretId);
      if (!encryptionKey) {
        encryptionKey = this.generateEncryptionKey();
        this.encryptionKeys.set(secretId, encryptionKey);
      }
      
      // Secret'i encrypt et
      const encryptedSecret = this.encrypt(secretValue, encryptionKey);
      
      // Secret metadata
      const secretData = {
        id: secretId,
        type: secretType,
        encryptedValue: encryptedSecret,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          ...metadata,
          version: 1,
          isActive: true
        },
        accessCount: 0,
        lastAccessed: null
      };
      
      // Memory'de sakla
      this.secrets.set(secretId, secretData);
      
      // Local storage'a kaydet
      if (typeof global !== 'undefined' && global.AsyncStorage) {
        await global.AsyncStorage.setItem(
          `${SECRET_CONFIG.storage.encryptedPrefix}${secretId}`,
          JSON.stringify(secretData)
        );
        
        // Encryption key'i ayrı sakla
        await global.AsyncStorage.setItem(
          `${SECRET_CONFIG.storage.keyPrefix}${secretId}`,
          encryptionKey
        );
      }
      
      // Audit log
      this.logAudit('secret_stored', secretId, { type: secretType });
      
      console.log(`🔐 Secret stored: ${secretId}`);
      return true;
      
    } catch (error) {
      console.error('❌ Secret storage failed:', error);
      this.recordFailedAttempt(secretId);
      throw error;
    }
  }

  /**
   * Secret al
   */
  async getSecret(secretId) {
    try {
      // Lockout kontrolü
      if (this.isLocked && new Date() < this.lockoutUntil) {
        throw new Error('Service is locked due to failed attempts');
      }
      
      // Memory'den al
      let secretData = this.secrets.get(secretId);
      
      if (!secretData) {
        // Local storage'dan al
        if (typeof global !== 'undefined' && global.AsyncStorage) {
          const stored = await global.AsyncStorage.getItem(`${SECRET_CONFIG.storage.encryptedPrefix}${secretId}`);
          if (stored) {
            secretData = JSON.parse(stored);
            this.secrets.set(secretId, secretData);
          }
        }
      }
      
      if (!secretData) {
        throw new Error(`Secret not found: ${secretId}`);
      }
      
      // Encryption key'i al
      let encryptionKey = this.encryptionKeys.get(secretId);
      if (!encryptionKey && typeof global !== 'undefined' && global.AsyncStorage) {
        encryptionKey = await global.AsyncStorage.getItem(`${SECRET_CONFIG.storage.keyPrefix}${secretId}`);
        if (encryptionKey) {
          this.encryptionKeys.set(secretId, encryptionKey);
        }
      }
      
      if (!encryptionKey) {
        throw new Error(`Encryption key not found for: ${secretId}`);
      }
      
      // Secret'i decrypt et
      const decryptedSecret = this.decrypt(secretData.encryptedValue, encryptionKey);
      
      // Access tracking
      secretData.accessCount++;
      secretData.lastAccessed = new Date();
      
      // Audit log
      this.logAudit('secret_accessed', secretId);
      
      return {
        value: decryptedSecret,
        metadata: secretData.metadata,
        accessCount: secretData.accessCount,
        lastAccessed: secretData.lastAccessed
      };
      
    } catch (error) {
      console.error('❌ Secret retrieval failed:', error);
      this.recordFailedAttempt(secretId);
      throw error;
    }
  }

  /**
   * Secret güncelle
   */
  async updateSecret(secretId, newSecretValue, metadata = {}) {
    try {
      const existingSecret = await this.getSecret(secretId);
      
      // Yeni version oluştur
      const newVersion = existingSecret.metadata.version + 1;
      
      // Eski secret'i backup'la
      await this.backupSecret(secretId, existingSecret);
      
      // Yeni secret'i kaydet
      await this.storeSecret(secretId, newSecretValue, existingSecret.metadata.type, {
        ...existingSecret.metadata,
        ...metadata,
        version: newVersion
      });
      
      // Audit log
      this.logAudit('secret_updated', secretId, { version: newVersion });
      
      console.log(`🔄 Secret updated: ${secretId} (v${newVersion})`);
      return true;
      
    } catch (error) {
      console.error('❌ Secret update failed:', error);
      throw error;
    }
  }

  /**
   * Secret sil
   */
  async deleteSecret(secretId) {
    try {
      // Memory'den sil
      this.secrets.delete(secretId);
      this.encryptionKeys.delete(secretId);
      
      // Local storage'dan sil
      if (typeof global !== 'undefined' && global.AsyncStorage) {
        await global.AsyncStorage.multiRemove([
          `${SECRET_CONFIG.storage.encryptedPrefix}${secretId}`,
          `${SECRET_CONFIG.storage.keyPrefix}${secretId}`
        ]);
      }
      
      // Audit log
      this.logAudit('secret_deleted', secretId);
      
      console.log(`🗑️ Secret deleted: ${secretId}`);
      return true;
      
    } catch (error) {
      console.error('❌ Secret deletion failed:', error);
      throw error;
    }
  }

  /**
   * Secret backup'la
   */
  async backupSecret(secretId, secretData) {
    try {
      const backupKey = `${SECRET_CONFIG.storage.backupPrefix}${secretId}_${Date.now()}`;
      
      if (typeof global !== 'undefined' && global.AsyncStorage) {
        await global.AsyncStorage.setItem(backupKey, JSON.stringify(secretData));
      }
      
      console.log(`💾 Secret backed up: ${secretId}`);
      return true;
    } catch (error) {
      console.error('❌ Secret backup failed:', error);
      return false;
    }
  }

  /**
   * Failed attempt kaydet
   */
  recordFailedAttempt(secretId) {
    const attempts = this.failedAttempts.get(secretId) || 0;
    this.failedAttempts.set(secretId, attempts + 1);
    
    if (attempts + 1 >= SECRET_CONFIG.security.maxRetries) {
      this.isLocked = true;
      this.lockoutUntil = new Date(Date.now() + SECRET_CONFIG.security.lockoutDuration);
      console.warn(`🔒 Service locked due to failed attempts for ${secretId}`);
    }
  }

  /**
   * Audit log kaydet
   */
  logAudit(action, secretId, data = {}) {
    const logEntry = {
      action,
      secretId,
      timestamp: new Date(),
      data: {
        ...data,
        // Sensitive data'yı maskele
        value: data.value ? '***' : undefined
      }
    };
    
    this.auditLog.push(logEntry);
    
    // Log'u local storage'a kaydet
    if (typeof global !== 'undefined' && global.AsyncStorage) {
      const logKey = `audit_log_${Date.now()}`;
      global.AsyncStorage.setItem(logKey, JSON.stringify(logEntry));
    }
    
    // Log boyutunu sınırla
    if (this.auditLog.length > 1000) {
      this.auditLog = this.auditLog.slice(-500);
    }
  }

  /**
   * Secret listesi al
   */
  getSecretList() {
    const secrets = [];
    
    this.secrets.forEach((secret, id) => {
      secrets.push({
        id,
        type: secret.type,
        createdAt: secret.createdAt,
        updatedAt: secret.updatedAt,
        accessCount: secret.accessCount,
        lastAccessed: secret.lastAccessed,
        isActive: secret.metadata.isActive
      });
    });
    
    return secrets;
  }

  /**
   * Audit log al
   */
  getAuditLog(limit = 100) {
    return this.auditLog.slice(-limit);
  }

  /**
   * Service durumu
   */
  getServiceStatus() {
    return {
      isLocked: this.isLocked,
      lockoutUntil: this.lockoutUntil,
      totalSecrets: this.secrets.size,
      auditLogCount: this.auditLog.length,
      failedAttempts: Object.fromEntries(this.failedAttempts)
    };
  }

  /**
   * Service'i unlock et
   */
  unlockService() {
    this.isLocked = false;
    this.lockoutUntil = null;
    this.failedAttempts.clear();
    console.log('🔓 Service unlocked');
  }

  /**
   * Tüm secret'leri temizle
   */
  async clearAllSecrets() {
    try {
      this.secrets.clear();
      this.encryptionKeys.clear();
      this.auditLog = [];
      this.failedAttempts.clear();
      
      if (typeof global !== 'undefined' && global.AsyncStorage) {
        const keys = await global.AsyncStorage.getAllKeys();
        const secretKeys = keys.filter(key => 
          key.startsWith(SECRET_CONFIG.storage.prefix) ||
          key.startsWith(SECRET_CONFIG.storage.encryptedPrefix) ||
          key.startsWith(SECRET_CONFIG.storage.keyPrefix) ||
          key.startsWith(SECRET_CONFIG.storage.backupPrefix) ||
          key.startsWith('audit_log_')
        );
        
        await global.AsyncStorage.multiRemove(secretKeys);
      }
      
      console.log('🗑️ All secrets cleared');
      return true;
    } catch (error) {
      console.error('❌ Clear secrets failed:', error);
      return false;
    }
  }
}

// ========================================
// SINGLETON INSTANCE
// ========================================

const secretManagementService = new SecretManagementService();

// ========================================
// EXPORTS
// ========================================

export default secretManagementService;

export const storeSecret = (secretId, secretValue, secretType, metadata) => {
  return secretManagementService.storeSecret(secretId, secretValue, secretType, metadata);
};

export const getSecret = (secretId) => {
  return secretManagementService.getSecret(secretId);
};

export const updateSecret = (secretId, newSecretValue, metadata) => {
  return secretManagementService.updateSecret(secretId, newSecretValue, metadata);
};

export const deleteSecret = (secretId) => {
  return secretManagementService.deleteSecret(secretId);
};

export const getSecretList = () => {
  return secretManagementService.getSecretList();
};

export const getAuditLog = (limit) => {
  return secretManagementService.getAuditLog(limit);
};

export const getServiceStatus = () => {
  return secretManagementService.getServiceStatus();
};

export const unlockService = () => {
  return secretManagementService.unlockService();
};

export const clearAllSecrets = () => {
  return secretManagementService.clearAllSecrets();
};
