import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User, CheckOtpModel, CheckPasswordModel, ChangePasswordModel } from '../model/auth.model';
import { BaseService } from '@app/services/base.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  register(mobileNo: string) {
    return this.post('/User/Register/', { mobileNo }, 'json');
  }

  checkOtp(checkOtp: CheckOtpModel) {
    return this.post('/User/CheckOtpAndRegister/', checkOtp, 'json');
  }

  checkPass(checkPass: CheckPasswordModel) {
    return this.post('/User/CheckPassword/', checkPass, 'json');
  }

  forgetPass(mobileNo: string) {
    return this.post('/User/ForgetPassword/', { mobileNo }, 'json');
  }

  changePass(changePass: ChangePasswordModel) {
    return this.post(' /User/SetOrChangePassword/', changePass , 'json');
  }
  
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    console.log(this.getToken() ? true : false);
    return this.getToken() ? true : false;
  }

  logout() {
    localStorage.clear();
  }
}
