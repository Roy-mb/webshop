import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  constructor(private cartService: CartService){

  }
  public completeOrder(){
    this.cartService.completeOrder();
  }
}
