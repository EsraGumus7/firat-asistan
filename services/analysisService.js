// ========================================
// ANALYSIS SERVICE - YENİ BACKEND MAPPING SİSTEMİ
// ========================================

import mappingApiService from './mappingApiService';

// ========================================
// KULLANICI MESAJ ANALİZİ
// ========================================

// Basit sohbet soruları listesi
const SIMPLE_CHAT_PATTERNS = [
  // Türkçe
  'nasılsın', 'nasilsin', 'nasılsın?', 'nasilsin?',
  'merhaba', 'selam', 'selamlar', 'hey',
  'teşekkür', 'teşekkürler', 'sağol', 'sağolun',
  'görüşürüz', 'hoşça kal', 'bay bay', 'bye',
  'iyi günler', 'iyi akşamlar', 'iyi geceler',
  'ne haber', 'naber', 'neler yapıyorsun',
  'napiyon', 'napıyon', 'ne yapıyorsun', 'ne yapıyon',
  'ne var', 'ne haber', 'nasıl gidiyor', 'nasıl gidiyor',
  'ne yapıyorsun', 'ne yapıyorsun?', 'ne yapıyorsun',
  'nasılsın', 'nasılsın?', 'nasılsın',
  'ne yapıyorsun', 'ne yapıyorsun?', 'ne yapıyorsun',
  'ne yapıyorsun', 'ne yapıyorsun?', 'ne yapıyorsun',
  // İngilizce
  'hello', 'hi', 'hey', 'how are you', 'how are you?',
  'thanks', 'thank you', 'bye', 'goodbye',
  'good morning', 'good afternoon', 'good evening', 'good night',
  'what\'s up', 'how\'s it going', 'how do you do',
  'what are you doing', 'what are you doing?', 'what are you doing'
];

// Hava durumu soruları listesi (daha spesifik)
const WEATHER_PATTERNS = [
  // Türkçe - Spesifik hava durumu sorguları
  'hava durumu', 'hava durumu nasıl', 'hava durumu nasıl?',
  'hava durumu sıcak mı', 'hava durumu sicak mi', 'hava durumu güneşli mi', 'hava durumu gunesli mi',
  'hava durumu bulutlu mu', 'hava durumu yağmurlu mu', 'hava durumu yagmurlu mu',
  'hava durumu karlı mı', 'hava durumu karli mi', 'hava durumu fırtınalı mı', 'hava durumu firtinali mi',
  'hava durumu sisli mi', 'hava durumu tahmini', 'hava durumu raporu',
  'bugün hava durumu', 'bugun hava durumu', 'yarın hava durumu', 'yarin hava durumu',
  'hava durumu kaç derece', 'hava durumu kac derece', 'hava durumu derece',
  'hava durumu bilgisi', 'hava durumu raporu',
  // Genel hava durumu sorguları
  'hava nasıl', 'hava nasıl?', 'hava sıcak mı', 'hava sicak mi', 'hava sıcak', 'hava sicak',
  'güneşli mi', 'gunesli mi', 'güneşli', 'gunesli', 'bulutlu mu', 'bulutlu',
  'soğuk mu', 'soguk mu', 'soğuk', 'soguk', 'sıcak mı', 'sicak mi', 'sıcak', 'sicak',
  'yağmurlu mu', 'yagmurlu mu', 'yağmurlu', 'yagmurlu', 'karlı mı', 'karli mi', 'karlı', 'karli',
  'fırtınalı mı', 'firtinali mi', 'fırtınalı', 'firtinali', 'sisli mi', 'sisli',
  'hava tahmini', 'hava raporu', 'bugün hava', 'bugun hava', 'yarın hava', 'yarin hava',
  'kaç derece', 'kac derece', 'derece kaç', 'derece kac', 'hava raporu',
  // Sıcaklık ve meteorolojik terimler
  'sıcaklık', 'sicaklik', 'sıcaklık kaç', 'sicaklik kac', 'sıcaklık kaç?', 'sicaklik kac?',
  'yağmur', 'yagmur', 'yağmur var mı', 'yagmur var mi', 'yağmur var mı?', 'yagmur var mi?',
  'kar', 'kar var mı', 'kar var mi', 'kar yağıyor mu', 'kar yagiyor mu',
  'rüzgar', 'ruzgar', 'rüzgar var mı', 'ruzgar var mi', 'rüzgar var mı?', 'ruzgar var mi?',
  'nem', 'nem oranı', 'nem orani', 'nem oranı kaç', 'nem orani kac', 'nem oranı kaç?', 'nem orani kac?',
  // Elazığ spesifik
  'elazığ hava durumu', 'elazig hava durumu', 'elazığ hava nasıl', 'elazig hava nasil',
  'elazığ sıcaklık', 'elazig sicaklik', 'elazığ sıcaklık kaç', 'elazig sicaklik kac',
  'elazığ yağmur', 'elazig yagmur', 'elazığ yağmur var mı', 'elazig yagmur var mi',
  'elazığ rüzgar', 'elazig ruzgar', 'elazığ rüzgar var mı', 'elazig ruzgar var mi',
  'elazığ nem', 'elazığ nem oranı',
  // İngilizce
  'weather', 'weather today', 'weather tomorrow',
  'temperature', 'temp', 'how hot', 'how cold',
  'rain', 'rainy', 'sunny', 'cloudy', 'windy',
  'humidity', 'wind', 'forecast', 'forecast today',
  'elazig weather', 'elazig temperature', 'elazig rain'
];

