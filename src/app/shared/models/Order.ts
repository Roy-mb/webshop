import { Product } from "./Product";

export class Order{
    id : number;
    totalPrice: number;
    totalAmount: number;
    productAmount: number[];
    cartItems: Product[];
    userEmail: String;

    constructor(totalPrice: number, totalAmount: number, productAmount: number[], cartItems: Product[], userEmail: String){
        this.totalPrice = totalPrice;
        this.totalAmount = totalAmount;
        this.productAmount = productAmount;
        this.cartItems = cartItems;
        this.userEmail = userEmail;
    }
}