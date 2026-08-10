import { Injectable } from "@angular/core";
import { IAuthResponseAdapter, NormalizedAuthResponse } from "../models/adapter.interface";
import { IAuthResponseInterface } from "../models/auth-response.interface";

@Injectable({
    providedIn: "root",
})
export class AuthAdapterService implements IAuthResponseAdapter {
    adapt(response: IAuthResponseInterface): NormalizedAuthResponse {
        return {
            message: response?.message,
            status: response?.status,
            code: response?.code,
            token: response?.payload?.token,
            user: {
                email: response?.payload?.user?.email,
                username: response?.payload?.user?.username,
                role: response?.payload?.user?.role,
                emailVerified: response?.payload?.user?.emailVerified,
            },
        };
    }
}