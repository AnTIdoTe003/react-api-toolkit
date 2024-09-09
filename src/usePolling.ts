import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";


interface PollingProps {
  url: string;
  params?: any;
  token?: string | null;
  interval?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

const usePolling = <T = any>({
  url,
  params,
  token,
  interval = 5000,
  onSuccess,
  onError,
}: PollingProps) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<T>(url, {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setData(response.data);
      if (onSuccess) onSuccess(response.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, interval);
    return () => clearInterval(intervalId); 
  }, [url, params, token, interval]);

  return { data, loading, error, refetch: fetchData };
};

export default usePolling;
