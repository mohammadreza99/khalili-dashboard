import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { SiteTerms } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<SiteTerms[]>;
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
    this.rowData$ = this.basicService.select<SiteTerms>('Terms');
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  addTerms() {
    this.dialogFormService
      .show('افزودن مقررات', this.formConfig(), '1000px')
      .onClose.subscribe((terms: SiteTerms) => {
        if (terms)
          this.basicService
            .insert<SiteTerms>('Terms', terms)
            .subscribe((res) => this.table.addTransaction(terms));
      });
  }

  formConfig(value?: SiteTerms): DialogFormConfig[] {
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
        value: value.title,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'editor',
        label: 'توضیحات',
        labelWidth: 60,
        formControlName: 'description',
        value: value.description,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ] as DialogFormConfig[];
  }

  onCellValueChanged(event) {
    let updatedData: SiteTerms = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('Terms', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('Terms', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
      this.basicService
        .update<SiteTerms>('Terms', updatedData)
        .subscribe(() => this.table.updateTransaction(updatedData));
  }

  onActionClick(event) {
    const data = event.rowData as SiteTerms;
    switch (event.action) {
      case 'update':
        this.dialogFormService
          .show('ویرایش حریم شخصی', this.formConfig(data), '1500px')
          .onClose.subscribe((terms: SiteTerms) => {
            this.basicService
              .update<SiteTerms>('Terms', terms)
              .subscribe((res) => {
                this.table.updateTransaction(terms);
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
