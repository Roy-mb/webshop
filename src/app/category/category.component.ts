import { Component } from '@angular/core';
import { Category } from '../shared/models/Category';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  public categories: Category[] = new Array<Category>();
  public loadingCategories: boolean = true;

  constructor(private categoryService: CategoryService, private activatedRoute: ActivatedRoute){

  }

  
  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.loadingCategories = false;
        this.categories = categories;
      });
  }
}

