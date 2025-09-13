import { API_BASE_URL } from '../config/apiConfig';

// WeatherAPI konfigürasyonu
const WEATHER_API_KEY = '09b95b6181e74e099cd185935251309';
const WEATHER_API_URL = 'https://api.weatherapi.com/v1';

/**
 * Hava Durumu Servisi
 * Elazığ'ın hava durumu verilerini backend'den alır
 */
class WeatherService {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/weather`;
  }

  /**
   * Mevcut hava durumu - Direkt WeatherAPI'den
   */
  async getCurrentWeather() {
    try {
      console.log('🌤️ Mevcut hava durumu isteniyor (direkt API)...');
      
      // Direkt WeatherAPI'ye git
      const url = `${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=Elazig&lang=tr`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Mevcut hava durumu alındı (direkt API)');
      
      return { success: true, data: data };
    } catch (error) {
      console.log('❌ Mevcut hava durumu hatası:', error);
      throw error;
    }
  }

  /**
   * Günlük hava durumu (5 günlük tahmin)
   */
  async getDailyWeather() {
    try {
      console.log('🌤️ Günlük hava durumu isteniyor...');
      
      const response = await fetch(`${this.baseUrl}/daily`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Günlük hava durumu alındı');
      
      return data;
    } catch (error) {
      console.log('❌ Günlük hava durumu hatası:', error);
      throw error;
    }
  }

  /**
   * Saatlik hava durumu (24 saat)
   */
  async getHourlyWeather() {
    try {
      console.log('🌤️ Saatlik hava durumu isteniyor...');
      
      const response = await fetch(`${this.baseUrl}/hourly`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Saatlik hava durumu alındı');
      
      return data;
    } catch (error) {
      console.log('❌ Saatlik hava durumu hatası:', error);
      throw error;
    }
  }

  /**
   * Hava durumu verilerini formatla (kullanıcı dostu)
   */
  formatWeatherData(weatherData, type = 'current') {
    if (!weatherData || !weatherData.current) {
      return 'Üzgünüm, hava durumu bilgisi alınamadı.';
    }

    const current = weatherData.current;
    const location = weatherData.location;

    let message = `Elazığ'da şu an hava ${current.condition.text}, sıcaklık ${current.temp_c}°C.`;
    message += ` Hissedilen sıcaklık ${current.feelslike_c}°C.`;
    message += ` Nem oranı %${current.humidity}, rüzgar hızı ${current.wind_kph} km/s (${current.wind_dir}).`;

    return message;
  }

  /**
   * Mevcut hava durumu mesajı oluştur
   */
  createWeatherMessage(weatherData, type = 'current') {
    if (!weatherData || !weatherData.current) {
      return 'Üzgünüm, hava durumu bilgisi alınamadı.';
    }

    const current = weatherData.current;
    const location = weatherData.location;

    let message = `🌤️ **Elazığ Hava Durumu**\n\n`;
    message += `📍 **Konum:** ${location.name}, ${location.country}\n`;
    message += `🌡️ **Sıcaklık:** ${current.temp_c}°C (Hissedilen: ${current.feelslike_c}°C)\n`;
    message += `☁️ **Durum:** ${current.condition.text}\n`;
    message += `💧 **Nem:** %${current.humidity}\n`;
    message += `💨 **Rüzgar:** ${current.wind_kph} km/s (${current.wind_dir})\n`;
    message += `👁️ **Görüş:** ${current.vis_km} km\n`;
    message += `🌡️ **Basınç:** ${current.pressure_mb} mb\n`;
    message += `🕐 **Son Güncelleme:** ${new Date(current.last_updated).toLocaleString('tr-TR')}`;

    return message;
  }

  /**
   * Günlük hava durumu mesajı oluştur
   */
  createDailyWeatherMessage(weatherData) {
    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) {
      return 'Üzgünüm, günlük hava durumu bilgisi alınamadı.';
    }

    const forecast = weatherData.forecast.forecastday;
    let message = `🌤️ **Elazığ 5 Günlük Hava Durumu**\n\n`;

    forecast.forEach((day, index) => {
      const date = new Date(day.date);
      const dayName = date.toLocaleDateString('tr-TR', { weekday: 'long' });
      
      message += `📅 **${dayName} (${day.date})**\n`;
      message += `🌡️ **Sıcaklık:** ${day.day.maxtemp_c}°C / ${day.day.mintemp_c}°C\n`;
      message += `☁️ **Durum:** ${day.day.condition.text}\n`;
      message += `💧 **Nem:** %${day.day.avghumidity}\n`;
      message += `💨 **Rüzgar:** ${day.day.maxwind_kph} km/s\n`;
      message += `🌧️ **Yağış Olasılığı:** %${day.day.daily_chance_of_rain}\n\n`;
    });

    return message;
  }

  /**
   * Saatlik hava durumu mesajı oluştur
   */
  createHourlyWeatherMessage(weatherData) {
    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday || !weatherData.forecast.forecastday[0]) {
      return 'Üzgünüm, saatlik hava durumu bilgisi alınamadı.';
    }

    const hourly = weatherData.forecast.forecastday[0].hour;
    let message = `🌤️ **Elazığ Saatlik Hava Durumu**\n\n`;

    // Sadece gelecek 12 saati göster
    const next12Hours = hourly.slice(0, 12);
    
    next12Hours.forEach(hour => {
      const time = new Date(hour.time);
      const timeString = time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
      
      message += `🕐 **${timeString}** - ${hour.temp_c}°C - ${hour.condition.text}\n`;
    });

    return message;
  }

  /**
   * Hava durumu emoji'si döndür
   */
  getWeatherEmoji(condition) {
    const conditionText = condition.toLowerCase();
    
    if (conditionText.includes('güneş') || conditionText.includes('açık')) {
      return '☀️';
    } else if (conditionText.includes('bulut')) {
      return '☁️';
    } else if (conditionText.includes('yağmur')) {
      return '🌧️';
    } else if (conditionText.includes('kar')) {
      return '❄️';
    } else if (conditionText.includes('fırtına')) {
      return '⛈️';
    } else if (conditionText.includes('sis')) {
      return '🌫️';
    } else {
      return '🌤️';
    }
  }

  /**
   * Hava durumu önerisi ver
   */
  getWeatherAdvice(weatherData) {
    if (!weatherData || !weatherData.current) {
      return '';
    }

    const current = weatherData.current;
    let advice = '\n\n💡 **Öneriler:**\n';

    // Sıcaklık önerileri
    if (current.temp_c > 30) {
      advice += '• Sıcak bir gün! Bol su için ve güneş kremi kullanın.\n';
    } else if (current.temp_c < 5) {
      advice += '• Soğuk bir gün! Sıcak giyinin.\n';
    }

    // Yağmur önerileri
    if (current.condition.text.toLowerCase().includes('yağmur')) {
      advice += '• Yağmur var! Şemsiye almayı unutmayın.\n';
    }

    // Rüzgar önerileri
    if (current.wind_kph > 20) {
      advice += '• Güçlü rüzgar var! Dikkatli olun.\n';
    }

    // Nem önerileri
    if (current.humidity > 80) {
      advice += '• Yüksek nem! Rahat giysiler tercih edin.\n';
    }

    return advice;
  }
}

export default new WeatherService();
