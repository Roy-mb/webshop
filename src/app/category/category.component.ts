import { Component } from '@angular/core';
import { Category } from '../shared/models/Category';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  categories:Category[];

  constructor(private productService:ProductService){

  }

  // ngOnInit(){
  //   this.categories = this.productService.getAllCategories();
  // }
}
