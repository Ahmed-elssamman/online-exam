import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, Subscription } from 'rxjs';
import {
  ArrowRight,
  CircleQuestionMark,
  Clock,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Folder,
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  LUCIDE_ICONS,
  LucideAngularModule,
  LucideIconProvider,
} from 'lucide-angular';

import { Dialog } from 'primeng/dialog';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { Knob } from 'primeng/knob';
import { ProgressBar } from 'primeng/progressbar';

import { ExamDetailsService } from '../service/exam-details.service';
import {
  LocalStorageExamData,
  Question,
  QuestionAnswer,
  StoredAnswer,
} from './model/exam-details.model';

@Component({
  selector: 'app-online-exam',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LucideAngularModule,
    Dialog,
    CarouselModule,
    ButtonModule,
    Knob,
    ProgressBar,
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({
        CircleQuestionMark,
        Clock,
        ArrowRight,
        CheckCircle2,
        AlertCircle,
        RotateCcw,
        Folder,
        Award,
        BookOpen,
        ChevronLeft,
        ChevronRight,
      }),
    },
  ],
  templateUrl: './online-exam.html',
})
export class OnlineExam implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly examDetailsService = inject(ExamDetailsService);

  // State Signals
  readonly examId = signal<string>('');
  readonly questions = signal<Question[]>([]);
  readonly currentIndex = signal<number>(0);
  readonly startedAt = signal<string>(new Date().toISOString());
  readonly storedAnswers = signal<StoredAnswer[]>([]);

  readonly remainingSeconds = signal<number>(0);
  readonly totalExamSeconds = signal<number>(0);

  readonly isSubmitting = signal<boolean>(false);

  readonly examTitle = signal<string>('');
  readonly diplomaTitle = signal<string>('');

  readonly showConfirmSubmitDialog = signal<boolean>(false);

  private timerSubscription?: Subscription;

  // Computed Signals
  readonly totalQuestionsCount = computed(() => this.questions().length);

  readonly currentQuestion = computed<Question | null>(() => {
    const list = this.questions();
    const idx = this.currentIndex();
    return list[idx] ?? null;
  });

  readonly formattedTime = computed<string>(() => {
    const total = this.remainingSeconds();
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });

  readonly progressValue = computed<number>(() => {
    const total = this.totalQuestionsCount();
    if (total === 0) return 0;
    return Math.round((this.answeredCount() / total) * 100);
  });

  readonly isFirstQuestion = computed<boolean>(() => this.currentIndex() === 0);

  readonly isLastQuestion = computed<boolean>(() => {
    const total = this.totalQuestionsCount();
    return total > 0 && this.currentIndex() === total - 1;
  });

  readonly answeredCount = computed<number>(() => this.storedAnswers().length);

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get('examid') || params.get('id') || '';
      this.examId.set(id);
      if (id) {
        this.loadExamData(id);
      }
    });
  }

  loadExamData(examId: string): void {
    const storageKey = `online_exam_data_${examId}`;
    const cachedData = localStorage.getItem(storageKey);
    const cachedStep = localStorage.getItem(`online_exam_step_${examId}`);
    const cachedTime = localStorage.getItem(`online_exam_time_${examId}`);

    if (cachedData) {
      try {
        const parsedData: LocalStorageExamData = JSON.parse(cachedData);
        if (parsedData.answers) {
          this.storedAnswers.set(parsedData.answers);
        }
        if (parsedData.startedAt) {
          this.startedAt.set(parsedData.startedAt);
        }
      } catch (e) {
        console.error('Error parsing stored answers', e);
      }
    } else {
      const newStartedAt = new Date().toISOString();
      this.startedAt.set(newStartedAt);
      this.saveToLocalStorage();
    }

    if (cachedStep) {
      const step = parseInt(cachedStep, 10);
      if (!isNaN(step)) {
        this.currentIndex.set(step);
      }
    }

    this.examDetailsService
      .getQuestionsByExam(examId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any) => {
        const rawQuestions: Question[] =
          res?.payload?.questions ??
          res?.payload?.data ??
          res?.payload ??
          res?.questions ??
          res?.data ??
          (Array.isArray(res) ? res : []);

        this.questions.set(rawQuestions);

        const examInfo = res?.payload?.exam ?? res?.exam;
        if (examInfo?.title) {
          this.examTitle.set(examInfo.title);
        }

        const subjectInfo = examInfo?.subject ?? res?.payload?.subject ?? res?.subject;
        if (subjectInfo?.name || subjectInfo?.title) {
          this.diplomaTitle.set(subjectInfo.name || subjectInfo.title);
        }

        const duration = examInfo?.duration || 25;
        this.initTimer(duration, cachedTime);
      });
  }

  private initTimer(durationMinutes: number, cachedTime: string | null): void {
    const totalSeconds = durationMinutes * 60;
    this.totalExamSeconds.set(totalSeconds);

    if (cachedTime) {
      const parsedTime = parseInt(cachedTime, 10);
      this.remainingSeconds.set(parsedTime > 0 ? parsedTime : totalSeconds);
    } else {
      this.remainingSeconds.set(totalSeconds);
      localStorage.setItem(`online_exam_time_${this.examId()}`, totalSeconds.toString());
    }

    this.timerSubscription?.unsubscribe();
    this.timerSubscription = interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const current = this.remainingSeconds();
        if (current > 0) {
          const next = current - 1;
          this.remainingSeconds.set(next);
          localStorage.setItem(`online_exam_time_${this.examId()}`, next.toString());

          if (next === 0) {
            this.timerSubscription?.unsubscribe();
            this.submitExam();
          }
        }
      });
  }

  getQuestionText(q: Question | null | undefined): string {
    if (!q) return '';
    return q.text || q.question || '';
  }

  getAnswerText(opt: QuestionAnswer | null | undefined): string {
    if (!opt) return '';
    return opt.text || opt.answer || '';
  }

  getOptionLetter(index: number, opt?: QuestionAnswer): string {
    if (opt?.key) return opt.key;
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    return letters[index] || `${index + 1}`;
  }

  selectOption(questionId: string | undefined, opt: QuestionAnswer): void {
    if (!questionId) return;
    const answerId = opt.id || opt._id || opt.key || opt.text || opt.answer;
    if (!answerId) return;

    this.storedAnswers.update((prev) => {
      const filtered = prev.filter((item) => item.questionId !== questionId);
      const updated = [...filtered, { questionId, answerId }];
      this.saveToLocalStorage(updated);
      return updated;
    });
  }

  isOptionSelected(questionId: string | undefined, opt: QuestionAnswer): boolean {
    if (!questionId) return false;
    const current = this.storedAnswers().find((a) => a.questionId === questionId);
    if (!current) return false;
    const answerId = opt.id || opt._id || opt.key || opt.text || opt.answer;
    return current.answerId === answerId;
  }

  private saveToLocalStorage(answers = this.storedAnswers()): void {
    const examData: LocalStorageExamData = {
      examId: this.examId(),
      answers,
      startedAt: this.startedAt(),
    };
    localStorage.setItem(`online_exam_data_${this.examId()}`, JSON.stringify(examData));
  }

  onCarouselPageChange(event: any): void {
    if (event?.page !== undefined) {
      this.currentIndex.set(event.page);
      localStorage.setItem(`online_exam_step_${this.examId()}`, event.page.toString());
    }
  }

  goToPrevious(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
      localStorage.setItem(`online_exam_step_${this.examId()}`, this.currentIndex().toString());
    }
  }

  goToNext(): void {
    if (this.currentIndex() < this.totalQuestionsCount() - 1) {
      this.currentIndex.update((i) => i + 1);
      localStorage.setItem(`online_exam_step_${this.examId()}`, this.currentIndex().toString());
    } else {
      this.openConfirmSubmit();
    }
  }

  openConfirmSubmit(): void {
    this.showConfirmSubmitDialog.set(true);
  }

  closeConfirmSubmit(): void {
    this.showConfirmSubmitDialog.set(false);
  }

  submitExam(): void {
    this.showConfirmSubmitDialog.set(false);
    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.timerSubscription?.unsubscribe();

    const payload: LocalStorageExamData = {
      examId: this.examId(),
      answers: this.storedAnswers(),
      startedAt: this.startedAt(),
    };

    this.examDetailsService
      .submissions(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: any) => {
          this.isSubmitting.set(false);
          this.clearExamProgressStorage();
          const submissionId =
            res?.payload?.id ||
            res?.payload?.submission?.id ||
            res?.payload?.submissionId ||
            res?.id ||
            'latest';
          this.router.navigate(['/exam/review', submissionId], {
            queryParams: { examId: this.examId() },
          });
        },
        error: (err: any) => {
          console.error('Submission API error:', err);
          this.isSubmitting.set(false);
          this.clearExamProgressStorage();
          const submissionId = err?.error?.payload?.id || 'latest';
          this.router.navigate(['/exam/review', submissionId], {
            queryParams: { examId: this.examId() },
          });
        },
      });
  }

  clearExamProgressStorage(): void {
    const id = this.examId();
    localStorage.removeItem(`online_exam_data_${id}`);
    localStorage.removeItem(`online_exam_time_${id}`);
    localStorage.removeItem(`online_exam_step_${id}`);
  }

  goBack(): void {
    this.router.navigate(['/diplomas']);
  }
}
