import { Component, Input, OnInit} from '@angular/core';
import { Order } from '../shared/models/Order';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  checkedOrders: Order[] = new Array<Order>();
  @Input() order!: Order;

  constructor(private orderService: OrderService, private userService: UserService){

  }

  ngOnInit(){
    this.orderService
    .getOrders()
    .subscribe((orders: Order[]) => {
      for(this.order of orders){
        if(this.order.userEmail == this.userService.loadEmail()){
            this.checkedOrders.push(this.order);
        }
      }
      var value: number;
      for(value = 0; value < this.checkedOrders.length; value++){
        this.checkedOrders[value].id = value + 1; 
      }
    })
  }
}
