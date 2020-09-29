import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import * as moment from 'jalali-moment';

@Component({
  selector: 'cell-timepicker',
  templateUrl: './cell-timepicker.component.html',
  styleUrls: ['./cell-timepicker.component.scss'],
})
export class CellTimepickerComponent implements ICellRendererAngularComp {
  params: any;
  showDialog = false;
  cellValue: any;
  timepickerValue;
  editable = false;
  selectedTime: any;

  agInit(params): void {
    this.params = params;
    this.editable = params.editable;
    const field = params.colDef.field;
    this.cellValue = moment(params.data[field], 'HH:mm:ss').format('HH:mm:ss');
    this.timepickerValue = moment(this.cellValue, 'HH:mm:ss');
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick(event) {
    this.showDialog = true;
  }

  timeChange(event) {
    this.selectedTime = event.date._d as Date;
  }

  submitTime() {
    this.showDialog = false;
    const result = {
      selectedDate: moment(this.selectedTime).format('HH:mm:ss'),
      rowData: this.params.data,
    };
    this.cellValue = moment(this.selectedTime).format('HH:mm:ss');
    this.params.onChange(result);
  }
}
