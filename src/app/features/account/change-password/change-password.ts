import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '@core/services/toast.service';
import {
  ChevronLeft,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  User,
  XCircle,
  CheckCircle,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
} from 'lucide-angular';
import { ProfileService } from '../profile.service';
import { AuthLib } from '@ahmed_elssamman/auth-lib';
import { MainService } from '@core/services/main-service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  host: {
    class: 'flex-1 flex flex-col',
  },
  imports: [CommonModule, FormsModule, RouterLink, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        ChevronLeft,
        User,
        Lock,
        LogOut,
        Eye,
        EyeOff,
        XCircle,
        CheckCircle,
      }),
    },
  ],
  templateUrl: './change-password.html',
})
export class ChangePassword {
  private readonly profileService = inject(ProfileService);
  private readonly authLib = inject(AuthLib);
  private readonly mainService = inject(MainService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');
  showCurrent = signal(false);
  showNew = signal(false);
  showConfirm = signal(false);
  isLoading = signal(false);

  passwordsMatch = computed(() => {
    if (!this.confirmPassword()) return true;
    return this.newPassword() === this.confirmPassword();
  });

  onSubmit(): void {
    const current = this.currentPassword().trim();
    const newPwd = this.newPassword().trim();
    const confirm = this.confirmPassword().trim();

    if (!current || !newPwd || !confirm) {
      this.toastService.warn('All fields are required.');
      return;
    }

    if (newPwd.length < 8) {
      this.toastService.warn('Password must be at least 8 characters long.');
      return;
    }

    if (newPwd !== confirm) {
      this.toastService.warn('Passwords do not match.');
      return;
    }

    this.isLoading.set(true);

    this.profileService
      .changePassword({
        currentPassword: current,
        newPassword: newPwd,
        confirmPassword: confirm,
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.toastService.success('Password updated successfully!');
          this.currentPassword.set('');
          this.newPassword.set('');
          this.confirmPassword.set('');

          timer(1200)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.router.navigate(['/diplomas']);
            });
        },
        error: (err) => {
          this.isLoading.set(false);
          this.toastService.error(
            err?.error?.message || 'Something went wrong'
          );
        },
      });
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
