import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { BaseDistrict, BaseCity } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { ColDef } from 'ag-grid-community';
@Component({
  selector: 'districts',
  templateUrl: './districts.page.html',
  styleUrls: ['./districts.page.scss']
})
export class DistrictsPage implements OnInit {

  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseDistrict[]>;
  availabeCitys: BaseCity[];
  columnDefs: ColDef[];

  constructor(
    private basicService: BasicService,
    private dialogFormService: DialogFormService
  ) {}

  ngOnInit() {
    this.generateColumns();
  }

  async generateColumns() {
    this.rowData$ = this.basicService.select<BaseDistrict>('District');
    this.availabeCitys = await this.basicService
      .select<BaseCity>('City')
      .toPromise();

    this.columnDefs = [
      {
        field: 'title',
        headerName: 'عنوان',
      },
      {
        field: 'cityId',
        headerName: 'شهر',
        cellRenderer: (params) => {
          return this.cityCellRenderer(params);
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.availabeCitys.map((city) => city.title),
        },
        onCellValueChanged: (params) => {
          params.data.cityId=getByTitleCellRenderer(params.data.cityId,this.availabeCitys);
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

  cityCellRenderer(params) {
    return getByIdCellRenderer(params.data.cityId, this.availabeCitys);
  }

  addDistrict() {
    this.dialogFormService
      .show('افزودن ناحیه', this.formConfig())
      .onClose.subscribe((district: BaseDistrict) => {
        if (district)
          this.basicService
            .insert<BaseDistrict>('District', district)
            .subscribe((res) => this.table.addTransaction(district));
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
        type: 'dropdown',
        dropdownItems: this.availabeCitys.map((city) => {
          return { label: city.title, value: city.id };
        }),
        label: 'شهر',
        labelWidth: 60,
        formControlName: 'cityId',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ] as DialogFormConfig[];
  }

  onCellValueChanged(event) {
    let updatedData: BaseDistrict = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('District', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('District', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
      this.basicService
        .update<BaseDistrict>('District', updatedData)
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
