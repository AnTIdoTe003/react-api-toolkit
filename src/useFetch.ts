import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";


interface FetchProps {
  url: string;
  params?: any;
  token?: string | null;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useFetch = <T = any>({
  url,
  params,
  token,
  onSuccess,
  onError,
}: FetchProps): FetchResponse<T> => {
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
    fetchData();
  }, [url, params, token]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
