import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../shared/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/products/product.service';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  public product: Product;
  private productId: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
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

  // product!: Product;

  // constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private cartService: CartService, private router: Router){
  //   activatedRoute.params.subscribe((params) =>{
  //     if(params.id)
  //     this.product = productService.getProductById(params.id);
  //   })
  // }

  // addToCart(){
  //   this.cartService.addToCart(this.product);
  //   this.router.navigateByUrl('/winkelwagen');
  // }
}
