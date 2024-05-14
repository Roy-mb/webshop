import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'winkelwagen', component: ShoppingCartComponent},
  {path: 'search/:searchTerm', component: HomeComponent},
  {path: 'category/:category', component: HomeComponent},
  {path: 'products/:id', component: ProductPageComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/registreren', component: RegisterComponent},
  {path: 'bestelling', component: OrderComponent},
  {path: 'bestelgegevens', component:OrderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
