import { Injectable } from '@angular/core';
import { Cart } from '../../shared/models/Cart';
import { Product } from '../../shared/models/Product';
import { CartItem } from '../../shared/models/CartItem';
import { BehaviorSubject } from 'rxjs';

const localStorageKey: string = "products-in-cart"

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsInCart: Product[] = [];
  public $productInCart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  constructor() {
    this.loadProductsFromLocalStorage();
  }

  public addProductToCart(product: Product) {
    this.productsInCart.push(product);
    this.saveProductsAndNotifyChange();
  }

  public removeProductFromCart(product_index: number) {
    this.productsInCart.splice(product_index, 1);
    this.saveProductsAndNotifyChange();
  }

  public allProductsInCart(): Product[] {
    return this.productsInCart.slice();
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
