import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import {
  BaseAttribute,
  BaseAttributeCategory,
  BaseAttributeType,
  BaseAttributeValue,
} from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { ColDef } from 'ag-grid-community';
import * as moment from 'jalali-moment';
@Component({
  selector: 'attributes',
  templateUrl: './attributes.page.html',
  styleUrls: ['./attributes.page.scss'],
})
export class AttributesPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseAttribute[]>;
  columnDefs: ColDef[];

  availableAttributeTypes: BaseAttributeType[];
  availableAttributeCategories: BaseAttributeCategory[];
  availableAttributeValues: BaseAttributeValue[];

  showAttributeValueDialog = false;
  attribute: BaseAttribute;
  attributeType: string;
  attributeValue: any;

  constructor(
    private basicService: BasicService,
    private dialogFormService: DialogFormService
  ) {}

  ngOnInit(): void {
    this.generateColumns();
  }

  async generateColumns() {
    this.rowData$ = this.basicService.select<BaseAttribute>('Attribute');
    this.availableAttributeCategories = await this.basicService
      .select<BaseAttributeCategory>('AttributeCategory')
      .toPromise();
    this.availableAttributeTypes = await this.basicService
      .select<BaseAttributeType>('AttributeType')
      .toPromise();
    this.columnDefs = [
      {
        field: 'title',
        headerName: 'عنوان',
      },
      {
        field: 'attributeCategoryId',
        headerName: 'دسته بندی فیلد',
        cellRenderer: (params) => {
          return this.attributeCategoryCellRenderer(params);
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.availableAttributeCategories.map((c) => c.title),
        },
        filter: false,
        sortable: false,
        onCellValueChanged: (params) => {
          params.data.attributeCategoryId = getByTitleCellRenderer(
            params.data.attributeCategoryId,
            this.availableAttributeCategories
          );
        },
      },
      {
        field: 'attributeTypeId',
        headerName: 'نوع فیلد',
        cellRenderer: (params) => {
          return this.attributeTypeCellRenderer(params);
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.availableAttributeTypes.map((t) => t.title),
        },
        filter: false,
        sortable: false,
        onCellValueChanged: (params) => {
          params.data.attributeTypeId = getByTitleCellRenderer(
            params.data.attributeTypeId,
            this.availableAttributeTypes
          );
        },
      },
      // {
      //   field: 'isActive',
      //   headerName: 'وضعیت',
      //   filter: false,
      //   sortable: false,
      //   cellEditor: 'agSelectCellEditor',
      //   cellEditorParams: {
      //     values: ['فعال', 'غیرفعال'],
      //   },
      //   cellRenderer: this.activityCellRenderer,
      // },
      {
        field: 'isRequired',
        headerName: 'الزامی',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['فعال', 'غیرفعال'],
        },
        filter: false,
        sortable: false,
        cellRenderer: this.requiredCellRenderer,
      },
      {
        field: 'isSystem',
        headerName: 'سیستمی',
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['فعال', 'غیرفعال'],
        },
        filter: false,
        sortable: false,
        cellRenderer: this.systemicCellRenderer,
      },
    ];
  }

  attributeTypeCellRenderer(params) {
    return getByIdCellRenderer(
      params.data.attributeTypeId,
      this.availableAttributeTypes
    );
  }

  attributeCategoryCellRenderer(params) {
    return getByIdCellRenderer(
      params.data.attributeCategoryId,
      this.availableAttributeCategories
    );
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
            .subscribe((res) => {
              this.table.addTransaction(attribute);
              this.generateColumns();
            });
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
          .activate('Attribute', updatedData.id)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('Attribute', updatedData.id)
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

  async onActionClick(event) {
    this.availableAttributeValues = await this.basicService
      .select<BaseAttributeValue>('AttributeValue')
      .toPromise();
    this.attribute = event.rowData as BaseAttribute;
    this.attributeType = this.availableAttributeTypes.find(
      (a) => a.id == event.rowData.attributeTypeId
    ).title;
    this.attributeValue = this.availableAttributeValues.filter(
      (a) => a.attributeId == event.rowData.id
    );
    switch (this.attributeType) {
      case 'Text':
      case 'Text Area':
      case 'Number':
        this.dialogFormService
          .show('ثبت مقدار اولیه', [
            {
              type: 'text',
              value: this.attributeValue[0]?.value,
              formControlName: 'attributeValue',
            },
          ])
          .onClose.subscribe((value) => {
            if (value) this.onChangeAttributeValue(value.attributeValue);
          });
        break;
      case 'Date':
        this.dialogFormService
          .show('ثبت مقدار اولیه', [
            {
              type: 'date-picker',
              value: moment(this.attributeValue[0]?.value, 'jYYYY-jMM-jDD'),
              formControlName: 'attributeValue',
            },
          ])
          .onClose.subscribe((value) => {
            if (value?.attributeValue) {
              let date =
                value.attributeValue.year +
                '/' +
                value.attributeValue.month +
                '/' +
                value.attributeValue.day;
              this.onChangeAttributeValue(date);
            }
          });
        break;
      case 'CheckBox':
      case 'Select':
      case 'Multi Select':
        this.showAttributeValueDialog = true;
        break;
    }
  }

  onChangeAttributeValue(value) {
    const attributeValue = {
      attributeId: this.attribute.id,
      value: value,
    } as BaseAttributeValue;
    if (this.attributeValue.length == 0)
      this.basicService
        .insert<BaseAttributeValue>('AttributeValue', attributeValue)
        .subscribe();
    else {
      attributeValue.id = this.attributeValue[0].id;
      this.basicService
        .update<BaseAttributeValue>('AttributeValue', attributeValue)
        .subscribe();
    }
  }

  onRemoveTag(args) {
    let attributeValue = this.attributeValue.find(
      (a) => a.value == args.deletedTag
    );
    // this.basicService
    // .insert<BaseAttributeValue>('AttributeValue', attributeValue)
    // .subscribe();
  }

  onAddTag(args) {
    const attributeValue = {
      attributeId: this.attribute.id,
      value: args.addedTag,
    } as BaseAttributeValue;
    this.basicService
      .insert<BaseAttributeValue>('AttributeValue', attributeValue)
      .subscribe();
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
        dropdownItems: this.availableAttributeCategories.map(
          (attributeCategory) => {
            return {
              label: attributeCategory.title,
              value: attributeCategory.id,
            };
          }
        ),
        formControlName: 'attributeCategoryId',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'dropdown',
        label: 'نوع',
        dropdownItems: this.availableAttributeTypes.map((attributeType) => {
          return {
            label: attributeType.title,
            value: attributeType.id,
          };
        }),
        labelWidth: 60,
        formControlName: 'attributeTypeId',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'checkbox',
        label: 'الزامی باشد',
        labelWidth: 60,
        formControlName: 'isRequired',
      },
      {
        type: 'checkbox',
        label: 'سیستمی باشد',
        labelWidth: 60,
        formControlName: 'isSystem',
      },
      {
        type: 'hidden',
        value: true,
        formControlName: 'isActive',
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
