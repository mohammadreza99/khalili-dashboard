import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { SiteTelPhone } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'phones',
  templateUrl: './phones.page.html',
  styleUrls: ['./phones.page.scss'],
})
export class PhonesPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<SiteTelPhone[]>;
  columnDefs = [
    {
      field: 'telNo',
      headerName: 'شماره تلفن',
    },
    {
      field: 'telShow',
      headerName: 'نمایش تلفن',
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
    this.rowData$ = this.basicService.select<SiteTelPhone>('TelPhone');
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  addTelPhone() {
    this.dialogFormService
      .show('افزودن تلفن', this.formConfig())
      .onClose.subscribe((telPhone: SiteTelPhone) => {
        if (telPhone)
          this.basicService
            .insert<SiteTelPhone>('TelPhone', telPhone)
            .subscribe((res) => this.table.addTransaction(telPhone));
      });
  }

  formConfig(): DialogFormConfig[] {
    return [
      {
        type: 'text',
        label: 'تلفن',
        labelWidth: 60,
        formControlName: 'telNo',
        errors: [
          { type: 'required', message: 'این فیلد الزامیست' },
          {
            type: 'pattern',
            message: 'شماره وارد شده اشتباه است',
            value: '[0-9]{10}',
          },
        ],
      },
      {
        type: 'text',
        label: 'نمایش تلفن',
        labelWidth: 60,
        formControlName: 'telShow',
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
    let updatedData: SiteTelPhone = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('TelPhone', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('TelPhone', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
      this.basicService
        .update<SiteTelPhone>('TelPhone', updatedData)
        .subscribe(() => this.table.updateTransaction(updatedData));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
