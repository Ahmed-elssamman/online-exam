import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageKey } from '@core/enums/main-service.enum';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(LocalStorageKey.Token);

  if (token && !req.headers.has('Authorization')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
