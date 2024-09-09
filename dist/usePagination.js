var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";
const usePagination = ({ url, params, token, onSuccess, onError, initialPage = 1, itemsPerPage = 10, }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(initialPage);
    const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        setError(null);
        try {
            const response = yield axiosInstance.get(url, {
                params: Object.assign(Object.assign({}, params), { page, limit: itemsPerPage }),
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            setData(response.data);
            if (onSuccess)
                onSuccess(response.data);
        }
        catch (err) {
            setError(err.message || "Something went wrong");
            if (onError)
                onError(err);
        }
        finally {
            setLoading(false);
        }
    });
    useEffect(() => {
        fetchData();
    }, [url, params, page, token]);
    const nextPage = () => setPage((prevPage) => prevPage + 1);
    const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));
    return { data, loading, error, page, nextPage, prevPage, refetch: fetchData };
};
export default usePagination;
//# sourceMappingURL=usePagination.js.map