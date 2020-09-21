import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from '@app/services/data.service';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ProductService } from '../../business/product.service';
import { ProductComment } from '../../model/product.model';

@Component({
  selector: 'comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  rowData$: Observable<ProductComment[]>;
  columnDefs: ColDef[] = [
    {
      field: 'fullName',
      headerName: 'نام و نام خانوادگی',
      editable: false,
    },
    {
      field: 'commentTitle',
      headerName: 'عنوان نظر',
      editable: false,
    },
    {
      field: 'gainPoints',
      headerName: 'نظرسنجی امتیازی',
      editable: false,
    },
    {
      field: 'productName',
      headerName: 'عنوان محصول',
      editable: false,
    },
    {
      field: 'productCode',
      headerName: 'کد محصول',
      editable: false,
    },
    {
      field: 'categoryTitle',
      headerName: 'دسته بندی',
      editable: false,
    },
  ];

  constructor(
    private productService: ProductService,
    private dataService: DataService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.productService.getProductsComment();
  }

  onActionClick(event) {
    this.productService.verifyComment(event.rowData.id).subscribe(() => {
      this.dataService.successfullMessage(this.vcRef);
    });
  }
}
