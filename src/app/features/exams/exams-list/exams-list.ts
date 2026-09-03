import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChevronLeft, Clock, ArrowRight, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, CircleQuestionMark } from 'lucide-angular';
import { ExamListModel } from './exams-list.model';
import { DiplomasService } from 'app/features/diplomas/service/diplomas.service';
import { DiplomaItemPayload, DiplomaModel } from 'app/features/diplomas/models/diploma.model';
import { Result } from '@core/models/result.model';
import { SiteBtn } from "@shared/components/ui/site-btn/site-btn";
import { BtnConfig } from '@shared/components/ui/site-btn/site-btn.model';

@Component({
  selector: 'app-exams-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, SiteBtn],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ChevronLeft, CircleQuestionMark, Clock, ArrowRight }),
    },
  ],
  templateUrl: './exams-list.html',
})
export class ExamsListComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private _diplomasService = inject(DiplomasService);

  exams = signal<ExamListModel[]>([])
  diplomaTilte = signal<string>('')
  diplomaId = signal<string>('')
  startExamBtnConfig = signal<BtnConfig>({
    label: 'Start =>',
    icon: 'arrow-right',
    iconPos: 'right',
    size: 'small',
    severity: 'primary',
    rounded: false,
    outlined: false,
    text: false,
    disabled: false,
    loading: false,
    type: 'button',
    fullWidth: false,
    styleClass: 'w-full bg-site-primary'
  });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.diplomaId.set(params.get('id') || '');
      if (this.diplomaId()) {
        this.getExamsByDiplomaId();
      }
    });
  }

  getExamsByDiplomaId() {
    this._diplomasService.getById<DiplomaItemPayload>(this.diplomaId()).subscribe((res) => {
      this.exams.set(res.payload.diploma.exams ?? []);
      this.diplomaTilte.set(res.payload.diploma.title ?? '');
    });
  }




  goBack() {
    this.router.navigate(['/diplomas']);
  }

  startExam(exam: ExamListModel) {
    if (exam?.id) {
      this.router.navigate(['/exam/details', exam.id]);
    }
  }
}
