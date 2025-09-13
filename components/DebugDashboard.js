// ========================================
// DEBUG DASHBOARD COMPONENT
// ========================================

import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { callEndpoint } from '../services/apiService';
import cacheService from '../services/cacheService';
import hybridCache from '../services/hybridCache';
import memoryLeakProtection from '../services/memoryLeakProtection';

const { width, height } = Dimensions.get('window');

/**
 * Debug Dashboard Component
 * Cache monitoring ve debug arayüzü
 */
export default function DebugDashboard({ visible, onClose }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [memoryStats, setMemoryStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(null);

  // Otomatik yenileme
  useEffect(() => {
    if (visible) {
      loadStats();
      startAutoRefresh();
    } else {
      stopAutoRefresh();
    }

    return () => stopAutoRefresh();
  }, [visible]);

  // İstatistikleri yükle
  const loadStats = async () => {
    try {
      setIsLoading(true);
      
      // Cache istatistikleri
      const cacheStats = cacheService.getStats();
      const hybridStats = hybridCache.getStats();
      const leakStats = memoryLeakProtection.getMemoryStats();
      
      setStats({
        cache: cacheStats,
        hybrid: hybridStats,
        memory: leakStats
      });
      
      setMemoryStats(leakStats);
      
    } catch (error) {
      console.error('❌ Debug dashboard stats yükleme hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Otomatik yenileme başlat
  const startAutoRefresh = () => {
    const interval = setInterval(loadStats, 5000); // 5 saniyede bir
    setRefreshInterval(interval);
  };

  // Otomatik yenileme durdur
  const stopAutoRefresh = () => {
    if (refreshInterval) {
      clearInterval(refreshInterval);
      setRefreshInterval(null);
    }
  };

  // Test fonksiyonları
  const runCacheTest = async () => {
    try {
      setIsLoading(true);
      console.log('🧪 Debug Dashboard Cache Test başlatılıyor...');
      
      // Test 1: Hybrid cache testi
      const testData = { message: 'Debug test verisi', timestamp: Date.now() };
      const setResult = await hybridCache.set('debug', 'test', testData);
      console.log('✅ Debug set result:', setResult);
      
      const getResult = await hybridCache.get('debug', 'test');
      console.log('✅ Debug get result:', getResult);
      
      // Test 2: API cache testi
      try {
        const apiResult = await callEndpoint('main', 'announcement_tr', {}, 'cache_first');
        console.log('✅ Debug API result:', apiResult);
      } catch (error) {
        console.log('⚠️ Debug API test hatası (normal):', error.message);
      }
      
      // İstatistikleri yenile
      await loadStats();
      
      Alert.alert('Test Tamamlandı', 'Cache test başarıyla tamamlandı!');
      
    } catch (error) {
      console.error('❌ Debug cache test hatası:', error);
      Alert.alert('Test Hatası', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Network First Strategy testi
  const runNetworkFirstTest = async () => {
    try {
      setIsLoading(true);
      console.log('🌐 Network First Strategy Test başlatılıyor...');
      
      const result = await hybridCache.get('debug', 'network_first_test', {}, 'network_first');
      console.log('✅ Network First result:', result);
      
      await loadStats();
      Alert.alert('Test Tamamlandı', 'Network First Strategy test başarıyla tamamlandı!');
      
    } catch (error) {
      console.error('❌ Network First test hatası:', error);
      Alert.alert('Test Hatası', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Stale While Revalidate testi
  const runStaleWhileRevalidateTest = async () => {
    try {
      setIsLoading(true);
      console.log('⚡ Stale While Revalidate Strategy Test başlatılıyor...');
      
      const result = await hybridCache.get('debug', 'stale_while_revalidate_test', {}, 'stale_while_revalidate');
      console.log('✅ Stale While Revalidate result:', result);
      
      await loadStats();
      Alert.alert('Test Tamamlandı', 'Stale While Revalidate Strategy test başarıyla tamamlandı!');
      
    } catch (error) {
      console.error('❌ Stale While Revalidate test hatası:', error);
      Alert.alert('Test Hatası', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Cache invalidation testi
  const runCacheInvalidationTest = async () => {
    try {
      setIsLoading(true);
      console.log('🗑️ Cache Invalidation Test başlatılıyor...');
      
      // Önce test verisi ekle
      await hybridCache.set('debug', 'invalidation_test', { message: 'Test data', timestamp: Date.now() });
      
      // Sonra invalidate et
      const result = await hybridCache.invalidateCache('debug', 'invalidation_test');
      console.log('✅ Cache invalidation result:', result);
      
      await loadStats();
      Alert.alert('Test Tamamlandı', 'Cache invalidation test başarıyla tamamlandı!');
      
    } catch (error) {
      console.error('❌ Cache invalidation test hatası:', error);
      Alert.alert('Test Hatası', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Cache performans testi
  const runCachePerformanceTest = async () => {
    try {
      setIsLoading(true);
      console.log('📊 Cache Performance Test başlatılıyor...');
      
      const testData = { message: 'Performance test data', timestamp: Date.now() };
      const iterations = 100;
      const startTime = Date.now();
      
      // Çoklu set/get testi
      for (let i = 0; i < iterations; i++) {
        await hybridCache.set('debug', `perf_test_${i}`, { ...testData, index: i });
        await hybridCache.get('debug', `perf_test_${i}`);
      }
      
      const endTime = Date.now();
      const duration = endTime - startTime;
      const avgTime = duration / (iterations * 2); // set + get
      
      console.log(`✅ Performance test tamamlandı: ${iterations} işlem, ${duration}ms, ortalama ${avgTime.toFixed(2)}ms/işlem`);
      
      await loadStats();
      Alert.alert('Test Tamamlandı', `Performance test başarıyla tamamlandı!\n${iterations} işlem, ${duration}ms\nOrtalama: ${avgTime.toFixed(2)}ms/işlem`);
      
    } catch (error) {
      console.error('❌ Cache performance test hatası:', error);
      Alert.alert('Test Hatası', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Memory leak testi
  const runMemoryLeakTest = async () => {
    try {
      setIsLoading(true);
      console.log('🧠 Memory Leak Test başlatılıyor...');
      
      const initialStats = memoryLeakProtection.getMemoryStats();
      console.log('📊 Initial memory stats:', initialStats);
      
      // Çok sayıda cache entry oluştur
      for (let i = 0; i < 50; i++) {
        await hybridCache.set('debug', `leak_test_${i}`, { 
          message: `Memory leak test data ${i}`, 
          timestamp: Date.now(),
          largeData: new Array(1000).fill('x').join('')
        });
      }
      
      const afterCreateStats = memoryLeakProtection.getMemoryStats();
      console.log('📊 After create memory stats:', afterCreateStats);
      
      // Cache'leri temizle
      await hybridCache.clearCategory('debug');
      
      const afterCleanupStats = memoryLeakProtection.getMemoryStats();
      console.log('📊 After cleanup memory stats:', afterCleanupStats);
      
      const memoryIncrease = afterCreateStats.usagePercent - initialStats.usagePercent;
      const memoryDecrease = afterCreateStats.usagePercent - afterCleanupStats.usagePercent;
      
      console.log(`✅ Memory leak test tamamlandı. Artış: ${(memoryIncrease * 100).toFixed(2)}%, Azalış: ${(memoryDecrease * 100).toFixed(2)}%`);
      
      await loadStats();
      Alert.alert('Test Tamamlandı', `Memory leak test başarıyla tamamlandı!\nMemory artışı: ${(memoryIncrease * 100).toFixed(2)}%\nMemory azalışı: ${(memoryDecrease * 100).toFixed(2)}%`);
      
    } catch (error) {
      console.error('❌ Memory leak test hatası:', error);
      Alert.alert('Test Hatası', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Cache temizleme
  const clearAllCache = async () => {
    try {
      Alert.alert(
        'Cache Temizleme',
        'Tüm cache verileri silinecek. Emin misiniz?',
        [
          { text: 'İptal', style: 'cancel' },
          {
            text: 'Temizle',
            style: 'destructive',
            onPress: async () => {
              setIsLoading(true);
              await hybridCache.clearAll();
              await loadStats();
              Alert.alert('Başarılı', 'Tüm cache temizlendi!');
              setIsLoading(false);
            }
          }
        ]
      );
    } catch (error) {
      console.error('❌ Cache temizleme hatası:', error);
      Alert.alert('Hata', error.message);
      setIsLoading(false);
    }
  };

  // Tab içeriği
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'memory':
        return renderMemoryTab();
      case 'cache':
        return renderCacheTab();
      case 'performance':
        return renderPerformanceTab();
      case 'tools':
        return renderToolsTab();
      default:
        return renderOverviewTab();
    }
  };

  // Genel bakış tab'ı
  const renderOverviewTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Genel Durum</Text>
        
        {stats?.hybrid ? (
          <>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Hit Rate</Text>
              <Text style={styles.metricValue}>{stats.hybrid.hitRate || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Toplam Entry</Text>
              <Text style={styles.metricValue}>{stats.hybrid.totalEntryCount || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Memory Kullanımı</Text>
              <Text style={styles.metricValue}>{stats.hybrid.memoryUsage || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Hata Sayısı</Text>
              <Text style={[styles.metricValue, (stats.hybrid.totalErrors || 0) > 0 ? styles.errorText : styles.successText]}>
                {stats.hybrid.totalErrors || 'N/A'}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Hybrid Cache</Text>
            <Text style={styles.metricValue}>Yükleniyor...</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛡️ Memory Leak Protection</Text>
        
        {memoryStats ? (
          <>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Memory Kullanımı</Text>
              <Text style={styles.metricValue}>{memoryStats.usagePercentFormatted || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Sağlık Durumu</Text>
              <Text style={[styles.metricValue, memoryStats.isHealthy ? styles.successText : styles.errorText]}>
                {memoryStats.isHealthy ? 'Sağlıklı' : 'Risk'}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Memory Leak Protection</Text>
            <Text style={styles.metricValue}>Yükleniyor...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  // Memory tab'ı
  const renderMemoryTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧠 Memory Cache</Text>
        
        {stats?.memory ? (
          <>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Hit Rate</Text>
              <Text style={styles.metricValue}>{stats.memory.hitRate || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Entry Sayısı</Text>
              <Text style={styles.metricValue}>{stats.memory.entryCount || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Memory Kullanımı</Text>
              <Text style={styles.metricValue}>{stats.memory.memoryUsage || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Maksimum Boyut</Text>
              <Text style={styles.metricValue}>{stats.memory.maxMemory || 'N/A'}</Text>
            </View>
          </>
        ) : (
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Memory Cache</Text>
            <Text style={styles.metricValue}>Yükleniyor...</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💾 Persistent Cache</Text>
        
        {stats?.persistent ? (
          <>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Hit Rate</Text>
              <Text style={styles.metricValue}>{stats.persistent.hitRate || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Entry Sayısı</Text>
              <Text style={styles.metricValue}>{stats.persistent.entryCount || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Storage Kullanımı</Text>
              <Text style={styles.metricValue}>{stats.persistent.storageUsage || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Maksimum Boyut</Text>
              <Text style={styles.metricValue}>{stats.persistent.maxStorage || 'N/A'}</Text>
            </View>
          </>
        ) : (
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Persistent Cache</Text>
            <Text style={styles.metricValue}>Yükleniyor...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  // Cache tab'ı
  const renderCacheTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔄 Cache Detayları</Text>
        
        {stats?.hybrid ? (
          <>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Toplam Hit</Text>
              <Text style={styles.metricValue}>{stats.hybrid.totalHits || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Toplam Miss</Text>
              <Text style={styles.metricValue}>{stats.hybrid.totalMisses || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Toplam Set</Text>
              <Text style={styles.metricValue}>{stats.hybrid.totalSets || 'N/A'}</Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Toplam Delete</Text>
              <Text style={styles.metricValue}>{stats.hybrid.totalDeletes || 'N/A'}</Text>
            </View>
          </>
        ) : (
          <View style={styles.metricCard}>
            <Text style={styles.metricLabel}>Hybrid Cache</Text>
            <Text style={styles.metricValue}>Yükleniyor...</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );

  // Performance tab'ı
  const renderPerformanceTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚡ Performance Metrikleri</Text>
        
        {stats?.hybrid && (
          <>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Ortalama Entry Boyutu</Text>
              <Text style={styles.metricValue}>
                {stats.memory?.averageEntrySize || 'N/A'} B
              </Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Memory Kullanım Yüzdesi</Text>
              <Text style={styles.metricValue}>
                {stats.memory?.memoryUsagePercent || 'N/A'}
              </Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Storage Kullanım Yüzdesi</Text>
              <Text style={styles.metricValue}>
                {stats.persistent?.storageUsagePercent || 'N/A'}
              </Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Cache Performans Analizi</Text>
        
        {stats?.hybrid && (
          <>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Toplam İşlem</Text>
              <Text style={styles.metricValue}>
                {(stats.hybrid.totalHits || 0) + (stats.hybrid.totalMisses || 0)}
              </Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Hit Rate</Text>
              <Text style={[styles.metricValue, (stats.hybrid.hitRate || '0%').includes('%') ? 
                parseFloat(stats.hybrid.hitRate) > 70 ? styles.successText : styles.errorText : styles.metricValue]}>
                {stats.hybrid.hitRate || 'N/A'}
              </Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Cache Verimliliği</Text>
              <Text style={[styles.metricValue, (stats.hybrid.hitRate || '0%').includes('%') ? 
                parseFloat(stats.hybrid.hitRate) > 70 ? styles.successText : styles.warningText : styles.metricValue]}>
                {(stats.hybrid.hitRate || '0%').includes('%') ? 
                  parseFloat(stats.hybrid.hitRate) > 70 ? 'Yüksek' : 
                  parseFloat(stats.hybrid.hitRate) > 40 ? 'Orta' : 'Düşük' : 'N/A'}
              </Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧠 Memory Analizi</Text>
        
        {memoryStats && (
          <>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Memory Kullanımı</Text>
              <Text style={[styles.metricValue, memoryStats.usagePercent > 0.8 ? styles.errorText : 
                memoryStats.usagePercent > 0.6 ? styles.warningText : styles.successText]}>
                {memoryStats.usagePercentFormatted || 'N/A'}
              </Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Kullanılan Memory</Text>
              <Text style={styles.metricValue}>
                {memoryStats.used ? `${(memoryStats.used / 1024 / 1024).toFixed(2)} MB` : 'N/A'}
              </Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Toplam Memory</Text>
              <Text style={styles.metricValue}>
                {memoryStats.total ? `${(memoryStats.total / 1024 / 1024).toFixed(2)} MB` : 'N/A'}
              </Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Memory Durumu</Text>
              <Text style={[styles.metricValue, memoryStats.isHealthy ? styles.successText : styles.errorText]}>
                {memoryStats.isHealthy ? 'Sağlıklı' : 'Risk Altında'}
              </Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💾 Storage Analizi</Text>
        
        {stats?.persistent && (
          <>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Storage Kullanımı</Text>
              <Text style={styles.metricValue}>
                {stats.persistent.storageUsage || 'N/A'}
              </Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Maksimum Storage</Text>
              <Text style={styles.metricValue}>
                {stats.persistent.maxStorage || 'N/A'}
              </Text>
            </View>
            
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Entry Sayısı</Text>
              <Text style={styles.metricValue}>
                {stats.persistent.entryCount || 'N/A'}
              </Text>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );

  // Tools tab'ı
  const renderToolsTab = () => (
    <ScrollView style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔧 Debug Araçları</Text>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.testButton]} 
          onPress={runCacheTest}
          disabled={isLoading}
        >
          <Ionicons name="play" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>
            {isLoading ? 'Test Çalışıyor...' : 'Cache Test Çalıştır'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.networkButton]} 
          onPress={runNetworkFirstTest}
          disabled={isLoading}
        >
          <Ionicons name="globe" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Network First Test</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.staleButton]} 
          onPress={runStaleWhileRevalidateTest}
          disabled={isLoading}
        >
          <Ionicons name="refresh-circle" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Stale While Revalidate Test</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.invalidationButton]} 
          onPress={runCacheInvalidationTest}
          disabled={isLoading}
        >
          <Ionicons name="close-circle" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Cache Invalidation Test</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.performanceButton]} 
          onPress={runCachePerformanceTest}
          disabled={isLoading}
        >
          <Ionicons name="speedometer" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Cache Performance Test</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.memoryButton]} 
          onPress={runMemoryLeakTest}
          disabled={isLoading}
        >
          <Ionicons name="bug" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Memory Leak Test</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.refreshButton]} 
          onPress={loadStats}
          disabled={isLoading}
        >
          <Ionicons name="refresh" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>İstatistikleri Yenile</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.clearButton]} 
          onPress={clearAllCache}
          disabled={isLoading}
        >
          <Ionicons name="trash" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Tüm Cache'i Temizle</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🔧 Debug Dashboard</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          {[
            { key: 'overview', label: 'Genel', icon: 'grid' },
            { key: 'memory', label: 'Memory', icon: 'hardware-chip' },
            { key: 'cache', label: 'Cache', icon: 'layers' },
            { key: 'performance', label: 'Performance', icon: 'speedometer' },
            { key: 'tools', label: 'Araçlar', icon: 'construct' }
          ].map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Ionicons 
                name={tab.icon} 
                size={16} 
                color={activeTab === tab.key ? '#6c63ff' : '#666'} 
              />
              <Text style={[
                styles.tabText, 
                activeTab === tab.key && styles.activeTabText
              ]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        {renderTabContent()}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#2a2a2a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#444',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#333',
  },
  tabText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  activeTabText: {
    color: '#6c63ff',
    fontWeight: 'bold',
  },
  tabContent: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  metricCard: {
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    color: '#ccc',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  successText: {
    color: '#4CAF50',
  },
  warningText: {
    color: '#FF9800',
  },
  errorText: {
    color: '#F44336',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  testButton: {
    backgroundColor: '#6c63ff',
  },
  networkButton: {
    backgroundColor: '#4CAF50',
  },
  staleButton: {
    backgroundColor: '#FF9800',
  },
  invalidationButton: {
    backgroundColor: '#9C27B0',
  },
  performanceButton: {
    backgroundColor: '#00BCD4',
  },
  memoryButton: {
    backgroundColor: '#795548',
  },
  refreshButton: {
    backgroundColor: '#2196F3',
  },
  clearButton: {
    backgroundColor: '#F44336',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
