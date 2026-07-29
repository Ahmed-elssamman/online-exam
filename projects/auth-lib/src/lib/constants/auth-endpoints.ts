export const AUTH_ENDPOINTS = {
    SEND_EMAIL_VERIFICATION: '/auth/send-email-verification',
    VERIFY_EMAIL: '/auth/confirm-email-verification ',
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
} as const;