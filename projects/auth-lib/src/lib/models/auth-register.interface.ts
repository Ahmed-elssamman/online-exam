


export interface IAuthEmailVerificationRequest {
    email?: string;
    code?: string;
}

export interface IAuthRegisterInterface {
    username?: string;
    email: string;
    password: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    [key: string]: any;
}


