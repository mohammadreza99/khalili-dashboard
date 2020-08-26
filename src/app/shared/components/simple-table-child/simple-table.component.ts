import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'simple-table-c',
  templateUrl: 'simple-table.component.html',
  styleUrls: ['simple-table.component.scss'],
  // providers: [WavesModule, TableModule]
})
export class SimpleTableCComponent implements AfterViewInit {
  _header: any = [];

  tdata: any;
  _data: any;
  @Input() set data(val) {
    this._data = val;

    this.pageIndex = 1;
    this.pagerIndex = 0;

    this.loadData();
  }
  @Input() id: string;

  iHeader: any[];
  @Input()
  set header(value) {
    this.hasChildExpand =
      value.filter(
        (x: any) => x.field.toLowerCase() == 'childExpand'.toLowerCase()
      ).length > 0;
    this.iHeader = value.filter(
      (x: any) => x.field.toLowerCase() != 'childExpand'.toLowerCase()
    );
    this.initHeader(value);
  }
  get header() {
    return this.iHeader;
  }
  @Input() searchBox: boolean = false;

  @Output() rowClick = new EventEmitter<any>();
  @Output() colClick = new EventEmitter<any>();
  @Output() printClick = new EventEmitter<any>();

  _pageSize: number = 20;
  @Input() set pageSize(val: number) {
    this._pageSize = val;

    this.loadData();
  }

  @Input() isPrint: boolean = false;

  hasChildExpand: boolean = false;

  totalCount: number = 0;
  pageIndex: number = 1;
  pageCount: number = 0;
  pagerSize: number = 5;
  pager: number[] = [];
  pagerIndex: number = 0;

  searchValue: string = '';
  selectedIndex: number = -1;
  selectedDetailIndex: number = -1;

  sortOrder: number = 1;
  sortColumn: number = 0;

  ngAfterViewInit() {
    setTimeout(() => {
      this.initHeader(this.header);
    });
  }

  initHeader(headers: any) {
    if (typeof headers !== 'undefined' && headers !== null) {
      if (Array.isArray(headers)) {
        this._header = headers
          .filter(
            (x) =>
              (x.hide == undefined || x.hide == null || x.hide == false) &&
              x.field.toLowerCase() != 'childExpand'.toLowerCase()
          )
          .map(function (val, i) {
            return {
              key: val.field,
              value: val.headerName,
              headerClass: val.headerClass,
              clickable: val.clickable,
            };
          });
      } else {
        this._header = Object.keys(headers).map(function (val) {
          return { key: val, value: headers[val] };
        });
      }
    }
  }

  loadData() {
    this.selectedIndex = -1;

    if (
      typeof this._data !== 'undefined' &&
      this._data !== null &&
      this._data.length > 0
    ) {
      if (typeof this.header === 'undefined') {
        this.initHeader(this._data.headers);
        this.tdata = this.filterData(this._data.rows);
      } else {
        this.tdata = this.filterData(this._data);
      }
      this.totalCount = this.tdata.length;
      this.pageCount = Math.ceil(this.totalCount / this._pageSize);

      this.generatePager();

      let sIndex = this.pageIndex * this._pageSize - this._pageSize;
      let eIndex = this.pageIndex * this._pageSize;
      this.tdata = this.tdata.slice(sIndex, eIndex);
    }
  }

  getCols(row: any): string[] {
    return this._header.map((h) => {
      return row[h.key];
    });
  }

  getColsDetail(row: any, rowIndex): string[] {
    return row.header.map((h) => {
      return row.data[rowIndex][h.field];
    });
  }

  getClassName(index: number) {
    return this._header[index].headerClass;
  }

  isArray(col: any) {
    return Array.isArray(col);
  }

  filterData(data: any): any {
    if (typeof data === 'undefined') {
      return [];
    } else if (this.searchValue !== null && this.searchValue !== '') {
      return data.filter((row) => {
        for (let f in row) {
          if (row[f].toString().includes(this.searchValue)) {
            return row;
          }
        }
      });
    } else {
      return data;
    }
  }

  setOrder(i: number) {
    const key: string = (this.iHeader[i] as any).field;

    this.sortColumn = i;
    if (this.sortOrder === 1) {
      this.sortOrder = 2;
    } else {
      this.sortOrder = 1;
    }

    if (this.sortOrder === 1) {
      this.tdata.sort((a, b) => {
        let ak = a[key];
        let bk = b[key];
        if (!Number.isNaN(ak)) {
          ak = Number(ak);
          bk = Number(bk);
        }
        if (ak < bk) return 1;
        if (ak > bk) return -1;
        return 0;
      });
    } else {
      this.tdata.sort((a, b) => {
        let ak = a[key];
        let bk = b[key];
        if (!Number.isNaN(ak)) {
          ak = Number(ak);
          bk = Number(bk);
        }
        if (bk < ak) return 1;
        if (bk > ak) return -1;
        return 0;
      });
    }
  }

  onSearchChange(searchValue: string) {
    this.searchValue = searchValue;
    this.loadData();
  }

  onRowClick(index: number, row: any) {
    this.selectedIndex = index;
    this.rowClick.emit(row);
  }

  setPage(index: number) {
    this.pageIndex = index;

    this.loadData();
  }

  setPager(next: boolean, index: number) {
    if (index > -1) {
      this.pagerIndex = index;
    } else {
      if (next) {
        if (this.pager.length >= this.pagerSize) {
          this.pagerIndex += this.pagerSize;
        }
      } else {
        if (this.pagerIndex > 0) {
          this.pagerIndex -= this.pagerSize;
        }
      }
    }
    this.generatePager();
  }

  generatePager() {
    let temp = [];
    for (let i = 1; i <= this.pageCount; i++) {
      if (i <= this.pageCount) {
        temp.push(i);
      }
    }

    this.pager = [];
    for (let i = this.pagerIndex; i < this.pagerIndex + this.pagerSize; i++) {
      if (typeof temp[i] !== 'undefined') {
        this.pager.push(temp[i]);
      }
    }
  }

  isNumber(val: any): boolean {
    return typeof val === 'number';
  }

  onColClick(col, index, rowIndex) {
    if (this._header[index].clickable) {
      if (
        this._header[index].key.toLowerCase() == 'childExpand'.toLowerCase()
      ) {
        this.tdata[rowIndex].detail.show =
          this.tdata[rowIndex].detail.show == undefined
            ? true
            : !this.tdata[rowIndex].detail.show;
      } else {
        this.colClick.emit({
          header: this._header[index],
          data: col == null ? {} : col,
          rowIndex: rowIndex,
        });
      }
    }
  }

  onExpand(rowIndex: number) {
    this.tdata[rowIndex].detail.show =
      this.tdata[rowIndex].detail.show == undefined
        ? true
        : !this.tdata[rowIndex].detail.show;
  }

  onPrint(rowIndex: number) {
    this.printClick.emit(this.tdata[rowIndex].nationalCode);
  }
}
