import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { sentOtpConfig } from '@core/constants/forgot-password';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, MoveLeft } from 'lucide-angular';

@Component({
  selector: 'app-sent-otp',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './sent-otp.html',
  providers: [
    { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider({ MoveLeft }) },
  ],
})
export class SentOtp {
  sentOtpData = signal(sentOtpConfig);
}
