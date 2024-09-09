import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";


interface PaginationProps {
  url: string;
  params?: any;
  token?: string | null;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  initialPage?: number;
  itemsPerPage?: number;
}

const usePagination = <T = any>({
  url,
  params,
  token,
  onSuccess,
  onError,
  initialPage = 1,
  itemsPerPage = 10,
}: PaginationProps) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(initialPage);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get<T[]>(url, {
        params: { ...params, page, limit: itemsPerPage },
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
  }, [url, params, page, token]);

  const nextPage = () => setPage((prevPage) => prevPage + 1);
  const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return { data, loading, error, page, nextPage, prevPage, refetch: fetchData };
};

export default usePagination;
