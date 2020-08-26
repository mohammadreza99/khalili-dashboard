import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { BaseHoliday } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import * as moment from 'jalali-moment';

@Component({
  selector: 'holidays',
  templateUrl: './holidays.page.html',
  styleUrls: ['./holidays.page.scss'],
})
export class HolidaysPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseHoliday[]>;
  columnDefs = [
    {
      field: 'title',
      headerName: 'عنوان',
    },
    {
      field: 'date',
      headerName: 'تاریخ',
      // filter: 'agDateColumnFilter',
      // filterParams: {
      // comparator: (filterLocalDateAtMidnight, cellValue) => {
      //   var cellDate = new Date(cellValue);
      //   if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
      //     return 0;
      //   }
      //   if (cellDate < filterLocalDateAtMidnight) {
      //     return -1;
      //   }
      //   if (cellDate > filterLocalDateAtMidnight) {
      //     return 1;
      //   }
      // },
      // browserDatePicker: true,
      // },
      cellRenderer: (data) => {
        return moment(data.value).format('MM/DD/YYYY');
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
        if (holiday)
          this.basicService
            .insert<BaseHoliday>('Holiday', holiday)
            .subscribe((res) => this.table.addTransaction(holiday));
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
    ] as DialogFormConfig[];
  }

  onCellValueChanged(event) {
    let updatedData: BaseHoliday = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      updatedData.isActive = value === 'فعال' ? true : false;
    }
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
