import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NavController} from '@ionic/angular';
import { from } from 'rxjs';
import { User, UserClass } from "../_models/user";
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signinSegment: boolean = true;
  signupSegment: boolean = false;
  regForm: FormGroup;
  responseData: any;
  user: User;
  type: string;
  customerType: any;
  regUser: any = {
    businessname: '',
    businessanniversary: new Date().toISOString(),
    lastname: '',
    firstname:'',
    phone:'',
    email: '',
    password: '',
    terms: false
  };
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
    constructor(private router: Router,
      private navCtrl: NavController,
      private activatedroute: ActivatedRoute) { }


    async forgotPassword(){}
    gototerms(){
  this.router.navigate(['terms'])
    }
    goback(){
      this.navCtrl.back();
    }
    userlogin(){
      this.router.navigate(['login'])
    }
    getcustType(custType){
     this.customerType = custType;
    }
    registerUser(){
      this.router.navigate(['providephone'])
    }
    ngOnInit() {
      this.activatedroute.queryParams.subscribe(data=>{
        if(data.custType){
          this.getcustType(data.custType);
        }
        if(data.terms){
          this.regUser.terms = data.terms;
        }
      })
    }

}
