import { Injectable } from '@angular/core';
import { BaseService } from '@app/services/base.service';
import { Observable } from 'rxjs';
import { BaseOrderStatus } from '../model/order.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  constructor() {
    super();
  }

  getOrderStatuses(): Observable<BaseOrderStatus[]> {
    return this.get<BaseOrderStatus[]>(
      '/Base/Admin/OrderStatusSelect/',
      'json'
    ).pipe(map((res: any) => res.data));
  }
}
