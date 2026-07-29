import { Routes } from "@angular/router";

export const authRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./auth').then(m => m.Auth),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./components/login/login').then(m => m.Login)
            },

            {
                path: 'register',
                loadComponent: () => import('./components/register/register').then(m => m.Register)
            },
            {
                path: 'forgot-password',
                loadComponent: () => import('./components/forgot-password/forgot-password').then(m => m.ForgotPassword),
                children: [
                    {
                        path: 'sent-otp',
                        loadComponent: () => import('./components/forgot-password/sent-otp/sent-otp').then(m => m.SentOtp)
                    },
                    {
                        path: 'new-password',
                        loadComponent: () => import('./components/forgot-password/new-password/new-password').then(m => m.NewPassword)
                    },
                    {
                        path: '',
                        redirectTo: 'sent-otp',
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: 'sent-otp',
                loadComponent: () => import('./components/forgot-password/sent-otp/sent-otp').then(m => m.SentOtp)
            },
            {
                path: 'new-password',
                loadComponent: () => import('./components/forgot-password/new-password/new-password').then(m => m.NewPassword)
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    }
];
