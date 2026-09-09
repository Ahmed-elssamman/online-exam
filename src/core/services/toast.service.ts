import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly messageService = inject(MessageService);

  success(detail: string, summary = 'Success', life = 3500): void {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      life,
    });
  }

  error(detail: string, summary = 'Error', life = 4500): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life,
    });
  }

  info(detail: string, summary = 'Information', life = 3000): void {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
      life,
    });
  }

  warn(detail: string, summary = 'Warning', life = 4000): void {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail,
      life,
    });
  }

  clear(): void {
    this.messageService.clear();
  }
}
