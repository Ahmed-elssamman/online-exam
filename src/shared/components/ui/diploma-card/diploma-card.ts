import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Diploma } from './diploma-card.model';

@Component({
  selector: 'app-diploma-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diploma-card.html',
})
export class DiplomaCardComponent {
  diploma = input.required<Diploma>();
  cardClick = output<Diploma>();

  onCardClick() {
    this.cardClick.emit(this.diploma());
  }
}
