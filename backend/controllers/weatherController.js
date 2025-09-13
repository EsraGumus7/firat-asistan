const axios = require('axios');

/**
 * Hava Durumu Controller
 * Elazığ'ın günlük ve saatlik hava durumu verilerini sağlar
 */
class WeatherController {
  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
    this.baseUrl = process.env.WEATHER_API_URL;
    this.elazigCoords = process.env.ELAZIG_COORDINATES || '39.9208,39.1875';
    
    console.log('🌤️ WeatherController başlatılıyor...');
    console.log('🔑 WEATHER_API_KEY:', this.apiKey ? 'Mevcut' : 'Bulunamadı');
    console.log('🌐 WEATHER_API_URL:', this.baseUrl);
    
    if (!this.apiKey) {
      console.error('❌ WEATHER_API_KEY environment variable bulunamadı');
    }
  }

  /**
   * Elazığ'ın günlük hava durumu (5 günlük tahmin)
   */
  async getDailyWeather(req, res) {
    try {
      console.log('🌤️ Günlük hava durumu isteği alındı');

      if (!this.apiKey) {
        return res.status(500).json({
          success: false,
          error: 'Hava durumu servisi yapılandırılmamış'
        });
      }

      const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=Elazig&days=5&lang=tr`;
      
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Firat-University-Assistant/1.0'
        }
      });

      const weatherData = response.data;

      // Sadece gerekli verileri döndür
      const dailyForecast = weatherData.forecast.forecastday.map(day => ({
        date: day.date,
        day: {
          maxtemp_c: day.day.maxtemp_c,
          maxtemp_f: day.day.maxtemp_f,
          mintemp_c: day.day.mintemp_c,
          mintemp_f: day.day.mintemp_f,
          avgtemp_c: day.day.avgtemp_c,
          avgtemp_f: day.day.avgtemp_f,
          condition: {
            text: day.day.condition.text,
            icon: day.day.condition.icon,
            code: day.day.condition.code
          },
          maxwind_kph: day.day.maxwind_kph,
          maxwind_mph: day.day.maxwind_mph,
          totalprecip_mm: day.day.totalprecip_mm,
          totalprecip_in: day.day.totalprecip_in,
          avgvis_km: day.day.avgvis_km,
          avgvis_miles: day.day.avgvis_miles,
          avghumidity: day.day.avghumidity,
          daily_will_it_rain: day.day.daily_will_it_rain,
          daily_chance_of_rain: day.day.daily_chance_of_rain,
          daily_will_it_snow: day.day.daily_will_it_snow,
          daily_chance_of_snow: day.day.daily_chance_of_snow
        },
        astro: {
          sunrise: day.astro.sunrise,
          sunset: day.astro.sunset,
          moonrise: day.astro.moonrise,
          moonset: day.astro.moonset,
          moon_phase: day.astro.moon_phase,
          moon_illumination: day.astro.moon_illumination
        }
      }));

      console.log('✅ Günlük hava durumu başarıyla alındı');

      res.json({
        success: true,
        location: {
          name: weatherData.location.name,
          region: weatherData.location.region,
          country: weatherData.location.country,
          lat: weatherData.location.lat,
          lon: weatherData.location.lon,
          tz_id: weatherData.location.tz_id,
          localtime: weatherData.location.localtime
        },
        forecast: dailyForecast,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Günlük hava durumu hatası:', error.message);
      
      res.status(500).json({
        success: false,
        error: 'Hava durumu verisi alınamadı',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Elazığ'ın saatlik hava durumu (24 saat)
   */
  async getHourlyWeather(req, res) {
    try {
      console.log('🌤️ Saatlik hava durumu isteği alındı');

      if (!this.apiKey) {
        return res.status(500).json({
          success: false,
          error: 'Hava durumu servisi yapılandırılmamış'
        });
      }

      const url = `${this.baseUrl}/forecast.json?key=${this.apiKey}&q=Elazig&days=1&lang=tr`;
      
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Firat-University-Assistant/1.0'
        }
      });

      const weatherData = response.data;

      // Sadece gerekli verileri döndür
      const hourlyForecast = weatherData.forecast.forecastday[0].hour.map(hour => ({
        time: hour.time,
        temp_c: hour.temp_c,
        temp_f: hour.temp_f,
        condition: {
          text: hour.condition.text,
          icon: hour.condition.icon,
          code: hour.condition.code
        },
        wind_kph: hour.wind_kph,
        wind_mph: hour.wind_mph,
        wind_dir: hour.wind_dir,
        pressure_mb: hour.pressure_mb,
        pressure_in: hour.pressure_in,
        precip_mm: hour.precip_mm,
        precip_in: hour.precip_in,
        humidity: hour.humidity,
        cloud: hour.cloud,
        feelslike_c: hour.feelslike_c,
        feelslike_f: hour.feelslike_f,
        windchill_c: hour.windchill_c,
        windchill_f: hour.windchill_f,
        heatindex_c: hour.heatindex_c,
        heatindex_f: hour.heatindex_f,
        dewpoint_c: hour.dewpoint_c,
        dewpoint_f: hour.dewpoint_f,
        will_it_rain: hour.will_it_rain,
        chance_of_rain: hour.chance_of_rain,
        will_it_snow: hour.will_it_snow,
        chance_of_snow: hour.chance_of_snow,
        vis_km: hour.vis_km,
        vis_miles: hour.vis_miles
      }));

      console.log('✅ Saatlik hava durumu başarıyla alındı');

      res.json({
        success: true,
        location: {
          name: weatherData.location.name,
          region: weatherData.location.region,
          country: weatherData.location.country,
          lat: weatherData.location.lat,
          lon: weatherData.location.lon,
          tz_id: weatherData.location.tz_id,
          localtime: weatherData.location.localtime
        },
        current: {
          temp_c: weatherData.current.temp_c,
          temp_f: weatherData.current.temp_f,
          condition: {
            text: weatherData.current.condition.text,
            icon: weatherData.current.condition.icon,
            code: weatherData.current.condition.code
          },
          wind_kph: weatherData.current.wind_kph,
          wind_mph: weatherData.current.wind_mph,
          wind_dir: weatherData.current.wind_dir,
          pressure_mb: weatherData.current.pressure_mb,
          pressure_in: weatherData.current.pressure_in,
          precip_mm: weatherData.current.precip_mm,
          precip_in: weatherData.current.precip_in,
          humidity: weatherData.current.humidity,
          cloud: weatherData.current.cloud,
          feelslike_c: weatherData.current.feelslike_c,
          feelslike_f: weatherData.current.feelslike_f,
          vis_km: weatherData.current.vis_km,
          vis_miles: weatherData.current.vis_miles,
          uv: weatherData.current.uv,
          gust_kph: weatherData.current.gust_kph,
          gust_mph: weatherData.current.gust_mph
        },
        hourly: hourlyForecast,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Saatlik hava durumu hatası:', error.message);
      
      res.status(500).json({
        success: false,
        error: 'Hava durumu verisi alınamadı',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Elazığ'ın mevcut hava durumu
   */
  async getCurrentWeather(req, res) {
    try {
      console.log('🌤️ Mevcut hava durumu isteği alındı');
      console.log('🔑 API Key kontrolü:', this.apiKey ? 'Mevcut' : 'Bulunamadı');
      console.log('📡 Request URL:', req.url);
      console.log('📡 Request Method:', req.method);

      if (!this.apiKey) {
        console.error('❌ WEATHER_API_KEY bulunamadı!');
        return res.status(500).json({
          success: false,
          error: 'Hava durumu servisi yapılandırılmamış'
        });
      }

      const url = `${this.baseUrl}/current.json?key=${this.apiKey}&q=Elazig&lang=tr`;
      
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Firat-University-Assistant/1.0'
        }
      });

      const weatherData = response.data;

      console.log('✅ Mevcut hava durumu başarıyla alındı');

      res.json({
        success: true,
        location: {
          name: weatherData.location.name,
          region: weatherData.location.region,
          country: weatherData.location.country,
          lat: weatherData.location.lat,
          lon: weatherData.location.lon,
          tz_id: weatherData.location.tz_id,
          localtime: weatherData.location.localtime
        },
        current: {
          temp_c: weatherData.current.temp_c,
          temp_f: weatherData.current.temp_f,
          condition: {
            text: weatherData.current.condition.text,
            icon: weatherData.current.condition.icon,
            code: weatherData.current.condition.code
          },
          wind_kph: weatherData.current.wind_kph,
          wind_mph: weatherData.current.wind_mph,
          wind_dir: weatherData.current.wind_dir,
          pressure_mb: weatherData.current.pressure_mb,
          pressure_in: weatherData.current.pressure_in,
          precip_mm: weatherData.current.precip_mm,
          precip_in: weatherData.current.precip_in,
          humidity: weatherData.current.humidity,
          cloud: weatherData.current.cloud,
          feelslike_c: weatherData.current.feelslike_c,
          feelslike_f: weatherData.current.feelslike_f,
          vis_km: weatherData.current.vis_km,
          vis_miles: weatherData.current.vis_miles,
          uv: weatherData.current.uv,
          gust_kph: weatherData.current.gust_kph,
          gust_mph: weatherData.current.gust_mph
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('❌ Mevcut hava durumu hatası:', error.message);
      
      res.status(500).json({
        success: false,
        error: 'Hava durumu verisi alınamadı',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
}

module.exports = new WeatherController();
