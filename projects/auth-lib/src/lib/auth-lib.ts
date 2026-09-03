import { inject, Injectable } from '@angular/core';
import { API_CONFIG } from './config/auth-config';
import { AuthConfig } from './models/auth-config.model';
import { HttpClient } from '@angular/common/http';
import { AUTH_ENDPOINTS } from './constants/auth-endpoints';
import { IAuthRegisterInterface } from './models/auth-register.interface';
import { IAuthLoginRequest } from './models/auth-login.model';
import { AuthAdapterService } from './adapter/auth-adapter.service';
import { map } from 'rxjs';
import { IAuthResponseInterface } from './models/auth-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthLib {
  private apiConfig = inject<AuthConfig>(API_CONFIG);
  private http = inject(HttpClient);
  private authAdapterService = inject(AuthAdapterService);

  sendEmailForVerification(email: string, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.SEND_EMAIL_VERIFICATION;
    return this.http.post(`${this.apiConfig.baseUrl}${endpoint}`, { email });
  }

  verifyEmail(userData: { email: string; code: string }, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.VERIFY_EMAIL;
    return this.http.post(`${this.apiConfig.baseUrl}${endpoint}`, userData);
  }

  register(userData: Partial<IAuthRegisterInterface>, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.REGISTER;
    return this.http.post<IAuthResponseInterface>(`${this.apiConfig.baseUrl}${endpoint}`, userData).pipe(
      map((response: IAuthResponseInterface) => this.authAdapterService.adapt(response)));
  }

  login(userData: IAuthLoginRequest, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.LOGIN;
    return this.http.post<IAuthResponseInterface>(`${this.apiConfig.baseUrl}${endpoint}`, userData).pipe(
      map((response: IAuthResponseInterface) => this.authAdapterService.adapt(response))
    );
  }

  forgotPassword(userData: { email: string, redirectUrl?: string }, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.FORGOT_PASSWORD;
    return this.http.post(`${this.apiConfig.baseUrl}${endpoint}`, userData);
  }

  resetPassword(userData: {token: string, newPassword: string, confirmPassword: string}, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.RESET_PASSWORD;
    return this.http.post(`${this.apiConfig.baseUrl}${endpoint}`, userData);
  }

  logout():string{
    localStorage.clear();
    return "You logged out successfully ,come back soon ❤️";
  }

}
