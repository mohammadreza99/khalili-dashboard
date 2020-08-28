import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import * as moment from 'jalali-moment';

@Component({
  selector: 'cell-datepicker',
  templateUrl: './cell-datepicker.component.html',
  styleUrls: ['./cell-datepicker.component.scss'],
})
export class CellDatepickerComponent implements ICellEditorAngularComp {
  params: any;
  a = {};
  value;
  agInit(params: any): void {
    this.params = params;
    // this.value = moment(
    //   moment(params.value, 'jYYYY/jMM/jDD').format('jYYYY-jMM-jDD')
    // );
    // console.log(this.params);
    // console.log(this.value);
  }

  getValue(): any {
    return this.a;
  }

  isPopup(): boolean {
    return true;
  }

  onChange(event) {
    this.a={
      selectedDate: event.date._d,
      rowData: this.params.data,
    }
    this.params.onChange(this.a);
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
