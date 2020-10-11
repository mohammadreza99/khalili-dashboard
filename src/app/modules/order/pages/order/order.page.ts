import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../business/order.service';

@Component({
  selector: 'order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss']
})
export class OrderPage implements OnInit {

  constructor(private orderService:OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrderStatuses().subscribe(res=>{
      console.log(res);
      
    })
    this.orderService.getOrderWhitStatusId(1).subscribe(res=>{
      console.log(res);
      
    })
  }

}
