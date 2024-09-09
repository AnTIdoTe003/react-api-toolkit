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
declare const useMutation: <T = any>({ method, url, data, onSuccess, onError, token }: MutationProps) => MutationResponse<T>;
export default useMutation;
