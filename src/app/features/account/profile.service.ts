import { Injectable } from '@angular/core';
import { MainService } from '@core/services/main-service';
import { Observable } from 'rxjs';
import { ChangePasswordDto, ProfileResponse, UpdateProfileDto, UserProfile } from './profile/profile.model';
export * from './profile/profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends MainService {
  constructor() {
    super('users/profile');
  }

  getProfile(): Observable<ProfileResponse> {
    return this.httpClient.get<ProfileResponse>(`${this.baseUrl}/users/profile`);
  }

  updateProfile(data: UpdateProfileDto): Observable<any> {
    return this.update(data);
  }

  changePassword(data: ChangePasswordDto): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/users/change-password`, data);
  }

  sendResetPasswordEmail(data: { newEmail: string }): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/users/email/request`, data);
  }

  confirmEmail(data: { newEmail: string; code?: string; otp?: string }): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/users/email/confirm`, data);
  }

  deleteAccount(): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/users/account`);
  }
}