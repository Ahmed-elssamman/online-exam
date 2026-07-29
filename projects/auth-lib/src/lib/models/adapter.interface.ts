export interface NormalizedAuthResponse<TData = any> {
    message?: string;
    status: boolean | number;
    code: number;
    data?: TData;
}

export interface IAuthResponseAdapter<TRaw = any, TData = any> {
    adapt(raw: TRaw): NormalizedAuthResponse<TData>;
}