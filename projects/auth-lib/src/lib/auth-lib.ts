import { Component, inject } from '@angular/core';
import { API_CONFIG } from './config/auth-config';
import { AuthConfig } from './models/auth-config.model';
import { HttpClient } from '@angular/common/http';
import { AUTH_ENDPOINTS } from './constants/auth-endpoints';
import { IAuthRegisterInterface } from './models/auth-register.interface';
import { IAuthLoginRequest } from './models/auth-login.model';
import { IAuthResetPasswordRequest } from './models/auth-resetPassword.model';

@Component({
  selector: 'lib-auth-lib',
  imports: [],
  template: ` <p>auth-lib works!</p> `,
  styles: ``,
})
export class AuthLib {
  private readonly api_config = inject<AuthConfig>(API_CONFIG);
  private readonly http = inject(HttpClient);

  sendEmailForVerification(email: string, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.SEND_EMAIL_VERIFICATION;
    return this.http.post(`${this.api_config.baseUrl}${endpoint}`, { email });
  }

  verifyEmail(token: string, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.VERIFY_EMAIL;
    return this.http.post(`${this.api_config.baseUrl}${endpoint}`, { token });
  }

  register(user: IAuthRegisterInterface, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.REGISTER;
    return this.http.post(`${this.api_config.baseUrl}${endpoint}`, user);
  }

  login(user: IAuthLoginRequest, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.LOGIN;
    return this.http.post(`${this.api_config.baseUrl}${endpoint}`, user);
  }

  forgotPassword(user: IAuthResetPasswordRequest, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.FORGOT_PASSWORD;
    return this.http.post(`${this.api_config.baseUrl}${endpoint}`, user);
  }

  resetPassword(user: IAuthResetPasswordRequest, customEndpoint?: string) {
    const endpoint = customEndpoint ? customEndpoint : AUTH_ENDPOINTS.RESET_PASSWORD;
    return this.http.post(`${this.api_config.baseUrl}${endpoint}`, user);
  }

}
