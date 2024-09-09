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
declare const useFetch: <T = any>({ url, params, token, onSuccess, onError, }: FetchProps) => FetchResponse<T>;
export default useFetch;
