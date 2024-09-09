import { useState } from "react";

import axios from "axios";
import axiosInstance from "./axiosInstance";

interface MutationProps {
  method: "post" | "put" | "delete";
  url: string;
  data?: any;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  token?: string | null;
}

interface MutationResponse<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
  mutate: (overrideData?: any) => Promise<void>;
}

const useMutation = <T = any>({
  method,
  url,
  data,
  onSuccess,
  onError,
  token
}: MutationProps): MutationResponse<T> => {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const mutate = async (overrideData?: any) => {
    setLoading(true);
    setError(false);
    try {
      const result = await axiosInstance.request<T>({
        method,
        url,
        data: overrideData || data,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setResponseData(result.data);
      if (onSuccess) onSuccess(result.data);
    } catch (err: any) {
      setError(true);
      if (axios.isAxiosError(err) && onError) {
        onError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data: responseData, loading, error, mutate };
};

export default useMutation;
