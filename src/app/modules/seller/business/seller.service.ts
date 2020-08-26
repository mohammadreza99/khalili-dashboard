import { Injectable } from '@angular/core';
import { BaseService } from '@app/services/base.service';
import { Observable } from 'rxjs';
import { Result } from '@app/app.global';

@Injectable({
  providedIn: 'root',
})
export class SellerService extends BaseService {
  constructor() {
    super();
  }
  public getProducts(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      this.get<Result<any[]>>('Base/Admin/ColorSelect', 'json').subscribe(
        (data) => {
          observer.next(data.data);
        }
      );
    });
  }
}
