import { ObjectResourceOfTCResource } from './../_models/service-models';
import { AccountServiceProxy, TCResource } from './../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController} from '@ionic/angular';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor( private navCtrl: NavController, private router: Router, private myterms: AccountServiceProxy) { }

  Newterms = new TCResource();

  goback(){
    this.navCtrl.back();
  }
  contineandagree(){
this.router.navigate(['register'],{queryParams:{terms: true}})
  }
  ngOnInit() {
    this.getTerms();
  }

  getTerms(){
    this.myterms.termsandcondition().subscribe(data => {
      this.Newterms = data.data;
      console.log(this.Newterms)
    })
  }

}
