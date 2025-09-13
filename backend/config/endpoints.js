// ========================================
// OTOMATİK OLUŞTURULAN ENDPOINT LİSTESİ
// Toplam: 610 endpoint
// Oluşturulma: 2025-08-06T19:02:56.521Z
// ========================================

// Fuse.js için import
const Fuse = require('fuse.js');

const endpoints = [
  {
    "key": "food_1",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-dailyFood",
    "lang": "tr",
    "faculty": "Günlük Yemek Menüsü",
    "category": "food"
  },
  {
    "key": "events_tr",
    "baseURL": "https://www.firat.edu.tr",
    "url": "/api/get-all-events/tr",
    "lang": "tr",
    "faculty": "Tüm Etkinlikler",
    "category": "main"
  },
  {
    "key": "events_en",
    "baseURL": "https://www.firat.edu.tr",
    "url": "/api/get-all-events/en",
    "lang": "en",
    "faculty": "All Events",
    "category": "main"
  },
  {
    "key": "announcements_tr",
    "baseURL": "https://www.firat.edu.tr",
    "url": "/api/announcement/tr",
    "lang": "tr",
    "faculty": "Duyurular",
    "category": "main"
  },
  {
    "key": "announcements_en",
    "baseURL": "https://www.firat.edu.tr",
    "url": "/api/announcement/en",
    "lang": "en",
    "faculty": "Announcements",
    "category": "main"
  },
  {
    "key": "news_tr",
    "baseURL": "https://www.firat.edu.tr",
    "url": "/api/news/tr",
    "lang": "tr",
    "faculty": "Haberler",
    "category": "main"
  },
  {
    "key": "news_en",
    "baseURL": "https://www.firat.edu.tr",
    "url": "/api/news/en",
    "lang": "en",
    "faculty": "News",
    "category": "main"
  },
  {
    "key": "library_floors",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/library/floors",
    "lang": "tr",
    "faculty": "Kütüphane Katları",
    "category": "library"
  },
  {
    "key": "library_desk_1",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/library/desks/1",
    "lang": "tr",
    "faculty": "Kütüphane Masa 1",
    "category": "library"
  },
  {
    "key": "library_desk_2",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/library/desks/2",
    "lang": "tr",
    "faculty": "Kütüphane Masa 2",
    "category": "library"
  },
  {
    "key": "library_desk_3",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/library/desks/3",
    "lang": "tr",
    "faculty": "Kütüphane Masa 3",
    "category": "library"
  },
  {
    "key": "library_desk_4",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/library/desks/4",
    "lang": "tr",
    "faculty": "Kütüphane Masa 4",
    "category": "library"
  },
  {
    "key": "tr_1",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ddyo.",
    "lang": "tr",
    "faculty": "DİJİTAL DÖNÜŞÜM ve YAZILIM OFİSİ KOORDİNATÖRLÜĞÜ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_1",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ddyo.",
    "lang": "en",
    "faculty": "DIGITAL TRANSFORMATION AND SOFTWARE OFFICE",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_2",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yazmf.",
    "lang": "tr",
    "faculty": "Yazılım Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_2",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yazmf.",
    "lang": "en",
    "faculty": "Software Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_3",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sporbilimlerif.",
    "lang": "tr",
    "faculty": "SPOR BİLİMLERİ FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_3",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sporbilimlerif.",
    "lang": "en",
    "faculty": "FACULTY OF SPORTS SCIENCES",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_4",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/kikoord.",
    "lang": "tr",
    "faculty": "KURUMSAL İLETİŞİM KOORDİNATÖRLÜĞÜ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_4",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/kikoord.",
    "lang": "en",
    "faculty": "Office of Corporate Communications",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_5",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/muhendislikf.",
    "lang": "tr",
    "faculty": "MÜHENDİSLİK FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_5",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/muhendislikf.",
    "lang": "en",
    "faculty": "FACULTY OF ENGINEERING",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_6",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/teknolojif.",
    "lang": "tr",
    "faculty": "TEKNOLOJİ FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_6",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/teknolojif.",
    "lang": "en",
    "faculty": "FACULTY OF TECHNOLOGY",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_7",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yazilimtf.",
    "lang": "tr",
    "faculty": "Yazılım Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_7",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yazilimtf.",
    "lang": "en",
    "faculty": "Software Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_8",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/egitimf.",
    "lang": "tr",
    "faculty": "EĞİTİM FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_8",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/egitimf.",
    "lang": "en",
    "faculty": "FACULTY OF EDUCATION",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_9",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fenf.",
    "lang": "tr",
    "faculty": "FEN FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_9",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fenf.",
    "lang": "en",
    "faculty": "FACULTY OF SCIENCES",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_10",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/iibf.",
    "lang": "tr",
    "faculty": "İKTİSADİ VE İDARİ BİLİMLER FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_10",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/iibf.",
    "lang": "en",
    "faculty": "FACULTY OF ECONOMICS AND ADMINISTRATIVE SCIENCES",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_11",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ilahiyatf.",
    "lang": "tr",
    "faculty": "İLAHİYAT FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_11",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ilahiyatf.",
    "lang": "en",
    "faculty": "FACULTY OF THEOLOGY",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_12",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/iletisimf.",
    "lang": "tr",
    "faculty": "İLETİŞİM FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_12",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/iletisimf.",
    "lang": "en",
    "faculty": "FACULTY OF COMMUNICATION",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_13",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/isbf.",
    "lang": "tr",
    "faculty": "İnsan ve Toplum Bilimleri Fakültesi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_13",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/isbf.",
    "lang": "en",
    "faculty": "Faculty of Humanities and Social Sciences",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_14",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/mimarlikf.",
    "lang": "tr",
    "faculty": "Mimarlık Fakültesi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_14",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/mimarlikf.",
    "lang": "en",
    "faculty": "Faculty of Architecture",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_15",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/saglikf.",
    "lang": "tr",
    "faculty": "SAĞLIK BİLİMLERİ FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_15",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/saglikf.",
    "lang": "en",
    "faculty": "FACULTY OF HEALTH SCIENCES",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_16",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/suuf.",
    "lang": "tr",
    "faculty": "SU ÜRÜNLERİ FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_16",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/suuf.",
    "lang": "en",
    "faculty": "FACULTY OF FISHERIES",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_17",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/tip.",
    "lang": "tr",
    "faculty": "TIP FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_17",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/tip.",
    "lang": "en",
    "faculty": "FACULTY OF MEDICINE",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_18",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/veterinerf.",
    "lang": "tr",
    "faculty": "VETERİNER FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_18",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/veterinerf.",
    "lang": "en",
    "faculty": "Faculty of Veterinary Science",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_19",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/kyo.",
    "lang": "tr",
    "faculty": "DEVLET KONSERVATUVARI",
    "category": "faculty_announcements"
  },
  {
    "key": "en_19",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/kyo.",
    "lang": "en",
    "faculty": "STATE CONSERVATORY",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_20",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sivilhavacilik.",
    "lang": "tr",
    "faculty": "SİVİL HAVACILIK YÜKSEKOKULU",
    "category": "faculty_announcements"
  },
  {
    "key": "en_20",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sivilhavacilik.",
    "lang": "en",
    "faculty": "SCHOOL OF CIVIL AVIATION",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_21",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yabancidiller.",
    "lang": "tr",
    "faculty": "YABANCI DİLLER YÜKSEKOKULU",
    "category": "faculty_announcements"
  },
  {
    "key": "en_21",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yabancidiller.",
    "lang": "en",
    "faculty": "SCHOOL OF FOREIGN LANGUAGES",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_22",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/keban.",
    "lang": "tr",
    "faculty": "KEBAN MESLEK YÜKSEKOKULU",
    "category": "faculty_announcements"
  },
  {
    "key": "en_22",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/keban.",
    "lang": "en",
    "faculty": "Keban Vocational School",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_23",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/karakocan.",
    "lang": "tr",
    "faculty": "KARAKOÇAN MESLEK YÜKSEK OKULU",
    "category": "faculty_announcements"
  },
  {
    "key": "en_23",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/karakocan.",
    "lang": "en",
    "faculty": "Karakoçan Vocational School",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_24",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fen.",
    "lang": "tr",
    "faculty": "Fen Bilimleri Enstitüsü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_24",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fen.",
    "lang": "en",
    "faculty": "Graduate School of Natural and Applied Sciences",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_25",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/eemtf.",
    "lang": "tr",
    "faculty": "Elektrik Elektronik Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_25",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/eemtf.",
    "lang": "en",
    "faculty": "Electrical Electronics Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_26",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/baskil.",
    "lang": "tr",
    "faculty": "Baskil Meslek Yüksek Okulu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_26",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/baskil.",
    "lang": "en",
    "faculty": "Baskil Vocational School",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_27",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/kovancilar.",
    "lang": "tr",
    "faculty": "Kovancılar Meslek Yüksek Okulu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_27",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/kovancilar.",
    "lang": "en",
    "faculty": "Kovancılar Vocational School",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_28",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sanayi.",
    "lang": "tr",
    "faculty": "Elazığ Organize Sanayi Bölgesi Meslek Yüksekokulu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_28",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sanayi.",
    "lang": "en",
    "faculty": "Vocational School of Elazığ Organized Industrial Zone",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_29",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sivrice.",
    "lang": "tr",
    "faculty": "Sivrice Meslek Yüksek Okulu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_29",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sivrice.",
    "lang": "en",
    "faculty": "Sivrice Vocational School",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_30",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sosyal.",
    "lang": "tr",
    "faculty": "Sosyal Bilimler Enstitüsü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_30",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sosyal.",
    "lang": "en",
    "faculty": "Graduate Institute for Social Sciences",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_31",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/teknik.",
    "lang": "tr",
    "faculty": "Teknik Bilimler Meslek Yüksekokulu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_31",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/teknik.",
    "lang": "en",
    "faculty": "Vocational School of Technical Sciences",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_32",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/disf.",
    "lang": "tr",
    "faculty": "Diş Hekimliği Fakültesi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_32",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/disf.",
    "lang": "en",
    "faculty": "FACULTY OF DENTISTRY",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_33",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/saglik.",
    "lang": "tr",
    "faculty": "Sağlık Bilimleri Enstitüsü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_33",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/saglik.",
    "lang": "en",
    "faculty": "Graduate Institute for Health Sciences",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_34",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/egitim.",
    "lang": "tr",
    "faculty": "Eğitim Bilimleri Enstitüsü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_34",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/egitim.",
    "lang": "en",
    "faculty": "Graduate Institute for Educational Sciences",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_35",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/saglikmyo.",
    "lang": "tr",
    "faculty": "Sağlık Hizmetleri Meslek Yüksek Okulu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_35",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/saglikmyo.",
    "lang": "en",
    "faculty": "Vocational School of Health Services",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_36",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sosyalmyo.",
    "lang": "tr",
    "faculty": "Sosyal Bilimler Meslek Yüksek Okulu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_36",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sosyalmyo.",
    "lang": "en",
    "faculty": "Vocational School of Social Sciences",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_37",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/biyoloji.",
    "lang": "tr",
    "faculty": "Biyoloji Programı ve Moleküler Biyoloji ve Genetik Programı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_37",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/biyoloji.",
    "lang": "en",
    "faculty": "Biology Program and Molecular Biology and Genetics Program",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_38",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/istatistik.",
    "lang": "tr",
    "faculty": "İstatistik Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_38",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/istatistik.",
    "lang": "en",
    "faculty": "Department of Statistics",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_39",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fizik.",
    "lang": "tr",
    "faculty": "Fizik Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_39",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fizik.",
    "lang": "en",
    "faculty": "Department of Physics",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_40",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/bilgisayarmf.",
    "lang": "tr",
    "faculty": "Bilgisayar Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_40",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/bilgisayarmf.",
    "lang": "en",
    "faculty": "Computer Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_41",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/bmmf.",
    "lang": "tr",
    "faculty": "Biyomühendislik",
    "category": "faculty_announcements"
  },
  {
    "key": "en_41",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/bmmf.",
    "lang": "en",
    "faculty": "Bioengineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_42",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/insaatmf.",
    "lang": "tr",
    "faculty": "İnşaat Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_42",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/insaatmf.",
    "lang": "en",
    "faculty": "Civil Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_43",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/kimyamf.",
    "lang": "tr",
    "faculty": "Kimya Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_43",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/kimyamf.",
    "lang": "en",
    "faculty": "Chemical Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_44",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/abmtf.",
    "lang": "tr",
    "faculty": "Adli Bilişim Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_44",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/abmtf.",
    "lang": "en",
    "faculty": "Digital Forensics Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_45",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/insaattf.",
    "lang": "tr",
    "faculty": "İnşaat Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_45",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/insaattf.",
    "lang": "en",
    "faculty": "Civil Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_46",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/mekatroniktf.",
    "lang": "tr",
    "faculty": "Mekatronik Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_46",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/mekatroniktf.",
    "lang": "en",
    "faculty": "Mechatronic Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_47",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/mmtf.",
    "lang": "tr",
    "faculty": "Metalurji ve Malzeme Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_47",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/mmtf.",
    "lang": "en",
    "faculty": "Metallurgy and Materials Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_48",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/makinamf.",
    "lang": "tr",
    "faculty": "Makina Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_48",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/makinamf.",
    "lang": "en",
    "faculty": "Mechanical Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_49",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/cb.",
    "lang": "tr",
    "faculty": "Coğrafya Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_49",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/cb.",
    "lang": "en",
    "faculty": "Department of Geography",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_50",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sosyoloji.",
    "lang": "tr",
    "faculty": "Sosyoloji Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_50",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sosyoloji.",
    "lang": "en",
    "faculty": "Department of Sociology",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_51",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/tarih.",
    "lang": "tr",
    "faculty": "Tarih Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_51",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/tarih.",
    "lang": "en",
    "faculty": "Department of History",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_52",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/turkdiliedb.",
    "lang": "tr",
    "faculty": "Türk Dili ve Edebiyatı Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_52",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/turkdiliedb.",
    "lang": "en",
    "faculty": "Department of Turkish Language and Literature",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_53",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/mimarlik.",
    "lang": "tr",
    "faculty": "Mimarlık Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_53",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/mimarlik.",
    "lang": "en",
    "faculty": "Department of Architecture",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_54",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/bd.",
    "lang": "tr",
    "faculty": "Beslenme ve Diyetetik Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_54",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/bd.",
    "lang": "en",
    "faculty": "Department of Nutrition and Dietetics",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_55",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ebe.",
    "lang": "tr",
    "faculty": "Ebelik Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_55",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ebe.",
    "lang": "en",
    "faculty": "Department of Midwifery",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_56",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/heeb.",
    "lang": "tr",
    "faculty": "Havacılık Elektrik ve Elektroniği Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_56",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/heeb.",
    "lang": "en",
    "faculty": "Department of Aviation Electrical and Electronics",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_57",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/htkb.",
    "lang": "tr",
    "faculty": "Hava Trafik Kontrolü Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_57",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/htkb.",
    "lang": "en",
    "faculty": "Department of Air Traffic Control",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_58",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ubob.",
    "lang": "tr",
    "faculty": "Uçak Bakım ve Onarım Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_58",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ubob.",
    "lang": "en",
    "faculty": "Department of Aircraf Maintenance and Repair",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_59",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/mekatronikmf.",
    "lang": "tr",
    "faculty": "Mekatronik Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_59",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/mekatronikmf.",
    "lang": "en",
    "faculty": "Mechatronic Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_60",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/teabd.",
    "lang": "tr",
    "faculty": "Türkçe Eğitimi Ana Bilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_60",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/teabd.",
    "lang": "en",
    "faculty": "Department of Turkish Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_61",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ydeb.",
    "lang": "tr",
    "faculty": "Yabancı Diller Eğitimi Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_61",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ydeb.",
    "lang": "en",
    "faculty": "Department of Foreign Language Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_62",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/aktuerya.",
    "lang": "tr",
    "faculty": "Aktüerya Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_62",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/aktuerya.",
    "lang": "en",
    "faculty": "Department of Actuarial",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_63",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/kimya.",
    "lang": "tr",
    "faculty": "Kimya Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_63",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/kimya.",
    "lang": "en",
    "faculty": "Department of Chemistry",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_64",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/matematik.",
    "lang": "tr",
    "faculty": "Matematik Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_64",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/matematik.",
    "lang": "en",
    "faculty": "Department of Mathematics",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_65",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ceeib.",
    "lang": "tr",
    "faculty": "Çalışma Ekonomisi ve Endüstri İlişkileri Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_65",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ceeib.",
    "lang": "en",
    "faculty": "Depatment of Labor Economics and Industrial Relations",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_66",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/iktisat.",
    "lang": "tr",
    "faculty": "İktisat Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_66",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/iktisat.",
    "lang": "en",
    "faculty": "Department of Economics",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_67",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/isg.",
    "lang": "tr",
    "faculty": "İş Sağlığı ve Güvenliği Ana Bilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_67",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/isg.",
    "lang": "en",
    "faculty": "Department of Occupational Health and Safety",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_68",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/isletme.",
    "lang": "tr",
    "faculty": "İşletme Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_68",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/isletme.",
    "lang": "en",
    "faculty": "Department of Business Administration",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_69",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/maliye.",
    "lang": "tr",
    "faculty": "Maliye Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_69",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/maliye.",
    "lang": "en",
    "faculty": "Department of Finance",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_70",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sagyon.",
    "lang": "tr",
    "faculty": "Sağlık Yönetimi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_70",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sagyon.",
    "lang": "en",
    "faculty": "Healthcare Management",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_71",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sbkyb.",
    "lang": "tr",
    "faculty": "Siyaset Bilimi ve Kamu Yönetimi Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_71",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sbkyb.",
    "lang": "en",
    "faculty": "Department of Political and Public Administration",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_72",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/shb.",
    "lang": "tr",
    "faculty": "Sosyal Hizmet Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_72",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/shb.",
    "lang": "en",
    "faculty": "Department of Social Work",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_73",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/gazetecilik.",
    "lang": "tr",
    "faculty": "Gazetecilik Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_73",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/gazetecilik.",
    "lang": "en",
    "faculty": "Department of Journalism",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_74",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/gorseliletisim.",
    "lang": "tr",
    "faculty": "Görsel İletişim Tasarımı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_74",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/gorseliletisim.",
    "lang": "en",
    "faculty": "Visual Communication Design",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_75",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/hitb.",
    "lang": "tr",
    "faculty": "Halkla İlişkiler ve Tanıtım",
    "category": "faculty_announcements"
  },
  {
    "key": "en_75",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/hitb.",
    "lang": "en",
    "faculty": "Public Relations and Publicity",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_76",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/arkeoloji.",
    "lang": "tr",
    "faculty": "Arkeoloji Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_76",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/arkeoloji.",
    "lang": "en",
    "faculty": "Department of Archeology",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_77",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/endustrimimarlik.",
    "lang": "tr",
    "faculty": "Endüstri Ürünleri Tasarımı Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_77",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/endustrimimarlik.",
    "lang": "en",
    "faculty": "Department of Industrial Design",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_78",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/icmimarlik.",
    "lang": "tr",
    "faculty": "İç Mimarlık Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_78",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/icmimarlik.",
    "lang": "en",
    "faculty": "Department of Interior Architecture",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_79",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/peyzajmimarlik.",
    "lang": "tr",
    "faculty": "Peyzaj Mimarisi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_79",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/peyzajmimarlik.",
    "lang": "en",
    "faculty": "Department of Landspace Architecture",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_80",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/planlamamimarlik.",
    "lang": "tr",
    "faculty": "Şehir ve Bölge Planlama Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_80",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/planlamamimarlik.",
    "lang": "en",
    "faculty": "Department of City and Regional Planning",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_81",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/cevremf.",
    "lang": "tr",
    "faculty": "Çevre Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_81",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/cevremf.",
    "lang": "en",
    "faculty": "Environmental Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_82",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/eemmf.",
    "lang": "tr",
    "faculty": "Elektrik Elektronik Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_82",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/eemmf.",
    "lang": "en",
    "faculty": "Electrical Electronics Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_83",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/geomatikmf.",
    "lang": "tr",
    "faculty": "Jeodezi ve Fotogrametri (Geomatik) Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_83",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/geomatikmf.",
    "lang": "en",
    "faculty": "Geodesy and Photogrammetry (Geomatics) Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_84",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/jeolojimf.",
    "lang": "tr",
    "faculty": "Jeoloji Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_84",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/jeolojimf.",
    "lang": "en",
    "faculty": "Geological Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_85",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/mmmf.",
    "lang": "tr",
    "faculty": "Metalurji ve Malzeme Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_85",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/mmmf.",
    "lang": "en",
    "faculty": "Metallurgy and Materials Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_86",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/entf.",
    "lang": "tr",
    "faculty": "Enerji Sistemleri Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_86",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/entf.",
    "lang": "en",
    "faculty": "Energy Systems Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_87",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ftr.",
    "lang": "tr",
    "faculty": "Fizyoterapi ve Rehabilitasyon",
    "category": "faculty_announcements"
  },
  {
    "key": "en_87",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ftr.",
    "lang": "en",
    "faculty": "Physical Threapy and Rehabilitation",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_88",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/hemsirelik.",
    "lang": "tr",
    "faculty": "Hemşirelik Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_88",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/hemsirelik.",
    "lang": "en",
    "faculty": "Department of Nursing",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_89",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/bote.",
    "lang": "tr",
    "faculty": "Bilgisayar ve Öğretim Teknolojileri Eğitimi Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_89",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/bote.",
    "lang": "en",
    "faculty": "Department of Computer Education and Instructional Technologies",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_90",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ebb.",
    "lang": "tr",
    "faculty": "Eğitim Bilimleri Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_90",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ebb.",
    "lang": "en",
    "faculty": "Department of Educational Sciences",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_91",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/gseb.",
    "lang": "tr",
    "faculty": "Güzel Sanatlar Eğitimi Bölümü Resim-İş Öğretmenliği Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_91",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/gseb.",
    "lang": "en",
    "faculty": "Department of Fine Arts Education Department of Painting Crafts Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_92",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/iob.",
    "lang": "tr",
    "faculty": "İlköğretim Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_92",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/iob.",
    "lang": "en",
    "faculty": "Department of Primary Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_93",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/imo.",
    "lang": "tr",
    "faculty": "İlköğretim Matematik Öğretmenliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_93",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/imo.",
    "lang": "en",
    "faculty": "Elementary Mathematics Teaching",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_94",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/mfbeb.",
    "lang": "tr",
    "faculty": "Matematik ve Fen Bilimleri Eğitimi Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_94",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/mfbeb.",
    "lang": "en",
    "faculty": "Department of Mathematics and Science Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_95",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ooe.",
    "lang": "tr",
    "faculty": "Okul Öncesi Eğitimi Ana Bilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_95",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ooe.",
    "lang": "en",
    "faculty": "Department of Preschool Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_96",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ofmb.",
    "lang": "tr",
    "faculty": "Ortaöğretim Fen ve Matematik Alanları Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_96",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ofmb.",
    "lang": "en",
    "faculty": "Department of Secondary Science and Mathematics",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_97",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/eb.",
    "lang": "tr",
    "faculty": "Enformatik Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_97",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/eb.",
    "lang": "en",
    "faculty": "Department of Informatics",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_98",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/turkdili.",
    "lang": "tr",
    "faculty": "Türk Dili Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_98",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/turkdili.",
    "lang": "en",
    "faculty": "Department of Turkish Language",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_99",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/imt.",
    "lang": "tr",
    "faculty": "İngilizce Mütercim-Tercümanlık Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_99",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/imt.",
    "lang": "en",
    "faculty": "Department of English Translation and Interpretation",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_100",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/eyabd.",
    "lang": "tr",
    "faculty": "Eğitim Yönetimi Ana Bilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_100",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/eyabd.",
    "lang": "en",
    "faculty": "Department of Educational Administration",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_101",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fbeabd.",
    "lang": "tr",
    "faculty": "Fen Bilimleri Eğitimi Ana Bilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_101",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fbeabd.",
    "lang": "en",
    "faculty": "Department of Science Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_102",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/soabd.",
    "lang": "tr",
    "faculty": "Sınıf Eğitimi Anabilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_102",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/soabd.",
    "lang": "en",
    "faculty": "Department of Classroom Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_103",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/eod.",
    "lang": "tr",
    "faculty": "Eğitimde Ölçme ve Değerlendirme Anabilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_103",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/eod.",
    "lang": "en",
    "faculty": "Department of Measurement and Evaluation in Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_104",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ydebegitimf.",
    "lang": "tr",
    "faculty": "Yabancı Diller Eğitimi Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_104",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ydebegitimf.",
    "lang": "en",
    "faculty": "Department of Foreign Language Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_105",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/radyotv.",
    "lang": "tr",
    "faculty": "Radyo‑Televizyon ve Sinema Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_105",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/radyotv.",
    "lang": "en",
    "faculty": "Department of Radio‑Television and Cinema",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_106",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/teb.",
    "lang": "tr",
    "faculty": "Temel Eğitim Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_106",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/teb.",
    "lang": "en",
    "faculty": "Department of Basic Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_107",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/teabdegitimf.",
    "lang": "tr",
    "faculty": "Türkçe Eğitimi Ana Bilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_107",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/teabdegitimf.",
    "lang": "en",
    "faculty": "Department of Turkish Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_108",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/tsbb.",
    "lang": "tr",
    "faculty": "Türkçe ve Sosyal Bilimler Eğitimi Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_108",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/tsbb.",
    "lang": "en",
    "faculty": "Department of Turkish and Social Sciences Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_109",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sbeabd.",
    "lang": "tr",
    "faculty": "Sosyal Bilgiler Eğitimi Ana Bilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_109",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sbeabd.",
    "lang": "en",
    "faculty": "Department of Social Studies Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_110",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yabem.",
    "lang": "tr",
    "faculty": "YABEM (Yapı ve Beton Uygulama ve Araştırma Merkezi)",
    "category": "faculty_announcements"
  },
  {
    "key": "en_110",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yabem.",
    "lang": "en",
    "faculty": "F.U Center for Earthquake‑Resilient Construction and Concrete Technologies",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_111",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/aeb.",
    "lang": "tr",
    "faculty": "Antrenörlük Eğitimi Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_111",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/aeb.",
    "lang": "en",
    "faculty": "Department of Coaching Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_112",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/beso.",
    "lang": "tr",
    "faculty": "Beden Eğitimi ve Spor Öğretmenliği Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_112",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/beso.",
    "lang": "en",
    "faculty": "Department of Physical Education and Sports Teaching",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_113",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/rek.",
    "lang": "tr",
    "faculty": "Rekreasyon Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_113",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/rek.",
    "lang": "en",
    "faculty": "Department of Recreation",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_114",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sy.",
    "lang": "tr",
    "faculty": "Spor Yöneticiliği Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_114",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sy.",
    "lang": "en",
    "faculty": "Department of Sports Management",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_115",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yonbil.",
    "lang": "tr",
    "faculty": "Yönetim Bilişim Sistemleri",
    "category": "faculty_announcements"
  },
  {
    "key": "en_115",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yonbil.",
    "lang": "en",
    "faculty": "Management Information Systems",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_116",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/makinatf.",
    "lang": "tr",
    "faculty": "Makina Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_116",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/makinatf.",
    "lang": "en",
    "faculty": "Mechanical Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_117",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/covid.",
    "lang": "tr",
    "faculty": "COVID 19",
    "category": "faculty_announcements"
  },
  {
    "key": "en_117",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/covid.",
    "lang": "en",
    "faculty": "COVID 19",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_118",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ekobilisimabd.",
    "lang": "tr",
    "faculty": "Ekobilişim Ana Bilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_118",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ekobilisimabd.",
    "lang": "en",
    "faculty": "Ecoinformatics Department",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_119",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yazilimmuholp.",
    "lang": "tr",
    "faculty": "Yazılım Mühendisliği Uluslararası Ortak Lisans Programı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_119",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yazilimmuholp.",
    "lang": "en",
    "faculty": "Software Engineering International Joint Degree Program",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_120",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/kadincalismalarimer.",
    "lang": "tr",
    "faculty": "F.Ü. Kadın ve Aile Çalışmaları Uygulama ve Araştırma Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_120",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/kadincalismalarimer.",
    "lang": "en",
    "faculty": "F.U. Women's Studies Application and Research Center",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_121",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/deneyselarastirmamer.",
    "lang": "tr",
    "faculty": "Deneysel Araştırma Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_121",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/deneyselarastirmamer.",
    "lang": "en",
    "faculty": "Experimental Research Center",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_122",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/uzaktanegitimmer.",
    "lang": "tr",
    "faculty": "Uzaktan Eğitim Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_122",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/uzaktanegitimmer.",
    "lang": "en",
    "faculty": "Firat University Distance Education Center",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_123",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/akademikyazmamer.",
    "lang": "tr",
    "faculty": "Akademik Yazma Uygulama ve Araştırma Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_123",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/akademikyazmamer.",
    "lang": "en",
    "faculty": "ACADEMIC WRITING APPLICATION AND RESEARCH CENTER",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_124",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/baum.",
    "lang": "tr",
    "faculty": "Bilgisayar Bilimleri Araştırma ve Uygulama Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_124",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/baum.",
    "lang": "en",
    "faculty": "Center for Research in Computer Sciences",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_125",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/dismer.",
    "lang": "tr",
    "faculty": "Ağız ve Diş Sağlığı Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_125",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/dismer.",
    "lang": "en",
    "faculty": "Oral and Dental Health Center",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_126",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/engellimer.",
    "lang": "tr",
    "faculty": "Engelsiz Yaşam Uygulama ve Araştırma Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_126",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/engellimer.",
    "lang": "en",
    "faculty": "Center for Disability Research and Support",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_127",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/engelsizmer.",
    "lang": "tr",
    "faculty": "Engelliler Araştırma ve Uygulama Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_127",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/engelsizmer.",
    "lang": "en",
    "faculty": "Disabled Research and Application Center",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_128",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/turkceogretimimer.",
    "lang": "tr",
    "faculty": "Türkçe Öğretimi Application ve Araştırma Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_128",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/turkceogretimimer.",
    "lang": "en",
    "faculty": "Turkish Teaching Application and Research Center",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_129",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/tarimhayvancilikmer.",
    "lang": "tr",
    "faculty": "Tarım ve Hayvancılık Araştırma ve Uygulama Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_129",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/tarimhayvancilikmer.",
    "lang": "en",
    "faculty": "Fırat University Center for Agriculture and Livestock Research",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_130",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/kariyermer.",
    "lang": "tr",
    "faculty": "Kariyer Planlama Uygulama ve Araştırma Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_130",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/kariyermer.",
    "lang": "en",
    "faculty": "Career Planning Application and Research Center",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_131",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/bilgiedinme.",
    "lang": "tr",
    "faculty": "F.Ü. Bilgi Edinme Birimi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_131",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/bilgiedinme.",
    "lang": "en",
    "faculty": "F.U. Information Unit",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_132",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ctleb.",
    "lang": "tr",
    "faculty": "Çağdaş Türk Lehçeleri ve Edebiyatları Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_132",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ctleb.",
    "lang": "en",
    "faculty": "Department of Contemporary Turkish Dialects and Literatures",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_133",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/gsekreterlik.",
    "lang": "tr",
    "faculty": "Genel Sekreterlik",
    "category": "faculty_announcements"
  },
  {
    "key": "en_133",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/gsekreterlik.",
    "lang": "en",
    "faculty": "Secretary General",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_134",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/bilgiislemdb.",
    "lang": "tr",
    "faculty": "Bilgi İşlem Daire Başkanlığı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_134",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/bilgiislemdb.",
    "lang": "en",
    "faculty": "Department of Information Technologies",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_135",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sksdab.",
    "lang": "tr",
    "faculty": "Sağlık Kültür ve Spor Daire Başkanlığı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_135",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sksdab.",
    "lang": "en",
    "faculty": "Department of Health, Culture and Sports",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_136",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/imdb.",
    "lang": "tr",
    "faculty": "İdari ve Mali İşler Daire Başkanlığı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_136",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/imdb.",
    "lang": "en",
    "faculty": "Department of Administrative and Financial Affairs",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_137",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/kutuphanedb.",
    "lang": "tr",
    "faculty": "Kütüphane ve Dokümantasyon Daire Başkanlığı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_137",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/kutuphanedb.",
    "lang": "en",
    "faculty": "Department of Library and Documentation",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_138",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ogrencidb.",
    "lang": "tr",
    "faculty": "Öğrenci İşleri Daire Başkanlığı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_138",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ogrencidb.",
    "lang": "en",
    "faculty": "Registrar and Student Affairs Office",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_139",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/personeldb.",
    "lang": "tr",
    "faculty": "Personel Daire Başkanlığı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_139",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/personeldb.",
    "lang": "en",
    "faculty": "Office of Staff Affairs",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_140",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/stratejidb.",
    "lang": "tr",
    "faculty": "Strateji Geliştirme Daire Başkanlığı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_140",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/stratejidb.",
    "lang": "en",
    "faculty": "Department of Strategy Development",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_141",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yapidb.",
    "lang": "tr",
    "faculty": "Yapı İşleri Daire Başkanlığı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_141",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yapidb.",
    "lang": "en",
    "faculty": "Department of Construction Works",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_142",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ihakurs.",
    "lang": "tr",
    "faculty": "İHA Pilotluk",
    "category": "faculty_announcements"
  },
  {
    "key": "en_142",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ihakurs.",
    "lang": "en",
    "faculty": "UAV Piloting",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_143",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/epoabd.",
    "lang": "tr",
    "faculty": "Eğitim Programları ve Öğretim Anabilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_143",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/epoabd.",
    "lang": "en",
    "faculty": "Department of Curriculum and Instruction",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_144",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/pdrabd.",
    "lang": "tr",
    "faculty": "Psikolojik Danışma ve Rehberlik Anabilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_144",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/pdrabd.",
    "lang": "en",
    "faculty": "Department of Psychological Counseling and Guidance",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_145",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/otomotivmf.",
    "lang": "tr",
    "faculty": "Otomotiv Mühendisliği Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_145",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/otomotivmf.",
    "lang": "en",
    "faculty": "Department of Automotive Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_146",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/basin.",
    "lang": "tr",
    "faculty": "Basın Yayın Müdürlüğü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_146",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/basin.",
    "lang": "en",
    "faculty": "Department of Press and Publication",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_147",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/guvenlik.",
    "lang": "tr",
    "faculty": "Güvenlik Şube Müdürlüğü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_147",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/guvenlik.",
    "lang": "en",
    "faculty": "Security Branch Directorate",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_148",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/hukukkoord.",
    "lang": "tr",
    "faculty": "Hukuk Müşavirliği Koordinatörlüğü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_148",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/hukukkoord.",
    "lang": "en",
    "faculty": "Legal Consultancy Office",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_149",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/disiliskilerkoord.",
    "lang": "tr",
    "faculty": "Erasmus+ Kurum Koordinatörlüğü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_149",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/disiliskilerkoord.",
    "lang": "en",
    "faculty": "Erasmus+ Institutional Coordination",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_150",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/oypkoord.",
    "lang": "tr",
    "faculty": "F.Ü. ÖYP Koordinatörlüğü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_150",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/oypkoord.",
    "lang": "en",
    "faculty": "F.U. ÖYP Coordinatorship",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_151",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/osymkoord.",
    "lang": "tr",
    "faculty": "F.Ü. ÖSYM Koordinatörlüğü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_151",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/osymkoord.",
    "lang": "en",
    "faculty": "F.U. OSYM Coordinatorship",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_152",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/icdenetim.",
    "lang": "tr",
    "faculty": "İç Denetim Birimi Başkanlığı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_152",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/icdenetim.",
    "lang": "en",
    "faculty": "Internel Audit Unit",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_153",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/kalitekoord.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Kalite Koordinatörlüğü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_153",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/kalitekoord.",
    "lang": "en",
    "faculty": "Firat University Quality Coordination Office",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_154",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/projekoord.",
    "lang": "tr",
    "faculty": "Proje Koordinasyon ve Danışmanlık Ofisi Koordinatörlüğü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_154",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/projekoord.",
    "lang": "en",
    "faculty": "Project Coordination and Consultancy Office Coordinator",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_155",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/asfaltgunleri.",
    "lang": "tr",
    "faculty": "Asfalt Günleri Çalıştayı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_155",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/asfaltgunleri.",
    "lang": "en",
    "faculty": "Asphalt Days Workshop",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_156",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/hayvanhastanesi.",
    "lang": "tr",
    "faculty": "Hayvan Hastanesi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_156",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/hayvanhastanesi.",
    "lang": "en",
    "faculty": "Animal Hospital",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_157",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/bdeb.",
    "lang": "tr",
    "faculty": "Batı Dilleri ve Edebiyatları Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_157",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/bdeb.",
    "lang": "en",
    "faculty": "Department of Western Languages ​​and Literatures",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_158",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sanattarihi.",
    "lang": "tr",
    "faculty": "Sanat Tarihi Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_158",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sanattarihi.",
    "lang": "en",
    "faculty": "Department of Art History",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_159",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sdk.",
    "lang": "tr",
    "faculty": "Salgın Danışma Komisyonu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_159",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sdk.",
    "lang": "en",
    "faculty": "Epidemic Advisory Commission",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_160",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/mevlana.",
    "lang": "tr",
    "faculty": "Mevlana Değişim Programı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_160",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/mevlana.",
    "lang": "en",
    "faculty": "Mevlana Student Exchange Programme",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_161",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/farabi.",
    "lang": "tr",
    "faculty": "Farabi Değişim Programı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_161",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/farabi.",
    "lang": "en",
    "faculty": "Farabi Exchange Program",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_162",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/etikkurullar.",
    "lang": "tr",
    "faculty": "Etik Kurullar",
    "category": "faculty_announcements"
  },
  {
    "key": "en_162",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/etikkurullar.",
    "lang": "en",
    "faculty": "Ethics committees",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_163",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sosyaltesisler.",
    "lang": "tr",
    "faculty": "Sosyal Tesisler İktisadi İşletmesi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_163",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sosyaltesisler.",
    "lang": "en",
    "faculty": "Social Facilities",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_164",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/unievi.",
    "lang": "tr",
    "faculty": "Üniversite Evi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_164",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/unievi.",
    "lang": "en",
    "faculty": "University Dining Hall",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_165",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/karakocanyurt.",
    "lang": "tr",
    "faculty": "Karakoçan Yurt",
    "category": "faculty_announcements"
  },
  {
    "key": "en_165",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/karakocanyurt.",
    "lang": "en",
    "faculty": "Karakocan Dorm",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_166",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/uos.",
    "lang": "tr",
    "faculty": "Uluslararası Öğrenci Sınavı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_166",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/uos.",
    "lang": "en",
    "faculty": "International Student Exam",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_167",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/harputickalekazilari.",
    "lang": "tr",
    "faculty": "Harput İç Kale Kazıları",
    "category": "faculty_announcements"
  },
  {
    "key": "en_167",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/harputickalekazilari.",
    "lang": "en",
    "faculty": "Harput Inner Castle Excavations",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_168",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/enstituler.",
    "lang": "tr",
    "faculty": "Enstitüler Sayfası",
    "category": "faculty_announcements"
  },
  {
    "key": "en_168",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/enstituler.",
    "lang": "en",
    "faculty": "Institutes Page",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_169",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yazokuluyeni.",
    "lang": "tr",
    "faculty": "Yaz Okulu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_169",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yazokuluyeni.",
    "lang": "en",
    "faculty": "Summer School",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_170",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yerbilimleri.",
    "lang": "tr",
    "faculty": "Yerbilimleri Uygulama ve Araştırma Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_170",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yerbilimleri.",
    "lang": "en",
    "faculty": "Geosciences Research and Application Center",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_171",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/harputmer.",
    "lang": "tr",
    "faculty": "Harput Uygulama ve Araştırma Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_171",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/harputmer.",
    "lang": "en",
    "faculty": "Fırat University Center for Harput Heritage and Research",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_172",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ocbhsemp.",
    "lang": "tr",
    "faculty": "Obezite Cerrahisi Bakımında Güncel Yaklaşımlar Sempozyumu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_172",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ocbhsemp.",
    "lang": "en",
    "faculty": "Current Approaches in Obesity Surgery Care Symposium",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_173",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/tok2022.",
    "lang": "tr",
    "faculty": "Otomatik Kontrol Türk Milli Komitesi Ulusal Kongresi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_173",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/tok2022.",
    "lang": "en",
    "faculty": "Automatic Control Turkish National Committee National Congress",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_174",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/tv.",
    "lang": "tr",
    "faculty": "Fırat TV",
    "category": "faculty_announcements"
  },
  {
    "key": "en_174",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/tv.",
    "lang": "en",
    "faculty": "Fırat TV",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_175",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/islamvemedeniyet.",
    "lang": "tr",
    "faculty": "İSLAM VE MEDENİYET SEMPOZYUMU",
    "category": "faculty_announcements"
  },
  {
    "key": "en_175",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/islamvemedeniyet.",
    "lang": "en",
    "faculty": "Islam and Civilization Symposium",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_176",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/kvkk.",
    "lang": "tr",
    "faculty": "Kişisel Verilerin Korunması",
    "category": "faculty_announcements"
  },
  {
    "key": "en_176",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/kvkk.",
    "lang": "en",
    "faculty": "Personal Data Protection",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_177",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/iso.",
    "lang": "tr",
    "faculty": "ULUSLARARASI ÖĞRENCİ OFİSİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_177",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/iso.",
    "lang": "en",
    "faculty": "International Student Office",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_178",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/emat4005proje.",
    "lang": "tr",
    "faculty": "EMAT4005",
    "category": "faculty_announcements"
  },
  {
    "key": "en_178",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/emat4005proje.",
    "lang": "en",
    "faculty": "EMAT4005",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_179",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/iceriktasarimi.",
    "lang": "tr",
    "faculty": "İçerik Tasarımı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_179",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/iceriktasarimi.",
    "lang": "en",
    "faculty": "İçerik Tasarımı",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_180",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/degerproje.",
    "lang": "tr",
    "faculty": "Değer Proje",
    "category": "faculty_announcements"
  },
  {
    "key": "en_180",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/degerproje.",
    "lang": "en",
    "faculty": "Değer Proje",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_181",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/nitelarastirma.",
    "lang": "tr",
    "faculty": "Nitel Araştırma",
    "category": "faculty_announcements"
  },
  {
    "key": "en_181",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/nitelarastirma.",
    "lang": "en",
    "faculty": "Nitel Araştırma",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_182",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/olcekgelistirme.",
    "lang": "tr",
    "faculty": "Ölçek Geliştirme",
    "category": "faculty_announcements"
  },
  {
    "key": "en_182",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/olcekgelistirme.",
    "lang": "en",
    "faculty": "Ölçek Geliştirme",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_183",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/iklimcevremer.",
    "lang": "tr",
    "faculty": "İKLİM DEĞİŞİKLİĞİ, ÇEVRE VE YEŞİL KALKINMA UYGULAMA VE ARAŞTIRMA MERKEZİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_183",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/iklimcevremer.",
    "lang": "en",
    "faculty": "CLIMATE CHANGE, ENVIRONMENT AND GREEN DEVELOPMENT IMPLEMENTATION AND RESEARCH CENTER",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_184",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/eczacilikf.",
    "lang": "tr",
    "faculty": "ECZACILIK FAKÜLTESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_184",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/eczacilikf.",
    "lang": "en",
    "faculty": "FACULTY OF PHARMACY",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_185",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/dafzsurguerkenek.",
    "lang": "tr",
    "faculty": "DOĞU ANADOLU FAY ZONU'NUN ERKENEK VE SÜRGÜ SEGMENTLERİNİN DEPREM DAVRANIŞI",
    "category": "faculty_announcements"
  },
  {
    "key": "en_185",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/dafzsurguerkenek.",
    "lang": "en",
    "faculty": "DOĞU ANADOLU FAY ZONU'NUN ERKENEK VE SÜRGÜ SEGMENTLERİNİN DEPREM DAVRANIŞI",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_186",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/rai.",
    "lang": "tr",
    "faculty": "Robotik ve Yapay Zeka Laboratuvarı (RAI)",
    "category": "faculty_announcements"
  },
  {
    "key": "en_186",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/rai.",
    "lang": "en",
    "faculty": "Robotics and Artificial Intelligence Laboratory (RAI)",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_187",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/subdomain.",
    "lang": "tr",
    "faculty": ".",
    "category": "faculty_announcements"
  },
  {
    "key": "en_187",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/subdomain.",
    "lang": "en",
    "faculty": ".",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_188",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/gyysosyal.",
    "lang": "tr",
    "faculty": "Girişimcilik ve Yenilik Yönetimi Anabilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_188",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/gyysosyal.",
    "lang": "en",
    "faculty": "Girişimcilik ve Yenilik Yönetimi Anabilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_189",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/tbysosyal.",
    "lang": "tr",
    "faculty": "Teknoloji ve Bilgi Yönetimi Anabilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_189",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/tbysosyal.",
    "lang": "en",
    "faculty": "Teknoloji ve Bilgi Yönetimi Anabilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_190",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/akyabd.",
    "lang": "tr",
    "faculty": "Afet ve Kriz Yönetimi Anabilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_190",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/akyabd.",
    "lang": "en",
    "faculty": "Afet ve Kriz Yönetimi Anabilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_191",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/mezuniyet2022.",
    "lang": "tr",
    "faculty": "Mezuniyet 2022",
    "category": "faculty_announcements"
  },
  {
    "key": "en_191",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/mezuniyet2022.",
    "lang": "en",
    "faculty": "Mezuniyet 2022",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_192",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/2237yapayzeka.",
    "lang": "tr",
    "faculty": "YAPAY ZEKA",
    "category": "faculty_announcements"
  },
  {
    "key": "en_192",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/2237yapayzeka.",
    "lang": "en",
    "faculty": "ARTIFICIAL INTELLIGENCE",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_193",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/pye.",
    "lang": "tr",
    "faculty": "TÜBİTAK-BİDEB 2237-A  Eğitim Etkinliklerini Destekleme Programı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_193",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/pye.",
    "lang": "en",
    "faculty": "TÜBİTAK-BİDEB 2237-A  Eğitim Etkinliklerini Destekleme Programı",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_194",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/kayt.",
    "lang": "tr",
    "faculty": "Karşılıklı Anlaşılabilirlik Yöntem ve Teknikleri",
    "category": "faculty_announcements"
  },
  {
    "key": "en_194",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/kayt.",
    "lang": "en",
    "faculty": "Mutual Understanding Methods and Techniques",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_195",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ivsa.",
    "lang": "tr",
    "faculty": "Uluslararası Veteriner Öğrencileri Topluluğu (IVSA Elazığ)",
    "category": "faculty_announcements"
  },
  {
    "key": "en_195",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ivsa.",
    "lang": "en",
    "faculty": "International Veterinary Students Association",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_196",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/tef.",
    "lang": "tr",
    "faculty": "Teknik Eğitim Fakültesi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_196",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/tef.",
    "lang": "en",
    "faculty": "Faculty of Technical Education",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_197",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ebysyardim.",
    "lang": "tr",
    "faculty": "EBYS YARDIM WEB SAYFASI",
    "category": "faculty_announcements"
  },
  {
    "key": "en_197",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ebysyardim.",
    "lang": "en",
    "faculty": "EBYS HELP WEBSITE",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_198",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ogrencidekanligi.",
    "lang": "tr",
    "faculty": "ÖĞRENCİ KOORDİNATÖRLÜĞÜ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_198",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ogrencidekanligi.",
    "lang": "en",
    "faculty": "STUDENT COORDINATORSHIP",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_199",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/code23.",
    "lang": "tr",
    "faculty": "Code-23 FIRAT YAZILIM ATÖLYESİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_199",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/code23.",
    "lang": "en",
    "faculty": "CODE-23 FIRAT SOFTWARE WORKSHOP",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_200",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fuzem.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Uzaktan Eğitim Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_200",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fuzem.",
    "lang": "en",
    "faculty": "Firat University Distance Education Center",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_201",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/pfe.",
    "lang": "tr",
    "faculty": "PEDAGOJİK FORMASYON EĞİTİMİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_201",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/pfe.",
    "lang": "en",
    "faculty": "PEDAGOGICAL FORMATION EDUCATION",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_202",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sumf.",
    "lang": "tr",
    "faculty": "Su Ürünleri Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_202",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sumf.",
    "lang": "en",
    "faculty": "Fisheries Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_203",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ardek.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Araştırma Koordinatörlüğü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_203",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ardek.",
    "lang": "en",
    "faculty": "Firat University Research Coordination",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_204",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ekom.",
    "lang": "tr",
    "faculty": "Eğitim Komisyonu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_204",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ekom.",
    "lang": "en",
    "faculty": "Education Commission",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_205",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/alman.",
    "lang": "tr",
    "faculty": "Alman Dili ve Edebiyatı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_205",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/alman.",
    "lang": "en",
    "faculty": "German Language and Literature",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_206",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ingiliz.",
    "lang": "tr",
    "faculty": "İngiliz Dili ve Edebiyatı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_206",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ingiliz.",
    "lang": "en",
    "faculty": "English Language and Literature",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_207",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fransiz.",
    "lang": "tr",
    "faculty": "Fransız Dili ve Edebiyatı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_207",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fransiz.",
    "lang": "en",
    "faculty": "French Language and Literature",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_208",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/biyotek.",
    "lang": "tr",
    "faculty": "Biyoteknoloji Anabilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_208",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/biyotek.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_209",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fusim.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Sanayi İşbirliği Merkezi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_209",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fusim.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_210",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/elektroteknoloji.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Elektro Teknoloji Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_210",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/elektroteknoloji.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_211",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/futek.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Teknoloji Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_211",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/futek.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_212",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/futag.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Teknoloji Ar-Ge ve Girişimcilik Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_212",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/futag.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_213",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/rehberogrenci.",
    "lang": "tr",
    "faculty": "Rehber Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_213",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/rehberogrenci.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_214",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ftrtoplulugu.",
    "lang": "tr",
    "faculty": "Fizyoterapi ve Rehabilitasyon Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_214",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ftrtoplulugu.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_215",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/shefk.",
    "lang": "tr",
    "faculty": "Sosyal Hizmet Etkileşim ve Farkındalık Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_215",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/shefk.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_216",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/erasmustoplulugu.",
    "lang": "tr",
    "faculty": "Erasmus Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_216",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/erasmustoplulugu.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_217",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/gencgirisimciler.",
    "lang": "tr",
    "faculty": "Genç Girişimciler Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_217",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/gencgirisimciler.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_218",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/siberguvenlik.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Siber Güvenlik Öğrecni Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_218",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/siberguvenlik.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_219",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sinifegitimi.",
    "lang": "tr",
    "faculty": "Sınıf Eğitimi Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_219",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sinifegitimi.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_220",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/tiyatro.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Tiyatro Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_220",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/tiyatro.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_221",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/genetik.",
    "lang": "tr",
    "faculty": "Biyoloji / Moleküler Biyoloji ve Genetik Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_221",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/genetik.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_222",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fumm.",
    "lang": "tr",
    "faculty": "Makine Mühendisliği Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_222",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fumm.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_223",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/kst.",
    "lang": "tr",
    "faculty": "Kitap Severler Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_223",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/kst.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_224",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/adlibilisim.",
    "lang": "tr",
    "faculty": "Adli Bilişim Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_224",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/adlibilisim.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_225",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/gdsc.",
    "lang": "tr",
    "faculty": "Google Developer Students Club Fırat University",
    "category": "faculty_announcements"
  },
  {
    "key": "en_225",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/gdsc.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_226",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fuvet.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Veteriner Fakültesi Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_226",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fuvet.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_227",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/havacilikuzay.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Havacılık ve Uzay Teknolojileri Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_227",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/havacilikuzay.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_228",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fudans.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Dans Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_228",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fudans.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_229",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ieee.",
    "lang": "tr",
    "faculty": "Institute of Electrical and Electronics Engineers Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_229",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ieee.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_230",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ideall.",
    "lang": "tr",
    "faculty": "İngiliz Dili ve Edebiyatı Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_230",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ideall.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_231",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/acm.",
    "lang": "tr",
    "faculty": "ACM Fırat Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_231",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/acm.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_232",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yabancidil.",
    "lang": "tr",
    "faculty": "Yabancı Dil Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_232",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yabancidil.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_233",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/aid.",
    "lang": "tr",
    "faculty": "Uluslararası Doktorlar Birliği Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_233",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/aid.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_234",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sosyalhekimler.",
    "lang": "tr",
    "faculty": "Sosyal Hekimler Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_234",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sosyalhekimler.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_235",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fuhak.",
    "lang": "tr",
    "faculty": "Havacılık Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_235",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fuhak.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_236",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sosyalarge.",
    "lang": "tr",
    "faculty": "Sosyal Ar-Ge Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_236",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sosyalarge.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_237",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/hsd.",
    "lang": "tr",
    "faculty": "Huawei Geliştirici Öğrenciler Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_237",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/hsd.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_238",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fukat.",
    "lang": "tr",
    "faculty": "Kalite Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_238",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fukat.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_239",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fustat.",
    "lang": "tr",
    "faculty": "Sosyal Bilimlerde Teknoloji ve Araştırma Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_239",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fustat.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_240",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/adem.",
    "lang": "tr",
    "faculty": "Akademik Düşünce Eğitim Medeniyet Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_240",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/adem.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_241",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/vetbak.",
    "lang": "tr",
    "faculty": "Veterinerlik Bilimsel Araştırma Yayın Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_241",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/vetbak.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_242",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sahavet.",
    "lang": "tr",
    "faculty": "Saha Veteriner Hekimliği Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_242",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sahavet.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_243",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/tht.",
    "lang": "tr",
    "faculty": "Tıbbi Hizmetler ve Teknikerler Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_243",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/tht.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_244",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/gezitur.",
    "lang": "tr",
    "faculty": "Gezi ve Turizm Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_244",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/gezitur.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_245",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/febitek.",
    "lang": "tr",
    "faculty": "FEBİTEK",
    "category": "faculty_announcements"
  },
  {
    "key": "en_245",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/febitek.",
    "lang": "en",
    "faculty": "",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_246",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/2237akademikgelisim.",
    "lang": "tr",
    "faculty": "BİDEB 2237-A  Akademide Dijital Araçlar ve Akademik Gelişim Sezon 2",
    "category": "faculty_announcements"
  },
  {
    "key": "en_246",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/2237akademikgelisim.",
    "lang": "en",
    "faculty": "BİDEB 2237 - A - Digital Tools in Academy And Academical Career Development Season 2",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_247",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yzvm.",
    "lang": "tr",
    "faculty": "Yapay Zeka ve Veri Mühendisliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_247",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yzvm.",
    "lang": "en",
    "faculty": "Artificial Intelligence and Data Engineering",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_248",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/tib.",
    "lang": "tr",
    "faculty": "Temel İslam Bilimleri Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_248",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/tib.",
    "lang": "en",
    "faculty": "Temel İslam Bilimleri Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_249",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fdb.",
    "lang": "tr",
    "faculty": "Felsefe ve Din Bilimleri Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_249",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fdb.",
    "lang": "en",
    "faculty": "Felsefe ve Din Bilimleri Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_250",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/itsb.",
    "lang": "tr",
    "faculty": "İslam Tarihi ve Sanatları Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_250",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/itsb.",
    "lang": "en",
    "faculty": "İslam Tarihi ve Sanatları Bölümü",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_251",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ecad.",
    "lang": "tr",
    "faculty": "Erken Çocuklukta Ahlak ve Değerler Eğitimi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_251",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ecad.",
    "lang": "en",
    "faculty": "Erken Çocuklukta Ahlak ve Değerler Eğitimi",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_252",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yzgii.",
    "lang": "tr",
    "faculty": "Yapay Zeka, Görüntü İşleme ve İnovasyon Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_252",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yzgii.",
    "lang": "en",
    "faculty": "Artificial Intelligence, Image Processing and Innovation Student Community",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_253",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ukom.",
    "lang": "tr",
    "faculty": "UKOM",
    "category": "faculty_announcements"
  },
  {
    "key": "en_253",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ukom.",
    "lang": "en",
    "faculty": "UKOM",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_254",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/usbtjournal.",
    "lang": "tr",
    "faculty": "Uzay, Savunma ve Bilişim Teknolojileri Dergisi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_254",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/usbtjournal.",
    "lang": "en",
    "faculty": "The Journal of Space, Defense and Information Technology",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_255",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sinefi.",
    "lang": "tr",
    "faculty": "Fırat Sinefi Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_255",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sinefi.",
    "lang": "en",
    "faculty": "Fırat Sinefi Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_256",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/stnm.",
    "lang": "tr",
    "faculty": "Savunma Teknolojileri ve Nitelikli Mühendisler",
    "category": "faculty_announcements"
  },
  {
    "key": "en_256",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/stnm.",
    "lang": "en",
    "faculty": "Savunma Teknolojileri ve Nitelikli Mühendisler",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_257",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/satranc.",
    "lang": "tr",
    "faculty": "Fırat Üniversitesi Satranç Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_257",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/satranc.",
    "lang": "en",
    "faculty": "Fırat Üniversitesi Satranç Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_258",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/firattob.",
    "lang": "tr",
    "faculty": "TURKMSIC-Fırat Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_258",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/firattob.",
    "lang": "en",
    "faculty": "TURKMSIC-Fırat Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_259",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/darulhadis.",
    "lang": "tr",
    "faculty": "Dâru'l-Hadis Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_259",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/darulhadis.",
    "lang": "en",
    "faculty": "Dâru'l-Hadis Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_260",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ytt.",
    "lang": "tr",
    "faculty": "Yapı - Tasarım Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_260",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ytt.",
    "lang": "en",
    "faculty": "Yapı - Tasarım Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_261",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/blockchain.",
    "lang": "tr",
    "faculty": "Fırat Blockchain Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_261",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/blockchain.",
    "lang": "en",
    "faculty": "Fırat Blockchain Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_262",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fupsa.",
    "lang": "tr",
    "faculty": "Eczacılık Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_262",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fupsa.",
    "lang": "en",
    "faculty": "Eczacılık Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_263",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yesilay.",
    "lang": "tr",
    "faculty": "Genç Yeşilay",
    "category": "faculty_announcements"
  },
  {
    "key": "en_263",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yesilay.",
    "lang": "en",
    "faculty": "Genç Yeşilay",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_264",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/geba.",
    "lang": "tr",
    "faculty": "Genç Bakış Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_264",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/geba.",
    "lang": "en",
    "faculty": "Genç Bakış Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_265",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fubet.",
    "lang": "tr",
    "faculty": "Bilişim ve Eğitim Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_265",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fubet.",
    "lang": "en",
    "faculty": "Bilişim ve Eğitim Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_266",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/chembridgeresearchgroup.",
    "lang": "tr",
    "faculty": "ChemBridge Araştırma Grubu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_266",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/chembridgeresearchgroup.",
    "lang": "en",
    "faculty": "ChemBridge Araştırma Grubu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_267",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/donersermaye.",
    "lang": "tr",
    "faculty": "FIRAT ÜNİVERSİTESİ DÖNER SERMAYE İŞLETME MÜDÜRLÜĞÜ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_267",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/donersermaye.",
    "lang": "en",
    "faculty": "FIRAT ÜNİVERSİTESİ DÖNER SERMAYE İŞLETME MÜDÜRLÜĞÜ",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_268",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/harputklasikhadismeclisi.",
    "lang": "tr",
    "faculty": "Harput Klasik Hadis Meclisi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_268",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/harputklasikhadismeclisi.",
    "lang": "en",
    "faculty": "Harput Klasik Hadis Meclisi",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_269",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/teknofestfirat.",
    "lang": "tr",
    "faculty": "Teknofest Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_269",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/teknofestfirat.",
    "lang": "en",
    "faculty": "Teknofest  Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_270",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/yedikita.",
    "lang": "tr",
    "faculty": "Yedi Kıta Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_270",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/yedikita.",
    "lang": "en",
    "faculty": "Yedi Kıta Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_271",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/bdo.",
    "lang": "tr",
    "faculty": "Bir Dünya Oyuncak Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_271",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/bdo.",
    "lang": "en",
    "faculty": "Bir Dünya Oyuncak Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_272",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/matek.",
    "lang": "tr",
    "faculty": "Matematik ve Teknoloji Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_272",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/matek.",
    "lang": "en",
    "faculty": "Matematik ve Teknoloji Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_273",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/mikromuh.",
    "lang": "tr",
    "faculty": "Mikro Mühendisler Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_273",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/mikromuh.",
    "lang": "en",
    "faculty": "Mikro Mühendisler Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_274",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/vebist.",
    "lang": "tr",
    "faculty": "Veri Bilimi ve İstatistik Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_274",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/vebist.",
    "lang": "en",
    "faculty": "Veri Bilimi ve İstatistik Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_275",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/adt.",
    "lang": "tr",
    "faculty": "Analitik Düşünce Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_275",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/adt.",
    "lang": "en",
    "faculty": "Analitik Düşünce Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_276",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/bilkim.",
    "lang": "tr",
    "faculty": "Bilim ve Kimya Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_276",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/bilkim.",
    "lang": "en",
    "faculty": "Bilim ve Kimya Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_277",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/damla.",
    "lang": "tr",
    "faculty": "Damla Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_277",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/damla.",
    "lang": "en",
    "faculty": "Damla Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_278",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/anatomimuzesi.",
    "lang": "tr",
    "faculty": "Anatomi Müzesi Geliştirme Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_278",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/anatomimuzesi.",
    "lang": "en",
    "faculty": "Anatomi Müzesi Geliştirme Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_279",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/dusunceakd.",
    "lang": "tr",
    "faculty": "Düşünce Akademisi Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_279",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/dusunceakd.",
    "lang": "en",
    "faculty": "Düşünce Akademisi Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_280",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/gastronomiot.",
    "lang": "tr",
    "faculty": "Gastronomi Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_280",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/gastronomiot.",
    "lang": "en",
    "faculty": "Gastronomi Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_281",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/sbgot.",
    "lang": "tr",
    "faculty": "Spor Bilimleri Gönüllüleri Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_281",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/sbgot.",
    "lang": "en",
    "faculty": "Spor Bilimleri Gönüllüleri Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_282",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/bbvot.",
    "lang": "tr",
    "faculty": "Bulut Bilişim ve Büyük Veri Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_282",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/bbvot.",
    "lang": "en",
    "faculty": "Bulut Bilişim ve Büyük Veri Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_283",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/nefha.",
    "lang": "tr",
    "faculty": "NEFHA Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_283",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/nefha.",
    "lang": "en",
    "faculty": "NEFHA Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_284",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ebelikot.",
    "lang": "tr",
    "faculty": "Ebelik Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_284",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ebelikot.",
    "lang": "en",
    "faculty": "Ebelik Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_285",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/duslerdenguluslere.",
    "lang": "tr",
    "faculty": "Düşlerden Gülüşlere Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_285",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/duslerdenguluslere.",
    "lang": "en",
    "faculty": "Düşlerden Gülüşlere Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_286",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fotografcilikot.",
    "lang": "tr",
    "faculty": "Fotoğrafçılık Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_286",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fotografcilikot.",
    "lang": "en",
    "faculty": "Fotoğrafçılık Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_287",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/hemsirelikot.",
    "lang": "tr",
    "faculty": "Hemşirelik Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_287",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/hemsirelikot.",
    "lang": "en",
    "faculty": "Hemşirelik Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_288",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ogrencitopluluklari.",
    "lang": "tr",
    "faculty": "FIRAT ÜNİVERSİTESİ ÖĞRENCİ TOPLULUKLARI",
    "category": "faculty_announcements"
  },
  {
    "key": "en_288",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ogrencitopluluklari.",
    "lang": "en",
    "faculty": "FIRAT ÜNİVERSİTESİ ÖĞRENCİ TOPLULUKLARI",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_289",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/bdk.",
    "lang": "tr",
    "faculty": "Bilimsel Dergi Koordinatörlüğü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_289",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/bdk.",
    "lang": "en",
    "faculty": "Scientific Journal Coordination",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_290",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/noro.",
    "lang": "tr",
    "faculty": "NÖRO PAZARLAMA VE PAZARLAMA ARAŞTIRMA MERKEZİ",
    "category": "faculty_announcements"
  },
  {
    "key": "en_290",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/noro.",
    "lang": "en",
    "faculty": "NEURO MARKETING AND MARKETING RESEARCH CENTER",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_291",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ozelkalem.",
    "lang": "tr",
    "faculty": "Özel Kalem Müdürlüğü",
    "category": "faculty_announcements"
  },
  {
    "key": "en_291",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ozelkalem.",
    "lang": "en",
    "faculty": "Office Of The Rector",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_292",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/gia.",
    "lang": "tr",
    "faculty": "Görsel İletişim Atölyesi Öğrenci Topluluğu",
    "category": "faculty_announcements"
  },
  {
    "key": "en_292",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/gia.",
    "lang": "en",
    "faculty": "Visual Communication Workshop Student Community",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_293",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/bdkl.",
    "lang": "tr",
    "faculty": "Bitki Doku Kültürü Laboratuvarı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_293",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/bdkl.",
    "lang": "en",
    "faculty": "Plant Tissue Culture Laboratory",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_294",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/orhun.",
    "lang": "tr",
    "faculty": "Orhun Değişim Programı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_294",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/orhun.",
    "lang": "en",
    "faculty": "Orhun Exchange Program",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_295",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/aysis1001.",
    "lang": "tr",
    "faculty": "Afet Bölgesinde Yer Alan Okullarda Gerçekleştirilecek Algı Yönetim Uygulamaları ile Öğretmenlerin Duygusal Bağlılık Düzeyleri Arasındaki İlişkinin İncelenmesi",
    "category": "faculty_announcements"
  },
  {
    "key": "en_295",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/aysis1001.",
    "lang": "en",
    "faculty": "Afet Bölgesinde Yer Alan Okullarda Gerçekleştirilecek Algı Yönetim Uygulamaları ile Öğretmenlerin Duygusal Bağlılık Düzeyleri Arasındaki İlişkinin İncelenmesi",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_296",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/ickontrol.",
    "lang": "tr",
    "faculty": "İç Kontrol",
    "category": "faculty_announcements"
  },
  {
    "key": "en_296",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/ickontrol.",
    "lang": "en",
    "faculty": "İç Kontrol",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_297",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/fuisg.",
    "lang": "tr",
    "faculty": "İş Sağlığı ve Güvenliği",
    "category": "faculty_announcements"
  },
  {
    "key": "en_297",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/fuisg.",
    "lang": "en",
    "faculty": "İş Sağlığı ve Güvenliği",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_298",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/merkezilab.",
    "lang": "tr",
    "faculty": "MERLAB",
    "category": "faculty_announcements"
  },
  {
    "key": "en_298",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/merkezilab.",
    "lang": "en",
    "faculty": "MERLAB",
    "category": "faculty_announcements"
  },
  {
    "key": "tr_299",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/tr/oteabd.",
    "lang": "tr",
    "faculty": "Öğretim Teknolojileri Anabilim Dalı",
    "category": "faculty_announcements"
  },
  {
    "key": "en_299",
    "baseURL": "https://ddyo.firat.edu.tr",
    "url": "/api/get-last-five-announcement/en/oteabd.",
    "lang": "en",
    "faculty": "Öğretim Teknolojileri Anabilim Dalı",
    "category": "faculty_announcements"
  }
];


// Fuse.js konfigürasyonu
const fuseOptions = {
  keys: [
    { name: 'faculty', weight: 0.6 },
    { name: 'lang', weight: 0.3 },
    { name: 'category', weight: 0.1 }
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
  shouldSort: true,
  findAllMatches: true
};

const fuse = new Fuse(endpoints, fuseOptions);


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
const searchEndpoints = (query, lang = null, limit = 10) => {
  if (!query || query.trim().length < 2) {
    return [];
  }
  
  let results = fuse.search(query.trim());
  
  // Dil filtresi uygula
  if (lang) {
    results = results.filter(result => result.item.lang === lang);
  }
  
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
};