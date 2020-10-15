import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../business/order.service';

@Component({
  selector: 'order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  constructor(private orderService: OrderService) {}
  statuses;
  rowData$;
  columnDefs = [];
  activeIndex = 0;

  ngOnInit(): void {
    this.orderService.getOrderStatuses().subscribe((res) => {
      this.statuses = res;
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
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: this.statuses.map((state) => state.title),
          },
          onCellValueChanged: (params) => {
            let newStatus = this.statuses.find(
              (s) => s.title == params.newValue
            );
            this.orderService.setOrderState({
              orderId: params.data.id,
              orderStateId: params.data.orderStateId,
              // orderStateId:newStatus.id
            });
            this.rowData$ = this.orderService.getOrderWhitStatusId(
              this.activeIndex + 1
            );
          },
        },
        {
          field: 'orderStateTitle',
          headerName: 'مرحله سفارش',
          editable: false,
        },
      ];
    });
    this.rowData$ = this.orderService.getOrderWhitStatusId(
      this.activeIndex + 1
    );

    this.orderService.getOrderStates().subscribe((res) => {
      console.log(res);
    });
  }
  tabIndexChenge(args) {
    this.activeIndex = args.index;
    this.rowData$ = this.orderService.getOrderWhitStatusId(
      this.activeIndex + 1
    );
  }
}
