import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-loginsigninoptions',
  templateUrl: './loginsigninoptions.page.html',
  styleUrls: ['./loginsigninoptions.page.scss'],
})
export class LoginsigninoptionsPage implements OnInit {

  constructor(private router: Router) { }
gotoOnboarding(){
  this.router.navigate(['onboardingpage']);
}
gotologin(){
  this.router.navigate(['login']);
}
  ngOnInit() {
  }

}
