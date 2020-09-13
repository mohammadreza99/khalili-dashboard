import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ProductService } from '../../business/product.service';
import { ProductFavorite } from '../../model/product.model';

@Component({
  selector: 'products-favorite',
  templateUrl: './products-favorite.page.html',
  styleUrls: ['./products-favorite.page.scss'],
})
export class ProductsFavoritePage implements OnInit {
  rowData$: Observable<ProductFavorite[]>;
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
      field: 'countFavorit',
      headerName: 'تعداد علاقمندی',
      editable: false,
    },
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.rowData$ = this.productService.getProductsFavorite();
  }
}
