import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ProductService } from '../../business/product.service';
import { ProductView } from '../../model/product.model';

@Component({
  selector: 'products-view',
  templateUrl: './products-view.page.html',
  styleUrls: ['./products-view.page.scss'],
})
export class ProductsViewPage implements OnInit {
  rowData$: Observable<ProductView[]>;
  columnDefs: ColDef[] = [
    {
      field: 'productId',
      headerName: 'شناسه محصول',
      editable: false,
    },
    {
      field: 'productCode',
      headerName: 'کد محصول',
      editable: false,
    },
    {
      field: 'productName',
      headerName: 'عنوان محصول',
      editable: false,
    },
    {
      field: 'categoryTitle',
      headerName: 'دسته بندی',
      editable: false,
    },
    {
      field: 'countView',
      headerName: 'تعداد بازدید',
      editable: false,
    },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.rowData$ = this.productService.getProductsView();
  }
}
