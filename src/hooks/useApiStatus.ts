import { useState, useEffect } from 'react';
import { checkApiStatus } from '../utils/api';

export const useApiStatus = () => {
  const [isApiReady, setIsApiReady] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const checkStatus = async () => {
    try {
      setIsChecking(true);
      const status = await checkApiStatus();
      setIsApiReady(status);
    } catch (error) {
      console.error('API check failed:', error);
      setIsApiReady(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkStatus();
    
   
    const interval = setInterval(() => {
      checkStatus();
    }, 30000); 

    return () => clearInterval(interval);
  }, [retryCount]);

  return {
    isApiReady,
    isChecking,
    retry: () => {
      setRetryCount(prev => prev + 1);
    }
  };
};