import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fs : AngularFirestore) { }

  CreateNewUser(id, firstName, lastName){
    this.fs.doc('user/' + id).set({
      firstName,
      lastName
    }) 
  }
}
