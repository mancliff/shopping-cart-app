import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import {Cart} from '../interfaces/cart.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart[] = []


  constructor(private cs: CartService) { }
 
  ngOnInit(): void {
    this.cs.getCart().subscribe(cart => {
      this.cart = cart.map(shopping => {
        return { 
          id: shopping.payload.doc.id,
          ...shopping.payload.doc.data() as {}
        }
      })
      console.log(this.cart)
    })
  }

  get totalCart_price(){
    return this.cart.reduce((p, c) => {
      return p + c.price * c.items
    }, 0)
  }
  get totalCountItem(){
    return this.cart.reduce((p, c) => {
      return p + c.items
    }, 0)
  }
  removeFromCart(index){
    this.cs.delete(this.cart[index].id)
  }

  editQty(index){
    this.cs.edit(this.cart[index].id, this.cart[index].items)
  }
}

  
