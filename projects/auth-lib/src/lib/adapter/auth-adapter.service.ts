import { Injectable } from "@angular/core";
import { IAuthResponseAdapter, NormalizedAuthResponse } from "../models/adapter.interface";
import { IAuthResponseInterface } from "../models/auth-response.interface";

interface AuthAdapterUser {
    email?: string;
    username?: string;
    role?: string;
    emailVerified?: boolean;
}

interface AuthAdapterPayload {
    token?: string;
    user?: AuthAdapterUser;
}

@Injectable({
    providedIn: "root",
})
export class AuthAdapterService implements IAuthResponseAdapter {
    adapt(response: IAuthResponseInterface): NormalizedAuthResponse {
        const payload = this.resolvePayload(response);
        const user = payload.user;

        return {
            message: response?.message,
            status: typeof response?.status === "boolean" || typeof response?.status === "number" ? response.status : true,
            code: typeof response?.code === "number" ? response.code : 200,
            token: payload.token,
            user: {
                email: user?.email,
                username: user?.username,
                role: user?.role,
                emailVerified: user?.emailVerified,
            },
        };
    }

    private resolvePayload(response: IAuthResponseInterface): AuthAdapterPayload {
        const wrappedPayload = response?.payload;

        if (wrappedPayload && typeof wrappedPayload === "object") {
            return wrappedPayload as AuthAdapterPayload;
        }

        const token = response["token"];
        const user = response["user"];
        const payload: AuthAdapterPayload = {
            user: user && typeof user === "object" ? user as AuthAdapterUser : {},
        };

        if (typeof token === "string") {
            payload.token = token;
        }

        return payload;
    }
}
