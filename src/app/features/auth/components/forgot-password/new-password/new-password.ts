import { Component, computed, inject, signal } from '@angular/core';
import { form, minLength, required } from '@angular/forms/signals';
import { NewPasswordData } from './new-password.model';
import { CustomFormFieldConfig } from '@shared/components/ui/form-field/form-field.model';
import { CustomFormField } from '@shared/components/ui/form-field/form-field';
import { SiteBtn } from '@shared/components/ui/site-btn/site-btn';
import { newPasswordConfig } from '@core/constants/forgot-password';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthLib } from '@ahmed_elssamman/auth-lib';

@Component({
  selector: 'app-new-password',
  imports: [CustomFormField, SiteBtn ,RouterLink],
  templateUrl: './new-password.html',
  styles: ``,
})
export class NewPassword {
  private activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  authLib = new AuthLib();

  token = signal<string | null>(this.activatedRoute.snapshot.queryParamMap.get('token'));
  newPassData = signal(newPasswordConfig)
  newPasswordModel = signal<NewPasswordData>({ password: '', confirmPassword: '' });
  newPasswordForm = form(this.newPasswordModel, (path) => {
    required(path.password, { message: 'Your password is required' });
    minLength(path.password, 8, { message: 'Password must be at least 8 characters' });
    required(path.confirmPassword, { message: 'Your confirm password is required' });
    minLength(path.confirmPassword, 8, { message: 'Confirm password must be at least 8 characters' });
  });
  passwordMatch = computed(() => {
    return this.newPasswordForm().value().password === this.newPasswordForm().value().confirmPassword;
  })

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

  onSubmit(event: Event) {
    event.preventDefault();
    this.authLib.resetPassword({
      token: this.token()!,
      newPassword: this.newPasswordForm().value().password,
      confirmPassword: this.newPasswordForm().value().confirmPassword,
    }).subscribe((response) => {
      this.router.navigate(['/auth/login']);
    });
  }
}
