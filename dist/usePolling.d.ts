interface PollingProps {
    url: string;
    params?: any;
    token?: string | null;
    interval?: number;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}
declare const usePolling: <T = any>({ url, params, token, interval, onSuccess, onError, }: PollingProps) => {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
};
export default usePolling;
