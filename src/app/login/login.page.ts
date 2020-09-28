import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormsModule } from "@angular/forms";
import { User, UserClass } from "../_models/user";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
signinSegment: boolean = true;
signupSegment: boolean = false;
loginForm: FormGroup;
responseData: any;
user: User;


login: any = {
  email: '',
  password: ''
};
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  constructor() { }
  segmentChanged(value){
    this.signinSegment = value == 'SIGNIN'? true: false;
    this.signupSegment = value == 'SIGNUP'?true: false
  }
  async  loginUser(){}
  async forgotPassword(){}
  ngOnInit() {
  }

}
