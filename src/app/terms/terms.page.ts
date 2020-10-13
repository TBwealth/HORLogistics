import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor( private navCtrl: NavController, private router: Router) { }


  goback(){
    this.navCtrl.back();
  }
  contineandagree(){
this.router.navigate(['login'],{queryParams:{value: true}})
  }
  ngOnInit() {
  }

}
