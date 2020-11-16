import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../interfaces/product.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private fs: AngularFirestore, private as: AuthService) { }

  addToCart(data: Product){
    return this.fs.collection(`users/${this.as.userId}/cart`).add(data)
  }

  getCart(){
    return this.fs.collection(`users/${this.as.userId}/cart`).snapshotChanges()
  }

  update_item(id, item_qty){
    return this.fs.doc(`users/${this.as.userId}/cart/${id}`).update({
      item_qty
    })
  }
  delete(id){
    return this.fs.doc(`users/${this.as.userId}/cart/${id}`).delete()
  }
  edit(id,items){
    return this.fs.doc(`users/${this.as.userId}/cart/${id}`).update({
      items
    })
  }
}
