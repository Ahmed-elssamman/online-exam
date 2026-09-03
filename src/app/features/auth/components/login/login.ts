import { Component, inject, signal } from '@angular/core';
import { form, minLength, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { CustomFormField } from '@shared/components/ui/form-field/form-field';
import { CustomFormFieldConfig } from '@shared/components/ui/form-field/form-field.model';
import { SiteBtn } from '@shared/components/ui/site-btn/site-btn';
import { LoginData } from './login.model';
import { AuthLib } from '@ahmed_elssamman/auth-lib';
import { Router } from '@angular/router';
import { MainService } from '@core/services/main-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CustomFormField, SiteBtn],
  templateUrl: './login.html',
})
export class Login {
  authLib = inject(AuthLib);
  private router = inject(Router);
  private mainService = inject(MainService);

  loginModel = signal<LoginData>({ username: '', password: '' });
  loginForm = form(this.loginModel, (path) => {
    required(path.username, { message: 'Your username is required' });
    minLength(path.username, 3, { message: 'Username must be at least 3 characters' });
    required(path.password, { message: 'Your password is required' });
    minLength(path.password, 8, { message: 'Password must be at least 8 characters' });
  });

  usernameConfig: CustomFormFieldConfig = {
    label: 'username',
    placeholder: 'Enter your username',
    type: 'text',
  };

  passwordConfig: CustomFormFieldConfig = {
    label: 'password',
    placeholder: 'Enter your password',
    type: 'password',
  };

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.authLib.login(this.loginForm().value()).subscribe((response) => {
      this.mainService.setSession(response.token ?? null, response.user ?? null);
      this.router.navigate(['/']);
    });
  }
}
