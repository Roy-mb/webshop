import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../shared/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  public product: Product;
  private productId: number;
  public isLoggedIn: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
      this.checkUserLogin();
    });

    this.productService
      .getProductByIndex(this.productId)
      .subscribe((product: Product) => {
        this.product = product;
      });
  }

  public onBuyProduct(product: Product) {
    this.cartService.addProductToCart(product)
  }

  public checkUserLogin(){
    this.authService
    .$userIsLoggedIn
    .subscribe((loggedInStatus: boolean) => {
      this.isLoggedIn = loggedInStatus;
      console.log("login: " + this.isLoggedIn)
    });
  }

  public showLoginAlert(){
    alert("Log in om de winkelwagen te vullen!")
  }

  public showNoItemsInStockAlert(){
    alert("Helaas is dit product niet op voorraad")
  }

  public removeItemFromStock(){
    if(this.product.amount > 0){
      this.product.amount = this.product.amount - 1;
    }
    else{
      this.showNoItemsInStockAlert();
    }
  }


}
