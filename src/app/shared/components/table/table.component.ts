import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef,
} from '@angular/core';
import { CellButtonComponent } from './cell-button/cell-button.component';
import { ColDef, GridOptions } from 'ag-grid-community';
import { CellImageComponent } from './cell-image/cell-image.component';
import { CellDatepickerComponent } from './cell-datepicker/cell-datepicker.component';
import { CellTimepickerComponent } from './cell-timepicker/cell-timepicker.component';

@Component({
  selector: 'ag-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public frameworkComponents = {
    buttonRenderer: CellButtonComponent,
    imageRenderer: CellImageComponent,
    datepickerEditor: CellDatepickerComponent,
    timepickerEditor: CellTimepickerComponent,
  };

  constructor() {}

  @Input() columnDefs: ColDef[];
  @Input() rowData: any;
  @Input() selectedRows: any[];
  @Input() rowSelection: 'multiple' | 'single' = null;
  @Input() enableFilter: boolean = true;
  @Input() enableSorting: boolean = true;
  @Input() pagination: boolean = false;
  @Input() actionsConfig: any[];
  @Input() components: any;
  @Input() imagesConfig: any[];
  @Input() defaultColDef: any = {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
    editable: true,
  };
  @Output() cellValueChanged = new EventEmitter();
  @Output() rowDeleted = new EventEmitter();
  @Output() actionClick = new EventEmitter();
  @Output() imageSelect = new EventEmitter();
  @Output() rowSelected = new EventEmitter();
  @Output() selectionChanged = new EventEmitter();

  ngOnInit(): void {
    if (this.actionsConfig) {
      this.actionsConfig.forEach((action) => {
        this.columnDefs.push({
          headerName: action.headerName,
          editable: false,
          filter: false,
          sortable: false,
          cellRenderer: 'buttonRenderer',
          cellRendererParams: {
            onClick: this.onActionClick.bind(this),
            action: action.action,
            label: action.label,
            icon: action.icon,
            color: action.color,
          },
        });
      });
    }

    if (this.imagesConfig) {
      this.imagesConfig.forEach((config) => {
        this.columnDefs.push({
          headerName: config.headerName,
          editable: false,
          filter: false,
          sortable: false,
          cellRenderer: 'imageRenderer',
          cellRendererParams: {
            onSelect: this.onSelectImage.bind(this),
            field: config.field,
          },
        });
      });
    }
  }

  onRowSelected(event) {
    this.rowSelected.emit(event);
  }

  onSelectionChanged(event) {
    this.selectionChanged.emit(event);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if (this.selectedRows) {
      this.gridApi.forEachNode((node) => {
        for (const n of this.selectedRows) {
          if (node.data === n) node.setSelected(true);
        }
      });
    }
  }

  onCellValueChanged(event) {
    this.cellValueChanged.emit(event);
  }

  addTransaction(entity: any) {
    this.gridApi.applyTransaction({ add: [entity] });
  }

  deleteTransaction(entity: any) {
    this.gridApi.applyTransaction({ remove: [entity] });
  }

  updateTransaction(entity: any) {
    this.gridApi.applyTransaction({ update: [entity] });
  }

  onActionClick(e: any) {
    this.actionClick.emit(e);
  }

  onSelectImage(e: any) {
    this.imageSelect.emit(e);
  }
}
