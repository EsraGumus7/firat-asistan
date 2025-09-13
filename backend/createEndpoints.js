const fs = require('fs');
const path = require('path');

console.log('📖 api.txt dosyası okunuyor...');

// api.txt dosyasını oku
const apiContent = fs.readFileSync(path.join(__dirname, 'api.txt'), 'utf8');
const lines = apiContent.split('\n');

console.log(`📊 Toplam ${lines.length} satır okundu`);

const endpoints = [];
let trCounter = 1;
let enCounter = 1;

// Ana endpoint'ler (ilk 13 satır)
const mainEndpoints = [
  {
    key: "food_1",
    baseURL: "https://ddyo.firat.edu.tr",
    url: "/api/get-dailyFood",
    lang: "tr",
    faculty: "Günlük Yemek Menüsü",
    category: "food"
  },
  {
    key: "events_tr",
    baseURL: "https://www.firat.edu.tr",
    url: "/api/get-all-events/tr",
    lang: "tr",
    faculty: "Tüm Etkinlikler",
    category: "main"
  },
  {
    key: "events_en",
    baseURL: "https://www.firat.edu.tr",
    url: "/api/get-all-events/en",
    lang: "en",
    faculty: "All Events",
    category: "main"
  },
  {
    key: "announcements_tr",
    baseURL: "https://www.firat.edu.tr",
    url: "/api/announcement/tr",
    lang: "tr",
    faculty: "Duyurular",
    category: "main"
  },
  {
    key: "announcements_en",
    baseURL: "https://www.firat.edu.tr",
    url: "/api/announcement/en",
    lang: "en",
    faculty: "Announcements",
    category: "main"
  },
  {
    key: "news_tr",
    baseURL: "https://www.firat.edu.tr",
    url: "/api/news/tr",
    lang: "tr",
    faculty: "Haberler",
    category: "main"
  },
  {
    key: "news_en",
    baseURL: "https://www.firat.edu.tr",
    url: "/api/news/en",
    lang: "en",
    faculty: "News",
    category: "main"
  },
  {
    key: "library_floors",
    baseURL: "https://ddyo.firat.edu.tr",
    url: "/api/library/floors",
    lang: "tr",
    faculty: "Kütüphane Katları",
    category: "library"
  },
  {
    key: "library_desk_1",
    baseURL: "https://ddyo.firat.edu.tr",
    url: "/api/library/desks/1",
    lang: "tr",
    faculty: "Kütüphane Masa 1",
    category: "library"
  },
  {
    key: "library_desk_2",
    baseURL: "https://ddyo.firat.edu.tr",
    url: "/api/library/desks/2",
    lang: "tr",
    faculty: "Kütüphane Masa 2",
    category: "library"
  },
  {
    key: "library_desk_3",
    baseURL: "https://ddyo.firat.edu.tr",
    url: "/api/library/desks/3",
    lang: "tr",
    faculty: "Kütüphane Masa 3",
    category: "library"
  },
  {
    key: "library_desk_4",
    baseURL: "https://ddyo.firat.edu.tr",
    url: "/api/library/desks/4",
    lang: "tr",
    faculty: "Kütüphane Masa 4",
    category: "library"
  }
];

endpoints.push(...mainEndpoints);

console.log('✅ Ana endpoint\'ler eklendi');

// Duyuru endpoint'lerini işle
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  
  // Duyuru endpoint'lerini bul (get-last-five-announcement içeren satırlar)
  if (line.includes('get-last-five-announcement') && line.includes('✅')) {
    const parts = line.split('✅');
    if (parts.length === 2) {
      const urlPart = parts[0].trim();
      const faculty = parts[1].trim();
      
      // URL'den satır numarasını ve gereksiz karakterleri temizle
      const cleanUrl = urlPart.replace(/^\d+\.\s*/, '').trim();
      
      // URL'den dil ve endpoint key'ini çıkar
      const urlMatch = cleanUrl.match(/\/api\/get-last-five-announcement\/(tr|en)\/([^.]+)\.?$/);
      
      if (urlMatch) {
        const lang = urlMatch[1];
        const endpointKey = urlMatch[2];
        const baseURL = cleanUrl.split('/api/')[0];
        
        // Key oluştur
        const key = lang === 'tr' ? `tr_${trCounter++}` : `en_${enCounter++}`;
        
        endpoints.push({
          key,
          baseURL,
          url: `/api/get-last-five-announcement/${lang}/${endpointKey}.`,
          lang,
          faculty,
          category: "faculty_announcements"
        });
      }
    }
  }
}

