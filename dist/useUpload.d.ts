import { AxiosProgressEvent } from "axios";
interface UploadFileProps {
    url: string;
    files: File[];
    additionalData?: Record<string, any>;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
    onProgress?: (progressEvent: AxiosProgressEvent) => void;
    token?: string | null;
}
declare const useUploadFile: ({ url, files, additionalData, onSuccess, onError, onProgress, token, }: UploadFileProps) => {
    loading: boolean;
    error: string | null;
    uploadFile: () => Promise<void>;
    cancelUpload: () => void;
};
export default useUploadFile;
