import { Component, OnInit, ViewChild } from '@angular/core';
import { BasicService } from '../../business/basic.service';
import { BaseColor } from '../../model/basic.model';
import { Observable } from 'rxjs';
import { DialogFormService } from '@app/services/dialog-form.service';
import { TableComponent } from '@app/shared/components/table/table.component';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ag-colors',
  templateUrl: './colors.page.html',
  styleUrls: ['./colors.page.scss'],
})
export class ColorsPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseColor[]>;
  columnDefs = [
    {
      field: 'title',
      headerName: 'عنوان',
    },
    {
      field: 'code',
      headerName: 'کد رنگ',
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
    this.rowData$ = this.basicService.select<BaseColor>('Color');
  }

  addColor() {
    this.dialogFormService
      .show('افزودن رنگ', this.formConfig())
      .onClose.subscribe((color: BaseColor) => {
        if (color)
          this.basicService
            .insert<BaseColor>('Color', color)
            .subscribe((res) => this.table.addTransaction(color));
      });
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
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
        type: 'color-picker',
        label: 'کد رنگ',
        labelWidth: 60,
        value: '000000',
        formControlName: 'code',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onCellValueChanged(event) {
    let updatedData: BaseColor = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('Color', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('Color', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
      this.basicService
        .update<BaseColor>('Color', updatedData)
        .subscribe(() => this.table.updateTransaction(updatedData));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
