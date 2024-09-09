interface PaginationProps {
    url: string;
    params?: any;
    token?: string | null;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
    initialPage?: number;
    itemsPerPage?: number;
}
declare const usePagination: <T = any>({ url, params, token, onSuccess, onError, initialPage, itemsPerPage, }: PaginationProps) => {
    data: T[];
    loading: boolean;
    error: string | null;
    page: number;
    nextPage: () => void;
    prevPage: () => void;
    refetch: () => Promise<void>;
};
export default usePagination;
