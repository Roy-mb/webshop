import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../shared/models/Product';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../shared/models/Category';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public product: Product;
  public products: Product[] = new Array<Product>();
  public loadingProducts: boolean = true;
  // public categoryProducts: Product[] =  new Array<Product>();
  // public categories: Category[] = new Array<Category>();
  // public category: Category;

  constructor(private productService: ProductService, private route:ActivatedRoute, private categoryService: CategoryService){

  }

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((products: Product[]) => {
        this.loadingProducts = false;
        this.products = products;
      });
  }


}
