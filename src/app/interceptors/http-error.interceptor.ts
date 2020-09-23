import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
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
          for (const key in error.error?.error) {
            if (Object.prototype.hasOwnProperty.call(error.error.error, key)) {
              const element = error.error?.error[key];
              this.errorService.storeError({
                title: 'خطا',
                message: element,
              });
            }
          }
          const errorMessage = `Code: ${error.status}\nERROR Message: ${error.message}`;
          this.errorService.storeError(this.getErrorMessage(error.status));
          return throwError(errorMessage);
        }
      })
    );
  }

  getErrorMessage(code: number) {
    switch (code) {
      case 400: {
        return {
          title: `خطای ${code}`,
          message: 'درخواست صحیح نمی باشد و قابل پردازش نیست',
        };
      }
      case 401: {
        return {
          title: `خطای ${code}`,
          message: 'دوباره وارد سیستم شوید',
        };
      }
      case 403: {
        return {
          title: `خطای ${code}`,
          message: 'اجرای درخواست مورد نظر برای شما امکان ندارد',
        };
      }
      case 404: {
        return {
          title: `خطای ${code}`,
          message: 'درخواست مورد نظر وجود ندارد',
        };
      }
      case 405: {
        return {
          title: `خطای ${code}`,
          message: 'متد استفاده شده برای درخواست مجاز نیست',
        };
      }
      case 422: {
        return {
          title: `خطای ${code}`,
          message: 'خطا در پردازش فیلدها',
        };
      }
      case 500: {
        return {
          title: `خطای ${code}`,
          message: 'خطا سمت سرور رخ داده است',
        };
      }
      default: {
        return {
          title: `خطا`,
          message: 'خطای ناشناس، امکان ارتباط با سرور وجود ندارد',
        };
      }
    }
  }
}
