import { Injectable } from '@angular/core';
import { BaseService } from '@app/services/base.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  Product,
  AppCategory,
  ProductSelect,
  AttributeByCategoryId,
  AppCategorySlider,
  Discount,
  ProductView,
  ProductFavorite,
  ProductComment,
  Info
} from '../model/product.model';
import { TreeNode } from 'primeng';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  /////////////////////////////////////////////////////////////
  //                       Activation                        //
  /////////////////////////////////////////////////////////////
  activate<T>(type: string, body: T): Observable<T> {
    return this.put(`/Base/Admin/${type}Active`, body, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  deactivate<T>(type: string, body: T): Observable<T> {
    return this.put(`/Base/Admin/${type}DeActive`, body, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  /////////////////////////////////////////////////////////////
  //                       Product                           //
  /////////////////////////////////////////////////////////////
  getProducts(): Observable<ProductSelect[]> {
    return this.get<Product[]>('/Base/Admin/ProductSelect/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  insertProduct<Product>(product: Product): Observable<Product> {
    return this.post('/Base/Admin/ProductInsert/', product, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getProductsView(): Observable<ProductView[]> {
    return this.get<ProductView[]>(
      '/Base/Admin/ProductViewSelect/',
      'json'
    ).pipe(map((res: any) => res.data));
  }

  getProductsComment(): Observable<ProductComment[]> {
    return this.get<ProductComment[]>(
      '/Base/Admin/CommentSelect/',
      'json'
    ).pipe(map((res: any) => res.data));
  }

  verifyComment(commentId: string): Observable<ProductComment> {
    return this.put('/Base/Admin/CommentVerify/', { commentId }, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getProductsFavorite(): Observable<ProductFavorite[]> {
    return this.get<ProductFavorite[]>(
      '/Base/Admin/FavoritesSelect/',
      'json'
    ).pipe(map((res: any) => res.data));
  }

  getDiscounts(): Observable<Discount[]> {
    return this.get<Discount[]>('/Base/Admin/DiscountSelect/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  insertDiscount<Discount>(discount: Discount): Observable<Discount> {
    return this.post('/Base/Admin/DiscountInsert/', discount, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  updateDiscount<Discount>(discount: Discount): Observable<Discount> {
    return this.put('/Base/Admin/DiscountUpdate/', discount, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getProductPrimaryData(productId): Observable<any> {
    return this.get('/Base/Admin/ProductSelectWithId/?id='+productId ,'json').pipe(
      map((res: any) => res.data)
    );
  }

  updateProductPrimaryData(product){
    return this.put('/Base/Admin/ProductUpdate/', product, 'json').pipe(
      map((res: any) => res.data)
    );
  }
  getProductPointData(productId): Observable<any> {
    return this.get('/Base/Admin/ProductPointSelectWithProductId/?productId='+productId ,'json').pipe(
      map((res: any) => res.data)
    );
  }

  updateProductPointData(pointList){
    return this.put('Base/Admin/ProductPointUpdate/', pointList, 'json').pipe(
      map((res: any) => res.data)
    );
  }
  getProductPriceData(productId): Observable<any> {
    return this.get('/Base/Admin/ProductPriceSelectWithProductId/?productId='+productId ,'json').pipe(
      map((res: any) => res.data)
    );
  }

  updateProductPriceData(pointList){
    return this.put('/Base/Admin/ProductPriceUpdate/', pointList, 'json').pipe(
      map((res: any) => res.data)
    );
  }
  insertProductPriceData(pointList){
    return this.post('/Base/Admin/ProductPriceInsert/', pointList, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getProductImageData(productId): Observable<any> {
    return this.get('/Base/Admin/ProductMediaSelectWithProductId/?productId='+productId ,'json').pipe(
      map((res: any) => res.data)
    );
  }
  insertProductImageData(data){
    return this.post('/Base/Admin/ProductMediaInsert/', data, 'json').pipe(
      map((res: any) => res.data)
    );
  }
  deleteProductImageData(data){
    return this.put('/Base/Admin/ProductMediaDelete/', data, 'json').pipe(
      map((res: any) => res.data)
    );
  }
  selectProductImageDefult(data){
    return this.put('/Base/Admin/ProductMediaUpdateIsDefault/', data, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getProductAttributes(ProductId): Observable<Info[]> {
    return this.get('/Base/Admin/ProductInfoSelectWithId/?id='+ProductId ,'json').pipe(
      map((res: any) => res.data)
    );
  }

  updateProductAttributes(attributes){
    return this.put('/Base/Admin/ProductInfoUpdate/', attributes, 'json').pipe(
      map((res: any) => res.data)
    );
  }
  /////////////////////////////////////////////////////////////
  //                       Category                          //
  /////////////////////////////////////////////////////////////
  getCategories(): Observable<AppCategory[]> {
    return this.get<AppCategory[]>('/Base/Admin/CategorySelect/', 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getCategoryById(categoryId: number): Observable<AppCategory> {
    return this.get<AppCategory>(
      '/Base/Admin/CategorySelectWithId/?id=' + categoryId,
      'json'
    ).pipe(map((res: any) => res.data));
  }


  insertCategory<AppCategory>(category: AppCategory): Observable<AppCategory> {
    return this.post('/Base/Admin/CategoryInsert/', category, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  updateCategory<AppCategory>(category: AppCategory): Observable<AppCategory> {
    return this.put('/Base/Admin/CategoryUpdate/', category, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  activeCategory<AppCategory>(category: AppCategory): Observable<AppCategory> {
    return this.put('/Base/Admin/CategoryActive/', category, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  deActiveCategory<AppCategory>(
    category: AppCategory
  ): Observable<AppCategory> {
    return this.put('/Base/Admin/CategoryDeActive/', category, 'json').pipe(
      map((res: any) => res.data)
    );
  }

  getAttributesByCatgoryId(categoryId: number) {
    return this.get<AttributeByCategoryId[]>(
      '/Base/Admin/CategoryAttributeSelectWithCategoryId/?categoryId=' +
        categoryId,
      'json'
    ).pipe(map((res: any) => res.data));
  }

  getAttributesValue(attributeId: number){
    return this.get(
      'Base/Admin/AttributeValueSelectWithAttributeId/?attributeId=' +
      attributeId,
      'json'
    ).pipe(map((res: any) => res.data));
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

  /////////////////////////////////////////////////////////////
  //                     CategorySlider                      //
  /////////////////////////////////////////////////////////////
  getCategorySliders(): Observable<AppCategorySlider[]> {
    return this.get<AppCategorySlider[]>(
      '/Base/Admin/CategorySliderSelect/',
      'json'
    ).pipe(map((res: any) => res.data));
  }

  insertCategorySlider(
    categorySlider: AppCategorySlider
  ): Observable<AppCategorySlider> {
    return this.post(
      '/Base/Admin/CategorySliderInsert/',
      categorySlider,
      'json'
    ).pipe(map((res: any) => res.data));
  }

  updateCategorySlider(categorySlider: AppCategorySlider) {
    return this.put(
      '/Base/Admin/CategorySliderUpdate/',
      categorySlider,
      'json'
    ).pipe(map((res: any) => res.data));
  }
}