console.log(`✅ Toplam ${endpoints.length} endpoint oluşturuldu`);

// Fuse.js için import
const fuseImport = `// Fuse.js için import
const Fuse = require('fuse.js');`;

// Endpoints array'ini string'e çevir
const endpointsString = JSON.stringify(endpoints, null, 2);

// Fuse.js konfigürasyonu
const fuseConfig = `
// Fuse.js konfigürasyonu
const fuseOptions = {
  keys: [
    { name: 'faculty', weight: 0.7 },
    { name: 'category', weight: 0.3 }
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
  shouldSort: true,
  findAllMatches: true
};

const fuse = new Fuse(endpoints, fuseOptions);`;

// Fonksiyonlar
const functions = `
// Fakülte adına göre endpoint bulma fonksiyonu
const findEndpointByFaculty = (facultyName, lang = "tr") => {
  return endpoints.find(
    ep => ep.faculty === facultyName && ep.lang === lang
  );
};

// Kategoriye göre endpoint'leri bulma fonksiyonu
const findEndpointsByCategory = (category) => {
  return endpoints.filter(ep => ep.category === category);
};

// Dile göre endpoint'leri bulma fonksiyonu
const findEndpointsByLang = (lang) => {
  return endpoints.filter(ep => ep.lang === lang);
};

// Fuse.js ile akıllı arama fonksiyonu
const searchEndpoints = (query, limit = 10) => {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  const results = fuse.search(query.trim());
  return results
    .slice(0, limit)
    .map(result => ({
      ...result.item,
      score: result.score,
      relevance: 1 - result.score
    }));
};

// İstatistikler
const getEndpointStats = () => {
  const stats = {
    total: endpoints.length,
    byCategory: {},
    byLang: {}
  };
  
  endpoints.forEach(ep => {
    stats.byCategory[ep.category] = (stats.byCategory[ep.category] || 0) + 1;
    stats.byLang[ep.lang] = (stats.byLang[ep.lang] || 0) + 1;
  });
  
  return stats;
};

module.exports = {
  endpoints,
  findEndpointByFaculty,
  findEndpointsByCategory,
  findEndpointsByLang,
  searchEndpoints,
  getEndpointStats
};`;

// Tam dosya içeriği
const fileContent = `// ========================================
// OTOMATİK OLUŞTURULAN ENDPOINT LİSTESİ
// Toplam: ${endpoints.length} endpoint
// Oluşturulma: ${new Date().toISOString()}
// ========================================

${fuseImport}

const endpoints = ${endpointsString};

${fuseConfig}

${functions}`;

// Dosyayı yaz
fs.writeFileSync(path.join(__dirname, 'config', 'endpoints.js'), fileContent, 'utf8');

console.log('✅ endpoints.js dosyası oluşturuldu!');
console.log(`📊 İstatistikler:`);
console.log(`   - Toplam endpoint: ${endpoints.length}`);
console.log(`   - TR endpoint'ler: ${endpoints.filter(ep => ep.lang === 'tr').length}`);
console.log(`   - EN endpoint'ler: ${endpoints.filter(ep => ep.lang === 'en').length}`);

// Kategori istatistikleri
const categoryStats = {};
endpoints.forEach(ep => {
  categoryStats[ep.category] = (categoryStats[ep.category] || 0) + 1;
});

console.log(`   - Kategoriler:`);
Object.entries(categoryStats).forEach(([category, count]) => {
  console.log(`     * ${category}: ${count}`);
}); 