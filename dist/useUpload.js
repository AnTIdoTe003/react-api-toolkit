var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from "react";
import axios from "axios";
import axiosInstance from "./axiosInstance";
const useUploadFile = ({ url, files, additionalData = {}, onSuccess, onError, onProgress, token, }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [abortController, setAbortController] = useState(null);
    const uploadFile = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setError(null);
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file)); // Multiple files
        Object.keys(additionalData).forEach((key) => formData.append(key, additionalData[key]));
        const controller = new AbortController();
        setAbortController(controller);
        try {
            const response = yield axiosInstance.post(url, formData, {
                headers: Object.assign({ "Content-Type": "multipart/form-data" }, (token ? { Authorization: `Bearer ${token}` } : {})),
                signal: controller.signal,
                onUploadProgress: (progressEvent) => {
                    if (onProgress)
                        onProgress(progressEvent);
                },
            });
            if (onSuccess)
                onSuccess(response.data);
        }
        catch (err) {
            if (axios.isCancel(err)) {
                console.log("Upload canceled");
            }
            else {
                setError(err.message || "Something went wrong");
                if (onError)
                    onError(err);
            }
        }
        finally {
            setLoading(false);
        }
    });
    const cancelUpload = () => {
        if (abortController) {
            abortController.abort();
        }
    };
    return { loading, error, uploadFile, cancelUpload };
};
export default useUploadFile;
//# sourceMappingURL=useUpload.js.map