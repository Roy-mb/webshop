import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/models/Product';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {

  cart: Cart;
  public products_in_cart: Product[];
  public orderMessage;
  public isLoggedIn: boolean;
  public formFilled: boolean = false;

  constructor(private cartService: CartService, private authService: AuthService) { }

  ngOnInit() {
    this.products_in_cart = this.cartService.allProductsInCart();
    this.cartService.$productInCart.subscribe((products: Product[]) => {
      this.products_in_cart = products;
      this.checkUserLogin();
    })
  }

  public removeProductFromCart(product_index: number) {
    this.cartService.removeProductFromCart(product_index);

  }

  public getTotalPrice(){
    return this.cartService.getTotalPrice();
  }

  public getTotalAmount(){
    return this.cartService.getTotalAmount();
  }



  public checkUserLogin(){
    this.authService
    .$userIsLoggedIn
    .subscribe((loggedInStatus: boolean) => {
      this.isLoggedIn = loggedInStatus;
    });
  }

  public checkFormFilled(){
    console.log(this.formFilled);
    
    this.formFilled = true;
  }






  // changeQuantity(cartItem: CartItem, quantityInString:string){
  //   const quantity = parseInt(quantityInString);
  //   this.cartService.changeQuantity(cartItem.product.id, quantity);
  //   this.setCart();
  // }

  // setCart(){
  //   this.cart = this.cartService.getCart();
  // }

}
