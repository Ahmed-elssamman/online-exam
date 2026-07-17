import { Component, signal } from '@angular/core';
import { form, minLength, required } from '@angular/forms/signals';
import { NewPasswordData } from './new-password.model';
import { CustomFormFieldConfig } from '@shared/components/ui/form-field/form-field.model';
import { CustomFormField } from '@shared/components/ui/form-field/form-field';
import { SiteBtn } from '@shared/components/ui/site-btn/site-btn';
import { newPasswordConfig } from '@core/constants/forgot-password';

@Component({
  selector: 'app-new-password',
  imports: [CustomFormField, SiteBtn],
  templateUrl: './new-password.html',
  styles: ``,
})
export class NewPassword {
  newPassData = signal(newPasswordConfig)
  newPasswordModel = signal<NewPasswordData>({ password: '', confirmPassword: '' });
  newPasswordForm = form(this.newPasswordModel, (path) => {
    required(path.password, { message: 'Your password is required' });
    minLength(path.password, 8, { message: 'Password must be at least 8 characters' });
    required(path.confirmPassword, { message: 'Your confirm password is required' });
    minLength(path.confirmPassword, 8, { message: 'Confirm password must be at least 8 characters' });
  });

  passwordConfig: CustomFormFieldConfig = {
    label: 'new password',
    placeholder: 'Enter your new password',
    type: 'password',
  };

  confirmPasswordConfig: CustomFormFieldConfig = {
    label: 'confirm new password',
    placeholder: 'Enter your confirm new password',
    type: 'password',
  };

  onSubmit(event: SubmitEvent) {

  }
}
