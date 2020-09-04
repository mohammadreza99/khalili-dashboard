import { Injectable } from '@angular/core';
import { BaseService } from '@app/services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../model/product.model';
import { AppCategory } from '@app/modules/basic/model/basic.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  getProducts(): Observable<Product[]> {
    return this.get<Product[]>('/Base/Admin/ProductSelect/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getCategories(): Observable<AppCategory[]> {
    return this.get<AppCategory[]>('/Base/Admin/CategorySelect/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  insertCategories<AppCategory>(body): Observable<AppCategory> {
    return this.post('/Base/Admin/CategoryInsert/',body, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  updateCategories<AppCategory>(body): Observable<AppCategory> {
    return this.put('/Base/Admin/CategoryUpdate/',body, 'json').pipe(
      map((res: any) => res.data)
    );
  }
}
