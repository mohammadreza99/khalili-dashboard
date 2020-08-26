import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { Result } from 'src/app/app.global';

declare var agGrid: any;

@Component({
  selector: 'ag-tablee',
  templateUrl: 'ag-grid.component.html',
  styleUrls: ['ag-grid.component.scss'],
})
export class AgGridComponent extends BaseService implements AfterViewInit {
  @Output() onSelectionChanged = new EventEmitter<any>();
  @Output() onRowSelected = new EventEmitter<any>();
  @Output() onFilterChanged = new EventEmitter<any>();

  @Input() columns: any;

  _data: any;
  @Input() set data(val) {
    this._data = val;

    if (this.isFirst == false) {
      this.loadData();
      this.isFirst = true;
    } else if (this.gridOptions && this.gridOptions.api) {
      this.gridOptions.api.setRowData(this._data);
    } else {
      this.loadData();
    }
  }

  // @Input()
  // set RowSelected(val: any) {
  //     if (this.gridOptions && this.gridOptions.api) {
  //         this.gridOptions.api.forEachNode(function (node) {
  //             if (val.findIndex(x => x == node.data)) {
  //                 node.setSelected(true);
  //             }
  //         });
  //     }
  // }

  @Input() masterDetail: boolean;
  @Input() detailCellRendererParams: any;
  @Input() rowData: any;
  @Input() frameworkComponents: any;
  @Input() rowSelection: string;
  @Input() url: string;
  @Input() height: number = 300;

  aggColumns: any = [];
  filteredData: any[];
  gridOptions: any;
  isFirst: boolean = false;

