import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'cell-button',
  templateUrl: './cell-button.component.html',
  styleUrls: ['./cell-button.component.scss'],
})
export class CellButtonComponent implements ICellRendererAngularComp {
  params: any;
  label: string;
  action: string;
  color: string;
  icon: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
    this.action = this.params.action || null;
    this.color = this.params.color || 'primary';
    this.icon = this.params.icon || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
        action: this.action,
      };
      this.params.onClick(params);
    }
  }
}
