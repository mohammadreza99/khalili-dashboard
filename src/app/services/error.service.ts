import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor() {}
  errorSubject = new BehaviorSubject<string>(null);

  storeError(error: string) {
    this.errorSubject.next(error);
  }

  getError(): Observable<string> {
    return this.errorSubject.asObservable();
  }
}
