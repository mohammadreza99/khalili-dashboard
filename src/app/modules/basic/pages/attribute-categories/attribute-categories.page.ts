import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { BaseAttributeCategory } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'attribute-categories',
  templateUrl: './attribute-categories.page.html',
  styleUrls: ['./attribute-categories.page.scss'],
})
export class AttributeCategoriesPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseAttributeCategory[]>;
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
    this.rowData$ = this.basicService.select<BaseAttributeCategory>(
      'AttributeCategory'
    );
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  addAttributeCategory() {
    this.dialogFormService
      .show('افزودن دسته بندی فیلد', this.formConfig())
      .onClose.subscribe((attributeCategory: BaseAttributeCategory) => {
        if (attributeCategory)
          this.basicService
            .insert<BaseAttributeCategory>(
              'AttributeCategory',
              attributeCategory
            )
            .subscribe((res) => this.table.addTransaction(attributeCategory));
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
        type: 'hidden',
        value: true,
        formControlName: 'isActive',
      },
    ];
  }

  onCellValueChanged(event) {
    let updatedData: BaseAttributeCategory = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('AttributeCategory', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('AttributeCategory', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
    this.basicService
      .update<BaseAttributeCategory>('AttributeCategory', updatedData)
      .subscribe(() => this.table.updateTransaction(updatedData));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
