import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ChevronLeft,
  CircleQuestionMark,
  RotateCcw,
  Folder,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
} from 'lucide-angular';

import { ExamDetailsService } from '../service/exam-details.service';
import {
  QuestionAnalytics,
  SubmissionDetails,
  SubmissionPayload,
} from '../exam-details/model/exam-details.model';

@Component({
  selector: 'app-exam-review',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        ChevronLeft,
        CircleQuestionMark,
        RotateCcw,
        Folder,
      }),
    },
  ],
  templateUrl: './exam-review.html',
})
export class ExamReview implements OnInit {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly examDetailsService = inject(ExamDetailsService);

  readonly submissionId = signal<string>('');
  readonly examId = signal<string>('');

  readonly submission = signal<SubmissionDetails | null>(null);
  readonly analytics = signal<QuestionAnalytics[]>([]);

  readonly examTitle = computed(() => {
    return this.submission()?.examTitle || this.submission()?.exam?.title || 'Exam';
  });

  readonly diplomaTitle = signal<string>('Diploma');

  readonly totalQuestions = computed(() => {
    return this.submission()?.totalQuestions || this.analytics().length || 0;
  });

  readonly correctCount = computed(() => {
    const sub = this.submission();
    if (sub?.correctAnswers !== undefined) return sub.correctAnswers;
    return this.analytics().filter((a) => a.isCorrect).length;
  });

  readonly wrongCount = computed(() => {
    const sub = this.submission();
    if (sub?.wrongAnswers !== undefined) return sub.wrongAnswers;
    return this.analytics().filter((a) => !a.isCorrect).length;
  });

  readonly circumference = 2 * Math.PI * 65;

  readonly correctRatio = computed(() => {
    const total = this.totalQuestions() || 1;
    return this.correctCount() / total;
  });

  readonly wrongRatio = computed(() => {
    const total = this.totalQuestions() || 1;
    return this.wrongCount() / total;
  });

  readonly correctStrokeDashoffset = computed(() => {
    return this.circumference * (1 - this.correctRatio());
  });

  readonly wrongStrokeDashoffset = computed(() => {
    return this.circumference * (1 - this.wrongRatio());
  });

  readonly wrongStrokeRotation = computed(() => {
    return this.correctRatio() * 360 - 90;
  });

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const subId = params.get('submissionId') || params.get('id') || '';
      this.submissionId.set(subId);
      if (subId && subId !== 'latest') {
        this.fetchReviewData(subId);
      }
    });

    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((qParams) => {
      const eId = qParams.get('examId') || '';
      if (eId) {
        this.examId.set(eId);
      }
    });
  }

  fetchReviewData(id: string): void {
    this.examDetailsService
      .getReview(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        const payload: SubmissionPayload = res?.payload ?? res;
        if (payload) {
          if (payload.submission) {
            this.submission.set(payload.submission);
            if (payload.submission.examId) {
              this.examId.set(payload.submission.examId);
            }
          }
          if (payload.analytics) {
            this.analytics.set(payload.analytics);
          }
        }
      });
  }

  getAnswerText(ans: any): string {
    if (!ans) return '';
    if (typeof ans === 'string') return ans;
    return ans.text || ans.answer || ans.title || '';
  }

  restartExam(): void {
    const eId = this.examId();
    if (eId) {
      this.router.navigate(['/exam/details', eId]);
    } else {
      this.router.navigate(['/diplomas']);
    }
  }

  goExplore(): void {
    this.router.navigate(['/diplomas']);
  }

  goBack(): void {
    this.router.navigate(['/diplomas']);
  }
}
