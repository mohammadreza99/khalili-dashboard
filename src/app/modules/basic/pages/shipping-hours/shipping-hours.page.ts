import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { BaseShippingHour } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'shipping-hours',
  templateUrl: './shipping-hours.page.html',
  styleUrls: ['./shipping-hours.page.scss'],
})
export class ShippingHoursPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseShippingHour[]>;
  columnDefs = [
    {
      field: 'title',
      headerName: 'عنوان',
    },
    {
      field: 'startTime',
      headerName: 'ساعت شروع',
    },
    {
      field: 'endTime',
      headerName: 'ساعت پایان',
    },
    {
      field: 'maxOrder',
      headerName: 'ماکزیمم سفارش',
    },
    {
      field: 'isActive',
      headerName: 'وضعیت',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['فعال', 'غیرفعال'],
      },
      cellRenderer: this.activityCellRenderer,
    },
  ];

  constructor(
    private basicService: BasicService,
    private dialogFormService: DialogFormService
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.basicService.select<BaseShippingHour>('ShippingHour');
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  addShippingHour() {
    this.dialogFormService
      .show('افزودن ساعت تحویل', this.formConfig())
      .onClose.subscribe((shippingHour: BaseShippingHour) => {
        if (shippingHour)
          this.basicService
            .insert<BaseShippingHour>('ShippingHour', shippingHour)
            .subscribe((res) => this.table.addTransaction(shippingHour));
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
        type: 'date-picker',
        label: 'ساعت شروع',
        labelWidth: 60,
        formControlName: 'startTime',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'date-picker',
        label: 'ساعت پایان',
        labelWidth: 60,
        formControlName: 'endTime',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'ماکزیمم سفارش',
        labelWidth: 60,
        formControlName: 'maxOrder',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ] as DialogFormConfig[];
  }

  onCellValueChanged(event) {
    let updatedData: BaseShippingHour = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      updatedData.isActive = value === 'فعال' ? true : false;
    }
    this.basicService
      .update<BaseShippingHour>('ShippingHour', updatedData)
      .subscribe(() => this.table.updateTransaction(updatedData));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
