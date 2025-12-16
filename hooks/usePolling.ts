import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

interface UsePollingOptions<T> {
  recordId: string | undefined;
  enabled?: boolean;
  interval?: number;
  maxAttempts?: number;
  checkFn: (data: any) => T | null;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onTimeout?: () => void;
}

export function usePolling<T>({
  recordId,
  enabled = true,
  interval = 2000,
  maxAttempts = 60,
  checkFn,
  onSuccess,
  onError,
  onTimeout,
}: UsePollingOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pollCountRef = useRef(0);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!recordId || !enabled) {
      setIsLoading(false);
      return;
    }

    pollCountRef.current = 0;
    setIsLoading(true);
    setError(null);
    setData(null);

    const fetchData = async () => {
      try {
        pollCountRef.current++;
        const result = await axios.get(
          `/api/history?recordId=${recordId}&t=${Date.now()}`
        );

        const checkedData = checkFn(result.data);

        if (checkedData !== null) {
          setData(checkedData);
          setIsLoading(false);
          setError(null);
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
          onSuccess?.(checkedData);
          return true;
        }

        if (pollCountRef.current >= maxAttempts) {
          setIsLoading(false);
          const timeoutError = 'Request is taking longer than expected. Please refresh the page.';
          setError(timeoutError);
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
          onTimeout?.();
          return true;
        }

        return false;
      } catch (err: any) {
        console.error('Polling error:', err);
        if (pollCountRef.current >= maxAttempts) {
          setIsLoading(false);
          const errorMsg = 'Failed to fetch data. Please refresh the page.';
          setError(errorMsg);
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
          onError?.(err);
          return true;
        }
        return false;
      }
    };

    fetchData();

    intervalIdRef.current = setInterval(async () => {
      const isDone = await fetchData();
      if (isDone && intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    }, interval);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [recordId, enabled, interval, maxAttempts]);

  return { data, isLoading, error };
}

