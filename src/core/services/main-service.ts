import { API_CONFIG } from '@ahmed_elssamman/auth-lib';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root',
})
export class MainService {
  private readonly _httpClient = inject(HttpClient)
  private readonly _appConfig = inject(API_CONFIG)


  getAll() { }
  getByID() { }

}
