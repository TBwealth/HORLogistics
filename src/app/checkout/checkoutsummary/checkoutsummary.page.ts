import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController} from '@ionic/angular';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CheckoutassistanceServiceProxy } from 'src/app/_services/service-proxies';

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
formsubmit: boolean = false;
  constructor(private navCtrl: NavController,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private loadspinner : LoadingController,
    private checkout: CheckoutassistanceServiceProxy,
    public AuthService: AuthenticationService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,) { }
  async  ionViewWillEnter(){
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
            if(data.FormSubmit){
              this.formsubmit = true;
              this.productsItem = this.checkoutassist.products;
              this.currentItem = this.productsItem[this.currentPage];
              this.productSize = this.productsItem.length;
    
            }else{
              this.productsItem = this.checkoutassist.checkoutAssistanceWebsites[0].checkoutAssistanceProducts;
              this.costSummary = this.checkoutassist.checkoutAssistanceWebsites[0]
              this.currentItem = this.productsItem[this.currentPage];
              this.productSize = this.productsItem.length;
            }
    this.loading.dismiss()
    console.log(this.checkoutassist);
    
          }else{
            this.loading.dismiss()
    this.router.navigate(['checkoutlist'])
          }
        })
    }
 async ngOnInit() {

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
  async finalsubmit(){
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    this.checkout.create(this.checkoutassist).subscribe(async data => {      
      if(data.code == "000"){
        const toast = await this.toastCtrl.create({
          duration: 3000,
          message: data.message,
          color: "success"
        });
        toast.present();  
        loading.dismiss();
        this.router.navigate(['/checkoutlist'])
      } else{
        const toast = await this.toastCtrl.create({
          duration: 3000,
          message: data.message,
          color: "danger"
        });
        toast.present();
        loading.dismiss();
      if(data.code == "004")  this.router.navigate(['preferedaction']);
      }
     
    },async error=>{
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: "Oops! something went wrong",
        color: "danger"
      });
      toast.present();
      loading.dismiss();
    })
  }
}
