import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'simple-table',
  templateUrl: 'simple-table.component.html',
  styleUrls: ['simple-table.component.scss'],
})
export class SimpleTableComponent implements AfterViewInit {
  @Input() id: string;
  @Input() header: string;
  @Input() searchBox: boolean = false;
  @Input() set data(val) {
    this._data = val;
    this.pageIndex = 1;
    this.pagerIndex = 0;
    this.loadData();
  }
  @Input() set pageSize(val: number) {
    this._pageSize = val;
    this.loadData();
  }
  @Output() rowClick = new EventEmitter<any>();


  _header: KeyValue<string, string>[] = [];
  tdata: any;
  _data: any;
  _pageSize: number = 20;
  totalCount: number = 0;
  pageIndex: number = 1;
  pageCount: number = 0;
  pagerSize: number = 5;
  pager: number[] = [];
  pagerIndex: number = 0;

  searchValue: string = '';
  selectedIndex: number = -1;

  ngAfterViewInit() {
    setTimeout(() => {
      this.initHeader(this.header);
    });
  }

  initHeader(headers: any) {
    if (typeof headers !== 'undefined' && headers !== null) {
      if (Array.isArray(headers)) {
        this._header = headers.map(function (val, i) {
          return { key: i.toString(), value: val };
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
    if (typeof this._data !== 'undefined' && this._data !== null) {
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
}
