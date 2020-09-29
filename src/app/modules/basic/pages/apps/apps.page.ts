import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogFormService } from '@app/services/dialog-form.service';
import { TableComponent } from '@app/shared/components/table/table.component';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { Observable } from 'rxjs';
import { BasicService } from '../../business/basic.service';
import { BaseApplication } from '../../model/basic.model';

@Component({
  selector: 'apps',
  templateUrl: './apps.page.html',
  styleUrls: ['./apps.page.scss'],
})
export class AppsPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseApplication[]>;
  columnDefs = [
    {
      field: 'title',
      headerName: 'عنوان',
    },
    {
      field: 'link',
      headerName: 'لینک',
    },
    {
      field: 'alt',
      headerName: 'alt',
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
    this.rowData$ = this.basicService.select<BaseApplication>('Application');
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  addApplication() {
    this.dialogFormService
      .show('افزودن دسته بندی سوالات متداول', this.formConfig())
      .onClose.subscribe((application: BaseApplication) => {
        if (application)
          this.basicService
            .insert<BaseApplication>('Application', application)
            .subscribe((res) => this.table.addTransaction(application));
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
        label: 'لینک',
        labelWidth: 60,
        formControlName: 'link',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'alt',
        labelWidth: 60,
        formControlName: 'alt',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'image-picker',
        label: 'عکس',
        labelWidth: 60,
        formControlName: 'icon',
      },
      {
        type: 'hidden',
        value: true,
        formControlName: 'isActive',
      },
    ] as DialogFormConfig[];
  }

  onImageSelect(event) {
    const f: BaseApplication = {
      id: event.rowData.id,
      title: event.rowData.title,
      link: event.rowData.link,
      alt: event.rowData.alt,
      icon: event.file,
      isActive: event.rowData.isActive,
    };

    this.basicService
      .update<BaseApplication>('Application', f)
      .subscribe(() => this.table.updateTransaction(f));
  }

  onCellValueChanged(event) {
    let updatedData: BaseApplication = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('Application', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('Application', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
      this.basicService
        .update<BaseApplication>('Application', updatedData)
        .subscribe(() => this.table.updateTransaction(updatedData));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
