import { Component, signal } from '@angular/core';
import { email, form, required, submit } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { forgotPasswordConfig } from '@core/constants/forgot-password';
import { CustomFormField } from '@shared/components/ui/form-field/form-field';
import { CustomFormFieldConfig } from '@shared/components/ui/form-field/form-field.model';
import { SiteBtn } from '@shared/components/ui/site-btn/site-btn';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink, CustomFormField, SiteBtn],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  forgotData = signal(forgotPasswordConfig)
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

  async onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.forgotPasswordForm.email().markAsTouched();
    await submit(this.forgotPasswordForm, async () => undefined);
  }
}
