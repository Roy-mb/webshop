import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    DropdownDirective, HomeComponent, ShoppingCartComponent, CategoryComponent, ProductPageComponent, OrderComponent, OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
