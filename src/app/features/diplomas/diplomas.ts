import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DiplomaCardComponent } from '../../../shared/components/ui/diploma-card/diploma-card';
import { Diploma } from '../../../shared/components/ui/diploma-card/diploma-card.model';
import { ChevronDown, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { DiplomaModel } from './models/diploma.model';
import { DiplomasService } from './service/diplomas.service';

@Component({
  selector: 'app-diplomas',
  standalone: true,
  imports: [CommonModule, DiplomaCardComponent, LucideAngularModule],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ChevronDown }),
    },
  ],
  templateUrl: './diplomas.html',
})
export class DiplomasComponent {
  private router = inject(Router);
  private diplomasService = inject(DiplomasService);

  diplomas = signal<DiplomaModel[]>([]);

  ngOnInit(): void {
    this.getDiplomas();
  }

  getDiplomas() {
    this.diplomasService.getAll<DiplomaModel>().subscribe((res) => {
      this.diplomas.set(res.payload.data);
    });
  }
  onSelectDiploma(diploma: DiplomaModel) {
    if (diploma.id) {
      this.router.navigate(['exams', diploma.id]);
    }
  }



}
