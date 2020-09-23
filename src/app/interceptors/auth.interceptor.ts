import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '@app/modules/auth/business/auth.service';

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
          this.authService.getToken()
        ),
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }
}
