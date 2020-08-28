import {
  Component,
} from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import * as moment from 'jalali-moment';

@Component({
  selector: 'cell-datepicker',
  templateUrl: './cell-datepicker.component.html',
  styleUrls: ['./cell-datepicker.component.scss'],
})
export class CellDatepickerComponent implements ICellEditorAngularComp {
  params: any;
  date= {};
  value;
  agInit(params: any): void {
    this.params = params;
    this.value=moment(new Date(params.value));

  }

  getValue(): any {
    return this.date;
  }

  isPopup(): boolean {
    return true;
  }

  onChange(event) {
    this.date={
      selectedDate: event.date._d,
      rowData: this.params.data,
    }
    this.params.onChange(this.date);
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
