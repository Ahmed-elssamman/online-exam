export interface IAuthResetPasswordRequest {
    token?: string;
    newPassword?: string;
    confirmPassword?: string;
    code?: string;
    email?: string;
    redirectUrl?: string;
}