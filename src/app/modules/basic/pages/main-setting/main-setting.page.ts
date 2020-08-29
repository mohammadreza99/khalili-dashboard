import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { SiteMainPage } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'main-setting',
  templateUrl: './main-setting.page.html',
  styleUrls: ['./main-setting.page.scss'],
})
export class MainSettingPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<SiteMainPage[]>;
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
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.basicService.select<SiteMainPage>('MainPage');
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  onCellValueChanged(event) {
    let updatedData: SiteMainPage = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('MainPage', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('MainPage', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    }
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
