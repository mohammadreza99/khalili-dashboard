import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { OrderService } from '../../business/order.service';
import { BaseOrderStatus } from '../../model/order.model';

@Component({
  selector: 'order-status',
  templateUrl: './order-status.page.html',
  styleUrls: ['./order-status.page.scss'],
})
export class OrderStatusPage implements OnInit {
  rowData$: Observable<BaseOrderStatus[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      editable: false,
    },
    {
      field: 'title',
      headerName: 'عنوان',
      editable: false,
    },
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.rowData$ = this.orderService.getOrderStatuses();
  }
}
