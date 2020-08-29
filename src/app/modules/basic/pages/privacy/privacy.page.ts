import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { SitePrivacy } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<SitePrivacy[]>;
  columnDefs = [
    {
      field: 'title',
      headerName: 'عنوان',
      editable: false,
    },
    {
      field: 'description',
      headerName: 'توضیحات',
      editable: false,
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
    this.rowData$ = this.basicService.select<SitePrivacy>('Privacy');
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  addPrivacy() {
    this.dialogFormService
      .show('افزودن حریم شخصی', this.formConfig(), '1000px')
      .onClose.subscribe((privacy: SitePrivacy) => {
        if (privacy)
          this.basicService
            .insert<SitePrivacy>('Privacy', privacy)
            .subscribe((res) => this.table.addTransaction(privacy));
      });
  }

  formConfig(value?: SitePrivacy): DialogFormConfig[] {
    return [
      {
        type: 'hidden',
        value: value?.id,
        formControlName: 'id',
      },
      {
        type: 'text',
        label: 'عنوان',
        labelWidth: 60,
        formControlName: 'title',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        value: value.title,
      },
      {
        type: 'editor',
        label: 'توضیحات',
        labelWidth: 60,
        value: value.description,
        formControlName: 'description',
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
    let updatedData: SitePrivacy = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('Privacy', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('Privacy', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
      this.basicService
        .update<SitePrivacy>('Privacy', updatedData)
        .subscribe(() => this.table.updateTransaction(updatedData));
  }

  onActionClick(event) {
    const data = event.rowData as SitePrivacy;
    switch (event.action) {
      case 'update':
        this.dialogFormService
          .show('ویرایش حریم شخصی', this.formConfig(data), '1500px')
          .onClose.subscribe((privacy: SitePrivacy) => {
            this.basicService
              .update<SitePrivacy>('Privacy', privacy)
              .subscribe((res) => {
                this.table.updateTransaction(privacy);
              });
          });
        break;
    }
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
