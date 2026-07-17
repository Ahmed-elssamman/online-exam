import { Component, computed, input, signal } from '@angular/core';
import { FieldTree, FormField as SignalFormField } from '@angular/forms/signals';
import { InputTextModule } from 'primeng/inputtext';
import { Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { CustomFormFieldConfig } from './form-field.model';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [InputTextModule, SignalFormField, LucideAngularModule],
  templateUrl: './form-field.html',
  styles: `
    .custom-form-input {
      --p-inputtext-invalid-border-color: var(--color-gray-300);
    }
  `,
  providers: [
    { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider({ Eye, EyeOff }) },
  ],
})
export class CustomFormField {
  config = input<CustomFormFieldConfig>({});
  field = input.required<FieldTree<string>>();

  inputId = computed(() => this.config().id ?? `field-${this.field()().name()}`);
  showError = computed(() => this.field()().touched() && this.field()().invalid());
  isPassword = computed(() => this.config().type === 'password');

  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update((value) => !value);
  }
}
