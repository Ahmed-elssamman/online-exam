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
        path: 'exams/:id',
        loadComponent: () => import('./features/exams/exams-list/exams-list').then((m) => m.ExamsListComponent),
      },
      {
        path: 'exam/details/:examid',
        loadComponent: () => import('./features/exams/exam-details/online-exam').then((m) => m.OnlineExam),
      },
      {
        path: 'exam/review/:submissionId',
        loadComponent: () => import('./features/exams/exam-review/exam-review').then((m) => m.ExamReview),
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
