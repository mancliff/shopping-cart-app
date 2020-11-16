import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { ProductsComponent } from './products/products.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';

import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
const redirectUnauthorizedLogin = () => redirectUnauthorizedTo(['signin']);


const routes: Routes = [
  {
    path:'', redirectTo: '/home', pathMatch:'full'
  },
  {
    path : 'home', component: HomeComponent
  },
  {
    path : 'cart', component: CartComponent,
    canActivate: [AngularFireAuthGuard], 
    data: {authGuardPipe: redirectUnauthorizedLogin}
  
  },
  {
    path : 'product', component: ProductsComponent
  },
  {
    path : 'signup', component: SignupComponent
  },
  {
    path : 'signin', component: SigninComponent
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, BrowserModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
