import { Component } from '@angular/core';
import { ProductService } from '../services/products/product.service';
import { Product } from '../shared/models/Product';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public products: Product[] = new Array<Product>();
  public loadingProducts: boolean = true;
  
  constructor(private productService: ProductService, private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((products: Product[]) => {
        this.loadingProducts = false;
        this.products = products;
      });
  }

  // ngOnInit(): void {
  //   this.route.params.subscribe(params => {
  //     if(params.searchTerm)
  //       this.products = this.productService.getAllProductsBySearchTerm(params.searchTerm);
  //     else if(params.category)
  //       this.products = this.productService.getAllProductsByCategory(params.category);
  //     else
  //       this.products = this.productService.getAll();
  //   })

  // }

}
