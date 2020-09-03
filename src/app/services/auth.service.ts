import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  private tokenSubject = new BehaviorSubject<string>(null);
  private readonly endPoint = '/User/CheckOtpAndRegister/';

  login(user) {
    return this.post(`${this.endPoint}`, user, 'json');
  }

  saveToken(token: string) {
    this.tokenSubject.next(token);
  }

  getToken(): string {
    // return this.tokenSubject.value;
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    // return this.getToken() ? true : false;
    return localStorage.getItem('token') ? true : false;
  }
}
