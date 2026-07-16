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
                path: 'forgot-password',
                loadComponent: () => import('./components/forgot-password/forgot-password').then(m => m.ForgotPassword)
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            }
        ]
    }
];