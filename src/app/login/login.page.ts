import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NavController} from '@ionic/angular';
import { from } from 'rxjs';
import { User, UserClass } from "../_models/user";
import {Router,ActivatedRoute} from '@angular/router';
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
type: string;

login: any = {
  email: '',
  password: ''
};
emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  constructor(private router: Router,
    private navCtrl: NavController,
    private activatedroute: ActivatedRoute) { }
  segmentChanged(value){
    this.signinSegment = value == 'SIGNIN'? true: false;
    this.signupSegment = value == 'SIGNUP'?true: false
  }
  async  loginUser(){}
  async forgotPassword(){}
  gototerms(){
this.router.navigate(['terms'])
  }

  register(){
    this.router.navigate(['home'])
  }
  ngOnInit() {
    this.type = 'SIGNIN';
    this.activatedroute.queryParams.subscribe(data=>{
      if(data.value){
        this.type = 'SIGNUP';
        console.log(data.value);

      }
    })
  }

}
