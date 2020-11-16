import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import {UserService} from '../services/user.service';
import {User} from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  errorMessage: string;

  constructor(private as: AuthService, private us : UserService) { }

  ngOnInit(): void {
  }

  signup(form){
    let data: User = form.value
    
    this.as.signup(data.email,data.password)
    .then(result => {
      this.errorMessage = ''
      this.us.CreateNewUser(result.user.uid, data.firstName, data.lastName)

    })
    .catch(err => {
      this.errorMessage = err.message
    })
  }

}
