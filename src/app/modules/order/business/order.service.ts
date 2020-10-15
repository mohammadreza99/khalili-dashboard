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
  getOrderStates() {
    return this.get(
      '/Base/Admin/OrderStateSelect/',
      'json'
    ).pipe(map((res: any) => res.data));
  }
  getOrderWhitStatusId(id) {
    return this.get(
      '/Base/Admin/OrderSelectWithStatusId/?orderStatusId='+id,
      'json'
    ).pipe(map((res: any) => res.data));
  }
  getOrderProducts(id) {
    return this.get(
      '/Base/Admin/OrderInfoSelectWithId/?orderId='+id,
      'json'
    ).pipe(map((res: any) => res.data));
  }
  setOrderState(body) {
    return this.post(
      '/Base/Admin/OrderStateInsert/',
      body,
      'json'
    ).pipe(map((res: any) => res.data));
  }
}
