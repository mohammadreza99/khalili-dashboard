import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '@app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuthenticated()) {
      const clonedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          'eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkExMjhHQ00ifQ.OAVd5ypnODq_oQ6Wb8k0iv3VVzSbReEL_L6PqB0oplF4m6LskRzAGOKdpQpo_JP42ekyQBnrVOb4nZO3cppe3s9ghhxWHLF2DpQRmub821o6bijb2NJqJTly6kLyJAnOpiczILpx3wlZdjqpq9PQUoaVtCmyTGME8phiNiluKOaFqjkq9rznSb1U_AtAOtiKABDaso0RAMKv8BIkhzIRpNA5XWWlsKxAIKhGbURnzTefXq2PmovAjDzLccMN8ZNk_ZTy5nAQHBcZP9KMBVttN8nuQFYwVRXdyYLOwuwT-rpc60XPS--meT2GAOY-iHnsHkKUy1jVF5XqKRhQrLZmNA.ZeHl3p5ayu0W8cpg.TNocIhLjRrw1w8V9WNtSkvg3J9VU6EJ4qDUmN4a-02MmB6DdA-r_sG8G_GjlefqixhoBfXvSTWXU_SGupnJoOHL4UbWT2i_GETRWapeNcJDMj76anMAsP1PpAZp59RRtTKnXVrNIsV3zqPtpiwAoQ8h3rCL04T7LLw.D4JDRCdZYvI5E6ic9jS2sQ'
          // this.authService.getToken()
        ),
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }
}
