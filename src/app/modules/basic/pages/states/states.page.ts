import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { BaseState } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'states',
  templateUrl: './states.page.html',
  styleUrls: ['./states.page.scss'],
})
export class StatesPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<BaseState[]>;
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
    this.rowData$ = this.basicService.select<BaseState>('State');
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  addState() {
    this.dialogFormService
      .show('افزودن استان', this.formConfig())
      .onClose.subscribe((state: BaseState) => {
        if (state)
          this.basicService
            .insert<BaseState>('State', state)
            .subscribe((res) => this.table.addTransaction(state));
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
    ] as DialogFormConfig[];
  }

  onCellValueChanged(event) {
    let updatedData: BaseState = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('State', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('State', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
    this.basicService
      .update<BaseState>('State', updatedData)
      .subscribe(() => this.table.updateTransaction(updatedData));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
