import { useEffect, useState } from 'react';

/**
 * Network Status Hook - İnternet bağlantı durumunu takip eder
 * Basit fetch ile network kontrolü yapar
 */
export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState('unknown');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkNetworkStatus = async () => {
      try {
        setIsLoading(true);
        
        // Basit network kontrolü - fetch ile test
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 saniye timeout
        
        await fetch('https://www.google.com', {
          method: 'HEAD',
          mode: 'no-cors',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (isMounted) {
          setIsConnected(true);
          setConnectionType('internet');
          setIsLoading(false);
        }
      } catch (error) {
        console.warn('Network status check error:', error.message);
        if (isMounted) {
          setIsConnected(false);
          setConnectionType('unknown');
          setIsLoading(false);
        }
      }
    };

    // İlk kontrol
    checkNetworkStatus();

    // Periyodik kontrol (her 10 saniyede bir)
    const interval = setInterval(checkNetworkStatus, 10000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Manuel kontrol fonksiyonu
  const checkConnection = async () => {
    try {
      setIsLoading(true);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      await fetch('https://www.google.com', {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      setIsConnected(true);
      setConnectionType('internet');
      setIsLoading(false);
      return true;
    } catch (error) {
      console.warn('Manual network check error:', error.message);
      setIsConnected(false);
      setConnectionType('unknown');
      setIsLoading(false);
      return false;
    }
  };

  return {
    isConnected,
    connectionType,
    isLoading,
    checkConnection
  };
};

export default useNetworkStatus;
