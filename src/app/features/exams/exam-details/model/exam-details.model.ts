export interface QuestionAnswer {
  key?: string;
  id?: string;
  _id?: string;
  answer?: string;
  text?: string;
}

export interface Question {
  _id?: string;
  id?: string;
  question?: string;
  text?: string;
  examId?: string;
  answers: QuestionAnswer[];
  type?: string;
  correct?: string;
  correctAnswer?: string;
  immutable?: boolean;
  createdAt?: string;
  updatedAt?: string;
  exam?: {
    _id?: string;
    id?: string;
    title?: string;
    duration?: number;
  } | string;
  subject?: {
    _id?: string;
    id?: string;
    name?: string;
    icon?: string;
  } | string;
}

export interface StoredAnswer {
  questionId: string;
  answerId: string;
}

export interface LocalStorageExamData {
  examId: string;
  answers: StoredAnswer[];
  startedAt: string;
}

export interface QuestionAnalytics {
  questionId: string;
  questionText: string;
  selectedAnswer?: {
    id?: string;
    _id?: string;
    key?: string;
    answer?: string;
    text?: string;
  } | string;
  isCorrect?: boolean;
  correctAnswer?: {
    id?: string;
    _id?: string;
    key?: string;
    answer?: string;
    text?: string;
  } | string;
}

export interface SubmissionDetails {
  id?: string;
  userId?: string;
  examId?: string;
  examTitle?: string;
  exam?: {
    id?: string;
    title?: string;
    duration?: number;
  };
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  startedAt?: string;
  submittedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubmissionPayload {
  submission: SubmissionDetails;
  analytics: QuestionAnalytics[];
}

export interface ReviewResponse {
  status: boolean;
  code: number;
  payload: SubmissionPayload;
}
