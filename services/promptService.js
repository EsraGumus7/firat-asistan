// ========================================
// PROMPT SERVICE - 613 ENDPOINT + TÜRKÇE DESTEĞİ
// ========================================

import { EMOJIS, ENDPOINT_CATEGORIES, MAPPING_PRIORITIES } from '../config/constants';
import { retryApiCall } from '../utils/retryUtils';

// ========================================
// 613 ENDPOINT PROMPT GENERATOR
// ========================================

// Endpoint'lerden otomatik prompt oluştur
export const generateEndpointPrompts = (endpointConfig) => {
  const prompts = {
    food: [],
    main: [],
    library: [],
    faculty_announcements: []
  };
  
  Object.keys(endpointConfig).forEach(category => {
    const categoryEndpoints = endpointConfig[category];
    
    Object.keys(categoryEndpoints).forEach(endpointKey => {
      const endpoint = categoryEndpoints[endpointKey];
      const prompt = createEndpointPrompt(category, endpointKey, endpoint);
      prompts[category].push(prompt);
    });
  });
  
  return prompts;
};

// Tek endpoint için prompt oluştur
const createEndpointPrompt = (category, endpointKey, endpoint) => {
  const emoji = getCategoryEmoji(category);
  const description = endpoint.description || 'Endpoint açıklaması yok';
  const url = endpoint.url || `/api/${category}/${endpointKey}`;
  const method = endpoint.method || 'GET';
  
  return `
${emoji} ${description.toUpperCase()}:

ENDPOINT: ${url}
METHOD: ${method}
CATEGORY: ${category}
KEY: ${endpointKey}

KULLANIM:
- "${description.toLowerCase()}" → ${category}/${endpointKey}
- "${extractKeywords(description)}" → ${category}/${endpointKey}

VERİ FORMATI:
- Response: API response formatı
- Limit: İlk 5 sonuç göster

HATA DURUMLARI:
- Boş response: "${description} bilgisi bulunamadı"
- API hatası: "${description} bilgisi şu anda kullanılamıyor"
`;
};

// Kategori emoji'si al
const getCategoryEmoji = (category) => {
  switch (category) {
    case 'food': return EMOJIS.FOOD;
    case 'main': return EMOJIS.EVENTS;
    case 'library': return EMOJIS.LIBRARY;
    case 'faculty_announcements': return EMOJIS.FACULTY;
    default: return EMOJIS.INFO;
  }
};

