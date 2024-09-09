interface InfiniteScrollProps {
    url: string;
    params?: any;
    token?: string | null;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    itemsPerPage?: number;
}
declare const useInfiniteScroll: <T = any>({ url, params, token, onSuccess, onError, itemsPerPage, }: InfiniteScrollProps) => {
    data: T[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};
export default useInfiniteScroll;
