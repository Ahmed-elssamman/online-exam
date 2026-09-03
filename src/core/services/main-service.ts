import { API_CONFIG } from '@ahmed_elssamman/auth-lib';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, signal } from '@angular/core';
import { LocalStorageKey } from '@core/enums/main-service.enum';
import { ApiParams } from '@core/models/base.model';
import { CurrentUser } from '@core/models/current-user';
import { Result } from '@core/models/result.model';
import { Results } from '@core/models/results.model';
import { Observable } from 'rxjs';

export class MainService {
  protected httpClient = inject(HttpClient);

  private apiConfig = inject(API_CONFIG);

  private currentUserState = signal<CurrentUser | null>(this.getStoredUser());

  private tokenState = signal<string | null>(this.getStoredToken());

  protected baseUrl = this.apiConfig.baseUrl;

  $currentUser = this.currentUserState.asReadonly();

  $token = this.tokenState.asReadonly();
  $endpoint = signal<string>('');

  constructor(private readonly endpoint: string) {
    this.$endpoint.set(this.normalizeEndpoint(endpoint));
  }

  setSession(token: string | null, currentUser: CurrentUser | null): void {
    this.tokenState.set(token);
    this.currentUserState.set(currentUser);

    if (token) {
      localStorage.setItem(LocalStorageKey.Token, token);
    } else {
      localStorage.removeItem(LocalStorageKey.Token);
    }

    if (currentUser) {
      localStorage.setItem(LocalStorageKey.CurrentUser, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(LocalStorageKey.CurrentUser);
    }
  }

  clearSession(): void {
    this.setSession(null, null);
  }

  getAll<T>(params: ApiParams = {}): Observable<Results<T>> {
    return this.httpClient.get<Results<T>>(this.buildUrl(), {
      params: this.buildParams(params),
    });
  }

  getById<T>(id: string): Observable<Result<T>> {
    return this.httpClient.get<Result<T>>(this.buildUrl(id));
  }

  create<T>(data: T): Observable<Result<T>> {
    return this.httpClient.post<Result<T>>(this.buildUrl(), data);
  }

  update<T>(id: string, data: T): Observable<Result<T>> {
    return this.httpClient.put<Result<T>>(this.buildUrl(id), data);
  }

  delete<T>(id: string): Observable<Result<T>> {
    return this.httpClient.delete<Result<T>>(this.buildUrl(id));
  }

  private buildUrl(id?: string): string {
    const endpoint = this.$endpoint();
    const resourceUrl = endpoint ? `${this.baseUrl}/${endpoint}` : this.baseUrl;

    if (!id) {
      return resourceUrl;
    }

    return `${resourceUrl}/${id}`;
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(LocalStorageKey.Token);
  }

  private getStoredUser(): CurrentUser | null {
    const storedUser = localStorage.getItem(LocalStorageKey.CurrentUser);

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as CurrentUser;
    } catch {
      return null;
    }
  }

  private normalizeEndpoint(endpoint: string): string {
    return endpoint.replace(/^\/+|\/+$/g, '');
  }

  private buildParams(params: ApiParams): HttpParams {
    let httpParams = new HttpParams();

    if (params.page != null) {
      httpParams = httpParams.set('page', params.page.toString());
    }

    if (params.limit != null) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    if (params.sortBy) {
      httpParams = httpParams.set('sortBy', params.sortBy);
    }

    if (params.sortOrder) {
      httpParams = httpParams.set('sortOrder', params.sortOrder);
    }

    if (params.immutable != null) {
      httpParams = httpParams.set('immutable', params.immutable.toString());
    }

    if (params.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return httpParams;
  }
}