// Basit sohbet kontrolü
const isSimpleChat = (message, lang = 'tr') => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Noktalama işaretlerini kaldır
  const cleanMessage = lowerMessage.replace(/[.,!?;:]/g, '');
  
  return SIMPLE_CHAT_PATTERNS.some(pattern => 
    cleanMessage.includes(pattern.toLowerCase())
  );
};

// Hava durumu kontrolü
const isWeatherQuery = (message, lang = 'tr') => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Noktalama işaretlerini kaldır
  const cleanMessage = lowerMessage.replace(/[.,!?;:]/g, '');
  
  return WEATHER_PATTERNS.some(pattern => 
    cleanMessage.includes(pattern.toLowerCase())
  );
};

// Kullanıcı mesajını analiz eden ana fonksiyon
export const analyzeUserMessage = async (message, lang = 'tr') => {
  console.log('Kullanıcı mesajı analiz ediliyor:', message, '(dil:', lang, ')');
  
  // Basit sohbet kontrolü - eğer basit sohbet ise direkt Gemini'ye yönlendir
  if (isSimpleChat(message, lang)) {
    console.log('🎯 Basit sohbet tespit edildi, backend\'e gitmeden Gemini\'ye yönlendiriliyor');
    return null; // null döndür ki AnaEkran.js'de Gemini'ye gitsin
  }

  // Hava durumu kontrolü - eğer hava durumu sorusu ise hava durumu servisine yönlendir
  if (isWeatherQuery(message, lang)) {
    console.log('🌤️ Hava durumu sorusu tespit edildi, hava durumu servisine yönlendiriliyor');
    return {
      success: true,
      data: {
        type: 'weather',
        message: message,
        lang: lang
      },
      endpoint: {
        category: 'weather',
        faculty: 'general',
        name: 'weather_query'
      }
    };
  }
  
    try {
    // Önce keyword mapping ile endpoint bul
    const result = await mappingApiService.findEndpointByMessage(message, lang);
    
    // MappingApiService'ten gelen weather kontrolü
    if (result.isWeather === true) {
      console.log('🌤️ MappingApiService\'ten hava durumu sorusu tespit edildi');
      return {
        success: true,
        data: {
          type: 'weather',
          message: message,
          lang: lang
        },
        endpoint: {
          category: 'weather',
          faculty: 'general',
          name: 'weather_query'
        }
      };
    }
    
    if (result.success) {
      console.log('Keyword mapping sonucu:', result);
      return formatResponse(result.data, result.endpoint.category, result.endpoint.faculty, message);
    }
    
    // Keyword mapping başarısız ise akıllı arama yap
    const smartResult = await mappingApiService.smartSearch(message, lang);
    
    if (smartResult.success) {
      console.log('Smart search sonucu:', smartResult);
      return await handleMappingResult(smartResult, message);
    }
    
    // Hiçbiri başarısız ise manuel keyword kontrolü
    return await handleManualKeywords(message, lang);
    
  } catch (error) {
    console.error('Mesaj analizi hatası:', error);
    return 'Üzgünüm, mesajınızı anlayamadım. Lütfen farklı bir şekilde sorun.';
  }
};

