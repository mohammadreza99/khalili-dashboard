import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../business/order.service';

@Component({
  selector: 'order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  constructor(private orderService: OrderService) {}
  statuses$;
  states;
  rowData$;
  rowDataProducts$;
  columnDefs = [];
  columnDefsProducts = [
    {
      field: 'productName',
      headerName: 'محصول',
    },
    {
      field: 'storeTitle',
      headerName: 'فروشگاه',
    },
    {
      field: 'colorTitle',
      headerName: 'رنگ',
    },
    {
      field: 'warrantyTitle',
      headerName: 'گارانتی',
    },
    {
      field: 'insuranceTitle',
      headerName: 'بیمه',
    },
    {
      field: 'localCode',
      headerName: 'کد',
    },
    {
      field: 'qty',
      headerName: 'تعداد',
    },
  ];

  activeIndex = 0;
  showOrderDialog = false;
  actionsConfig = [];
  ngOnInit(): void {
    this.orderService.getOrderStates().subscribe((res) => {
      this.states = res;
      this.columnDefs = [
        {
          field: 'address',
          headerName: 'آدرس',
          editable: false,
        },
        {
          field: 'date',
          headerName: 'تاریخ ثبت ',
          editable: false,
        },
        {
          field: 'deliveryDate',
          headerName: 'تاریخ تحویل ',
          editable: false,
        },
        {
          field: 'shippintHourTitle',
          headerName: 'ساعت تحویل ',
          editable: false,
        },
        {
          field: 'fullName',
          headerName: 'نام',
          editable: false,
        },
        {
          field: 'invoiceNumber',
          headerName: 'شماره پیگیری',
          editable: false,
        },
        {
          field: 'mobileNo',
          headerName: 'شماره موبایل',
          editable: false,
        },
        {
          field: 'orderStatusTitle',
          headerName: 'وضعیت سفارش',
        },
        {
          field: 'orderStateTitle',
          headerName: 'مرحله سفارش',
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: this.states.map((state) => state.title),
          },
          onCellValueChanged: (params) => {
            let newStatus = this.states.find((s) => s.title == params.newValue);
            this.orderService
              .setOrderState({
                orderId: params.data.id,
                orderStateId: params.data.orderStateId,
              })
              .subscribe();
            this.rowData$ = this.orderService.getOrderWhitStatusId(
              this.activeIndex + 1
            );
          },
        },
        {
          headerName: 'مشاهده جزییات',
          editable: false,
          filter: false,
          sortable: false,
          cellRenderer: 'buttonRenderer',
          cellRendererParams: {
            onClick: this.onActionClick.bind(this),
            icon: 'fa fa-edit',
          },
        },
      ];
    });
    this.statuses$ = this.orderService.getOrderStatuses();
    this.rowData$ = this.orderService.getOrderWhitStatusId(
      this.activeIndex + 1
    );
  }
  tabIndexChenge(args) {
    this.activeIndex = args.index;
    this.rowData$ = this.orderService.getOrderWhitStatusId(
      this.activeIndex + 1
    );
  }
  onActionClick(args) {
    this.rowDataProducts$ = this.orderService.getOrderProducts(args.rowData.id);
    this.showOrderDialog = true;
  }
}
