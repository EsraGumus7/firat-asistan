import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Error Boundary - React Native uygulamasında JavaScript hatalarını yakalar
 * Uygulamanın çökmesini önler ve kullanıcı dostu hata ekranı gösterir
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0
    };
  }

  /**
   * Hata oluştuğunda state'i güncelle
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Hata yakalandığında çalışır
   */
  componentDidCatch(error, errorInfo) {
    console.error('🚨 Error Boundary yakaladı:', error);
    console.error('📋 Error Info:', errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Hata loglama servisine gönder
    this.logError(error, errorInfo);
  }

  /**
   * Hatayı logla
   */
  logError = (error, errorInfo) => {
    const errorLog = {
      timestamp: new Date().toISOString(),
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      errorInfo: {
        componentStack: errorInfo.componentStack
      },
      retryCount: this.state.retryCount,
      userAgent: 'React Native App',
      version: '1.0.0'
    };

    // Console'a logla
    console.error('📊 Error Log:', JSON.stringify(errorLog, null, 2));
    
    // Burada hata raporlama servisine gönderebilirsiniz
    // Örnek: Sentry, Crashlytics, vb.
  };

  /**
   * Hata durumunu sıfırla ve tekrar dene
   */
  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  /**
   * Uygulamayı yeniden başlat
   */
  handleRestart = () => {
    // React Native'de uygulamayı yeniden başlatmak için
    // genellikle native kod gerekir, şimdilik state'i sıfırlayalım
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.errorContainer}>
            {/* Hata İkonu */}
            <View style={styles.iconContainer}>
              <Ionicons name="warning-outline" size={64} color="#FF6B6B" />
            </View>

            {/* Hata Başlığı */}
            <Text style={styles.title}>Bir Hata Oluştu</Text>
            
            {/* Hata Açıklaması */}
            <Text style={styles.description}>
              Üzgünüz, beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
            </Text>

            {/* Hata Detayları (Geliştirme modunda) */}
            {__DEV__ && this.state.error && (
              <View style={styles.debugContainer}>
                <Text style={styles.debugTitle}>Hata Detayları:</Text>
                <Text style={styles.debugText}>
                  {this.state.error.message}
                </Text>
                <Text style={styles.debugText}>
                  Retry Sayısı: {this.state.retryCount}
                </Text>
              </View>
            )}

            {/* Aksiyon Butonları */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.retryButton} 
                onPress={this.handleRetry}
                activeOpacity={0.8}
              >
                <Ionicons name="refresh" size={20} color="#FFFFFF" />
                <Text style={styles.retryButtonText}>Tekrar Dene</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.restartButton} 
                onPress={this.handleRestart}
                activeOpacity={0.8}
              >
                <Ionicons name="home" size={20} color="#6C63FF" />
                <Text style={styles.restartButtonText}>Ana Sayfaya Dön</Text>
              </TouchableOpacity>
            </View>

            {/* Yardım Metni */}
            <Text style={styles.helpText}>
              Sorun devam ederse, lütfen uygulamayı kapatıp tekrar açın.
            </Text>
          </View>
        </View>
      );
    }

    // Hata yoksa normal içeriği göster
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    maxWidth: 400,
    width: '100%',
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  debugContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    width: '100%',
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#7F8C8D',
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  restartButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  restartButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
  },
  helpText: {
    fontSize: 14,
    color: '#95A5A6',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ErrorBoundary;
