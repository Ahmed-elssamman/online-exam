import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: '',
    loadComponent: () =>
      import('../shared/components/layout/main-layout/main-layout').then((m) => m.MainLayoutComponent),
    children: [
      {
        path: 'diplomas',
        loadComponent: () => import('./features/diplomas/diplomas').then((m) => m.DiplomasComponent),
      },
      {
        path: 'exams',
        loadComponent: () => import('./features/exams/exams-list/exams-list').then((m) => m.ExamsListComponent),
      },
      {
        path: '',
        redirectTo: 'diplomas',
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', redirectTo: 'diplomas' },
];
