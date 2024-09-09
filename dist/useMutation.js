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
const useMutation = ({ method, url, data, onSuccess, onError, token }) => {
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const mutate = (overrideData) => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setError(false);
        try {
            const result = yield axiosInstance.request({
                method,
                url,
                data: overrideData || data,
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            setResponseData(result.data);
            if (onSuccess)
                onSuccess(result.data);
        }
        catch (err) {
            setError(true);
            if (axios.isAxiosError(err) && onError) {
                onError(err);
            }
        }
        finally {
            setLoading(false);
        }
    });
    return { data: responseData, loading, error, mutate };
};
export default useMutation;
//# sourceMappingURL=useMutation.js.map