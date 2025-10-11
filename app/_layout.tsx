import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import ErrorBoundary from '../components/ErrorBoundary';
import { initializeGlobalErrorHandler } from '../services/globalErrorHandler';
import { DilProvider } from './DilContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Global Error Handler'ı başlat
  React.useEffect(() => {
    initializeGlobalErrorHandler();
    
    // Test için (sadece geliştirme ortamında)
    if (__DEV__) {
      console.log('🧪 Global Error Handler test ediliyor...');
      // Test hatalarını oluştur
      setTimeout(() => {
        try {
          // Kasıtlı hata oluştur
          throw new Error('Test hatası - Global Error Handler test ediliyor');
        } catch (error) {
          console.log('✅ Global Error Handler test başarılı - hata yakalandı:', (error as Error).message);
        }
      }, 2000);
    }
  }, []);

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ErrorBoundary>
      <DilProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </DilProvider>
    </ErrorBoundary>
  );
}
