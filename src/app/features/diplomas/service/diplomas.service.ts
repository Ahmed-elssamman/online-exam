import { Injectable } from '@angular/core';
import { MainService } from '@core/services/main-service';

@Injectable({
  providedIn: 'root',
})
export class DiplomasService extends MainService {
  constructor() {
    super('diplomas');
  }
}