// ========================================
// MAPPING SONUÇLARINI İŞLE
// ========================================

const handleMappingResult = async (result, originalMessage) => {
  try {
    if (result.type === 'exact') {
      // Tam eşleşme bulundu
      console.log('Tam eşleşme bulundu:', result.endpoint);
      return formatResponse(result.data, result.endpoint.category, result.endpoint.faculty, originalMessage);
    } else if (result.type === 'fuzzy') {
      // Bulanık arama sonuçları
      console.log('Bulanık arama sonuçları:', result.suggestions);
      
      if (result.suggestions.length === 1) {
        // Tek sonuç varsa direkt çağır
        const suggestion = result.suggestions[0];
        const endpointResult = await mappingApiService.findAndCallEndpoint(suggestion.faculty, suggestion.lang);
        
        if (endpointResult.success) {
          return formatResponse(endpointResult.data, suggestion.category, suggestion.faculty, originalMessage);
        }
      } else if (result.suggestions.length > 1) {
        // Birden fazla sonuç varsa listele
        const suggestions = result.suggestions.slice(0, 5).map((s, i) => 
          `${i + 1}. ${s.faculty}`
        ).join('\n');
        
        return `Aradığınız "${originalMessage}" için birden fazla sonuç bulundu:\n\n${suggestions}\n\nHangi fakülteyi kastettiğinizi belirtir misiniz?`;
      }
    }
    
    return 'Üzgünüm, aradığınız bilgi bulunamadı. Lütfen farklı bir şekilde sorun.';
    
  } catch (error) {
    console.error('Mapping sonucu işleme hatası:', error);
    return 'Üzgünüm, bilgi alınırken bir hata oluştu.';
  }
};

// ========================================
// MANUEL KEYWORD KONTROLÜ (FALLBACK)
// ========================================

const handleManualKeywords = async (message, lang = 'tr') => {
  const lowerMessage = message.toLowerCase();
  
  // Yemek menüsü
  if (lowerMessage.includes('yemek') || lowerMessage.includes('menü') || lowerMessage.includes('food')) {
    try {
      const result = await mappingApiService.findAndCallEndpoint('Günlük Yemek Menüsü', lang);
      if (result.success) {
        return formatResponse(result.data, 'food', 'Günlük Yemek Menüsü', message);
      }
    } catch (error) {
      console.error('Yemek menüsü hatası:', error);
    }
    return 'Yemek menüsü bilgisi şu anda kullanılamıyor.';
  }
  
  // Etkinlikler
  if (lowerMessage.includes('etkinlik') || lowerMessage.includes('event')) {
    try {
      const result = await mappingApiService.findAndCallEndpoint('Tüm Etkinlikler', lang);
      if (result.success) {
        return formatResponse(result.data, 'main', 'Tüm Etkinlikler', message);
      }
    } catch (error) {
      console.error('Etkinlik hatası:', error);
    }
    return 'Etkinlik bilgisi şu anda kullanılamıyor.';
  }
  
  // Duyurular
  if (lowerMessage.includes('duyuru') || lowerMessage.includes('announcement')) {
    try {
      const result = await mappingApiService.findAndCallEndpoint('Duyurular', lang);
      if (result.success) {
        return formatResponse(result.data, 'main', 'Duyurular', message);
      }
    } catch (error) {
      console.error('Duyuru hatası:', error);
    }
    return 'Duyuru bilgisi şu anda kullanılamıyor.';
  }
  
  // Haberler
  if (lowerMessage.includes('haber') || lowerMessage.includes('news')) {
    try {
      const result = await mappingApiService.findAndCallEndpoint('Haberler', lang);
      if (result.success) {
        return formatResponse(result.data, 'main', 'Haberler', message);
      }
    } catch (error) {
      console.error('Haber hatası:', error);
    }
    return 'Haber bilgisi şu anda kullanılamıyor.';
  }
  
  // Kütüphane
  if (lowerMessage.includes('kütüphane') || lowerMessage.includes('library')) {
    try {
      const result = await mappingApiService.findAndCallEndpoint('Kütüphane Katları', lang);
      if (result.success) {
        return formatResponse(result.data, 'library', 'Kütüphane Katları', message);
      }
    } catch (error) {
      console.error('Kütüphane hatası:', error);
    }
    return 'Kütüphane bilgisi şu anda kullanılamıyor.';
  }
  
  // Kütüphane katları (zemin kat, 1. kat, vb.)
  if (lowerMessage.includes('zemin') || lowerMessage.includes('kat') || 
      lowerMessage.includes('ground') || lowerMessage.includes('floor')) {
    try {
      const result = await mappingApiService.findAndCallEndpoint('Kütüphane Katları', lang);
      if (result.success) {
        return formatResponse(result.data, 'library', 'Kütüphane Katları', message);
      }
    } catch (error) {
      console.error('Kütüphane katları hatası:', error);
    }
    return 'Kütüphane katları bilgisi şu anda kullanılamıyor.';
  }
  
  return 'Üzgünüm, aradığınız bilgi bulunamadı. Lütfen farklı bir şekilde sorun.';
};

