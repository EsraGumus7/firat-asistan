import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import * as Speech from 'expo-speech';
import { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard, KeyboardAvoidingView, Linking, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Avatar from '../components/Avatar';
import DebugDashboard from '../components/DebugDashboard';
import { ErrorBoundary } from '../components/ErrorBoundary';
import NetworkStatus from '../components/NetworkStatus';
import { GEMINI_API_ENDPOINT } from '../config/apiConfig';
import { analyzeUserMessage } from '../services/analysisService';
import { logError } from '../services/globalErrorHandler';
import weatherService from '../services/weatherService';
import { retryApiCall } from '../utils/retryUtils';
import { sanitizeMessage, validateMessage } from '../utils/validationUtils';
import { useDil } from './DilContext';

// Gemini API artık backend üzerinden çağrılacak
// const GEMINI_API_KEY = ;
// const GEMINI_API_URL = 

// ========================================
// WEATHER ICON FUNCTION
// ========================================
const getWeatherIcon = (condition) => {
  if (!condition) return '🌤️';
  const conditionText = condition.toLowerCase();
  
  if (conditionText.includes('güneş') || conditionText.includes('açık') || conditionText.includes('sunny')) {
    return '☀️';
  } else if (conditionText.includes('bulut') || conditionText.includes('cloudy')) {
    return '☁️';
  } else if (conditionText.includes('yağmur') || conditionText.includes('rain')) {
    return '🌧️';
  } else if (conditionText.includes('kar') || conditionText.includes('snow')) {
    return '❄️';
  } else if (conditionText.includes('fırtına') || conditionText.includes('storm')) {
    return '⛈️';
  } else if (conditionText.includes('sis') || conditionText.includes('fog')) {
    return '🌫️';
  } else {
    return '🌤️';
  }
};


const DILLER = {
  tr: {
    kod: 'tr',
    ad: 'Türkçe',
    bayrak: '🇹🇷',
    placeholder: 'Mesajınızı yazın...',
    hosgeldin: "Merhaba! Ben Şeri, Fırat Üniversitesi'nin yapay zeka asistanıyım. 613+ API endpoint'im ile üniversiteyle ilgili her şey hakkında sana yardımcı olabilirim:\n\n🍽️ Yemek menüsü\n🏛️ Fakülte duyuruları (Mimarlık, Tıp, Mühendislik, vb.)\n🎉 Etkinlikler ve duyurular\n📚 Kütüphane bilgileri\n📰 Haberler\n\nÖrnek: 'mimarlık fakültesi', 'yemek menüsü', 'etkinlikler' yazabilirsin. Sana nasıl yardımcı olabilirim?"
  },
  en: {
    kod: 'en',
    ad: 'English',
    bayrak: '🇬🇧',
    placeholder: 'Type your message...',
    hosgeldin: 'Hello! My name is Şeri. I am the Fırat University AI Assistant. I have 613+ API endpoints to help you with everything related to the university:\n\n🍽️ Cafeteria menu\n🏛️ Faculty announcements (Architecture, Medicine, Engineering, etc.)\n🎉 Events and announcements\n📚 Library information\n📰 News\n\nExamples: "architecture faculty", "cafeteria menu", "events". How can I assist you today?'
  }
};

// Sistem mesajları artık backend'de yönetiliyor

// Backend üzerinden Gemini API çağrısı
async function geminiCevapAl(message, language = 'tr') {
  const geminiCall = async () => {
    const response = await axios.post(GEMINI_API_ENDPOINT, {
      message: message,
      language: language
    }, {
      timeout: 15000, // 15 saniye timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    return response;
  };

  try {
    // Retry mekanizması ile Gemini API çağrısı yap
    const response = await retryApiCall(geminiCall, {
      context: 'gemini_api',
      maxRetries: 2,
      baseDelay: 2000
    });
    
    if (response.data.success) {
      return response.data.response;
    } else {
      console.log('Backend Gemini Hatası:', response.data.error);
      return 'Üzgünüm, şu anda cevap veremiyorum.';
    }
  } catch (e) {
    console.log('Backend Gemini API Hatası:', e.response ? e.response.data : e.message);
    return 'Üzgünüm, bir hata oluştu.';
  }
}

export default function AnaEkran() {
  const { dil, setDil } = useDil();
  const [mesaj, setMesaj] = useState('');
  const [sohbet, setSohbet] = useState([
    { kim: 'asistan', metin: DILLER[dil].hosgeldin, id: 0 },
  ]);
  const [showDebugDashboard, setShowDebugDashboard] = useState(false);
  
  // Weather Widget state'leri
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [lastWeatherUpdate, setLastWeatherUpdate] = useState(null);

  // Animasyon için ref'ler
  const messageAnimations = useRef({});
  const scrollViewRef = useRef(null);
  const avatarAnimation = useRef(new Animated.Value(1)).current;
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Keyboard event listener'ları
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // Hava durumuna göre uyarı mesajı oluştur
  const getWeatherAdvice = (weatherData) => {
    if (!weatherData || !weatherData.current) return '';
    
    const current = weatherData.current;
    const temp = Math.round(current.temp_c);
    const condition = current.condition.text.toLowerCase();
    
    let advice = '';
    
    // Sıcaklık uyarıları
    if (temp >= 30) {
      advice += `🌡️ Ayrıca bugün Elazığ'da hava ${temp}°C, oldukça sıcak! Bol su içmeyi unutma ve güneş kremi sür. `;
    } else if (temp <= 5) {
      advice += `🧥 Ayrıca bugün Elazığ'da hava ${temp}°C, çok soğuk! Kalın giyinmeyi unutma. `;
    } else if (temp <= 15) {
      advice += `🧣 Ayrıca bugün Elazığ'da hava ${temp}°C, serin! Hafif mont giyebilirsin. `;
    } else {
      advice += `🌤️ Ayrıca bugün Elazığ'da hava ${temp}°C, güzel bir gün! `;
    }
    
    // Hava durumu uyarıları
    if (condition.includes('yağmur') || condition.includes('rain')) {
      advice += `☔ Yağmurlu hava var, şemsiye almayı unutma! `;
    } else if (condition.includes('kar') || condition.includes('snow')) {
      advice += `❄️ Karlı hava var, dikkatli yürü! `;
    } else if (condition.includes('fırtına') || condition.includes('storm')) {
      advice += `⛈️ Fırtınalı hava var, dışarıda dikkatli ol! `;
    } else if (condition.includes('sis') || condition.includes('fog')) {
      advice += `🌫️ Sisli hava var, araç kullanırken dikkatli ol! `;
    } else if (condition.includes('güneş') || condition.includes('açık') || condition.includes('sunny')) {
      advice += `☀️ Güneşli hava var, güzel bir gün geçir! `;
    }
    
    return advice.trim();
  };

  // Weather Widget fonksiyonları
  const loadWeatherData = async () => {
    try {
      setIsWeatherLoading(true);
      const response = await weatherService.getCurrentWeather();
      setWeatherData(response.data);
      setLastWeatherUpdate(new Date());
    } catch (error) {
      console.log('Weather widget yükleme hatası:', error);
    } finally {
      setIsWeatherLoading(false);
    }
  };


  // Weather Widget yükleme
  useEffect(() => {
    loadWeatherData();
    const interval = setInterval(loadWeatherData, 60 * 60 * 1000); // 1 saat
    return () => clearInterval(interval);
  }, []);

  // Hava durumu yüklendikten sonra hoşgeldin mesajını güncelle
  useEffect(() => {
    if (weatherData && dil === 'tr') {
      const weatherAdvice = getWeatherAdvice(weatherData);
      if (weatherAdvice) {
        const updatedMessage = DILLER[dil].hosgeldin + `\n\n${weatherAdvice}`;
        setSohbet(prev => {
          const newSohbet = [...prev];
          if (newSohbet.length > 0 && newSohbet[0].kim === 'asistan') {
            newSohbet[0] = { ...newSohbet[0], metin: updatedMessage };
          }
          return newSohbet;
        });
        
        // Hava durumu uyarısını da sesli oku
        Speech.stop();
        Speech.speak(weatherAdvice, { language: 'tr-TR' });
      }
    }
  }, [weatherData, dil]);

  // Dil değiştiğinde veya ilk açılışta asistan mesajı ve konuşma
  useEffect(() => {
    const createWelcomeMessage = () => {
      let welcomeMessage = DILLER[dil].hosgeldin;
      
      // Hava durumu uyarısı ekle (sadece Türkçe için)
      if (dil === 'tr' && weatherData) {
        const weatherAdvice = getWeatherAdvice(weatherData);
        if (weatherAdvice) {
          welcomeMessage += `\n\n${weatherAdvice}`;
        }
      }
      
      return welcomeMessage;
    };
    
    const welcomeMessage = createWelcomeMessage();
    setSohbet([{ kim: 'asistan', metin: welcomeMessage }]);
    Speech.stop(); // Önceki konuşmayı durdur
    Speech.speak(welcomeMessage, { language: dil === 'tr' ? 'tr-TR' : 'en-GB' });
    // Unmount olunca konuşmayı durdur
    return () => { Speech.stop(); };
  }, [dil, weatherData]);

  const mesajGonder = async (gelenMesaj) => {
    const gonderilecek = gelenMesaj !== undefined ? gelenMesaj : mesaj;
    
    // Input validation
    const validation = validateMessage(gonderilecek);
    if (!validation.isValid) {
      console.warn('❌ Mesaj validation hatası:', validation.errors);
      
      // Kullanıcıya hata mesajı göster
      const errorMessage = validation.errors.join(', ');
      const assistantMessageId = Date.now() + 1;
      setSohbet(prev => [...prev, { 
        kim: 'asistan', 
        metin: `❌ ${errorMessage}`, 
        id: assistantMessageId 
      }]);
      setTimeout(() => animateMessage(assistantMessageId), 100);
      return;
    }
    
    // Mesajı sanitize et
    const sanitizedMessage = sanitizeMessage(gonderilecek);
    if (sanitizedMessage !== gonderilecek) {
      console.log('🧹 Mesaj sanitize edildi:', sanitizedMessage);
    }

    const userMessageId = Date.now();
    setSohbet(prev => [...prev, { kim: 'kullanici', metin: gonderilecek, id: userMessageId }]);
    setMesaj('');
    
    // Kullanıcı mesajı animasyonu
    setTimeout(() => animateMessage(userMessageId), 100);

    // YENİ BACKEND SİSTEMİ - 613 API ENDPOINT
    try {
      console.log('Backend API çağrılıyor:', sanitizedMessage);
      const backendResponse = await analyzeUserMessage(sanitizedMessage, dil);
      
      // Basit sohbet kontrolü - eğer null döndüyse direkt Gemini'ye git
      if (backendResponse === null) {
        console.log('🎯 Basit sohbet tespit edildi, backend atlanıyor, direkt Gemini\'ye gidiliyor');
        // Backend kısmını atla, direkt Gemini'ye git
      } else if (backendResponse && backendResponse.isWeather === true) {
        console.log('🌤️ MappingApiService\'ten hava durumu sorusu tespit edildi, hava durumu servisi çağrılıyor');
        
        try {
          // Hava durumu servisini çağır (direkt API)
          const weatherResponse = await weatherService.getCurrentWeather();
          const weatherMessage = weatherService.createWeatherMessage(weatherResponse.data, 'current');
          
          const assistantMessageId = Date.now() + 1;
          setSohbet(prev => [...prev, { kim: 'asistan', metin: weatherMessage, id: assistantMessageId }]);
          setTimeout(() => animateMessage(assistantMessageId), 100);
          
          // Avatar konuşma animasyonu başlat
          startAvatarSpeaking();
          Speech.stop();
          try {
            Speech.speak(weatherMessage, { language: dil === 'tr' ? 'tr-TR' : 'en-GB' });
          } catch (speechError) {
            console.error('Weather Speech API Hatası:', speechError);
          }
          // Konuşma bitince avatar animasyonunu durdur
          setTimeout(() => stopAvatarSpeaking(), weatherMessage.length * 50);
          return; // Hava durumu, Gemini'ye gitme
        } catch (weatherError) {
          console.log('Hava durumu servisi hatası:', weatherError);
          // Hata durumunda Gemini'ye git
        }
      } else if (backendResponse && backendResponse.data && backendResponse.data.type === 'weather') {
        console.log('🌤️ Hava durumu sorusu tespit edildi, hava durumu servisi çağrılıyor');
        
        try {
          // Hava durumu servisini çağır (direkt API)
          const weatherResponse = await weatherService.getCurrentWeather();
          const weatherMessage = weatherService.createWeatherMessage(weatherResponse.data, 'current');
          
          const assistantMessageId = Date.now() + 1;
          setSohbet(prev => [...prev, { kim: 'asistan', metin: weatherMessage, id: assistantMessageId }]);
          setTimeout(() => animateMessage(assistantMessageId), 100);
          
          // Avatar konuşma animasyonu başlat
          startAvatarSpeaking();
          Speech.stop();
          try {
            Speech.speak(weatherMessage, { language: dil === 'tr' ? 'tr-TR' : 'en-GB' });
          } catch (speechError) {
            console.error('Weather Speech API Hatası:', speechError);
          }
          // Konuşma bitince avatar animasyonunu durdur
          setTimeout(() => stopAvatarSpeaking(), weatherMessage.length * 50);
          return; // Hava durumu, Gemini'ye gitme
        } catch (weatherError) {
          console.log('Hava durumu servisi hatası:', weatherError);
          // Hata durumunda Gemini'ye git
        }
      } else if (backendResponse && typeof backendResponse === 'string' && backendResponse.trim() !== '' && !backendResponse.includes('Üzgünüm, mesajınızı anlayamadım')) {
        console.log('Backend cevabı alındı:', backendResponse);
        
        // Backend'den spesifik bilgi geldi (yemek, fakülte vs.) - sadece bunu göster
        const isSpecificInfo = backendResponse.includes('🍽️') || 
                              backendResponse.includes('🏛️') || 
                              backendResponse.includes('📚') || 
                              backendResponse.includes('📰') ||
                              backendResponse.includes('📢') ||  // Etkinlikler için
                              backendResponse.includes('🎉') ||
                              backendResponse.includes('Bugünün') ||
                              backendResponse.includes('Fakülte') ||
                              backendResponse.includes('Duyuru') ||
                              backendResponse.includes('Etkinlik');
        
        if (isSpecificInfo) {
          console.log('Spesifik bilgi alındı, sadece backend cevabı gösteriliyor');
          
          // Backend'den spesifik bilgi geldi, sadece onu göster
          const assistantMessageId = Date.now() + 1;
          setSohbet(prev => [...prev, { kim: 'asistan', metin: backendResponse, id: assistantMessageId }]);
          setTimeout(() => animateMessage(assistantMessageId), 100);
          
          // Avatar konuşma animasyonu başlat
          startAvatarSpeaking();
          Speech.stop();
          try {
            Speech.speak(backendResponse, { language: dil === 'tr' ? 'tr-TR' : 'en-GB' });
          } catch (speechError) {
            logError(speechError, {
              type: 'speech_api_error',
              text: backendResponse,
              language: dil,
              context: 'mesajGonder_speech'
            });
          }
          // Konuşma bitince avatar animasyonunu durdur
          setTimeout(() => stopAvatarSpeaking(), backendResponse.length * 50);
          return; // Spesifik bilgi, Gemini'ye gitme
        } else {
          console.log('Genel cevap alındı, Gemini\'ye de gidiliyor');
        }
      } else {
        console.log('Backend\'den geçerli cevap alınamadı, Gemini\'ye gidiliyor');
      }
    } catch (error) {
      console.error('Backend API Hatası:', error);
      // Global Error Handler'a logla
      logError(error, {
        type: 'backend_api_error',
        userMessage: gonderilecek,
        language: dil,
        context: 'mesajGonder'
      });
      // Hata durumunda Gemini'ye devam et
    }

    // Backend'den cevap yoksa Gemini API'ye git (fallback)
    console.log('Backend cevap vermedi, Gemini\'ye gidiliyor');
    
    try {
      const cevap = await geminiCevapAl(sanitizedMessage, dil);
      const assistantMessageId = Date.now() + 1;
      setSohbet(prev => [...prev, { kim: 'asistan', metin: cevap, id: assistantMessageId }]);
      setTimeout(() => animateMessage(assistantMessageId), 100);
      
      // Avatar konuşma animasyonu başlat
      startAvatarSpeaking();
      Speech.stop(); // Önceki konuşmayı durdur
      try {
        Speech.speak(cevap, { language: dil === 'tr' ? 'tr-TR' : 'en-GB' });
      } catch (speechError) {
        logError(speechError, {
          type: 'speech_api_error',
          text: cevap,
          language: dil,
          context: 'mesajGonder_gemini_speech'
        });
      }
      // Konuşma bitince avatar animasyonunu durdur
      setTimeout(() => stopAvatarSpeaking(), cevap.length * 50);
    } catch (geminiError) {
      console.error('Backend Gemini API Hatası:', geminiError);
      // Global Error Handler'a logla
      logError(geminiError, {
        type: 'gemini_api_error',
        userMessage: gonderilecek,
        language: dil,
        context: 'mesajGonder_gemini'
      });
      const errorMessage = 'Üzgünüm, şu anda cevap veremiyorum. Lütfen daha sonra tekrar deneyin.';
      const assistantMessageId = Date.now() + 1;
      setSohbet(prev => [...prev, { kim: 'asistan', metin: errorMessage, id: assistantMessageId }]);
      setTimeout(() => animateMessage(assistantMessageId), 100);
    }
  };

  // Mesaj animasyonu fonksiyonu
  const animateMessage = (messageId) => {
    if (!messageAnimations.current[messageId]) {
      messageAnimations.current[messageId] = new Animated.Value(0);
    }
    
    Animated.sequence([
      Animated.timing(messageAnimations.current[messageId], {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Avatar konuşma animasyonu
  const startAvatarSpeaking = () => {
    setIsAvatarSpeaking(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(avatarAnimation, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(avatarAnimation, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopAvatarSpeaking = () => {
    setIsAvatarSpeaking(false);
    avatarAnimation.stopAnimation();
    Animated.timing(avatarAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ErrorBoundary>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -keyboardHeight * 0.05 : -keyboardHeight * 0.02}
      >
        <NetworkStatus />
        <LinearGradient
          colors={['#0B141A', '#0E1621', '#1A2A3A']} // WhatsApp benzeri gradient
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
        <View style={styles.topBar}>
          {/* Hava Durumu Widget'ı - Sol üst */}
          {/* Weather Widget */}
          {isWeatherLoading ? (
            <View style={styles.weatherWidget}>
              <Text style={styles.weatherText}>🌤️ Elazığ</Text>
              <Text style={styles.weatherTemp}>...</Text>
            </View>
          ) : !weatherData || !weatherData.current ? (
            <View style={styles.weatherWidget}>
              <Text style={styles.weatherText}>🌤️ Elazığ</Text>
              <Text style={styles.weatherTemp}>--°C</Text>
            </View>
          ) : (
            <View style={styles.weatherWidget}>
              <Text style={styles.weatherText}>
                {getWeatherIcon(weatherData.current.condition.text)} Elazığ
              </Text>
              <Text style={styles.weatherTemp}>
                {Math.round(weatherData.current.temp_c)}°C
              </Text>
            </View>
          )}
          
          {/* Debug Dashboard Butonu - Hava durumunun yanında */}
          {__DEV__ && (
            <TouchableOpacity 
              style={styles.debugButton} 
              onPress={() => setShowDebugDashboard(true)}
            >
              <Ionicons name="construct" size={20} color="#fff" />
            </TouchableOpacity>
          )}
          
          {/* Dil Butonu - Sağ üst */}
          <TouchableOpacity style={styles.dilButon} onPress={() => setDil(dil === 'tr' ? 'en' : 'tr')}>
            <Text style={{ fontSize: 24 }}>{DILLER[dil].bayrak}</Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            transform: [{ scale: avatarAnimation }],
          }}
        >
          <Avatar konusuyorMu={isAvatarSpeaking} />
        </Animated.View>
        <ScrollView 
          ref={scrollViewRef}
          style={[styles.sohbetAlani, { 
            paddingBottom: keyboardHeight > 0 ? 80 : 20
          }]} 
          contentContainerStyle={{ paddingBottom: 20 }}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {sohbet.map((item, idx) => {
            const animation = messageAnimations.current[item.id] || new Animated.Value(1);
            
            return (
              <Animated.View 
                key={item.id || idx} 
                style={[
                  styles.sohbetBalonu, 
                  item.kim === 'kullanici' ? styles.kullaniciBalonu : styles.asistanBalonu,
                  {
                    opacity: animation,
                    transform: [
                      {
                        translateX: animation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [item.kim === 'kullanici' ? 50 : -50, 0],
                        }),
                      },
                      {
                        scale: animation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {(() => {
                  // URL algılama regex'i - parantez içindeki linkleri de algıla
                  const urlRegex = /(https?:\/\/[^\s)]+)/g;
                  const text = item.metin;
                  
                  // Parantez içindeki URL'leri bul
                  const urlMatches = text.match(urlRegex);
                  
                  if (urlMatches && urlMatches.length > 0) {
                    // URL'ler var, parçalara ayır
                    let lastIndex = 0;
                    const elements = [];
                    
                    urlMatches.forEach((url, index) => {
                      const urlIndex = text.indexOf(url, lastIndex);
                      
                      // URL'den önceki metin
                      if (urlIndex > lastIndex) {
                        elements.push(
                          <Text key={`text-${index}`} style={styles.sohbetMetin}>
                            {text.substring(lastIndex, urlIndex)}
                          </Text>
                        );
                      }
                      
                      // URL
                      elements.push(
                        <Text
                          key={`url-${index}`}
                          style={{ 
                            color: '#6c63ff', 
                            fontWeight: '500'
                          }}
                          onPress={() => Linking.openURL(url)}
                        >
                          {url}
                        </Text>
                      );
                      
                      lastIndex = urlIndex + url.length;
                    });
                    
                    // Kalan metin
                    if (lastIndex < text.length) {
                      elements.push(
                        <Text key="text-end" style={styles.sohbetMetin}>
                          {text.substring(lastIndex)}
                        </Text>
                      );
                    }
                    
                    return <Text>{elements}</Text>;
                  } else {
                    // URL yok, normal metin
                    return <Text style={styles.sohbetMetin}>{text}</Text>;
                  }
                })()}
              </Animated.View>
            );
          })}
        </ScrollView>
        <View style={[styles.inputAlani, { 
          position: keyboardHeight > 0 ? 'absolute' : 'relative',
          bottom: keyboardHeight > 0 ? 9 : 'auto',
          left: keyboardHeight > 0 ? 0 : 'auto',
          right: keyboardHeight > 0 ? 0 : 'auto',
          marginBottom: keyboardHeight > 0 ? 0 : 0
        }]}>
          <TextInput
            style={styles.input}
            placeholder={DILLER[dil].placeholder}
            value={mesaj}
            onChangeText={(text) => {
              // Real-time validation
              if (text.length <= 1000) {
                setMesaj(text);
              }
            }}
            onSubmitEditing={() => mesajGonder()}
            returnKeyType="send"
            onFocus={() => {
              // Klavye açıldığında scroll'u en alta kaydır
              setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 100);
            }}
            multiline={false}
            blurOnSubmit={false}
            maxLength={1000}
          />
          <TouchableOpacity style={styles.gonderButon} onPress={() => mesajGonder()}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.micButton} onPress={konusmayiBaslat}>
          <Ionicons name="mic" size={36} color="#fff" />
        </TouchableOpacity> */}
        <Text style={styles.infoText}>{DILLER[dil].info}</Text>
        </LinearGradient>
      </KeyboardAvoidingView>
      
      {/* Debug Dashboard Modal */}
      <DebugDashboard 
        visible={showDebugDashboard}
        onClose={() => setShowDebugDashboard(false)}
      />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBar: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 16,
    paddingTop: 8,
    backgroundColor: 'transparent',
  },
  sohbetAlani: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'transparent', // Gradient arka planı görmek için şeffaf
  },
  sohbetBalonu: {
    borderRadius: 16,
    padding: 12,
    marginVertical: 4,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  asistanBalonu: {
    backgroundColor: '#202C33', // WhatsApp karşı taraf bubble
    alignSelf: 'flex-start',
  },
  kullaniciBalonu: {
    backgroundColor: '#005C4B', // WhatsApp kullanıcı bubble
    alignSelf: 'flex-end',
  },
  sohbetMetin: {
    color: '#E9EDEF', // WhatsApp metin rengi
    fontSize: 16,
  },
  inputAlani: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#2A3942', // WhatsApp input rengi
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#222D34',
    color: '#E9EDEF', // Input metin rengi
  },
  gonderButon: {
    backgroundColor: '#25D366', // WhatsApp yeşil
    borderRadius: 20,
    padding: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#8696A0', // WhatsApp ikincil metin rengi
    marginTop: 5,
    marginBottom: 10,
  },
  debugButton: {
    position: 'absolute',
    left: 85, // Biraz sola kaydırıldı (15 + 60 + 10 = 85)
    top: 15,
    backgroundColor: '#6c63ff',
    borderRadius: 20,
    padding: 10,
    elevation: 3,
    shadowColor: '#6c63ff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  dilButon: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#202C33', // WhatsApp header rengi
    elevation: 2,
  },
  weatherWidget: {
    position: 'absolute',
    left: 15, // En sol
    top: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Şeffaf kare
    borderRadius: 8, // Küçük köşe yuvarlaklığı
    paddingHorizontal: 6, // Küçültüldü
    paddingVertical: 4, // Küçültüldü
    alignItems: 'center',
    minWidth: 60, // Küçültüldü
  },
  weatherText: {
    color: '#fff',
    fontSize: 9, // Küçültüldü
    fontWeight: '600',
    marginBottom: 1,
  },
  weatherTemp: {
    color: '#fff',
    fontSize: 12, // Küçültüldü
    fontWeight: 'bold',
    marginBottom: 1,
  },
  weatherCondition: {
    color: '#fff',
    fontSize: 8, // Önceki boyut
    opacity: 0.8,
    textAlign: 'center',
  },
}); 