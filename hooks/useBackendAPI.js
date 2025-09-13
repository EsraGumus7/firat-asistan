// ========================================
// USE BACKEND API HOOK - YENİ BACKEND SİSTEMİ
// ========================================

import { useCallback, useState } from 'react';
import {
    callEndpoint,
    callMultipleEndpoints,
    checkSystemHealth,
    getAllEndpoints,
    getAnnouncements,
    getCategories,
    getEvents,
    getFacultyAnnouncements,
    getFoodMenu,
    getLibrary,
    getNews
} from '../services/apiService';

// ========================================
// GENERIC API HOOK
// ========================================

export const useBackendAPI = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic endpoint çağrısı
  const callGenericEndpoint = useCallback(async (category, endpointKey, params = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Hook: ${category}/${endpointKey} çağrılıyor`);
      const result = await callEndpoint(category, endpointKey, params);
      setData(result);
      return result;
    } catch (err) {
      console.error(`Hook hatası (${category}/${endpointKey}):`, err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Sistem sağlığı kontrolü
  const checkHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await checkSystemHealth();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Tüm endpoint'leri listele
  const fetchAllEndpoints = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getAllEndpoints();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Kategorileri listele
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getCategories();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Çoklu endpoint çağrısı
  const callMultiple = useCallback(async (endpoints) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await callMultipleEndpoints(endpoints);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // State'i temizle
  const clearData = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    callGenericEndpoint,
    checkHealth,
    fetchAllEndpoints,
    fetchCategories,
    callMultiple,
    clearData
  };
};

// ========================================
// ÖZEL HOOK'LAR
// ========================================

// Yemek menüsü hook'u
export const useFoodAPI = () => {
  const [foodData, setFoodData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFoodMenu = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getFoodMenu();
      setFoodData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    foodData,
    loading,
    error,
    fetchFoodMenu
  };
};

// Etkinlikler hook'u
export const useEventsAPI = () => {
  const [eventsData, setEventsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getEvents();
      setEventsData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    eventsData,
    loading,
    error,
    fetchEvents
  };
};

// Duyurular hook'u
export const useAnnouncementsAPI = () => {
  const [announcementsData, setAnnouncementsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnnouncements = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getAnnouncements();
      setAnnouncementsData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    announcementsData,
    loading,
    error,
    fetchAnnouncements
  };
};

// Haberler hook'u
export const useNewsAPI = () => {
  const [newsData, setNewsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getNews();
      setNewsData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    newsData,
    loading,
    error,
    fetchNews
  };
};

// Kütüphane hook'u
export const useLibraryAPI = () => {
  const [libraryData, setLibraryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLibrary = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getLibrary();
      setLibraryData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    libraryData,
    loading,
    error,
    fetchLibrary
  };
};

// Fakülte duyuruları hook'u
export const useFacultyAnnouncementsAPI = () => {
  const [facultyData, setFacultyData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFacultyAnnouncements = useCallback(async (endpointKey) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getFacultyAnnouncements(endpointKey);
      setFacultyData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    facultyData,
    loading,
    error,
    fetchFacultyAnnouncements
  };
}; 