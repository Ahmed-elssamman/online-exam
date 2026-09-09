
export interface UserProfile {
    id?: string;
    username?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    profilePhoto?: string;
    emailVerified?: boolean;
    phoneVerified?: boolean;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProfileResponse {
    message?: string;
    user?: UserProfile;
}

export interface UpdateProfileDto {
    firstName: string;
    lastName: string;
    profilePhoto?: string;
    phone: string;
}

export interface ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