// ========================================
// RESPONSE FORMATLAMA
// ========================================

const formatResponse = (data, category, description, originalMessage) => {
  switch (category) {
    case 'food':
      return formatFoodResponse(data);
    case 'main':
      return formatMainResponse(data, description);
    case 'library':
      return formatLibraryResponse(data);
    case 'faculty_announcements':
      return formatFacultyAnnouncementsResponse(data, description);
    default:
      return formatGenericResponse(data, description);
  }
};

const formatFoodResponse = (data) => {
  console.log('formatFoodResponse called with data:', data);
  
  if (data.food && data.food.length > 0) {
    console.log('Returning food menu');
    return `🍽️ Bugünün yemek menüsü:\n${data.food.join('\n')}`;
  } else if (data.description) {
    console.log('Returning description');
    return `🍽️ Yemek menüsü bilgisi:\n${data.description}`;
  } else {
    console.log('Returning no info message');
    return '🍽️ Yemek menüsü bilgisi mevcut değil.';
  }
};

const formatMainResponse = (data, description) => {
  console.log('formatMainResponse called with data:', data);
  
  // data.Success array'ini kontrol et (büyük S ile)
  if (data.Success && Array.isArray(data.Success) && data.Success.length > 0) {
    console.log('Found Success array with', data.Success.length, 'items');
    
    let response = `📢 ${description}:\n\n`;
    
    // Her öğe için başlık ve link
    data.Success.slice(0, 5).forEach((item, index) => {
      // Başlık kontrolü - önce translations array'ini kontrol et
      let title = 'Başlık yok';
      
      if (item.title && item.title.trim() !== '') {
        title = item.title;
      } else if (item.translations && Array.isArray(item.translations) && item.translations.length > 0) {
        // Translations array'inden ilk öğenin title'ını al
        const firstTranslation = item.translations[0];
        if (firstTranslation && firstTranslation.title && firstTranslation.title.trim() !== '') {
          title = firstTranslation.title;
        }
      } else if (item.name && item.name.trim() !== '') {
        title = item.name;
      } else if (typeof item === 'string') {
        title = item;
      }
      
      response += `${index + 1}. ${title}\n`;
      
      // Link kontrolü - farklı alan isimlerini dene
      const link = item.content_page_url || item.link || item.url || item.detay_link;
      if (link) {
        response += `   🔗 Detayları görüntüle (${link})\n\n`;
      } else {
        response += `   ❌ Link yok\n\n`;
      }
    });
    
    return response;
  }
  // Direkt array kontrolü
  else if (Array.isArray(data) && data.length > 0) {
    console.log('Found direct array with', data.length, 'items');
    
    let response = `📢 ${description}:\n\n`;
    
    // Her öğe için başlık ve link
    data.slice(0, 5).forEach((item, index) => {
      // Başlık kontrolü - önce translations array'ini kontrol et
      let title = 'Başlık yok';
      
      if (item.title && item.title.trim() !== '') {
        title = item.title;
      } else if (item.translations && Array.isArray(item.translations) && item.translations.length > 0) {
        // Translations array'inden ilk öğenin title'ını al
        const firstTranslation = item.translations[0];
        if (firstTranslation && firstTranslation.title && firstTranslation.title.trim() !== '') {
          title = firstTranslation.title;
        }
      } else if (item.name && item.name.trim() !== '') {
        title = item.name;
      } else if (typeof item === 'string') {
        title = item;
      }
      
      response += `${index + 1}. ${title}\n`;
      
      // Link kontrolü - farklı alan isimlerini dene
      const link = item.content_page_url || item.link || item.url || item.detay_link;
      if (link) {
        response += `   🔗 Detayları görüntüle (${link})\n\n`;
      } else {
        response += `   ❌ Link yok\n\n`;
      }
    });
    
    return response;
  } else if (data.description) {
    console.log('Found description');
    return `📢 ${description}: ${data.description}`;
  } else {
    console.log('No data found');
    return `📢 ${description} bilgisi mevcut değil.`;
  }
};

