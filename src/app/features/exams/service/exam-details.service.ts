import { Injectable } from '@angular/core';
import { MainService } from '@core/services/main-service';
import { Observable } from 'rxjs';
import { LocalStorageExamData, ReviewResponse } from '../exam-details/model/exam-details.model';

@Injectable({
  providedIn: 'root',
})
export class ExamDetailsService extends MainService {
  constructor() {
    super('questions/exam');
  }

  getQuestionsByExam(examId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/questions/exam/${examId}`);
  }

  submissions(data: LocalStorageExamData | any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/submissions`, data);
  }

  getReview(submissionId: string): Observable<ReviewResponse | any> {
    return this.httpClient.get<any>(`${this.baseUrl}/submissions/${submissionId}`);
  }
}
