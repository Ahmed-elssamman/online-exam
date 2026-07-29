import { IAuthResponseAdapter, NormalizedAuthResponse } from "../models/adapter.interface";
import { IAuthResponseInterface } from "../models/auth-response.interface";

export class AuthAdapter<T = any> implements IAuthResponseAdapter<IAuthResponseInterface<T>, T> {
    constructor() {}

    adapt(response: IAuthResponseInterface<T>): NormalizedAuthResponse<T> {
        return {
            message: response?.message,
            status: response?.status,
            code: response?.code,
            data: response?.payload ?? response?.data,
        };
    }
}