const formatLibraryResponse = (data) => {
  console.log('formatLibraryResponse called with data:', data);
  console.log('Data type:', typeof data);
  console.log('Is Array:', Array.isArray(data));
  console.log('Data length:', data?.length);
  console.log('First item:', data?.[0]);
  console.log('Has masa_no:', data?.[0]?.masa_no);
  
  // Array kontrolü - masa listesi (öncelikli)
  if (Array.isArray(data) && data.length > 0 && data[0].masa_no) {
    console.log('Found library desk list with', data.length, 'desks');
    
    // Boş ve dolu masaları say
    const bosMasalar = data.filter(masa => masa.dolu_mu === 0);
    const doluMasalar = data.filter(masa => masa.dolu_mu === 1);
    
    let response = `📚 Kütüphane Masa Durumu:\n\n`;
    response += `📊 Toplam Masa: ${data.length}\n`;
    response += `✅ Boş Masa: ${bosMasalar.length}\n`;
    response += `❌ Dolu Masa: ${doluMasalar.length}\n\n`;
    
    // İlk 10 boş masayı listele
    if (bosMasalar.length > 0) {
      response += `🆓 Boş Masalar:\n`;
      bosMasalar.slice(0, 10).forEach((masa, index) => {
        response += `${index + 1}. Masa ${masa.masa_no}\n`;
      });
      
      if (bosMasalar.length > 10) {
        response += `... ve ${bosMasalar.length - 10} masa daha\n`;
      }
    }
    
    return response;
  }
  // Array kontrolü - kütüphane katları
  else if (Array.isArray(data) && data.length > 0) {
    console.log('Found library floors array with', data.length, 'items');
    
    let response = `📚 Kütüphane Katları:\n\n`;
    
    data.forEach((floor, index) => {
      const floorName = floor.name || `Kat ${floor.id}`;
      response += `${index + 1}. ${floorName}\n`;
    });
    
    return response;
  }
  // Object kontrolü - spesifik kat detayları
  else if (data && typeof data === 'object' && !Array.isArray(data)) {
    console.log('Found library floor details');
    
    // Masa listesi kontrolü (data.masalar array'i varsa)
    if (data.masalar && Array.isArray(data.masalar) && data.masalar.length > 0) {
      console.log('Found masalar array with', data.masalar.length, 'desks');
      
      // Boş ve dolu masaları say
      const bosMasalar = data.masalar.filter(masa => masa.dolu_mu === 0);
      const doluMasalar = data.masalar.filter(masa => masa.dolu_mu === 1);
      
      let response = `📚 Kütüphane Masa Durumu:\n\n`;
      
      // Kat bilgilerini göster
      if (data.kat_adi) {
        response += `🏢 Kat: ${data.kat_adi}\n`;
      }
      if (data.kapasite) {
        response += `👥 Kapasite: ${data.kapasite}\n`;
      }
      
      response += `📊 Toplam Masa: ${data.masalar.length}\n`;
      response += `✅ Boş Masa: ${bosMasalar.length}\n`;
      response += `❌ Dolu Masa: ${doluMasalar.length}\n\n`;
      
      // İlk 10 boş masayı listele
      if (bosMasalar.length > 0) {
        response += `🆓 Boş Masalar:\n`;
        bosMasalar.slice(0, 10).forEach((masa, index) => {
          response += `${index + 1}. Masa ${masa.masa_no}\n`;
        });
        
        if (bosMasalar.length > 10) {
          response += `... ve ${bosMasalar.length - 10} masa daha\n`;
        }
      }
      
      return response;
    }
    
    // Genel kat bilgileri
    let response = `📚 Kütüphane Kat Detayları:\n\n`;
    
    // Kat bilgilerini göster
    if (data.kat_adi) {
      response += `🏢 Kat: ${data.kat_adi}\n`;
    }
    if (data.id) {
      response += `🆔 ID: ${data.id}\n`;
    }
    if (data.kapasite) {
      response += `👥 Kapasite: ${data.kapasite}\n`;
    }
    if (data.description) {
      response += `📝 Açıklama: ${data.description}\n`;
    }
    if (data.available_seats) {
      response += `💺 Boş Koltuk: ${data.available_seats}\n`;
    }
    if (data.hours) {
      response += `🕐 Çalışma Saatleri: ${data.hours}\n`;
    }
    
    return response;
  }
  // Description kontrolü
  else if (data.description) {
    console.log('Found description');
    return `📚 Kütüphane: ${data.description}`;
  } 
  // Hiçbir veri yok
  else {
    console.log('No library data found');
    return '📚 Kütüphane bilgisi mevcut değil.';
  }
};

