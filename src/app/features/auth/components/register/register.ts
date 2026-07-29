import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LucideDiamond } from '@lucide/angular';
import { InputOtpModule } from 'primeng/inputotp';
import { PasswordModule } from 'primeng/password';
import { StepperModule } from 'primeng/stepper';
import { SiteBtn } from '@shared/components/ui/site-btn/site-btn';

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
  activeStep = signal(1);
  email = signal('');
  otpValue = signal('482554');

  firstName = signal('');
  lastName = signal('');
  username = signal('');
  phone = signal('');

  password = signal('');
  confirmPassword = signal('');
}
