/**
 * Validation Utilities - Input validation ve sanitization
 * Kullanıcı girişlerini güvenli hale getirir
 */

/**
 * Validation hata mesajları
 */
const VALIDATION_MESSAGES = {
  REQUIRED: 'Bu alan zorunludur',
  MIN_LENGTH: 'En az {min} karakter olmalıdır',
  MAX_LENGTH: 'En fazla {max} karakter olmalıdır',
  INVALID_EMAIL: 'Geçerli bir e-posta adresi giriniz',
  INVALID_PHONE: 'Geçerli bir telefon numarası giriniz',
  INVALID_URL: 'Geçerli bir URL giriniz',
  INVALID_TEXT: 'Geçersiz karakterler içeriyor',
  CONTAINS_SCRIPT: 'Güvenlik nedeniyle bu içerik kabul edilemez',
  EMPTY_MESSAGE: 'Mesaj boş olamaz',
  TOO_LONG_MESSAGE: 'Mesaj çok uzun (maksimum 1000 karakter)',
  SPECIAL_CHARS: 'Özel karakterler kullanılamaz',
  INVALID_USERNAME: 'Kullanıcı adı 3-20 karakter arasında olmalı ve sadece harf, rakam ve _ içermelidir',
  WEAK_PASSWORD: 'Şifre en az 8 karakter olmalı ve büyük harf, küçük harf, rakam ve özel karakter içermelidir',
  FILE_TOO_LARGE: 'Dosya boyutu çok büyük (maksimum {max}MB)',
  INVALID_FILE_TYPE: 'Geçersiz dosya türü. İzin verilen türler: {types}',
  TOO_MANY_FILES: 'Çok fazla dosya seçildi (maksimum {max} dosya)',
  RATE_LIMIT_EXCEEDED: 'Çok fazla istek gönderildi. Lütfen {seconds} saniye bekleyin',
  INVALID_SEARCH: 'Arama sorgusu geçersiz karakterler içeriyor',
  INVALID_COMMENT: 'Yorum geçersiz karakterler içeriyor'
};

/**
 * Validation kuralları
 */
const VALIDATION_RULES = {
  MESSAGE: {
    minLength: 1,
    maxLength: 1000,
    allowedChars: /^[a-zA-ZğüşıöçĞÜŞİÖÇ0-9\s.,!?\-()]+$/,
    forbiddenPatterns: [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /data:/i,
      /vbscript:/i
    ]
  },
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    minLength: 5,
    maxLength: 254
  },
  PHONE: {
    pattern: /^[\+]?[0-9\s\-\(\)]{10,15}$/,
    minLength: 10,
    maxLength: 15
  },
  URL: {
    pattern: /^https?:\/\/.+\..+/,
    minLength: 10,
    maxLength: 2048
  },
  USERNAME: {
    pattern: /^[a-zA-Z0-9_]{3,20}$/,
    minLength: 3,
    maxLength: 20,
    allowedChars: /^[a-zA-Z0-9_]+$/
  },
  PASSWORD: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    specialChars: /[!@#$%^&*(),.?":{}|<>]/
  },
  FILE_UPLOAD: {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'],
    allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf'],
    maxFiles: 5
  },
  SEARCH_QUERY: {
    minLength: 1,
    maxLength: 100,
    allowedChars: /^[a-zA-ZğüşıöçĞÜŞİÖÇ0-9\s.,!?\-()]+$/
  },
  COMMENT: {
    minLength: 1,
    maxLength: 500,
    allowedChars: /^[a-zA-ZğüşıöçĞÜŞİÖÇ0-9\s.,!?\-()]+$/
  }
};

/**
 * Temel validation fonksiyonları
 */