const formatFacultyAnnouncementsResponse = (data, description) => {
  console.log('formatFacultyAnnouncementsResponse called with data:', data);
  
  // data.success array'ini kontrol et
  if (data.success && Array.isArray(data.success) && data.success.length > 0) {
    console.log('Found success array with', data.success.length, 'items');
    
    let response = `🏛️ ${description} Duyuruları:\n\n`;
    
    // Her duyuru için başlık, tarih ve link
    data.success.slice(0, 5).forEach((item, index) => {
      const date = item.date ? new Date(item.date).toLocaleDateString('tr-TR') : '';
      const title = item.title || 'Başlık yok';
      
      response += `${index + 1}. ${title}\n`;
      response += `   📅 ${date}\n`;
      
      if (item.link) {
        response += `   🔗 Detayları görüntüle (${item.link})\n\n`;
      } else {
        response += `   ❌ Link yok\n\n`;
      }
    });
    
    return response;
  } 
  // Direkt array kontrolü
  else if (Array.isArray(data) && data.length > 0) {
    console.log('Found direct array with', data.length, 'items');
    
    let response = `🏛️ ${description} Duyuruları:\n\n`;
    
    // Her duyuru için başlık ve link
    data.slice(0, 5).forEach((item, index) => {
      const title = item.title || item.name || item || 'Başlık yok';
      
      response += `${index + 1}. ${title}\n`;
      
      if (item.link) {
        response += `   🔗 Detayları görüntüle (${item.link})\n\n`;
      } else {
        response += `   ❌ Link yok\n\n`;
      }
    });
    
    return response;
  } 
  // Description kontrolü
  else if (data.description) {
    console.log('Found description');
    return `🏛️ ${description}: ${data.description}`;
  } 
  // Hiçbir veri yok
  else {
    console.log('No data found');
    return `🏛️ ${description} duyurusu bulunamadı.`;
  }
};

const formatGenericResponse = (data, description) => {
  if (data.description) {
    return `${description}: ${data.description}`;
  } else {
    return `${description} bilgisi mevcut değil.`;
  }
}; 