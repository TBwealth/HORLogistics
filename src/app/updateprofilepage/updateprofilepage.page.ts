import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { CountriesServiceProxy, ApiServiceProxy, ManageServiceProxy} from '../_services/service-proxies';
import {  LoginResource, UpdateUserViewModel,ResidentialCountry } from "../_models/service-models";
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-updateprofilepage',
  templateUrl: './updateprofilepage.page.html',
  styleUrls: ['./updateprofilepage.page.scss'],
})
export class UpdateprofilepagePage implements OnInit {
  customersData = new UpdateUserViewModel().clone();
  usersdata = new LoginResource().clone();
  userRole = "";
  usersCustomersData: any='';
routeField: any;
routeData: any;
fieldValue: any = '';
listData = [];
loading:any;
  constructor(
    private apiService: ApiServiceProxy,
    private countrySeervice: CountriesServiceProxy,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private AuthenService: AuthenticationService,
    private navCtrl: NavController,
    private manageUsers: ManageServiceProxy,
    private loadspinner: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.activatedroute.queryParams.subscribe(routeData=>{
      this.routeField = routeData.field;
      this.routeData = routeData.data;
      this.fieldValue = routeData.data;

      this.AuthenService.getuser().then(async (usersdata:LoginResource[])=>{
        if(usersdata.length > 0){
          this.usersdata = usersdata[0];
          this.customersData.fullName = this.usersdata.customer.fullName;
          this.customersData.email = this.usersdata.user.email;
          this.customersData.residentialCountryId = this.usersdata.customer.residentialCountryId;
          this.customersData.residentialStateId = this.usersdata.customer.residentialStateId;
          this.customersData.phoneNumber = this.usersdata.customer.phoneNumber;
          this.customersData.businessName = this.usersdata.customer.businessName;
          this.customersData.closestLandmark = this.usersdata.customer.closestLandmark;
          this.customersData.closestBustop = this.usersdata.customer.closestBustopId;
          this.customersData.businessAnniversary = this.usersdata.customer.businessAnniversary;
          this.customersData.homeAddress = this.usersdata.customer.homeAddress;    
          this.userRole = this.usersdata.role[0].name;
          
          if(this.routeField == 'Country')this.getCountry();
          if(this.routeField == 'State')this.getState(this.customersData.residentialCountryId);
          if(this.routeField == 'Bus-stop')this.getBusStop(this.customersData.residentialStateId);
        }
      });

    })
   }
  async update(){
    if(!this.fieldValue || this.fieldValue == null || this.fieldValue == "" || this.fieldValue < 1){
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: 'Please fill required field',
        color: "danger"
      });
      toast.present();
    }else{
    this.loading = await this.loadspinner.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    await this.loading.present();
    this.customersData.fullName = this.routeField == 'Full Name'? this.fieldValue:  this.usersdata.customer.fullName;
    this.customersData.residentialCountryId = this.routeField == 'Country'? this.fieldValue: this.usersdata.customer.residentialCountryId;
    this.customersData.residentialStateId = this.routeField == 'State'? this.fieldValue: this.usersdata.customer.residentialStateId;
    this.customersData.businessName = this.routeField == 'businessName'? this.fieldValue: this.usersdata.customer.businessName;
    this.customersData.closestLandmark = this.routeField == 'Landmark'? this.fieldValue: this.usersdata.customer.closestLandmark;
    this.customersData.closestBustop = this.routeField == 'Bus-stop'? this.fieldValue: this.usersdata.customer.closestBustopId;
    this.customersData.businessAnniversary = this.routeField == 'businessAnniversary'? this.fieldValue: this.usersdata.customer.businessAnniversary ? moment(this.usersdata.customer.businessAnniversary.toString()) : moment();
    this.customersData.homeAddress = this.routeField == 'Address'? this.fieldValue: this.usersdata.customer.homeAddress ;
  console.log(this.customersData)
    this.manageUsers.updateUser(this.customersData).subscribe(async data=>{
    if(data.code == '000'){
      this.AuthenService.addUser(this.usersdata);
      this.loading.dismiss()
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: data.message,
        color: "success"
      });
      toast.present();
    }else{
      this.loading.dismiss()
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: data.message,
        color: "danger"
      });
      toast.present();
      if(data.message == "Unauthorized"){
this.router.navigate(['login']);
      }
    }
  })
}
  }
   getCountry(){
this.apiService.countries().subscribe(data=>{
  this.listData = data;
})
   }
   getState(CountryId){
this.countrySeervice.states(CountryId).subscribe(data=>{
  this.listData = data;
})
  }
  getBusStop(CountryId){
    
  }
  goback(){
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