// Description'dan anahtar kelimeler çıkar
const extractKeywords = (description) => {
  if (!description) return 'endpoint';
  
  const words = description.toLowerCase()
    .replace(/[^a-zA-ZğüşıöçĞÜŞİÖÇ\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 3);
  
  return words.join(' ');
};

// ========================================
// TÜRKÇE SESLİ/SESSİZ HARF NORMALİZASYONU
// ========================================

// Türkçe karakterleri normalize et
export const normalizeTurkishText = (text) => {
  if (!text) return '';
  
  return text.toLowerCase()
    // Sesli harfler
    .replace(/[ı]/g, 'i')
    .replace(/[ö]/g, 'o')
    .replace(/[ü]/g, 'u')
    .replace(/[ş]/g, 's')
    .replace(/[ç]/g, 'c')
    .replace(/[ğ]/g, 'g')
    // Büyük harfler
    .replace(/[İ]/g, 'i')
    .replace(/[Ö]/g, 'o')
    .replace(/[Ü]/g, 'u')
    .replace(/[Ş]/g, 's')
    .replace(/[Ç]/g, 'c')
    .replace(/[Ğ]/g, 'g');
};

// Benzer kelimeleri bul
export const findSimilarWords = (searchWord, wordList) => {
  const normalizedSearch = normalizeTurkishText(searchWord);
  const similarWords = [];
  
  wordList.forEach(word => {
    const normalizedWord = normalizeTurkishText(word);
    
    // Tam eşleşme
    if (normalizedWord === normalizedSearch) {
      similarWords.push({ word, similarity: 1.0, type: 'exact' });
    }
    // Kısmi eşleşme
    else if (normalizedWord.includes(normalizedSearch) || normalizedSearch.includes(normalizedWord)) {
      const similarity = Math.min(normalizedWord.length, normalizedSearch.length) / 
                        Math.max(normalizedWord.length, normalizedSearch.length);
      similarWords.push({ word, similarity, type: 'partial' });
    }
    // Levenshtein mesafesi (basit)
    else {
      const distance = levenshteinDistance(normalizedWord, normalizedSearch);
      const maxLength = Math.max(normalizedWord.length, normalizedSearch.length);
      const similarity = 1 - (distance / maxLength);
      
      if (similarity > 0.7) {
        similarWords.push({ word, similarity, type: 'fuzzy' });
      }
    }
  });
  
  return similarWords.sort((a, b) => b.similarity - a.similarity);
};

// Levenshtein mesafesi hesapla
const levenshteinDistance = (str1, str2) => {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
};

// ========================================
// 613 ENDPOINT PROMPT'LARI
// ========================================

// Ana backend prompt'u
export const BACKEND_PROMPT = `
Sen Fırat Üniversitesi AI Asistanısın. 613+ API endpoint'imiz var:

${EMOJIS.FOOD} YEMEK ENDPOINT'LERİ (2 adet):
- Endpoint: /api/food/api
- Kullanıcı "yemek", "menü", "bugün ne yemek var" dediğinde bu API'den veri çek
- Veri formatı: { food: [], description: "..." }

${EMOJIS.EVENTS} ANA ÜNİVERSİTE ENDPOINT'LERİ (10 adet):
- Etkinlikler: /api/main/get_all_events_tr
- Duyurular: /api/main/announcement_tr  
- Haberler: /api/main/news_tr
- Diğer: /api/main/* (7 adet daha)

${EMOJIS.LIBRARY} KÜTÜPHANE ENDPOINT'LERİ (7 adet):
- Ana kütüphane: /api/library/library
- Diğer: /api/library/* (6 adet daha)

${EMOJIS.FACULTY} FAKÜLTE DUYURULARI (600 adet):
- Mimarlık: /api/faculty_announcements/tr_13
- Tıp: /api/faculty_announcements/tr_267
- Mühendislik: /api/faculty_announcements/tr_52
- Diğer: /api/faculty_announcements/* (597 adet daha)

KULLANIM KURALLARI:
1. Önce kullanıcı mesajını analiz et
2. Backend mapping sistemi ile uygun endpoint'i bul
3. API'den veri çek
4. Veriyi kullanıcıya anlaşılır şekilde sun
5. Türkçe karakter sorunlarını dikkate al (diş/dis, ş/s, ç/c, ğ/g, ö/o, ü/u, ı/i)
6. Eğer API'den veri gelmezse genel bilgi ver
`;

// Mapping sistemi prompt'u
export const MAPPING_PROMPT = `
BACKEND MAPPING SİSTEMİ (619 mapping):

ÖNCELİK SIRASI:
1. ${MAPPING_PRIORITIES.HIGH} - Core mapping'ler (6 adet)
2. ${MAPPING_PRIORITIES.AUTO} - Otomatik mapping'ler (613 adet)

MAPPING ÖRNEKLERİ:
- "yemek menüsü" → food/api
- "mimarlık fakültesi" → faculty_announcements/tr_13
- "tıp fakültesi" → faculty_announcements/tr_267
- "etkinlikler" → main/get_all_events_tr
- "duyurular" → main/announcement_tr

TÜRKÇE KARAKTER NORMALİZASYONU:
- "diş" = "dis" (ş → s)
- "mimarlık" = "mimarlik" (ı → i)
- "tıp" = "tip" (ı → i)
- "mühendislik" = "muhendislik" (ü → u, ş → s)
- "öğrenci" = "ogrenci" (ö → o, ğ → g, ç → c)
`;

// Fakülte endpoint'leri prompt'u
export const FACULTY_ENDPOINTS_PROMPT = `
FAKÜLTE ENDPOINT'LERİ (600 adet):

POPÜLER FAKÜLTELER:
- Mimarlık Fakültesi: tr_13
- Tıp Fakültesi: tr_267 (Döner Sermaye)
- Mühendislik Fakültesi: tr_52
- Fen-Edebiyat Fakültesi: tr_15
- İktisadi ve İdari Bilimler: tr_16
- Eğitim Fakültesi: tr_17
- Veteriner Fakültesi: tr_18
- Teknoloji Fakültesi: tr_19
- Sağlık Bilimleri: tr_20
- Diş Hekimliği: tr_21

KULLANIM:
- Kullanıcı "mimarlık fakültesi" dediğinde → tr_13
- Kullanıcı "tıp fakültesi" dediğinde → tr_267
- Kullanıcı "mühendislik" dediğinde → tr_52
- Diğer fakülteler için mapping sistemi kullan
`;

// Hata yönetimi prompt'u
export const ERROR_HANDLING_PROMPT = `
HATA YÖNETİMİ:

API HATALARI:
- 404: "Aradığınız bilgi bulunamadı"
- 500: "Sunucu hatası, lütfen daha sonra tekrar deneyin"
- Timeout: "İstek zaman aşımına uğradı"
- Network: "Bağlantı hatası, internet bağlantınızı kontrol edin"

MAPPING HATALARI:
- Endpoint bulunamadı: "Bu konuda bilgi bulamadım"
- Benzer kelime önerisi: "Belki şunu kastettiniz: [benzer kelime]"
- Türkçe karakter düzeltme: "Aradığınız: [düzeltilmiş kelime]"

KULLANICI YÖNLENDİRMESİ:
- "Yemek menüsü için 'yemek' yazabilirsiniz"
- "Fakülte duyuruları için '[fakülte adı] fakültesi' yazabilirsiniz"
- "Etkinlikler için 'etkinlik' yazabilirsiniz"
`;

// ========================================
// ÖZEL PROMPT'LAR
// ========================================

// Yemek endpoint'i için özel prompt
export const FOOD_PROMPT = `
${EMOJIS.FOOD} YEMEK MENÜSÜ ENDPOINT:

ENDPOINT: /api/food/api
METHOD: GET
RESPONSE: { food: string[], description: string }

KULLANIM:
- "yemek menüsü" → food/api
- "bugün ne yemek var" → food/api
- "yemekhane" → food/api
- "kafeterya" → food/api

VERİ FORMATI:
- food: Yemek listesi (örn: ["Çorba", "Pilav", "Tavuk"])
- description: Açıklama (örn: "Bugünkü menü")

HATA DURUMLARI:
- food boşsa: "Bugün yemek menüsü henüz yayınlanmamış"
- API hatası: "Yemek menüsü bilgisi şu anda kullanılamıyor"
`;

// Etkinlik endpoint'i için özel prompt
export const EVENTS_PROMPT = `
${EMOJIS.EVENTS} ETKİNLİKLER ENDPOINT:

ENDPOINT: /api/main/get_all_events_tr
METHOD: GET
RESPONSE: Array of events

KULLANIM:
- "etkinlikler" → main/get_all_events_tr
- "etkinlik" → main/get_all_events_tr
- "programlar" → main/get_all_events_tr
- "seminer" → main/get_all_events_tr

VERİ FORMATI:
- Array of events with title, date, description
- Limit: İlk 5 etkinlik göster

HATA DURUMLARI:
- Boş array: "Şu anda etkinlik bulunmuyor"
- API hatası: "Etkinlik bilgisi şu anda kullanılamıyor"
`;

// Duyuru endpoint'i için özel prompt
export const ANNOUNCEMENTS_PROMPT = `
${EMOJIS.ANNOUNCEMENTS} DUYURULAR ENDPOINT:

ENDPOINT: /api/main/announcement_tr
METHOD: GET
RESPONSE: Array of announcements

KULLANIM:
- "duyurular" → main/announcement_tr
- "duyuru" → main/announcement_tr
- "haberler" → main/announcement_tr
- "bildirim" → main/announcement_tr

VERİ FORMATI:
- Array of announcements with title, date, content
- Limit: İlk 5 duyuru göster

HATA DURUMLARI:
- Boş array: "Şu anda duyuru bulunmuyor"
- API hatası: "Duyuru bilgisi şu anda kullanılamıyor"
`;

// ========================================
// PROMPT YARDIMCILARI
// ========================================

// Prompt'u birleştir
export const combinePrompts = (prompts) => {
  return prompts.join('\n\n');
};

// Kategori bazlı prompt al
export const getCategoryPrompt = (category) => {
  switch (category) {
    case ENDPOINT_CATEGORIES.FOOD:
      return FOOD_PROMPT;
    case ENDPOINT_CATEGORIES.MAIN:
      return combinePrompts([EVENTS_PROMPT, ANNOUNCEMENTS_PROMPT]);
    case ENDPOINT_CATEGORIES.LIBRARY:
      return `${EMOJIS.LIBRARY} KÜTÜPHANE ENDPOINT'LERİ (7 adet)`;
    case ENDPOINT_CATEGORIES.FACULTY_ANNOUNCEMENTS:
      return FACULTY_ENDPOINTS_PROMPT;
    default:
      return BACKEND_PROMPT;
  }
};

// Tam sistem prompt'u
export const getFullSystemPrompt = () => {
  return combinePrompts([
    BACKEND_PROMPT,
    MAPPING_PROMPT,
    FACULTY_ENDPOINTS_PROMPT,
    ERROR_HANDLING_PROMPT
  ]);
};

// Türkçe karakter düzeltme önerisi
export const getTurkishCharacterSuggestion = (word) => {
  const suggestions = {
    'dis': 'diş',
    'mimarlik': 'mimarlık',
    'tip': 'tıp',
    'muhendislik': 'mühendislik',
    'ogrenci': 'öğrenci',
    'universite': 'üniversite',
    'fakulte': 'fakülte',
    'bolum': 'bölüm',
    'merkez': 'merkez',
    'birim': 'birim'
  };
  
  return suggestions[normalizeTurkishText(word)] || word;
};

// ========================================
// 613 ENDPOINT DETAYLI PROMPT GENERATOR
// ========================================

// Backend'den endpoint'leri al ve prompt oluştur
export const generateDetailedPrompts = async () => {
  const apiCall = async () => {
    console.log('📋 Detaylı prompt'lar oluşturuluyor...');
    
    // Backend'den endpoint'leri al
    const response = await fetch('http://192.168.1.75:3000/api/endpoints', {
      timeout: 15000, // 15 saniye timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const endpointData = await response.json();
    console.log('✅ Endpoint verileri alındı:', Object.keys(endpointData).length, 'kategori');
    
    // Her endpoint için detaylı prompt oluştur
    const detailedPrompts = [];
    
    Object.keys(endpointData).forEach(category => {
      const categoryEndpoints = endpointData[category];
      
      Object.keys(categoryEndpoints).forEach(endpointKey => {
        const endpoint = categoryEndpoints[endpointKey];
        const detailedPrompt = createDetailedEndpointPrompt(category, endpointKey, endpoint);
        detailedPrompts.push(detailedPrompt);
      });
    });
    
    console.log('✅ Detaylı prompt\'lar oluşturuldu:', detailedPrompts.length, 'adet');
    return detailedPrompts;
  };

  try {
    // Retry mekanizması ile API çağrısı yap
    const detailedPrompts = await retryApiCall(apiCall, {
      context: 'prompt_generate_detailed',
      maxRetries: 2,
      baseDelay: 2000
    });
    
    return detailedPrompts;
  } catch (error) {
    console.error('❌ Detaylı prompt oluşturma hatası (retry sonrası):', error);
    
    // Fallback: Varsayılan prompt'ları döndür
    console.log('🔄 Fallback prompt\'lar kullanılıyor...');
    return getFallbackPrompts();
  }
};

// Detaylı endpoint prompt'u oluştur
const createDetailedEndpointPrompt = (category, endpointKey, endpoint) => {
  const emoji = getCategoryEmoji(category);
  const description = endpoint.description || 'Endpoint açıklaması yok';
  const url = endpoint.url || `/api/${category}/${endpointKey}`;
  const method = endpoint.method || 'GET';
  const service = endpoint.service || 'unknown';
  
  // Kullanım örnekleri oluştur
  const usageExamples = generateUsageExamples(description, category, endpointKey);
  
  return `
${emoji} ${description.toUpperCase()}:

ENDPOINT: ${url}
METHOD: ${method}
SERVICE: ${service}
CATEGORY: ${category}
KEY: ${endpointKey}

KULLANIM ÖRNEKLERİ:
${usageExamples}

VERİ FORMATI:
- Response: API response formatı
- Limit: İlk 5 sonuç göster
- Timeout: 10 saniye

HATA DURUMLARI:
- 404: "${description} bilgisi bulunamadı"
- 500: "${description} bilgisi şu anda kullanılamıyor"
- Timeout: "${description} bilgisi alınırken zaman aşımı oluştu"

TÜRKÇE KARAKTER DESTEĞİ:
- "${description.toLowerCase()}" → ${category}/${endpointKey}
- "${normalizeTurkishText(description)}" → ${category}/${endpointKey}
`;
};

// Kullanım örnekleri oluştur
const generateUsageExamples = (description, category, endpointKey) => {
  const examples = [];
  
  // Description'dan anahtar kelimeler çıkar
  const keywords = extractKeywords(description);
  examples.push(`- "${keywords}" → ${category}/${endpointKey}`);
  
  // Kategori bazlı örnekler
  switch (category) {
    case 'food':
      examples.push(`- "yemek menüsü" → ${category}/${endpointKey}`);
      examples.push(`- "bugün ne yemek var" → ${category}/${endpointKey}`);
      break;
    case 'main':
      examples.push(`- "etkinlikler" → ${category}/${endpointKey}`);
      examples.push(`- "duyurular" → ${category}/${endpointKey}`);
      break;
    case 'library':
      examples.push(`- "kütüphane" → ${category}/${endpointKey}`);
      examples.push(`- "kitap" → ${category}/${endpointKey}`);
      break;
    case 'faculty_announcements':
      examples.push(`- "${description.toLowerCase()}" → ${category}/${endpointKey}`);
      examples.push(`- "${extractFacultyName(description)}" → ${category}/${endpointKey}`);
      break;
  }
  
  return examples.join('\n');
};

// Fakülte adını çıkar
const extractFacultyName = (description) => {
  const facultyKeywords = ['fakültesi', 'fakultesi', 'bölümü', 'bolumu', 'merkezi', 'merkez'];
  
  for (const keyword of facultyKeywords) {
    if (description.toLowerCase().includes(keyword)) {
      const parts = description.toLowerCase().split(keyword);
      return parts[0].trim();
    }
  }
  
  return description.toLowerCase();
};

// ========================================
// FALLBACK PROMPTS
// ========================================

// Backend'den veri alınamadığında kullanılacak varsayılan prompt'lar
const getFallbackPrompts = () => {
  console.log('🔄 Fallback prompt\'lar oluşturuluyor...');
  
  return [
    // Yemek endpoint'i
    `${EMOJIS.FOOD} YEMEK MENÜSÜ ENDPOINT:
ENDPOINT: /api/food/api
METHOD: GET
CATEGORY: food
KEY: api

KULLANIM:
- "yemek menüsü" → food/api
- "bugün ne yemek var" → food/api
- "yemekhane" → food/api

VERİ FORMATI:
- Response: { food: string[], description: string }
- Limit: İlk 5 sonuç göster

HATA DURUMLARI:
- 404: "Yemek menüsü bilgisi bulunamadı"
- 500: "Yemek menüsü bilgisi şu anda kullanılamıyor"
- Timeout: "Yemek menüsü bilgisi alınırken zaman aşımı oluştu"`,

    // Etkinlikler endpoint'i
    `${EMOJIS.EVENTS} ETKİNLİKLER ENDPOINT:
ENDPOINT: /api/main/get_all_events_tr
METHOD: GET
CATEGORY: main
KEY: get_all_events_tr

KULLANIM:
- "etkinlikler" → main/get_all_events_tr
- "etkinlik" → main/get_all_events_tr
- "programlar" → main/get_all_events_tr

VERİ FORMATI:
- Response: Array of events
- Limit: İlk 5 etkinlik göster

HATA DURUMLARI:
- 404: "Etkinlik bilgisi bulunamadı"
- 500: "Etkinlik bilgisi şu anda kullanılamıyor"
- Timeout: "Etkinlik bilgisi alınırken zaman aşımı oluştu"`,

    // Duyurular endpoint'i
    `${EMOJIS.ANNOUNCEMENTS} DUYURULAR ENDPOINT:
ENDPOINT: /api/main/announcement_tr
METHOD: GET
CATEGORY: main
KEY: announcement_tr

KULLANIM:
- "duyurular" → main/announcement_tr
- "duyuru" → main/announcement_tr
- "haberler" → main/announcement_tr

VERİ FORMATI:
- Response: Array of announcements
- Limit: İlk 5 duyuru göster

HATA DURUMLARI:
- 404: "Duyuru bilgisi bulunamadı"
- 500: "Duyuru bilgisi şu anda kullanılamıyor"
- Timeout: "Duyuru bilgisi alınırken zaman aşımı oluştu"`,

    // Kütüphane endpoint'i
    `${EMOJIS.LIBRARY} KÜTÜPHANE ENDPOINT:
ENDPOINT: /api/library/library
METHOD: GET
CATEGORY: library
KEY: library

KULLANIM:
- "kütüphane" → library/library
- "kütüphane katları" → library/library
- "masa durumu" → library/library

VERİ FORMATI:
- Response: Library data
- Limit: İlk 5 sonuç göster

HATA DURUMLARI:
- 404: "Kütüphane bilgisi bulunamadı"
- 500: "Kütüphane bilgisi şu anda kullanılamıyor"
- Timeout: "Kütüphane bilgisi alınırken zaman aşımı oluştu"`
  ];
}; 