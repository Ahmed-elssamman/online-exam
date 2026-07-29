import { IAuthResponseInterface } from "./auth-response.interface";

export interface NormalizedAuthResponse<TData = any> {
    message?: string;
    status: boolean | number;
    code: number;
    token?: string;
    user?: TData;
}

export interface IAuthResponseAdapter {
    adapt(raw: IAuthResponseInterface<any>): NormalizedAuthResponse<any>;
}