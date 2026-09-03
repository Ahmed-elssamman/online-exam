import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Diploma } from './diploma-card.model';
import { DiplomaModel } from 'app/features/diplomas/models/diploma.model';

@Component({
  selector: 'app-diploma-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diploma-card.html',
})
export class DiplomaCardComponent {
  diploma = input.required<DiplomaModel>();
  cardClick = output<DiplomaModel>();

  onCardClick() {
    this.cardClick.emit(this.diploma());
  }
}
