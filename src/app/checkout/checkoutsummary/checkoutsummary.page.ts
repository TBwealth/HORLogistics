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
currentPage = 1;
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
this.loading.dismiss()
console.log(this.checkoutassist);
      }else{
        this.loading.dismiss()
this.router.navigate(['checkoutlist'])
      }
    })
  }

  goback(){
    this.navCtrl.back();
  }

}
