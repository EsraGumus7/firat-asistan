import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

/**
 * Network Status Component - İnternet bağlantı durumunu gösterir
 * Bağlantı yoksa kullanıcıyı bilgilendirir
 */
const NetworkStatus = ({ style }) => {
  const { isConnected, connectionType, isLoading } = useNetworkStatus();
  const slideAnim = React.useRef(new Animated.Value(-100)).current;

  React.useEffect(() => {
    if (!isConnected && !isLoading) {
      // Bağlantı yoksa banner'ı göster
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Bağlantı varsa banner'ı gizle
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isConnected, isLoading, slideAnim]);

  // Bağlantı varsa veya yükleniyorsa hiçbir şey gösterme
  if (isConnected || isLoading) {
    return null;
  }

  return (
    <Animated.View 
      style={[
        styles.container,
        style,
        {
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <View style={styles.content}>
        <Ionicons name="wifi-outline" size={20} color="#FFFFFF" />
        <Text style={styles.text}>
          İnternet bağlantısı yok
        </Text>
        <Text style={styles.subText}>
          Lütfen bağlantınızı kontrol edin
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FF6B6B',
    zIndex: 1000,
    elevation: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  subText: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
});

export default NetworkStatus;
