import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-loginsigninoptions',
  templateUrl: './loginsigninoptions.page.html',
  styleUrls: ['./loginsigninoptions.page.scss'],
})
export class LoginsigninoptionsPage implements OnInit {
usersTYpe: any = '';
  constructor(private router: Router,private activatedroute: ActivatedRoute) { }
gotoOnboarding(){

  if(this.usersTYpe == 'rider'){
    this.router.navigate(['register'],{queryParams:{custType:this.usersTYpe }})
  }
  if(this.usersTYpe == 'customer'){
    this.router.navigate(['customerspartneroption']);
  }
  
}
gotologin(){
  this.router.navigate(['login'],{queryParams:{custType:this.usersTYpe }});
}
getcustType(custType){
  this.usersTYpe = custType;
 }
  ngOnInit() {
    this.activatedroute.queryParams.subscribe(data=>{

      if(data.usersType){
        this.getcustType(data.usersType);
      }
   
    })
  }

}
