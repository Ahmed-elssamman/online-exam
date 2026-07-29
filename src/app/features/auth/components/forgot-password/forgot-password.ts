import { Component, signal } from '@angular/core';
import { email, form, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { forgotPasswordConfig } from '@core/constants/forgot-password';
import { CustomFormField } from '@shared/components/ui/form-field/form-field';
import { CustomFormFieldConfig } from '@shared/components/ui/form-field/form-field.model';
import { SiteBtn } from '@shared/components/ui/site-btn/site-btn';
import { AuthLib } from 'auth-lib';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, CustomFormField, SiteBtn],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  forgotData = signal(forgotPasswordConfig)
  authLib = new AuthLib();

  email = signal<string | null>(null);
  redirectUrl = signal<string>(`${environment.redirectUrl}/auth/new-password`);
  forgotPasswordModel = signal({ email: '' });
  forgotPasswordForm = form(this.forgotPasswordModel, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Please enter a valid email' });
  });

  emailConfig: CustomFormFieldConfig = {
    label: 'Email',
    placeholder: 'user@example.com',
    type: 'email',
  };

  onSubmit(event: Event) {
    event.preventDefault();
    this.email.set(this.forgotPasswordForm.email().value());
    this.authLib.forgotPassword({ email: this.forgotPasswordForm.email().value(), redirectUrl: this.redirectUrl() }).subscribe();
  }
}
