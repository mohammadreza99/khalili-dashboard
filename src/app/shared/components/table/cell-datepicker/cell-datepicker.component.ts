import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'cell-datepicker',
  templateUrl: './cell-datepicker.component.html',
  styleUrls: ['./cell-datepicker.component.scss'],
})
export class CellDatepickerComponent implements ICellEditorAngularComp {
  private params: any;
  public happy: boolean = false;

  agInit(params: any): void {
    this.params = params;
    console.log(params);
    this.setHappy(params.value === 'Happy');
  }

  getValue(): any {
    return this.happy ? 'Happy' : 'Sad';
  }

  isPopup(): boolean {
    return true;
  }

  setHappy(happy: boolean): void {
    this.happy = happy;
  }

  onClick(happy: boolean) {
    this.setHappy(happy);
    this.params.api.stopEditing();
  }

  onChange(event) {
    console.log(event);
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
