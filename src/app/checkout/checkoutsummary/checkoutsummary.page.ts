import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-checkoutsummary',
  templateUrl: './checkoutsummary.page.html',
  styleUrls: ['./checkoutsummary.page.scss'],
})
export class CheckoutsummaryPage implements OnInit {
checkoutassist: any = "";
loading: any='';
productSize=0;
currentPage = 0;
productsItem = [];
currentItem: any = '';
costSummary: any = ''
  constructor(private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private loadspinner : LoadingController) { }

 async ngOnInit() {
  this.loading = await this.loadspinner.create({
    message: "please wait...",
    translucent: true,
    spinner: "bubbles",
  });
  await this.loading.present();
    this.activatedroute.queryParams.subscribe(data=>{
      if(data.details){
this.checkoutassist = JSON.parse(data.details);
console.log(this.checkoutassist);
this.productsItem = this.checkoutassist.checkoutAssistanceWebsites[0].checkoutAssistanceProducts;
this.costSummary = this.checkoutassist.checkoutAssistanceWebsites[0]
this.currentItem = this.productsItem[this.currentPage];
this.productSize = this.productsItem.length;
this.loading.dismiss()
console.log(this.checkoutassist);
      }else{
        this.loading.dismiss()
this.router.navigate(['checkoutlist'])
      }
    })
  }

  incnavItem(currentPage){
let newpage = currentPage + 1;
this.currentPage = newpage;
this.currentItem = this.productsItem[newpage];

  }
  rednavItem(currentPage){
    let newpage = currentPage - 1;
    this.currentPage = newpage;
    this.currentItem = this.productsItem[newpage];
 
  }
  goback(){
    this.navCtrl.back();
  }

}
