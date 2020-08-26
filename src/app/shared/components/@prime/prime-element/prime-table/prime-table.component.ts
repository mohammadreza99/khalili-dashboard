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
import { Table } from 'primeng';
import * as moment from 'jalali-moment';

import { PrimeConfirmService } from '../../prime-service/prime-confirm.service';
import { PrimeTableColumn } from '../../prime-model/prime-table-column.model';
import { PrimeTreeSelectionMode } from '../../prime-type/prime-tree';
import { PrimeTableAction } from '../../prime-model/prime-table-action.model';
import { PrimeDirection } from '../../prime-type/prime-direction';

@Component({
  selector: 'prm-table',
  templateUrl: './prime-table.component.html',
  styleUrls: ['./prime-table.component.scss'],
})
export class PrimeTableComponent implements OnInit {
  constructor(
    private cd: ChangeDetectorRef,
    private confirmer: PrimeConfirmService,
    private vcRef: ViewContainerRef
  ) {}

  @ViewChild('table', { static: true }) table: Table;
  @Input()
  get items() {
    return this._items;
  }
  set items(value: any[]) {
    this._items = value;
  }
  @Input() columns: PrimeTableColumn[];
  @Input() hasSearchInput = true;
  @Input() paginator = false;
  @Input() paginatorRows: number = 4;
  @Input() rowsPerPageOptions: any[];
  @Input() showRowIndex = false;
  @Input() sortable = true;
  @Input() selectionMode: PrimeTreeSelectionMode = null;
  @Input() layout: PrimeDirection = 'rtl';
  @Input() actions: PrimeTableAction[] = [];
  @Input() showDeleteAction: boolean = false;
  @Output() rowSelected = new EventEmitter();
  @Output() actionClick = new EventEmitter();
  @Output() rowClick = new EventEmitter();
  @Output() listItemClick = new EventEmitter();

  _items = [];
  data = [];
  cols: any[];
  hasFilter: boolean = false;
  filteredList: any[];
  selectedRows = [];
  rowsNumber = [];
  actionsWidth: number;
  isEmpty: boolean = false;

  ngOnInit() {
    for (const col of this.columns)
      if (col.filterType) {
        this.hasFilter = true;
        break;
      }
    setTimeout(() => {
      for (let i = 1; i <= this.table?.value?.length; i++)
        this.rowsNumber.push(i);
    }, 10);
    this.cols = this.createColumnsValue();
    let actionsWidth = this.showDeleteAction
      ? this.actions.length + 1
      : this.actions.length;
    if (this.actions) this.actionsWidth = actionsWidth * 4;
    this.checkTableIsEmpty();
  }

  ngOnChanges() {
    if (this.items)
      for (let i = 0; i < this.items.length; i++) {
        if (typeof this.items[0] == 'string') {
          this.data.push({ title: this.items[i] });
        } else {
          this.data[i] = this.items[i];
        }
        Object.assign(this.data[i], { index: i + 1 });
      }
  }

  createColumnsValue() {
    let cols = [];
    for (let i = 0; i < this.columns.length; i++) {
      let col = this.columns[i];
      let options = [];
      if (!col.field) Object.assign(col, { field: 'title' });
      if (!col.optionsLabel) Object.assign(col, { optionsLabel: 'همه' });
      if (!col.type) Object.assign(col, { type: 'string' });

      for (const item of this.data) {
        if (this.splitProperties(col.field)) col.filterType = '';
        else options.push(...this.createFilterOptions(item[col.field]));
      }
      Object.assign(col, { options: options });
      cols.push(col);
    }
    return cols;
  }

  createFilterOptions(item) {
    let options = [];
    let option;
    option = {
      label: item,
      value: item,
    };
    if (option.label == true || option.label == 'true') option.label = 'بله';
    if (option.label == false || option.label == 'false') option.label = 'خیر';

    let isDuplicate: boolean = false;
    for (const o of options) if (o.label == option.label) isDuplicate = true;
    if (!isDuplicate) options.push(option);
    return options;
  }

  checkTableIsEmpty() {
    if (
      this.data == undefined ||
      this.data == null ||
      this.data.length == 0 ||
      (this.filteredList != undefined && this.filteredList.length == 0)
    )
      this.isEmpty = true;
    else this.isEmpty = false;
    this.cd.detectChanges();
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
        this.table.filter(args, col.field, 'in');
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

  sortIndex() {
    this.rowsNumber = [];
    let order = this.table.multiSortMeta[0].order;
    let rowsCount;
    if (this.table.filteredValue == null) rowsCount = this.table.value.length;
    else rowsCount = this.table.filteredValue.length;
    if (order == 1)
      for (let i = 1; i <= rowsCount; i++) this.rowsNumber.push(i);
    else for (let i = rowsCount; i >= 1; i--) this.rowsNumber.push(i);
  }

  onRowClick(row) {
    this.rowClick.emit(row);
  }

  onAllRowSelect() {
    this.rowSelected.emit(this.selectedRows);
  }

  onRowSelect(args) {
    this.rowSelected.emit(this.selectedRows);
  }

  onRowUnselect(args) {
    this.rowSelected.emit(this.selectedRows);
  }

  onRowDelete(args) {
    this.confirmer.deletionConfirm(this.vcRef).then(() => {
      let index = this.data.indexOf(args);
      this.actionClick.emit({ row: args, action: 'حذف' });
      this.data.splice(index, 1);
      if (this.data.length == 0) this.isEmpty = true;
    });
  }

  onActionClick(row: any, text: string) {
    this.actionClick.emit({ row: row, action: text });
  }

  getField(item, colField, index) {
    return this.generateObject(
      item[this.splitProperties(colField)[0]],
      this.splitProperties(colField),
      index
    );
  }

  splitProperties(item: string) {
    if (item.split('.').length > 1) return item.split('.');
    else undefined;
  }

  getDate(m) {
    let date = moment(m);
    return `${date.jYear()}/${date.jMonth() + 1}/${date.jDate()}`;
  }

  generateObject(object, objectProperties, i) {
    let _object;
    if (this.isArray(object)) _object = object[i];
    else _object = object;
    for (let i = 1; i < objectProperties.length; i++)
      _object = _object[objectProperties[i]];
    return _object;
  }

  isArray(item) {
    if (item instanceof Array) return true;
    else return false;
  }

  onListItemClick(item, row) {
    this.listItemClick.emit({
      row: row,
      item: item,
    });
  }
}
