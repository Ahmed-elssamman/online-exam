import { Component, computed, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BtnConfig } from './site-btn.model';

@Component({
  selector: 'site-btn',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './site-btn.html',
})
export class SiteBtn {
  config = input<BtnConfig>({});
  fireBtn = output<MouseEvent>();
  label = computed(() => this.config().label ?? '');
  icon = computed(() => this.config().icon ?? '');
  iconPos = computed(() => this.config().iconPos ?? 'left');
  severity = computed(() => this.config().severity ?? 'primary');
  size = computed(() => this.config().size ?? undefined);
  outlined = computed(() => this.config().outlined ?? false);
  text = computed(() => this.config().text ?? false);
  raised = computed(() => this.config().raised ?? false);
  rounded = computed(() => this.config().rounded ?? false);
  disabled = computed(() => this.config().disabled ?? false);
  loading = computed(() => this.config().loading ?? false);
  btnType = computed(() => this.config().type ?? 'button');
  fullWidth = computed(() => this.config().fullWidth ?? false);
  styleClass = computed(() => {
    const base = this.config().fullWidth ? 'w-full' : '';
    const extra = this.config().styleClass ?? '';
    return `${base} ${extra}`.trim();
  });

  onClicked(event: MouseEvent) {
    if (!this.disabled()) {
      this.fireBtn.emit(event);

    }
  }
}