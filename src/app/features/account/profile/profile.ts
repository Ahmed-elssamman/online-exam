import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputOtpModule } from 'primeng/inputotp';
import { LucideDiamond } from '@lucide/angular';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '@core/services/toast.service';
import {
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronsUpDown,
  Lock,
  LogOut,
  Pen,
  User,
  X,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
} from 'lucide-angular';
import { ProfileService, UserProfile, UpdateProfileDto } from '../profile.service';
import { AuthLib } from '@ahmed_elssamman/auth-lib';
import { MainService } from '@core/services/main-service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    DialogModule,
    InputOtpModule,
    LucideDiamond,
    LucideAngularModule,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        ChevronLeft,
        User,
        Lock,
        LogOut,
        Pen,
        AlertTriangle,
        X,
        ChevronsUpDown,
        CheckCircle,
      }),
    },
  ],
  templateUrl: './profile.html',
})
export class Profile implements OnInit {
  private readonly profileService = inject(ProfileService);
  private readonly authLib = inject(AuthLib);
  private readonly mainService = inject(MainService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl({ value: '', disabled: true }),
    email: new FormControl({ value: '', disabled: true }),
    phone: new FormControl(''),
  });
  profileData = signal<UserProfile | null>(null);
  isLoading = signal(false);
  isSaving = signal(false);
  isDeleteDialogOpen = signal(false);
  isDeleting = signal(false);
  isEmailDialogOpen = signal(false);
  emailStep = signal<1 | 2>(1);
  newEmail = signal('');
  otpValue = signal('');
  emailError = signal('');
  emailLoading = signal(false);
  otpTimer = signal(60);
  private otpSubscription?: Subscription;

  ngOnInit(): void {
    this.loadProfile();
  }


  loadProfile(): void {
    this.isLoading.set(true);
    this.profileService.getProfile().subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        const userData: UserProfile = res?.payload?.user;
        if (userData) {
          this.profileData.set(userData);
          this.profileForm.patchValue({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            username: userData.username || '',
            email: userData.email || '',
            phone: userData.phone || '',
          });
        }
      },
    });
  }

  onSave(): void {
    if (this.profileForm.invalid) {
      this.toastService.warn('Please fill in all required fields.');
      return;
    }

    this.isSaving.set(true);

    const formValues = this.profileForm.getRawValue();
    const payload: UpdateProfileDto = {
      firstName: formValues.firstName || '',
      lastName: formValues.lastName || '',
      profilePhoto: this.profileData()?.profilePhoto || '',
      phone: formValues.phone || '',
    };

    this.profileService.updateProfile(payload).subscribe({
      next: (res: UserProfile) => {
        this.isSaving.set(false);
        this.toastService.success('Profile updated successfully!');
        const updatedUser = res;
        this.profileData.set(updatedUser);
        const current = this.mainService.$currentUser();
        if (current) {
          this.mainService.setSession(this.mainService.$token(), {
            ...current,
            ...updatedUser,
          });
        }
      },
      error: (err) => {
        this.isSaving.set(false);
        this.toastService.error(err?.error?.message || 'Failed to update profile.');
      },
    });
  }

  openDeleteAccountDialog(): void {
    this.isDeleteDialogOpen.set(true);
  }

  closeDeleteAccountDialog(): void {
    this.isDeleteDialogOpen.set(false);
  }

  confirmDeleteAccount(): void {
    this.isDeleting.set(true);
    this.profileService.deleteAccount().subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.isDeleteDialogOpen.set(false);
        this.toastService.success('Account deleted successfully.');
        this.mainService.clearSession();
        this.authLib.logout();
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.isDeleting.set(false);
        this.isDeleteDialogOpen.set(false);
        this.toastService.error(err?.error?.message || 'Failed to delete account.');
      },
    });
  }

  openChangeEmailDialog(): void {
    this.otpSubscription?.unsubscribe();
    this.newEmail.set('');
    this.otpValue.set('');
    this.emailError.set('');
    this.emailStep.set(1);
    this.otpTimer.set(60);
    this.isEmailDialogOpen.set(true);
  }

  closeChangeEmailDialog(): void {
    this.otpSubscription?.unsubscribe();
    this.isEmailDialogOpen.set(false);
  }

  onSendEmailOtp(): void {
    const email = this.newEmail().trim();
    if (!email) {
      this.toastService.warn('Please enter a valid email address.');
      return;
    }

    this.emailLoading.set(true);
    this.emailError.set('');

    this.profileService.sendResetPasswordEmail({ newEmail: email }).subscribe({
      next: () => {
        this.emailLoading.set(false);
        this.emailStep.set(2);
        this.startOtpTimer();
        this.toastService.info(`Verification code sent to ${email}`);
      },
      error: (err) => {
        this.emailLoading.set(false);
        const msg = err?.error?.message || 'Failed to send OTP code. Please try again.';
        this.emailError.set(msg);
        this.toastService.error(msg);
      },
    });
  }

  onVerifyOtp(): void {
    const code = this.otpValue().trim();
    if (!code || code.length !== 6) {
      this.toastService.warn('Please enter the 6-digit verification code.');
      return;
    }

    this.emailLoading.set(true);
    this.emailError.set('');

    this.profileService
      .confirmEmail({ newEmail: this.newEmail().trim(), code, otp: code })
      .subscribe({
        next: () => {
          this.emailLoading.set(false);
          this.otpSubscription?.unsubscribe();
          const updatedEmail = this.newEmail().trim();
          this.profileForm.patchValue({ email: updatedEmail });
          if (this.profileData()) {
            this.profileData.update((p) => (p ? { ...p, email: updatedEmail } : null));
          }
          this.closeChangeEmailDialog();
          this.toastService.success('Email updated successfully!');
        },
        error: (err) => {
          this.emailLoading.set(false);
          const msg = err?.error?.message || 'Invalid verification code. Please try again.';
          this.emailError.set(msg);
          this.toastService.error(msg);
        },
      });
  }

  private startOtpTimer(): void {
    this.otpTimer.set(60);
    this.otpSubscription?.unsubscribe();
    this.otpSubscription = interval(1000)
      .pipe(
        take(60),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: () => {
          this.otpTimer.update((val) => (val > 0 ? val - 1 : 0));
        },
        complete: () => {
          this.otpTimer.set(0);
        },
      });
  }




  resendOtp(): void {
    if (this.otpTimer() === 0 && this.newEmail()) {
      this.onSendEmailOtp();
    }
  }

  goBack(): void {
    window.history.back();
  }

  onLogout(): void {
    this.mainService.clearSession();
    this.authLib.logout();
    this.router.navigate(['/auth/login']);
  }
}
