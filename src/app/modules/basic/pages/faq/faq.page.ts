import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { SiteFAQ, SiteFAQCategory } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { ColDef } from 'ag-grid-community';


@Component({
  selector: 'faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss']
})
export class FaqPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<SiteFAQ[]>;
  availabeFAQCategory: SiteFAQCategory[];
  columnDefs: ColDef[];

  constructor(
    private basicService: BasicService,
    private dialogFormService: DialogFormService
  ) {}

  ngOnInit() {
    this.generateColumns();
  }

  async generateColumns() {
    this.rowData$ = this.basicService.select<SiteFAQ>('FAQ');
    this.availabeFAQCategory = await this.basicService
      .select<SiteFAQCategory>('FAQCategory')
      .toPromise();

    this.columnDefs = [
      {
        field: 'FAQ',
        headerName: 'عنوان',
      },
      {
        field: 'answer',
        headerName: 'پاسخ',
      },
      {
        field: 'FAQCategoryId',
        headerName: 'دسته بندی',
        cellRenderer: (params) => {
          return this.FAQCategoryCellRenderer(params);
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.availabeFAQCategory.map((FAQCategory) => FAQCategory.title),
        },
        onCellValueChanged: (params) => {
          params.data.FAQCategoryId = getByTitleCellRenderer(
            params.data.FAQCategoryId,
            this.availabeFAQCategory
          );
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
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  FAQCategoryCellRenderer(params) {
    return getByIdCellRenderer(params.data.FAQCategoryId, this.availabeFAQCategory);
  }

  addFAQ() {
    this.dialogFormService
      .show('افزودن سوال', this.formConfig())
      .onClose.subscribe((faq: SiteFAQ) => {
        if (faq)
          this.basicService
            .insert<SiteFAQ>('FAQ', faq)
            .subscribe((res) => this.table.addTransaction(faq));
      });
  }

  formConfig(): DialogFormConfig[] {
    return [
      {
        type: 'text',
        label: 'عنوان',
        labelWidth: 60,
        formControlName: 'FAQ',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'پاسخ',
        labelWidth: 60,
        formControlName: 'answer',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'image-picker',
        label: 'تصویر',
        labelWidth: 60,
        formControlName: 'keyMedia',
      },
      {
        type: 'dropdown',
        dropdownItems: this.availabeFAQCategory.map((FAQCategory) => {
          return { label: FAQCategory.title, value: FAQCategory.id };
        }),
        label: 'دسته بندی',
        labelWidth: 60,
        formControlName: 'FAQCategoryId',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ] as DialogFormConfig[];
  }

  onCellValueChanged(event) {
    let updatedData: SiteFAQ = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('FAQ', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('FAQ', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
      this.basicService
        .update<SiteFAQ>('FAQ', updatedData)
        .subscribe(() => this.table.updateTransaction(updatedData));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}

function getByIdCellRenderer(condtion: any, items: any) {
  let value;
  items.forEach((item) => {
    if (item.id == condtion) value = item.title;
  });
  return value;
}

function getByTitleCellRenderer(condtion: any, items: any) {
  let value;
  items.forEach((item) => {
    if (item.title == condtion) value = item.id;
  });
  return value;
}
