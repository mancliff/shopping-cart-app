import { Component, OnInit } from '@angular/core';
import { Cart } from '../interfaces/cart.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUser: boolean = false
  cart: Cart [] = []
  constructor(private as : AuthService) { }

  ngOnInit(): void {
    this.as.user.subscribe(user => {
      if (user) {
        this.isUser = true
        this.as.userId = user.uid
      }
      else {
        this.isUser = false
        this.as.userId = ''
      }

    })
  }


  logout(){
    this.as.logout()
  }

}
