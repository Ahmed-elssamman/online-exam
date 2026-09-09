import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { API_CONFIG } from '@ahmed_elssamman/auth-lib';
import { MainService } from '@core/services/main-service';
import { authInterceptor } from '@core/interceptors/auth.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    MessageService,
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    {
      provide: API_CONFIG,
      useValue: {
        baseUrl: 'https://exam-app.elevate-bootcamp.cloud/api',
        clientName: 'exam-app',
      },
    },
    {
      provide: MainService,
      useFactory: () => new MainService(''),
    },
  ],
};
