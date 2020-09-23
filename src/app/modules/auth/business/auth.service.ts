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
    // return localStorage.getItem('token');
    return 'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhHQ00ifQ.OAVd5ypnODq_oQ6Wb8k0iv3VVzSbReEL_L6PqB0oplF4m6LskRzAGOKdpQpo_JP42ekyQBnrVOb4nZO3cppe3s9ghhxWHLF2DpQRmub821o6bijb2NJqJTly6kLyJAnOpiczILpx3wlZdjqpq9PQUoaVtCmyTGME8phiNiluKOaFqjkq9rznSb1U_AtAOtiKABDaso0RAMKv8BIkhzIRpNA5XWWlsKxAIKhGbURnzTefXq2PmovAjDzLccMN8ZNk_ZTy5nAQHBcZP9KMBVttN8nuQFYwVRXdyYLOwuwT-rpc60XPS--meT2GAOY-iHnsHkKUy1jVF5XqKRhQrLZmNA.ZeHl3p5ayu0W8cpg.TNocIhLjRrw1w8V9WNtSkvg3J9VU6EJ4qDUmN4a-02MmB6DdA-r_sG8G_GjlefqixhoBfXvSTWXU_SGupnJoOHL4UbWT2i_GETRWapeNcJDMj76anMAsP1PpAZp59RRtTKnXVrNIsV3zqPtpiwAoQ8h3rCL04T7LLw.D4JDRCdZYvI5E6ic9jS2sQ'
  }

  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }

  logout() {
    localStorage.clear();
  }
}
