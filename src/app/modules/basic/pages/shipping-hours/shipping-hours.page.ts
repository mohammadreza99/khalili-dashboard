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
      editable: false,
      cellRenderer: 'timepickerRenderer',
      cellRendererParams: {
        editable: true,
        onChange: (params) => {
          const s: BaseShippingHour = {
            id: params.rowData.id,
            startTime: params.selectedDate,
            endTime: params.rowData.endTime,
            isActive: params.rowData.isActive,
            title: params.rowData.title,
            maxOrder: params.rowData.maxOrder,
          };
          this.basicService
            .update<BaseShippingHour>('ShippingHour', s)
            .subscribe(() => this.table.updateTransaction(s));
        },
      },
    },
    {
      field: 'endTime',
      headerName: 'ساعت پایان',
      editable: false,
      cellRenderer: 'timepickerRenderer',
      cellRendererParams: {
        editable: true,
        onChange: (params) => {
          const s: BaseShippingHour = {
            id: params.rowData.id,
            startTime: params.rowData.startTime,
            endTime: params.selectedDate,
            isActive: params.rowData.isActive,
            title: params.rowData.title,
            maxOrder: params.rowData.maxOrder,
          };
          this.basicService
            .update<BaseShippingHour>('ShippingHour', s)
            .subscribe(() => this.table.updateTransaction(s));
        },
      },
    },
    {
      field: 'maxOrder',
      headerName: 'ماکزیمم سفارش',
    },
    {
      field: 'isActive',
      headerName: 'وضعیت',
      filter: false,
      sortable: false,
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
        let _shippingHour = this.getTime(shippingHour);
        if (shippingHour)
          this.basicService
            .insert<any>('ShippingHour', _shippingHour)
            .subscribe((res) => {
              this.table.addTransaction(_shippingHour);
            });
      });
  }

  getTime(shippingHour) {
    let endH =
      shippingHour.endTime['hour'] < 10
        ? '0' + shippingHour.endTime['hour']
        : shippingHour.endTime['hour'];
    let endM =
      shippingHour.endTime['minute'] < 10
        ? '0' + shippingHour.endTime['minute']
        : shippingHour.endTime['minute'];
    let startH =
      shippingHour.startTime['hour'] < 10
        ? '0' + shippingHour.startTime['hour']
        : shippingHour.startTime['hour'];
    let startM =
      shippingHour.startTime['minute'] < 10
        ? '0' + shippingHour.startTime['minute']
        : shippingHour.startTime['minute'];
    return {
      maxOrder: shippingHour.maxOrder,
      title: shippingHour.title,
      startTime: `${startH}:${startM}:00`,
      endTime: `${endH}:${endM}:00`,
    };
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
        type: 'time-picker',
        label: 'ساعت شروع',
        labelWidth: 60,
        formControlName: 'startTime',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'time-picker',
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
      {
        type: 'hidden',
        value: true,
        formControlName: 'isActive',
      },
    ] as DialogFormConfig[];
  }

  onCellValueChanged(event) {
    let updatedData: BaseShippingHour = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('ShippingHour', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('ShippingHour', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
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
