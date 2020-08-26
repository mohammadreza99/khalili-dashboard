import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '@app/services/error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          const errorMessage = `Code: ${error.status}\nERROR Message: ${error.message}`;
          this.errorService.storeError(this.getErrorMessage(error.status));
          return throwError(errorMessage);
        }
      })
    );
  }

  getErrorMessage(code: number): string {
    switch (code) {
      case 400: {
        return 'درخواست صحیح نمی باشد و قابل پردازش نیست';
      }
      case 401: {
        return 'دوباره وارد سیستم شوید';
      }
      case 403: {
        return 'اجرای درخواست مورد نظر برای شما امکان ندارد';
      }
      case 404: {
        return 'درخواست مورد نظر وجود ندارد';
      }
      case 405: {
        return 'متد استفاده شده برای درخواست مجاز نیست';
      }
      case 422: {
        return 'لطفا تمام فیلدها را پر کنید';
      }
      case 500: {
        return 'خطا سمت سرور رخ داده است';
      }
      default: {
        return 'خطای ناشناس، امکان ارتباط با سرور وجود ندارد';
      }
    }
  }
}
