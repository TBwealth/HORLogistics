import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { CountriesServiceProxy, ApiServiceProxy, ManageServiceProxy,LocationsServiceProxy} from '../_services/service-proxies';
import {  LoginResource, UpdateUserViewModel,ResidentialCountry,HttpPostedFileBase, Dispatcher, IUpdateUserViewModel } from "../_models/service-models";
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-updateprofilepage',
  templateUrl: './updateprofilepage.page.html',
  styleUrls: ['./updateprofilepage.page.scss'],
})
export class UpdateprofilepagePage implements OnInit {
  dispatcher = new Dispatcher().clone();
  customersData :IUpdateUserViewModel ={
businessAnniversary: new Date(),
businessName: "",
carModel: "",
carName: "",
carYear: "",
closestBustop: 0,
closestLandmark: "",
email: "",
fullName: "",
homeAddress: "",
insuranceUrl: "",
licenseNumber: "",
machinePictureUrl: "",
machineRegistrationUrl: "",
phoneNumber: "",
plateNumber: "",
residentialCountryId: 0,
residentialStateId: 0,
riderLincesUrl: "",
sponsorAddress: "",
sponsorName: "",
sponsorPhoneNumber: "",
userId: ""
  };
  usersdata = new LoginResource().clone();
  userRole = "";
  usersCustomersData: any='';
routeField: any;
routeData: any;
fieldValue: any = '';
listData = [];
loading:any;
  constructor(
    private locationService: LocationsServiceProxy,
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
          this.userRole = this.usersdata.role[0].name;
          this.dispatcher = this.usersdata.dispatcher;
          if(this.userRole != 'Rider'){
            this.customersData.fullName = this.usersdata.customer.fullName;
            this.customersData.residentialCountryId = this.usersdata.customer.residentialCountryId;
            this.customersData.residentialStateId = this.usersdata.customer.residentialStateId;
            this.customersData.businessName = this.usersdata.customer.businessName;
            this.customersData.closestLandmark = this.usersdata.customer.closestLandmark;
            this.customersData.closestBustop = this.usersdata.customer.closestBustopId;
            this.customersData.businessAnniversary = this.usersdata.customer.businessAnniversary;
            this.customersData.homeAddress = this.usersdata.customer.homeAddress;  
          }
          if(this.userRole == 'Rider'){
            this.customersData.carModel = this.dispatcher.carModel;
            this.customersData.carName  = this.dispatcher.carName;
            this.customersData.carYear  = this.dispatcher.carYear;
            this.customersData.insuranceUrl  = "string";
            this.customersData.licenseNumber  = this.dispatcher.licenseNumber;
            this.customersData.machinePictureUrl  = "string";
            this.customersData.machineRegistrationUrl  = "string";
            this.customersData.plateNumber  = this.dispatcher.plateNumber;
            this.customersData.residentialCountryId  = 0;
            this.customersData.residentialStateId  = this.dispatcher.residentialStateId;
            this.customersData.riderLincesUrl  = "string";
            this.customersData.sponsorAddress  = this.dispatcher.sponsorAddress;
            this.customersData.sponsorName  = this.dispatcher.sponsorName;
            this.customersData.sponsorPhoneNumber  = this.dispatcher.sponsorPhoneNumber;

          }
        
          this.customersData.userId = this.usersdata.userId;
          this.customersData.email = this.usersdata.user.email;       
          this.customersData.phoneNumber = this.usersdata.phone;         
          
          
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
    if(this.userRole == 'Rider' ){
      this.customersData.fullName = this.routeField == 'Full Name'? this.fieldValue:  this.usersdata.dispatcher.name;
      this.customersData.residentialStateId = this.routeField == 'State'? this.fieldValue: this.usersdata.dispatcher.residentialStateId;
      
      }else{
      this.customersData.fullName = this.routeField == 'Full Name'? this.fieldValue:  this.usersdata.customer.fullName;
      this.customersData.residentialCountryId = this.routeField == 'Country'? this.fieldValue: this.usersdata.customer.residentialCountryId;
      this.customersData.residentialStateId = this.routeField == 'State'? this.fieldValue: this.usersdata.customer.residentialStateId;
      this.customersData.businessName = this.routeField == 'businessName'? this.fieldValue: this.usersdata.customer.businessName;
      this.customersData.closestLandmark = this.routeField == 'Landmark'? this.fieldValue: this.usersdata.customer.closestLandmark;
      this.customersData.closestBustop = this.routeField == 'Bus-stop'? this.fieldValue: this.usersdata.customer.closestBustopId;
      this.customersData.businessAnniversary = this.routeField == 'businessAnniversary'? this.fieldValue: this.usersdata.customer.businessAnniversary ? moment(this.usersdata.customer.businessAnniversary.toString()) : moment();
      this.customersData.homeAddress = this.routeField == 'Address'? this.fieldValue: this.usersdata.customer.homeAddress ;

    }
  
    this.manageUsers.updateUser(this.customersData).subscribe(async data=>{
    if(data.code == '000'){
      this.AuthenService.addUser(this.usersdata);
      setTimeout(() => {
        this.loading.dismiss()        
        this.navCtrl.navigateBack('/profilepage')
      }, 3000);
     
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
  async getCountry(){
    this.loading = await this.loadspinner.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    await this.loading.present();
this.apiService.countries().subscribe(data=>{

  this.listData = data;
  this.loading.dismiss();
})
   }
  async getState(CountryId){
    this.loading = await this.loadspinner.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    await this.loading.present();
this.countrySeervice.states(CountryId).subscribe(data=>{
  this.listData = data;
  this.loading.dismiss();
})
  }
  
 async getBusStop(StateId){
  this.loading = await this.loadspinner.create({
    message: "please wait...",
    translucent: true,
    spinner: "bubbles",
  });
  await this.loading.present();
this.locationService.category(StateId).subscribe(data=>{
this.listData = data;
this.loading.dismiss();
})
  }

  goback(){
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
