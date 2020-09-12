import { Injectable } from '@angular/core';
import { BaseService } from '@app/services/base.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Product,
  AppCategory,
  ProductSelect,
  AttributeByCategoryId,
} from '../model/product.model';
import { TreeNode } from 'primeng';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  getProducts(): Observable<ProductSelect[]> {
    return this.get<Product[]>('/Base/Admin/ProductSelect/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getAttributesByCatgoryId(categoryId: number) {
    return this.get<AttributeByCategoryId[]>(
      '/Base/Admin/AttributeSelectWithCategoryId/',
      'json'
    ).pipe(map((res: any) => res.data));
  }

  getCategories(): Observable<AppCategory[]> {
    return this.get<AppCategory[]>('/Base/Admin/CategorySelect/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getCategoryById(): Observable<AppCategory> {
    return this.get<AppCategory[]>('/Base/Admin/CategorySelectWithId/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  insertCategories<AppCategory>(body): Observable<AppCategory> {
    return this.post('/Base/Admin/CategoryInsert/', body, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  updateCategories<AppCategory>(body): Observable<AppCategory> {
    return this.put('/Base/Admin/CategoryUpdate/', body, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  convertToTreeNodeList(items: AppCategory[]) {
    let result: TreeNode[] = [];
    items.forEach((item) => {
      const t: TreeNode = {
        label: item.title,
        data: {
          id: item.id,
          title: item.title,
          parentId: item.parentId,
          icon: item.icon,
          isActive: item.isActive,
          link: item.link,
          isSubMenu: item.isSubMenu,
        },
        children: this.getTreeNodeChildrenFromCategory(item, items),
        selectable: true,
        key: item.id.toString(),
      };
      if (t.children.length == 0) {
        t.icon = 'pi pi-minus';
      }
      if (item.parentId == null) result.push(t);
    });
    return result;
  }

  convertToTreeNode(item: AppCategory, originalCategories: AppCategory[]) {
    if (item) {
      let result: TreeNode = {
        label: item.title,
        data: {
          id: item.id,
          title: item.title,
          parentId: item.parentId,
          icon: item.icon,
          isActive: item.isActive,
          link: item.link,
          isSubMenu: item.isSubMenu,
        },
        children: this.getTreeNodeChildrenFromCategory(
          item,
          originalCategories
        ),
        selectable: true,
        key: item.id.toString(),
      };
      return result;
    }
  }

  getTreeNodeChildrenFromCategory(
    category: AppCategory,
    originalCategories: AppCategory[]
  ) {
    let children: TreeNode[] = [];
    originalCategories.forEach((item) => {
      if (item.parentId == category.id) {
        const childNode: TreeNode = {
          label: item.title,
          data: {
            id: item.id,
            title: item.title,
            parentId: item.parentId,
            icon: item.icon,
            isActive: item.isActive,
            link: item.link,
            isSubMenu: item.isSubMenu,
          },
          children: this.getTreeNodeChildrenFromCategory(
            item,
            originalCategories
          ),
          selectable: true,
          key: item.id.toString(),
        };
        if (childNode.children.length == 0) {
          childNode.icon = 'pi pi-minus';
        }
        children.push(childNode);
      }
    });
    return children;
  }
}
