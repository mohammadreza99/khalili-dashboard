import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogFormService } from '@app/services/dialog-form.service';
import { TableComponent } from '@app/shared/components/table/table.component';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import * as moment from 'jalali-moment';
import { ProductService } from '../../business/product.service';
import { Discount } from '../../model/product.model';

@Component({
  selector: 'discount',
  templateUrl: './discount.page.html',
  styleUrls: ['./discount.page.scss'],
})
export class DiscountPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Discount[]>;
  columnDefs: ColDef[];

  constructor(
    private productService: ProductService,
    private dialogFormService: DialogFormService
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.productService.getDiscounts();
    this.columnDefs = [
      {
        field: 'title',
        headerName: 'عنوان',
      },
      {
        field: 'code',
        headerName: 'کد تخفیف',
      },
      {
        field: 'MaxUse',
        headerName: 'حداکثر استفاده',
      },
      {
        field: 'price',
        headerName: 'قیمت',
      },
      {
        field: 'maxPrice',
        headerName: 'حداکثر قیمت',
      },
      {
        field: 'percent',
        headerName: 'درصد تخفیف',
      },
      {
        field: 'orderCountUse',
        headerName: 'تعداد استفاده شده',
        editable: false,
      },
      {
        field: 'expireDate',
        headerName: 'انقضا',
        editable: true,
        cellEditor: 'datepickerEditor',
        cellEditorParams: (data) => {
          return {
            onChange: (params) => {
              const discount = {
                id: params.rowData.id,
                expireDate: params.selectedDate,
                title: params.rowData.title,
                code: params.rowData.code,
                MaxUse: params.rowData.MaxUse,
                price: params.rowData.price,
                maxPrice: params.rowData.maxPrice,
                percent: params.rowData.percent,
              } as Discount;
              this.productService
                .updateDiscount(discount)
                .subscribe(() => this.table.updateTransaction(discount));
            },
          };
        },
        cellRenderer: (data) => {
          if (data && data?.value?.selectedDate) {
            return moment(data.value.selectedDate).format('jYYYY/jMM/jDD');
          }
          return moment(data.value).format('jYYYY/jMM/jDD');
        },
      },

      {
        field: 'isActive',
        headerName: 'وضعیت',
filter: false,
sortable: false,
        cellRenderer: this.activityCellRenderer,
      },
    ];
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  addDiscount() {
    this.dialogFormService
      .show('افزودن تخفیف', this.formConfig())
      .onClose.subscribe((discount: Discount) => {
        if (discount) {
          let d = {
            expireDate: discount.expireDate['dateObj'],
            title: discount.title,
            code: discount.code,
            MaxUse: discount.MaxUse,
            price: discount.price,
            maxPrice: discount.maxPrice,
            percent: discount.percent,
          } as Discount;
          this.productService
            .insertDiscount(d)
            .subscribe((res) => this.table.addTransaction(discount));
        }
      });
  }

  formConfig(): DialogFormConfig[] {
    return [
      {
        type: 'text',
        label: 'عنوان',
        labelWidth: 60,
        formControlName: 'title',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'کد تخفیف',
        labelWidth: 60,
        formControlName: 'code',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'حداکثر سفارش',
        labelWidth: 60,
        formControlName: 'MaxUse',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'قیمت',
        labelWidth: 60,
        formControlName: 'price',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'حداکثر قیمت',
        labelWidth: 60,
        formControlName: 'maxPrice',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'درصد تخفیف',
        labelWidth: 60,
        formControlName: 'percent',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'date-picker',
        label: 'انقضا',
        labelWidth: 60,
        formControlName: 'expireDate',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onCellValueChanged(event) {
    let updatedData: Discount = event.data;
    this.productService
      .updateDiscount(updatedData)
      .subscribe(() => this.table.updateTransaction(updatedData));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