export const ValidationUtils = {
  /**
   * Boş değer kontrolü
   */
  isRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  },

  /**
   * Minimum uzunluk kontrolü
   */
  hasMinLength(value, minLength) {
    return value && value.toString().length >= minLength;
  },

  /**
   * Maksimum uzunluk kontrolü
   */
  hasMaxLength(value, maxLength) {
    return value && value.toString().length <= maxLength;
  },

  /**
   * E-posta formatı kontrolü
   */
  isValidEmail(email) {
    return VALIDATION_RULES.EMAIL.pattern.test(email);
  },

  /**
   * Telefon formatı kontrolü
   */
  isValidPhone(phone) {
    return VALIDATION_RULES.PHONE.pattern.test(phone);
  },

  /**
   * URL formatı kontrolü
   */
  isValidUrl(url) {
    return VALIDATION_RULES.URL.pattern.test(url);
  },

  /**
   * Güvenli karakter kontrolü
   */
  hasValidChars(value, allowedPattern) {
    return allowedPattern.test(value);
  },

  /**
   * Tehlikeli içerik kontrolü
   */
  containsDangerousContent(value) {
    const lowerValue = value.toLowerCase();
    return VALIDATION_RULES.MESSAGE.forbiddenPatterns.some(pattern => 
      pattern.test(lowerValue)
    );
  },

  /**
   * XSS saldırısı kontrolü
   */
  containsXSS(value) {
    const xssPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /<link/i,
      /<meta/i
    ];
    
    return xssPatterns.some(pattern => pattern.test(value));
  },

  /**
   * SQL injection kontrolü
   */
  containsSQLInjection(value) {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/i,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
      /(\b(OR|AND)\s+['"]\s*=\s*['"])/i,
      /(\b(OR|AND)\s+['"]\s*LIKE\s*['"])/i
    ];
    
    return sqlPatterns.some(pattern => pattern.test(value));
  },

  /**
   * Kullanıcı adı validation
   */
  isValidUsername(username) {
    return VALIDATION_RULES.USERNAME.pattern.test(username);
  },

  /**
   * Şifre güçlülük kontrolü
   */
  isStrongPassword(password) {
    const rules = VALIDATION_RULES.PASSWORD;
    
    if (password.length < rules.minLength) return false;
    if (password.length > rules.maxLength) return false;
    
    if (rules.requireUppercase && !/[A-Z]/.test(password)) return false;
    if (rules.requireLowercase && !/[a-z]/.test(password)) return false;
    if (rules.requireNumbers && !/[0-9]/.test(password)) return false;
    if (rules.requireSpecialChars && !rules.specialChars.test(password)) return false;
    
    return true;
  },

  /**
   * Dosya boyutu kontrolü
   */
  isValidFileSize(fileSize, maxSize = VALIDATION_RULES.FILE_UPLOAD.maxSize) {
    return fileSize <= maxSize;
  },

  /**
   * Dosya türü kontrolü
   */
  isValidFileType(fileType, allowedTypes = VALIDATION_RULES.FILE_UPLOAD.allowedTypes) {
    return allowedTypes.includes(fileType);
  },

  /**
   * Dosya uzantısı kontrolü
   */
  isValidFileExtension(fileName, allowedExtensions = VALIDATION_RULES.FILE_UPLOAD.allowedExtensions) {
    const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    return allowedExtensions.includes(extension);
  },

  /**
   * Özel karakter kontrolü
   */
  containsSpecialCharacters(value, allowedPattern) {
    return !allowedPattern.test(value);
  },

  /**
   * Rate limiting kontrolü
   */
  isRateLimited(lastRequestTime, minInterval = 1000) {
    const now = Date.now();
    return (now - lastRequestTime) < minInterval;
  }
};

/**
 * Mesaj validation
 */
export const validateMessage = (message) => {
  const errors = [];
  
  // Boş kontrol
  if (!ValidationUtils.isRequired(message)) {
    errors.push(VALIDATION_MESSAGES.EMPTY_MESSAGE);
    return { isValid: false, errors };
  }
  
  // Uzunluk kontrolü
  if (!ValidationUtils.hasMinLength(message, VALIDATION_RULES.MESSAGE.minLength)) {
    errors.push(VALIDATION_MESSAGES.MIN_LENGTH.replace('{min}', VALIDATION_RULES.MESSAGE.minLength));
  }
  
  if (!ValidationUtils.hasMaxLength(message, VALIDATION_RULES.MESSAGE.maxLength)) {
    errors.push(VALIDATION_MESSAGES.TOO_LONG_MESSAGE);
  }
  
  // Güvenli karakter kontrolü
  if (!ValidationUtils.hasValidChars(message, VALIDATION_RULES.MESSAGE.allowedChars)) {
    errors.push(VALIDATION_MESSAGES.INVALID_TEXT);
  }
  
  // Tehlikeli içerik kontrolü
  if (ValidationUtils.containsDangerousContent(message)) {
    errors.push(VALIDATION_MESSAGES.CONTAINS_SCRIPT);
  }
  
  // XSS kontrolü
  if (ValidationUtils.containsXSS(message)) {
    errors.push(VALIDATION_MESSAGES.CONTAINS_SCRIPT);
  }
  
  // SQL injection kontrolü
  if (ValidationUtils.containsSQLInjection(message)) {
    errors.push(VALIDATION_MESSAGES.CONTAINS_SCRIPT);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    sanitizedMessage: sanitizeMessage(message)
  };
};

/**
 * Mesaj sanitization
 */
export const sanitizeMessage = (message) => {
  if (!message) return '';
  
  let sanitized = message.toString();
  
  // HTML etiketlerini kaldır
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  // JavaScript event handler'larını kaldır
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  
  // Tehlikeli protokolleri kaldır
  sanitized = sanitized.replace(/javascript:/gi, '');
  sanitized = sanitized.replace(/vbscript:/gi, '');
  sanitized = sanitized.replace(/data:/gi, '');
  
  // Fazla boşlukları temizle
  sanitized = sanitized.replace(/\s+/g, ' ').trim();
  
  // Maksimum uzunluğu kontrol et
  if (sanitized.length > VALIDATION_RULES.MESSAGE.maxLength) {
    sanitized = sanitized.substring(0, VALIDATION_RULES.MESSAGE.maxLength);
  }
  
  return sanitized;
};

/**
 * E-posta validation
 */
export const validateEmail = (email) => {
  const errors = [];
  
  if (!ValidationUtils.isRequired(email)) {
    errors.push(VALIDATION_MESSAGES.REQUIRED);
  } else if (!ValidationUtils.isValidEmail(email)) {
    errors.push(VALIDATION_MESSAGES.INVALID_EMAIL);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Telefon validation
 */
export const validatePhone = (phone) => {
  const errors = [];
  
  if (!ValidationUtils.isRequired(phone)) {
    errors.push(VALIDATION_MESSAGES.REQUIRED);
  } else if (!ValidationUtils.isValidPhone(phone)) {
    errors.push(VALIDATION_MESSAGES.INVALID_PHONE);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * URL validation
 */
export const validateUrl = (url) => {
  const errors = [];
  
  if (!ValidationUtils.isRequired(url)) {
    errors.push(VALIDATION_MESSAGES.REQUIRED);
  } else if (!ValidationUtils.isValidUrl(url)) {
    errors.push(VALIDATION_MESSAGES.INVALID_URL);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Genel validation fonksiyonu
 */
export const validateInput = (value, type = 'message') => {
  switch (type) {
    case 'message':
      return validateMessage(value);
    case 'email':
      return validateEmail(value);
    case 'phone':
      return validatePhone(value);
    case 'url':
      return validateUrl(value);
    default:
      return validateMessage(value);
  }
};

/**
 * Validation istatistikleri
 */
class ValidationStats {
  constructor() {
    this.stats = {
      totalValidations: 0,
      successfulValidations: 0,
      failedValidations: 0,
      validationTypes: {},
      securityThreats: 0
    };
  }
  
  recordValidation(type, success, hasSecurityThreat = false) {
    this.stats.totalValidations++;
    
    if (!this.stats.validationTypes[type]) {
      this.stats.validationTypes[type] = { total: 0, success: 0, failed: 0 };
    }
    
    this.stats.validationTypes[type].total++;
    
    if (success) {
      this.stats.successfulValidations++;
      this.stats.validationTypes[type].success++;
    } else {
      this.stats.failedValidations++;
      this.stats.validationTypes[type].failed++;
    }
    
    if (hasSecurityThreat) {
      this.stats.securityThreats++;
    }
  }
  
  getStats() {
    return { ...this.stats };
  }
  
  reset() {
    this.stats = {
      totalValidations: 0,
      successfulValidations: 0,
      failedValidations: 0,
      validationTypes: {},
      securityThreats: 0
    };
  }
}

// Singleton instance
const validationStats = new ValidationStats();

/**
 * Validation istatistiklerini al
 */
export const getValidationStats = () => {
  return validationStats.getStats();
};

/**
 * Validation istatistiklerini sıfırla
 */
export const resetValidationStats = () => {
  validationStats.reset();
};

// ========================================
// YENİ VALIDATION FONKSİYONLARI
// ========================================

/**
 * Kullanıcı adı validation
 */
export const validateUsername = (username) => {
  const errors = [];
  
  if (!ValidationUtils.isRequired(username)) {
    errors.push(VALIDATION_MESSAGES.REQUIRED);
  } else if (!ValidationUtils.isValidUsername(username)) {
    errors.push(VALIDATION_MESSAGES.INVALID_USERNAME);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Şifre validation
 */
export const validatePassword = (password) => {
  const errors = [];
  
  if (!ValidationUtils.isRequired(password)) {
    errors.push(VALIDATION_MESSAGES.REQUIRED);
  } else if (!ValidationUtils.isStrongPassword(password)) {
    errors.push(VALIDATION_MESSAGES.WEAK_PASSWORD);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Dosya upload validation
 */
export const validateFileUpload = (files) => {
  const errors = [];
  const rules = VALIDATION_RULES.FILE_UPLOAD;
  
  if (!files || files.length === 0) {
    errors.push('En az bir dosya seçmelisiniz');
    return { isValid: false, errors };
  }
  
  if (files.length > rules.maxFiles) {
    errors.push(VALIDATION_MESSAGES.TOO_MANY_FILES.replace('{max}', rules.maxFiles));
  }
  
  files.forEach((file, index) => {
    // Dosya boyutu kontrolü
    if (!ValidationUtils.isValidFileSize(file.size)) {
      const maxSizeMB = Math.round(rules.maxSize / (1024 * 1024));
      errors.push(`Dosya ${index + 1}: ${VALIDATION_MESSAGES.FILE_TOO_LARGE.replace('{max}', maxSizeMB)}`);
    }
    
    // Dosya türü kontrolü
    if (!ValidationUtils.isValidFileType(file.type)) {
      errors.push(`Dosya ${index + 1}: ${VALIDATION_MESSAGES.INVALID_FILE_TYPE.replace('{types}', rules.allowedTypes.join(', '))}`);
    }
    
    // Dosya uzantısı kontrolü
    if (!ValidationUtils.isValidFileExtension(file.name)) {
      errors.push(`Dosya ${index + 1}: ${VALIDATION_MESSAGES.INVALID_FILE_TYPE.replace('{types}', rules.allowedExtensions.join(', '))}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Rate limiting validation
 */
export const validateRateLimit = (lastRequestTime, minInterval = 1000) => {
  const errors = [];
  
  if (ValidationUtils.isRateLimited(lastRequestTime, minInterval)) {
    const waitTime = Math.ceil((minInterval - (Date.now() - lastRequestTime)) / 1000);
    errors.push(VALIDATION_MESSAGES.RATE_LIMIT_EXCEEDED.replace('{seconds}', waitTime));
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    waitTime: errors.length > 0 ? Math.ceil((minInterval - (Date.now() - lastRequestTime)) / 1000) : 0
  };
};

/**
 * Arama sorgusu validation
 */
export const validateSearchQuery = (query) => {
  const errors = [];
  const rules = VALIDATION_RULES.SEARCH_QUERY;
  
  if (!ValidationUtils.isRequired(query)) {
    errors.push(VALIDATION_MESSAGES.REQUIRED);
  } else {
    if (!ValidationUtils.hasMinLength(query, rules.minLength)) {
      errors.push(VALIDATION_MESSAGES.MIN_LENGTH.replace('{min}', rules.minLength));
    }
    
    if (!ValidationUtils.hasMaxLength(query, rules.maxLength)) {
      errors.push(VALIDATION_MESSAGES.MAX_LENGTH.replace('{max}', rules.maxLength));
    }
    
    if (ValidationUtils.containsSpecialCharacters(query, rules.allowedChars)) {
      errors.push(VALIDATION_MESSAGES.INVALID_SEARCH);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Yorum validation
 */
export const validateComment = (comment) => {
  const errors = [];
  const rules = VALIDATION_RULES.COMMENT;
  
  if (!ValidationUtils.isRequired(comment)) {
    errors.push(VALIDATION_MESSAGES.REQUIRED);
  } else {
    if (!ValidationUtils.hasMinLength(comment, rules.minLength)) {
      errors.push(VALIDATION_MESSAGES.MIN_LENGTH.replace('{min}', rules.minLength));
    }
    
    if (!ValidationUtils.hasMaxLength(comment, rules.maxLength)) {
      errors.push(VALIDATION_MESSAGES.MAX_LENGTH.replace('{max}', rules.maxLength));
    }
    
    if (ValidationUtils.containsSpecialCharacters(comment, rules.allowedChars)) {
      errors.push(VALIDATION_MESSAGES.INVALID_COMMENT);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Genişletilmiş input validation
 */
export const validateInputExtended = (value, type = 'message', options = {}) => {
  switch (type) {
    case 'message':
      return validateMessage(value);
    case 'email':
      return validateEmail(value);
    case 'phone':
      return validatePhone(value);
    case 'url':
      return validateUrl(value);
    case 'username':
      return validateUsername(value);
    case 'password':
      return validatePassword(value);
    case 'search':
      return validateSearchQuery(value);
    case 'comment':
      return validateComment(value);
    case 'file':
      return validateFileUpload(value);
    case 'rate_limit':
      return validateRateLimit(value, options.minInterval);
    default:
      return validateMessage(value);
  }
};

export default {
  ValidationUtils,
  validateMessage,
  validateEmail,
  validatePhone,
  validateUrl,
  validateInput,
  validateUsername,
  validatePassword,
  validateFileUpload,
  validateRateLimit,
  validateSearchQuery,
  validateComment,
  validateInputExtended,
  sanitizeMessage,
  getValidationStats,
  resetValidationStats,
  VALIDATION_MESSAGES,
  VALIDATION_RULES
};
