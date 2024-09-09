import { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import axiosInstance from "./axiosInstance";


interface UploadFileProps {
  url: string;
  files: File[];
  additionalData?: Record<string, any>;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  onProgress?: (progressEvent: AxiosProgressEvent) => void;
  token?: string | null;
}

const useUploadFile = ({
  url,
  files,
  additionalData = {},
  onSuccess,
  onError,
  onProgress,
  token,
}: UploadFileProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<AbortController | null>(null);

  const uploadFile = async () => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file)); // Multiple files
    Object.keys(additionalData).forEach((key) => formData.append(key, additionalData[key]));

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        signal: controller.signal,
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          if (onProgress) onProgress(progressEvent); 
        },
      });

      if (onSuccess) onSuccess(response.data);
    } catch (err: any) {
      if (axios.isCancel(err)) {
        console.log("Upload canceled");
      } else {
        setError(err.message || "Something went wrong");
        if (onError) onError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelUpload = () => {
    if (abortController) {
      abortController.abort();
    }
  };

  return { loading, error, uploadFile, cancelUpload };
};

export default useUploadFile;
