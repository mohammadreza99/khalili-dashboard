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
  public happy: boolean = false;

  agInit(params: any): void {
    this.params = moment(params.value, 'YYYY/MM/DD').locale('fa');
  }

  getValue(): any {
    return { salam: 'salam' };
  }

  isPopup(): boolean {
    return true;
  }

  onChange(event) {}
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
