import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideDiamond } from '@lucide/angular';
import { InputOtpModule } from 'primeng/inputotp';
import { PasswordModule } from 'primeng/password';
import { StepperModule } from 'primeng/stepper';
import { SiteBtn } from '@shared/components/ui/site-btn/site-btn';
import { AuthLib } from '@ahmed_elssamman/auth-lib';
import { RegisterData } from './register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    LucideDiamond,
    InputOtpModule,
    PasswordModule,
    StepperModule,
    SiteBtn,
  ],
  templateUrl: './register.html',
})
export class Register {
  authLib = new AuthLib();
  private readonly router = inject(Router);
  
  activeStep = signal(1);
  otpValue = signal('');
  registerData = signal<RegisterData>({
    email: '',
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',

  })
  readonly passwordsMatch = computed(() => {
    return this.registerData().password === this.registerData().confirmPassword;
  })

  sendEmailToVerify(step: number, event: Event) {
    event.preventDefault();
    this.authLib.sendEmailForVerification(this.registerData().email!).subscribe(() => {
      this.activeStep.set(step);
    });
  }
  verifyOtp(step: number) {
    this.authLib.verifyEmail({ email: this.registerData().email!, code: this.otpValue() }).subscribe(() => {
      this.activeStep.set(step);
    });
  }

  addAdditionalUserInfo(step: number, event: Event) {
    event.preventDefault();
    this.activeStep.set(step);
  }

  register( event: Event) {
    event.preventDefault();
    this.authLib.register({
      email: this.registerData().email!,
      ...this.registerData()
    }).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }

}
