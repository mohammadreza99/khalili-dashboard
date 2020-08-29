import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { BaseBrand } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'brands',
  templateUrl: './brands.page.html',
  styleUrls: ['./brands.page.scss'],
})
export class BrandsPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseBrand[]>;
  columnDefs = [
    {
      field: 'title',
      headerName: 'عنوان فارسی',
    },
    {
      field: 'titleEn',
      headerName: 'عنوان لاتین',
    },
    {
      field: 'isOrginal',
      headerName: 'اورجینال',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['فعال', 'غیرفعال'],
      },
      cellRenderer: this.orginallyCellRenderer,
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
    this.rowData$ = this.basicService.select<BaseBrand>('Brand');
  }

  addBrand() {
    this.dialogFormService
      .show('افزودن برند', this.formConfig())
      .onClose.subscribe((brand: BaseBrand) => {
        if (brand)
          this.basicService
            .insert<BaseBrand>('Brand', brand)
            .subscribe((res) => this.table.addTransaction(brand));
      });
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  orginallyCellRenderer(params) {
    return booleanCellRenderer(params.data.isOrginal);
  }

  formConfig(): DialogFormConfig[] {
    return [
      {
        type: 'text',
        label: 'عنوان فارسی',
        labelWidth: 60,
        formControlName: 'title',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'عنوان لاتین',
        labelWidth: 60,
        formControlName: 'titleEn',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'hidden',
        formControlName: 'isActive',
        value: true,
      },
      {
        type: 'hidden',
        formControlName: 'isOrginal',
        value: true,
      },
      {
        type: 'hidden',
        value: true,
        formControlName: 'isActive',
      },
    ] as DialogFormConfig[];
  }

  onCellValueChanged(event) {
    let updatedData: BaseBrand = event.data;
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
      if (field == 'isOrginal') {
        updatedData.isOrginal = value === 'فعال' ? true : false;
      }
      this.basicService
        .update<BaseBrand>('Brand', updatedData)
        .subscribe(() => this.table.updateTransaction(updatedData));
    }
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
