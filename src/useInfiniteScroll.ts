import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";


interface InfiniteScrollProps {
  url: string;
  params?: any;
  token?: string | null;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  itemsPerPage?: number;
}

const useInfiniteScroll = <T = any>({
  url,
  params,
  token,
  onSuccess,
  onError,
  itemsPerPage = 10,
}: InfiniteScrollProps) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get<T[]>(url, {
        params: { ...params, page, limit: itemsPerPage },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setData((prevData) => [...prevData, ...response.data]); 
      if (onSuccess) onSuccess(response.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchData();
  }, [page, url, params, token]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { data, loading, error, refetch: fetchData };
};

export default useInfiniteScroll;
