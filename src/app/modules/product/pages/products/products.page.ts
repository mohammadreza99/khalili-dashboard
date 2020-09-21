import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSelect } from '../../model/product.model';
import { ColDef } from 'ag-grid-community';
import { ProductService } from '../../business/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ag-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  rowData$: Observable<ProductSelect[]>;
  columnDefs: ColDef[] = [
    {
      field: 'productCode',
      headerName: 'کد محصول',
    },
    {
      field: 'name',
      headerName: 'نام',
    },
    {
      field: 'nameEn',
      headerName: 'نام انگلیسی',
    },
    {
      field: 'categoryTitle',
      headerName: 'دسته بندی',
    },
    {
      field: 'brandTitle',
      headerName: 'برند',
    },
    {
      field: 'isActive',
      headerName: 'وضعیت',
filter: false,
sortable: false,
      cellRenderer: this.activityCellRenderer,
    },
  ];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.rowData$ = this.productService.getProducts();
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  onActionClick(event) {
    this.router.navigate(['/product/modify', event.rowData.id]);
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
