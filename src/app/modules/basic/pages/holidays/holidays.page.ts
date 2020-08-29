import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { BaseHoliday } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import * as moment from 'jalali-moment';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'holidays',
  templateUrl: './holidays.page.html',
  styleUrls: ['./holidays.page.scss'],
})
export class HolidaysPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseHoliday[]>;
  columnDefs: ColDef[] = [
    {
      field: 'title',
      headerName: 'عنوان',
    },
    {
      field: 'date',
      headerName: 'تاریخ',
      editable: true,
      cellEditor: 'datepickerEditor',
      cellEditorParams: (data) => {
        return {
          onChange: (params) => {
            const holiday: BaseHoliday = {
              id: params.rowData.id,
              date: params.selectedDate,
              isActive: params.rowData.isActive,
              title: params.rowData.title,
            };
            this.basicService
            .update<BaseHoliday>('Holiday', holiday)
            .subscribe(() => this.table.updateTransaction(holiday));
          }
        };
      },
      cellRenderer: (data) => {
        if (data && data.value.selectedDate) {
          return moment(data.value.selectedDate).format('jYYYY/jMM/jDD');
        }
        return moment(data.value).format('jYYYY/jMM/jDD');
      },
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
    this.rowData$ = this.basicService.select<BaseHoliday>('Holiday');
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  addHoliday() {
    this.dialogFormService
      .show('افزودن تعطیلی', this.formConfig())
      .onClose.subscribe((holiday: BaseHoliday) => {
        let holidayObj = {
          title: holiday.title,
          date: holiday.date['dateObj'],
        };
        if (holiday)
          this.basicService
            .insert<any>('Holiday', holidayObj)
            .subscribe((res) => this.table.addTransaction(holidayObj));
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
        label: 'تاریخ',
        labelWidth: 60,
        formControlName: 'date',
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
    let updatedData: BaseHoliday = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('Holiday', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('Holiday', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
      this.basicService
        .update<BaseHoliday>('Holiday', updatedData)
        .subscribe(() => this.table.updateTransaction(updatedData));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
