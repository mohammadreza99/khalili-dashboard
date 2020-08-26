import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewContainerRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { PrimeConfirmService } from '../../prime-service/prime-confirm.service';
import { PrimeTableColumn } from '../../prime-model/prime-table-column.model';
import { PrimeTreeSelectionMode } from '../../prime-type/prime-tree';
import { PrimeTableAction } from '../../prime-model/prime-table-action.model';
import { PrimeTreeTable } from '../../prime-model/prime-tree-table.model';
import { PrimeDirection } from '../../prime-type/prime-direction';

@Component({
  selector: 'prm-tree-table',
  templateUrl: './prime-tree-table.component.html',
  styleUrls: ['./prime-tree-table.component.scss'],
})
export class PrimeTreeTableComponent implements OnInit {
  constructor(
    private cd: ChangeDetectorRef,
    private confirmer: PrimeConfirmService,
    private vcRef: ViewContainerRef
  ) {}

  @ViewChild('table', { static: true }) table: any;
  @Input() items: PrimeTreeTable[];
  @Input() columns: PrimeTableColumn[];
  @Input() hasSearchInput: boolean = true;
  @Input() paginator: boolean = true;
  @Input() paginatorRows: number = 10;
  @Input() layout: PrimeDirection = 'ltr';
  @Input() rowsPerPageOptions: any[] = [10, 20, 30];
  @Input() sortable: boolean = true;
  @Input() selectionMode: PrimeTreeSelectionMode = null;
  @Input() showDeleteAction: boolean = true;
  @Input() actions: PrimeTableAction[] = [];
  @Output() rowSelected = new EventEmitter();
  @Output() actionClick = new EventEmitter();

  cols: any[];
  options = [];
  hasFilter: boolean = false;
  filteredList: any[];
  selectedNodes: PrimeTreeTable[];
  actionsWidth: number;
  isEmpty: boolean = false;

  ngOnInit() {
    for (const col of this.columns)
      if (col.filterType) {
        this.hasFilter = true;
        break;
      }
    this.cols = this.createColumnsValue();
    let actionsWidth = this.showDeleteAction
      ? this.actions.length + 1
      : this.actions.length;
    if (this.actions) this.actionsWidth = actionsWidth * 4;
    this.checkTableIsEmpty();
  }

  ngOnChanges() {
    this.cd.detectChanges();
  }

  checkTableIsEmpty() {
    if (
      this.items == undefined ||
      this.items.length == 0 ||
      (this.filteredList != undefined && this.filteredList.length == 0)
    )
      this.isEmpty = true;
    else this.isEmpty = false;
    this.cd.detectChanges();
  }

  createColumnsValue() {
    let cols = [];
    for (let i = 0; i < this.columns.length; i++) {
      let col = this.columns[i];
      if (!col.field) Object.assign(col, { field: 'title' });
      if (!col.optionsLabel) Object.assign(col, { optionsLabel: 'همه' });
      if (!col.type) Object.assign(col, { type: 'string' });
      this.options = [];
      this.getColOptions(col, this.items);
      Object.assign(col, { options: this.options });
      cols.push(col);
    }
    return cols;
  }

  getColOptions(col, items) {
    for (const item of items) {
      let option = {
        label: item.data[col.field].toString(),
        value: item.data[col.field],
      };
      let isDuplicate: boolean = false;
      for (const o of this.options)
        if (o.label == option.label) isDuplicate = true;
      if (!isDuplicate) this.options.push(option);
      if (item.children) this.getColOptions(col, item.children);
    }
  }

  filterTable(args, col) {
    switch (col.filterType) {
      case 'input': {
        this.table.filter(args, col.field, col.filterMatchMode);
        break;
      }
      case 'range': {
        let array = [];
        for (let i = args.values[0]; i <= args.values[1]; i++) array.push(i);
        this.table.filter(array, col.field, 'in');
        break;
      }
      case 'dropdown': {
        this.table.filter(args, col.field, 'equals');
        break;
      }
      case 'multiSelect': {
        this.table.filter(args.value, col.field, 'in');
        break;
      }
      default: {
        this.table.filterGlobal(args, 'contains');
      }
    }

    this.table.onFilter.subscribe((list) => {
      this.filteredList = list.filteredValue;
      this.checkTableIsEmpty();
    });
  }

  onAllNodesClick() {
    this.rowSelected.emit(this.selectedNodes);
  }

  nodeSelect() {
    this.rowSelected.emit(this.selectedNodes);
  }

  nodeUnselect() {
    this.rowSelected.emit(this.selectedNodes);
  }

  onNodeDelete(args) {
    this.confirmer.deletionConfirm(this.vcRef).then(() => {
      let index;
      for (let i = 0; i < this.items.length; i++)
        if (this.items[i].data == args) index = i;

      this.actionClick.emit({ row: args, action: 'حذف' });
      this.items.splice(index, 1);
      this.cd.detectChanges();
      if (this.items.length == 0) this.isEmpty = true;
    });
  }

  onActionClick(row: any, action: string) {
    this.actionClick.emit({ row: row, action: action });
  }
}
