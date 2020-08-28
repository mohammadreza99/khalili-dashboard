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
      cellEditor: 'timepickerEditor',
      cellEditorParams: (data) => {
        return {
          onChange: (params) => {
            // const holiday: BaseHoliday = {
            //   id: params.rowData.id,
            //   date: params.selectedDate,
            //   isActive: params.rowData.isActive,
            //   title: params.rowData.title,
            // };
            // this.basicService
            // .update<BaseHoliday>('Holiday', holiday)
            // .subscribe(() => this.table.updateTransaction(holiday));
          },
        };
      },
      cellRenderer: (params) => {
        return (
          params.data.startTime.minute + ' : ' + params.data.startTime.hour
        );
      },
    },
    {
      field: 'endTime',
      headerName: 'ساعت پایان',
      cellRenderer: (params) => {
        return params.data.endTime.minute + ' : ' + params.data.endTime.hour;
      },
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
        shippingHour.endTime = new Date(
          2020,
          0,
          1,
          shippingHour.endTime['hour'],
          shippingHour.endTime['minute']
        );
        shippingHour.startTime = new Date(
          2020,
          0,
          1,
          shippingHour.startTime['hour'],
          shippingHour.startTime['minute']
        );
        console.log(shippingHour);
        if (shippingHour)
          this.basicService
            .insert<BaseShippingHour>('ShippingHour', shippingHour)
            .subscribe((res) => {
              console.log(res);
              this.table.addTransaction(shippingHour);
            });
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
