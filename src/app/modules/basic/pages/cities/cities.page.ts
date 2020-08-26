import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { BaseCity, BaseState } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { SelectItem } from 'primeng';

@Component({
  selector: 'cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseCity[]>;
  availabeStates: BaseState[];
  states$: Observable<BaseState[]>;
  columnDefs = [
    {
      field: 'title',
      headerName: 'عنوان',
    },
    {
      field: 'StateId',
      headerName: 'استان',
      cellRenderer: this.stateCellRenderer,
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
    this.rowData$ = this.basicService.select<BaseCity>('City');
    this.basicService.select<BaseState>('State').subscribe((states) => {
      this.availabeStates = states;
    });
    this.states$ = this.basicService.select<BaseState>('State');
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  stateCellRenderer(params) {
    return getByIdCellRenderer(params.data.stateId);
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
        label: 'شهر',
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
  console.log('tttttt');
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}

function getByIdCellRenderer(condtion: any) {
  console.log('rrrrrrrrrrrrrrr');
  console.log(this.states$);
  return 'test';
}
