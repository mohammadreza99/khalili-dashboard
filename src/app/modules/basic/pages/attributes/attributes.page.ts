import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { BaseAttribute, BaseAttachmentType } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'attributes',
  templateUrl: './attributes.page.html',
  styleUrls: ['./attributes.page.scss'],
})
export class AttributesPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseAttribute[]>;
  columnDefs = [
    {
      field: 'title',
      headerName: 'عنوان',
    },
    {
      field: 'attributeCategoryId',
      headerName: 'دسته بندی فیلد',
      cellRenderer: this.attributeCategoryCellRenderer,
    },
    {
      field: 'attributeTypeId',
      headerName: 'نوع فیلد',
    },
    {
      field: 'isActive',
      headerName: 'وضعیت',
      cellRenderer: this.activityCellRenderer,
    },
    {
      field: 'isRequired',
      headerName: 'الزامی',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['فعال', 'غیرفعال'],
      },
      cellRenderer: this.requiredCellRenderer,
    },
    {
      field: 'isSystem',
      headerName: 'سیستمی',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['فعال', 'غیرفعال'],
      },
      cellRenderer: this.systemicCellRenderer,
    },
  ];

  // availableFieldTypes: BaseAttributeType[];
  // availableFieldCategories: BaseAttachmentCategory[];
  constructor(
    private basicService: BasicService,
    private dialogFormService: DialogFormService
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.basicService.select<BaseAttribute>('Attribute');
  }

  attributeCategoryCellRenderer(params) {
    return params.data.attributeCategoryId;
  }

  systemicCellRenderer(params) {
    return booleanCellRenderer(params.data.isSystem);
  }

  requiredCellRenderer(params) {
    return booleanCellRenderer(params.data.isRequired);
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  addAttribute() {
    this.dialogFormService
      .show('افزودن فیلد', this.formConfig())
      .onClose.subscribe((attribute: any) => {
        if (attribute)
          this.basicService
            .insert<BaseAttribute>('Attribute', attribute)
            .subscribe((res) => this.table.addTransaction(attribute));
      });
  }

  onCellValueChanged(event) {
    let updatedData: BaseAttribute = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('Attribute', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('Attribute', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else {
      if (field == 'isRequired') {
        updatedData.isRequired = value === 'فعال' ? true : false;
      }
      if (field == 'isSystem') {
        updatedData.isSystem = value === 'فعال' ? true : false;
      }
      this.basicService
        .update<BaseAttribute>('Attribute', updatedData)
        .subscribe(() => this.table.updateTransaction(updatedData));
    }
  }

  formConfig(): DialogFormConfig[] {
    const config: DialogFormConfig[] = [
      {
        type: 'text',
        label: 'عنوان',
        labelWidth: 60,
        formControlName: 'title',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'dropdown',
        label: 'دسته بندی',
        labelWidth: 60,
        dropdownItems: [{ label: '1', value: '1' }],
        formControlName: 'category',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'dropdown',
        label: 'نوع',
        dropdownItems: [{ label: '1', value: '1' }],
        labelWidth: 60,
        formControlName: 'type',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'checkbox',
        label: 'الزامی باشد',
        labelWidth: 60,
        formControlName: 'isRequired',
      },
    ];
    return config;
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
