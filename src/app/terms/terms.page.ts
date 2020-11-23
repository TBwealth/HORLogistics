import { ObjectResourceOfTCResource } from './../_models/service-models';
import { AccountServiceProxy, TCResource } from './../_services/service-proxies';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  loading: any;
  constructor( private navCtrl: NavController, private router: Router,
    private loadspinner: LoadingController, 
    private myterms: AccountServiceProxy,
    private toastCtrl: ToastController) { }

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

  async getTerms(){
    this.loading = await this.loadspinner.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    await this.loading.present();
    this.myterms.termsandcondition().subscribe(async data => {
      if(data.code == "000"){
        this.Newterms = data.data;
        console.log(this.Newterms)
        this.loading.dismiss()
      }else{
        const toast = await this.toastCtrl.create({
          duration: 3000,
          message: data.message,
          color: "danger"
        });
        toast.present();
        this.loading.dismiss()
      }
     
    }, async error =>{
      this.loading.dismiss()
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: 'Oops! something went wrong',
        color: "danger"
      });
      toast.present();
    })
  }

}
