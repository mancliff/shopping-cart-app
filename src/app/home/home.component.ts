import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Product} from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../interfaces/cart.interface';
import { MatCard } from '@angular/material/card';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = []
  cart: Cart [] = []
  productsObservable: Subscription
  add: number = -1

  constructor(private ps : ProductService, private cs: CartService, private router: Router, private as : AuthService) { }

  ngOnInit(): void {
    this.productsObservable = this.ps.getAllProducts().subscribe(data => {
      this.products = data.map(element => {
        return {
          id: element.payload.doc.id, 
          ...element.payload.doc.data() as {}
        }
      })
    })

  }

  ngOnDestroy(){
    this.productsObservable.unsubscribe()
  }

  addToCart(index: number){
    
    if (this.as.userId){
      this.add =+index
      let selectedProduct = this.products[this.add]
      
      let data = {
        product_id:selectedProduct.id,
        productname:selectedProduct.productname,
        items: 1,
        price:selectedProduct.price,
        imgUrl:selectedProduct.imgUrl
      }
      this.cs.addToCart(data).then(() => this.add = -1) 
      
      this.router.navigate(['cart']);
    }
    else{
      this.router.navigate(['signin']);
    }
    
    
  }

 

 //this is the gabbage , maybe i might come back later  
  // addToBuscket(){
  //   let selectedProduct = this.products[this.add]
  //   let added = false;
  //   let index = 0;
  //   let data = {
  //     id:selectedProduct.id,
  //     productname:selectedProduct.productname,
  //     items: 1,
  //     price:selectedProduct.price,
  //     imgUrl:selectedProduct.imgUrl
  //   }
  //   this.cs.addToCart(data).then(() => this.add = -1)  
  // }


    // for (let p of this.cart){
    //   if (selectedProduct.id == p.id){
    //     added = true
    //     num_of_items++
    //     break;
    //   }
    // }
    // if(added){
    //   // this.cs.update_item(this.cart[this.add].id, num_of_items)
    //   console.log("added")
    // }
    // else{
    //   console.log("add new item")
      // this.cs.addToCart(data).then(() => this.add = -1)  
    //}
    


   
    //}

}