  @HostListener('input', ['$event']) handeKeyboardEvent(event) {
    event.target.value = event.target.value
      .replace(/ي/g, 'ی')
      .replace(/ك/g, 'ک');
  }

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.loadData();
  }

  private loadData() {
    this.getData().subscribe((data) => {
      if (data && data.length > 0) {
        data.forEach((el: any) => {
          Object.keys(el).forEach((key) => {
            if (el[key] == null || el[key] == '') {
              el[key] = ' ';
            }
          });
        });

        data = this.initData(data);
        this.gridOptions = this.getDefaultOptions();
        this.gridOptions.columnDefs = this.columns;

        // if (this.masterDetail === true) {
        //     this.gridOptions.columnDefs[3].cellRenderer = 'agGroupCellRenderer';
        // }

        let elm = document.querySelector('#agGrid') as HTMLElement;
        elm.innerHTML = '';
        elm.style.height = `${this.height}px`;
        elm.style.width = '100%';

        let grid = new agGrid.Grid(elm, this.gridOptions);
        this.gridOptions.frameworkComponents = this.frameworkComponents;
        if (this.masterDetail == true) {
          this._data.forEach((el) => {
            el.childExpand = '';
          });
        }
        this.gridOptions.api.setRowData(this._data);
      }
    });
  }

  private getData(): Observable<any> {
    return new Observable<any>((observer) => {
      observer.next(this._data);
    });
  }

  private initData(data: any): any {
    for (let i = 0; i < this.columns.length; i++) {
      if (
        this.columns[i].summeryType &&
        this.columns[i].summeryType === 'sum'
      ) {
        let val = 0;
        data.forEach((x) => {
          val += x[this.columns[i].field];
        });
        this.aggColumns[this.columns[i].field] = val;
      }

      if (this.columns[i].align) {
        this.columns[i].cellStyle = { 'text-align': this.columns[i].align };
      }

      delete this.columns[i].summeryType;
      delete this.columns[i].align;
    }
    return data;
  }

  private getDefaultOptions(): any {
    return {
      localeText: {
        // for filter panel
        page: 'صفحه',
        more: 'بیشتر',
        to: 'به',
        of: 'از',
        next: 'بعدی',
        last: 'آخر',
        first: 'اولین',
        previous: 'قبلی',
        loadingOoo: 'در حال بارگذاری...',
        totalrows: 'مجموع ردیف ها',
        // for set filter
        selectAll: 'انتخاب همه',
        searchOoo: 'جستجو...',
        blanks: 'خالی',

        // for number filter and text filter
        filterOoo: 'فیلتر کردن...',
        applyFilter: 'اعمال محدودیت...',
        equals: 'برابر',
        notEqual: 'نا برابر',

        // for number filter
        lessThan: 'کمتر از',
        greaterThan: 'بزرگتر از',
        lessThanOrEqual: 'کمتر از یا برابر',
        greaterThanOrEqual: 'بزرگتر یا مساوی',
        inRange: 'رنج',

        // for text filter
        contains: 'حاوی',
        notContains: 'شامل نشود با',
        startsWith: 'شروع می شود با',
        endsWith: 'به پایان می رسد با',
        nullValue: 'خالی',
        // the header of the default group column
        group: 'گروه',

        // tool panel
        filters: 'فیلتر ها',
        groups: 'گروه ها',
        pivots: 'محورها',
        toolPanelButton: 'پانل ابزار',

        // other
        noRowsToShow: 'هیچ ردیفی برای نمایش وجود ندارد',

        // enterprise menu
        pinColumn: 'چسباندن ستون',
        valueAggregation: 'value Aggregation',
        autosizeThiscolumn: 'اندازه خودکار این ستون',
        autosizeAllColumns: 'اندازه خودکار تمام ستونها',
        groupBy: 'دسته بندی بر اساس',
        ungroupBy: 'بدون دسته بندی',
        resetColumns: 'تنظیم مجدد',
        expandAll: 'باز کردن همه',
        collapseAll: 'بستن همه',
        toolPanel: 'پنل ابزار',
        export: 'خروجی',
        csvExport: 'خروجی CSV',
        excelExport: 'خروجی اکسل',
        xmlExport: 'خروجی XML',

        // enterprise menu pinning
        pinLeft: 'چسباندن به سمت چپ',
        pinRight: 'چسباندن به سمت راست',
        noPin: 'حذف',

        // enterprise menu aggregation and status bar
        sum: 'جمع',
        min: 'حداقل',
        max: 'حداکثر',
        none: 'هیچ یک',
        count: 'تعداد',
        average: 'میانگین',

        // standard menu
        copy: 'کپی',
        copyWithHeaders: 'کپی با سربرگ',
        ctrlC: 'ctrl + C',
        paste: 'الصاق',
        ctrlV: 'ctrl + V',
      },
      defaultColDef: {
        resizable: true,
        sortable: true,
        filter: 'agTextColumnFilter',
        suppressSizeToFit: true,
        cellClass: 'stringType',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: [
            'nullValue',
            'contains',
            'notContains',
            'startsWith',
            'endsWith',
            'equals',
            'notEqual',
          ],
          textCustomComparator: (filter, value, filterText) => {
            let filterTextLoweCase = filterText.toLowerCase();
            let valueLowerCase = value.toString().toLowerCase();

            switch (filter) {
              case 'nullValue':
                return valueLowerCase == ' ';
              case 'contains':
                return valueLowerCase.indexOf(filterTextLoweCase) >= 0;
              case 'notContains':
                return valueLowerCase.indexOf(filterTextLoweCase) === -1;
              case 'equals':
                return valueLowerCase === filterTextLoweCase;
              case 'notEqual':
                return valueLowerCase != filterTextLoweCase;
              case 'startsWith':
                return valueLowerCase.indexOf(filterTextLoweCase) === 0;
              case 'endsWith':
                let index = valueLowerCase.lastIndexOf(filterTextLoweCase);
                return (
                  index >= 0 &&
                  index === valueLowerCase.length - filterTextLoweCase.length
                );
              default:
                console.warn('invalid filter type ' + filter);
                return false;
            }
          },
        },
      },
      masterDetail: true,
      // detailRowHeight: 150,
      detailCellRendererParams: this.detailCellRendererParams,
      floatingFilter: true,
      sortingOrder: ['desc', 'asc', null],
      rowSelection: 'single',
      rowDragManaged: true,
      animateRows: true,
      enableRtl: true,
      pagination: true,
      paginationPageSize: 50,
      excelStyles: [
        {
          id: 'stringType',
          dataType: 'string',
        },
      ],
      defaultExportParams: {
        skipHeader: false,
        columnGroups: true,
        skipFooters: false,
        skipGroups: false,
        skipPinnedTop: false,
        skipPinnedBottom: false,
        allColumns: true,
        onlySelected: false,
        exportMode: 'xlsx',
      },
      pinnedBottomRowData: [this.aggColumns],
      sideBar: {
        toolPanels: [
          {
            id: 'columns',
            labelDefault: '',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            toolPanelParams: {
              suppressRowGroups: true,
              suppressValues: true,
              suppressPivots: true,
              suppressPivotMode: true,
              suppressSideButtons: true,
              suppressColumnFilter: false,
              suppressColumnSelectAll: false,
              suppressColumnExpandAll: false,
            },
          },
        ],
      },
      getRowStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            'font-weight': 'bold',
            color: '#1E4E6A',
            'background-color': '#ECF0F1',
            'font-size': '10pt',
          };
        }
        if (params.node.rowIndex % 2 === 0) {
          return { background: '#f7f7f7' };
        }
      },

      onGridReady: (params) => {
        // AutoSizing All Columns
        let allColsID = [];
        params.columnApi.getAllColumns().forEach((e) => {
          allColsID.push(e.colId);
        });
        params.columnApi.autoSizeColumns(allColsID);
      },
      onSelectionChanged: (event) => {
        this.onSelectionChanged.emit(event.api.getSelectedRows());
      },
      onRowSelected: (event) => {
        this.onRowSelected.emit(event.api.getSelectedNodes());
      },
      onFilterChanged: (event) => {
        let rowNode = [];
        let filteredData = [];
        let filterModel = event.api.getFilterModel();
        let count = event.api.getDisplayedRowCount();

        for (let i = 0; i < count; i++) {
          rowNode.push(event.api.getDisplayedRowAtIndex(i));
        }
        rowNode.forEach((el) => {
          filteredData.push(el.data);
        });
        this.onFilterChanged.emit({
          filteredData: filteredData,
          filteredDataCount: count,
          filterModel: filterModel,
        });
      },
      processDataFromClipboard: (params) => {
        let data = params.data;
        return data;
      },
    };
  }
}
