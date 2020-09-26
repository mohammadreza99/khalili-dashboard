import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import * as moment from 'jalali-moment';

@Component({
  selector: 'cell-datepicker',
  templateUrl: './cell-datepicker.component.html',
  styleUrls: ['./cell-datepicker.component.scss'],
})
export class CellDatepickerComponent implements ICellRendererAngularComp {
  params: any;
  showDialog = false;
  cellValue: any;
  datepickerValue;
  editable = false;

  agInit(params): void {
    this.params = params;
    this.editable = params.editable;
    const field = params.colDef.field;
    this.cellValue = moment(new Date(params.data[field])).format(
      'jYYYY/jMM/jDD'
    );
    this.datepickerValue = moment(this.cellValue);
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick(event) {
    this.showDialog = true;
  }

  dateChange(event) {
    const selectedDate = event.date._d as Date;
    this.showDialog = false;
    this.cellValue = moment(selectedDate).format('jYYYY/jMM/jDD');
    selectedDate.setDate(selectedDate.getDate() + 1);
    const result = {
      selectedDate: selectedDate.toISOString(),
      rowData: this.params.data,
    };
    this.params.onChange(result);
  }
}
