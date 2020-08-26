import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { BaseAttachmentType } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';

import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'attachment-types',
  templateUrl: './attachment-types.page.html',
  styleUrls: ['./attachment-types.page.scss'],
})
export class AttachmentTypesPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseAttachmentType[]>;
  columnDefs = [
    {
      field: 'title',
      headerName: 'عنوان',
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
    this.rowData$ = this.basicService.select<BaseAttachmentType>(
      'AttachmentType'
    );
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  addAttachmentType() {
    this.dialogFormService
      .show('افزودن الحاقیات فروشگاه', this.formConfig())
      .onClose.subscribe((attachmentType: BaseAttachmentType) => {
        if (attachmentType)
          this.basicService
            .insert<BaseAttachmentType>('AttachmentType', attachmentType)
            .subscribe((res) => this.table.addTransaction(attachmentType));
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
    ] as DialogFormConfig[];
  }

  onCellValueChanged(event) {
    let updatedData: BaseAttachmentType = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      updatedData.isActive = value === 'فعال' ? true : false;
    }
    this.basicService
      .update<BaseAttachmentType>('AttachmentType', updatedData)
      .subscribe(() => this.table.updateTransaction(updatedData));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
