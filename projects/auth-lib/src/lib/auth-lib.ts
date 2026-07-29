import { Component, inject } from '@angular/core';
import { API_CONFIG } from './config/auth-config';
import { AuthConfig } from './models/auth-config.model';
import { HttpClient } from '@angular/common/http';
import { AUTH_ENDPOINTS } from './constants/auth-endpoints';
import { IAuthRegisterInterface } from './models/auth-register.interface';
import { IAuthLoginRequest } from './models/auth-login.model';
import { IAuthResetPasswordRequest } from './models/auth-resetPassword.model';
import { AuthAdapterService } from './adapter/auth-adapter.service';
import { map } from 'rxjs';
import { IAuthResponseInterface } from './models/auth-response.interface';

@Component({
  selector: 'lib-auth-lib',
  imports: [],
  template: ` <p>auth-lib works!</p> `,
  styles: ``,
})
export class AuthLib {
  private readonly api_config = inject<AuthConfig>(API_CONFIG);
  private readonly http = inject(HttpClient);
  private readonly AuthAdapterService = inject(AuthAdapterService);

  sendEmailForVerification(email: string, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.SEND_EMAIL_VERIFICATION;
    return this.http.post(`${this.api_config.baseUrl}${endpoint}`, { email });
  }

  verifyEmail(userData: { email: string; code: string }, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.VERIFY_EMAIL;
    return this.http.post(`${this.api_config.baseUrl}${endpoint}`, userData);
  }

  register(userData: Partial<IAuthRegisterInterface>, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.REGISTER;
    return this.http.post<IAuthResponseInterface>(`${this.api_config.baseUrl}${endpoint}`, userData).pipe(
      map((response: IAuthResponseInterface) => this.AuthAdapterService.adapt(response)));
  }

  login(userData: IAuthLoginRequest, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.LOGIN;
    return this.http.post<IAuthResponseInterface>(`${this.api_config.baseUrl}${endpoint}`, userData).pipe(
      map((response: IAuthResponseInterface) => this.AuthAdapterService.adapt(response))
    );
  }

  forgotPassword(userData: { email: string, redirectUrl?: string }, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.FORGOT_PASSWORD;
    return this.http.post(`${this.api_config.baseUrl}${endpoint}`, userData);
  }

  resetPassword(userData: {token: string, newPassword: string, confirmPassword: string}, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.RESET_PASSWORD;
    return this.http.post(`${this.api_config.baseUrl}${endpoint}`, userData);
  }

}
