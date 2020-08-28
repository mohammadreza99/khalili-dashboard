import {
  Component,
} from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import * as moment from 'jalali-moment';

@Component({
  selector: 'cell-timepicker',
  templateUrl: './cell-timepicker.component.html',
  styleUrls: ['./cell-timepicker.component.scss'],
})
export class CellTimepickerComponent implements ICellEditorAngularComp {
  params: any;
  time= {};
  value;
  agInit(params: any): void {
    this.params = params;
  }

  getValue(): any {
    console.log(this.time);

    return this.time;
  }

  isPopup(): boolean {
    return true;
  }

  onChange(event) {
    this.time={
      selectedDate: event.date._d,
      rowData: this.params.data,
    }
    this.params.onChange(this.time);
  }
}

// getValue() {
//   throw new Error("Method not implemented.");
// }
// isPopup?(): boolean {
//   throw new Error("Method not implemented.");
// }
// getPopupPosition?(): string {
//   throw new Error("Method not implemented.");
// }
// isCancelBeforeStart?(): boolean {
//   throw new Error("Method not implemented.");
// }
// isCancelAfterEnd?(): boolean {
//   throw new Error("Method not implemented.");
// }
// focusIn?(): void {
//   throw new Error("Method not implemented.");
// }
// focusOut?(): void {
//   throw new Error("Method not implemented.");
// }
// getFrameworkComponentInstance?() {
//   throw new Error("Method not implemented.");
// }
// agInit(params: ICellEditorParams): void {
//   throw new Error("Method not implemented.");
// }
// afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
//   throw new Error("Method not implemented.");
// }
