// ========================================
// CACHE SYSTEM TEST - MEMORY CACHE TESTİ
// ========================================

import cacheService from '../services/cacheService';

console.log('🧪 Cache System Test başlatılıyor...\n');

// Test 1: Basit Cache Testi
console.log('📋 TEST 1: Basit Cache Testi');
console.log('============================');

try {
  // Test verisi
  const testData = {
    message: 'Merhaba Dünya!',
    timestamp: Date.now(),
    category: 'test'
  };

  // Cache'e ekle
  console.log('1. Cache\'e veri ekleniyor...');
  const setResult = cacheService.set('test', 'hello', testData);
  console.log('✅ Set result:', setResult);

  // Cache'den al
  console.log('2. Cache\'den veri alınıyor...');
  const getResult = cacheService.get('test', 'hello');
  console.log('✅ Get result:', getResult);

  // Veri karşılaştırması
  if (getResult && getResult.data.message === testData.message) {
    console.log('✅ VERİ DOĞRU: Cache\'den alınan veri eşleşiyor');
  } else {
    console.log('❌ VERİ HATALI: Cache\'den alınan veri eşleşmiyor');
  }

} catch (error) {
  console.error('❌ Test 1 hatası:', error);
}

console.log('\n');

// Test 2: TTL Testi
console.log('📋 TEST 2: TTL (Time To Live) Testi');
console.log('===================================');

try {
  // Kısa TTL ile test verisi (2 saniye)
  const shortTTLData = {
    message: 'Kısa süreli veri',
    timestamp: Date.now()
  };

  console.log('1. 2 saniye TTL ile veri ekleniyor...');
  const setResult = cacheService.set('test', 'short_ttl', shortTTLData, {}, 2000);
  console.log('✅ Set result:', setResult);

  // Hemen al (çalışmalı)
  console.log('2. Hemen alınıyor (çalışmalı)...');
  const immediateResult = cacheService.get('test', 'short_ttl');
  console.log('✅ Immediate result:', immediateResult ? 'VERİ BULUNDU' : 'VERİ BULUNAMADI');

  // 3 saniye bekle
  console.log('3. 3 saniye bekleniyor...');
  setTimeout(() => {
    const delayedResult = cacheService.get('test', 'short_ttl');
    console.log('✅ Delayed result:', delayedResult ? 'VERİ BULUNDU' : 'VERİ BULUNAMADI (TTL dolmuş olmalı)');
  }, 3000);

} catch (error) {
  console.error('❌ Test 2 hatası:', error);
}

console.log('\n');

// Test 3: Memory Limit Testi
console.log('📋 TEST 3: Memory Limit Testi');
console.log('=============================');

try {
  console.log('1. Büyük veri ekleniyor...');
  
  // Büyük test verisi oluştur
  const largeData = {
    message: 'Büyük veri testi',
    data: new Array(1000).fill('x').join(''), // 1000 karakter
    timestamp: Date.now()
  };

  // Birden fazla büyük veri ekle
  for (let i = 0; i < 10; i++) {
    const result = cacheService.set('test', `large_${i}`, largeData);
    console.log(`   Entry ${i}: ${result ? 'BAŞARILI' : 'BAŞARISIZ'}`);
  }

  // Memory durumunu kontrol et
  const stats = cacheService.getStats();
  console.log('2. Memory durumu:');
  console.log(`   - Toplam boyut: ${stats.memoryUsage}`);
  console.log(`   - Entry sayısı: ${stats.entryCount}`);
  console.log(`   - Memory kullanımı: ${stats.memoryUsagePercent}`);

} catch (error) {
  console.error('❌ Test 3 hatası:', error);
}

console.log('\n');

// Test 4: İstatistik Testi
console.log('📋 TEST 4: İstatistik Testi');
console.log('===========================');

try {
  console.log('1. Mevcut istatistikler:');
  const stats = cacheService.getStats();
  console.log('   - Hit rate:', stats.hitRate);
  console.log('   - Hits:', stats.hits);
  console.log('   - Misses:', stats.misses);
  console.log('   - Sets:', stats.sets);
  console.log('   - Deletes:', stats.deletes);
  console.log('   - Errors:', stats.errors);

  console.log('2. Cache durumu:');
  const status = cacheService.getStatus();
  console.log('   - Başlatıldı mı:', status.isInitialized);
  console.log('   - Sağlıklı mı:', status.isHealthy);
  console.log('   - Entry sayısı:', status.entryCount);
  console.log('   - Memory kullanımı:', status.memoryUsage);

} catch (error) {
  console.error('❌ Test 4 hatası:', error);
}

console.log('\n');

// Test 5: Cache Temizleme Testi
console.log('📋 TEST 5: Cache Temizleme Testi');
console.log('=================================');

try {
  console.log('1. Temizleme öncesi entry sayısı:', cacheService.getStatus().entryCount);
  
  // Kategori temizleme
  console.log('2. Test kategorisi temizleniyor...');
  const deletedCount = cacheService.clearCategory('test');
  console.log(`   Silinen entry sayısı: ${deletedCount}`);
  
  console.log('3. Temizleme sonrası entry sayısı:', cacheService.getStatus().entryCount);

} catch (error) {
  console.error('❌ Test 5 hatası:', error);
}

console.log('\n');

// Test 6: Sağlık Kontrolü
console.log('📋 TEST 6: Sağlık Kontrolü');
console.log('==========================');

try {
  const health = cacheService.getHealth();
  console.log('1. Cache sağlık durumu:');
  console.log('   - Sağlıklı mı:', health.isHealthy);
  console.log('   - Memory kullanımı:', health.memoryUsage);
  console.log('   - Hit rate:', health.hitRate);
  console.log('   - Entry sayısı:', health.entryCount);
  console.log('   - Hata sayısı:', health.errors);
  
  if (health.recommendations.length > 0) {
    console.log('2. Öneriler:');
    health.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  } else {
    console.log('2. Öneri yok - sistem sağlıklı!');
  }

} catch (error) {
  console.error('❌ Test 6 hatası:', error);
}

console.log('\n');

// Test Sonucu
console.log('🏁 TEST TAMAMLANDI');
console.log('==================');
console.log('Tüm testler tamamlandı. Console loglarını kontrol edin.');
console.log('Eğer hata varsa, lütfen hata mesajlarını paylaşın.');

export default {
  runTests: () => {
    console.log('Test fonksiyonu çalıştırıldı');
  }
};
