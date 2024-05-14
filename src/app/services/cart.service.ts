import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { Product } from '../shared/models/Product';
import { CartItem } from '../shared/models/CartItem';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Order } from '../shared/models/Order';

const localStorageKey: string = "products-in-cart"

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: Product;
  private productsInCart: Product[] = [];
  public $productInCart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {
    this.loadProductsFromLocalStorage();
  }

  public addProductToCart(newProduct: Product) {
    let foundCartProduct: Product | undefined = this.productsInCart.find(cartProduct => cartProduct.name == newProduct.name);
    if (foundCartProduct){
      foundCartProduct.amount++;
    } else {
      this.productsInCart.push(newProduct);
    }
    this.saveProductsAndNotifyChange();
  }

  public removeProductFromCart(product_index: number) {
    this.productsInCart.splice(product_index, 1);
    this.saveProductsAndNotifyChange();
  }

  public allProductsInCart(): Product[] {
    return this.productsInCart.slice();
  }

  public getTotalPrice(): number {
    var totalPrice = 0;
    for (this.products of this.productsInCart) {
      totalPrice += this.products.price * Number(this.products.amount);
    }
    return Number(totalPrice.toFixed(2));
  }

  public getTotalAmount(): bigint {
    var totalAmount = 0n;
    for (this.products of this.productsInCart) {
      totalAmount += BigInt(this.products.amount);
    }
    return totalAmount;
  }

  public completeOrder(): void {
    var completedTotalPrice = this.getTotalPrice();
    var completedTotalAmount = this.getTotalAmount();
    var value: number;
    var completedProductList = this.allProductsInCart();
    var completedProductAmount: number[] = [];
    for(value = 0; value < completedProductList.length; value++){
      completedProductAmount.push(completedProductList[value].amount);
    }
    var completedUserEmail: string;
    var userEmail = localStorage.getItem("email");
    if(userEmail != null){
      completedUserEmail = userEmail;
    }else{
      completedUserEmail = String(null);
    }
    this.http.post(environment.base_url + "/orders", new Order(completedTotalPrice, Number(completedTotalAmount), completedProductAmount, completedProductList, completedUserEmail)).subscribe();
    this.removeAllProductsFromCart();
  }

  public removeAllProductsFromCart(){
    this.productsInCart.splice(0, this.productsInCart.length);
    this.saveProductsAndNotifyChange();
  }



  // ------------ PRIVATE ------------------

  private saveProductsAndNotifyChange(): void {
    this.saveProductsToLocalStorage(this.productsInCart.slice());
    this.$productInCart.next(this.productsInCart.slice());
  }

  private saveProductsToLocalStorage(products: Product[]): void {
    localStorage.setItem(localStorageKey, JSON.stringify(products))
  }

  private loadProductsFromLocalStorage(): void {
    let productsOrNull = localStorage.getItem(localStorageKey)
    if (productsOrNull != null) {

      // Parse the JSON string to a Product list
      let products: Product[] = JSON.parse(productsOrNull)

      // Assign the products to the productsInCart attribute and notify our subscribers
      this.productsInCart = products
      this.$productInCart.next(this.productsInCart.slice());
    }
  }

  // private cart:Cart = new Cart();
  //  addToCart(product: Product): void{
  //   let cartItem = this.cart.items.find(item => item.product.id === product.id);
  //   if(cartItem){
  //     this.changeQuantity(product.id, cartItem.quantity + 1)
  //     return;
  //   }
  //   this.cart.items.push(new CartItem(product))
  //  }

  //  removeFromCart(productId:number): void{
  //   this.cart.items = this.cart.items.filter(item => item.product.id != productId);
  //  }

  //  changeQuantity(productId:number, quantity:number){
  //   let cartItem = this.cart.items.find(item => item.product.id === productId);
  //   if(!cartItem) return;
  //   cartItem.quantity = quantity;
  //  }

  //  getCart():Cart{
  //   return this.cart;
  //  }

}
