import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { BaseCity, BaseState } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseCity[]>;
  availabeStates: BaseState[];
  columnDefs: ColDef[];

  constructor(
    private basicService: BasicService,
    private dialogFormService: DialogFormService
  ) {}

  ngOnInit() {
    this.generateColumns();
  }

  async generateColumns() {
    this.rowData$ = this.basicService.select<BaseCity>('City');
    this.availabeStates = await this.basicService
      .select<BaseState>('State')
      .toPromise();

    this.columnDefs = [
      {
        field: 'title',
        headerName: 'عنوان',
      },
      {
        field: 'stateId',
        headerName: 'استان',
        cellRenderer: (params) => {
          return this.stateCellRenderer(params);
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.availabeStates.map((state) => state.title),
        },
        onCellValueChanged: (params) => {
          params.data.stateId = getByTitleCellRenderer(
            params.data.stateId,
            this.availabeStates
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

  stateCellRenderer(params) {
    return getByIdCellRenderer(params.data.stateId, this.availabeStates);
  }

  addCity() {
    this.dialogFormService
      .show('افزودن شهر', this.formConfig())
      .onClose.subscribe((city: BaseCity) => {
        if (city)
          this.basicService
            .insert<BaseCity>('City', city)
            .subscribe((res) => this.table.addTransaction(city));
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
        dropdownItems: this.availabeStates.map((state) => {
          return { label: state.title, value: state.id };
        }),
        label: 'استان',
        labelWidth: 60,
        formControlName: 'stateId',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ] as DialogFormConfig[];
  }

  onCellValueChanged(event) {
    let updatedData: BaseCity = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('City', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('City', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
      this.basicService
        .update<BaseCity>('City', updatedData)
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
