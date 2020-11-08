import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Dispatcher, IUpdateUserViewModel, UpdateUserViewModel } from 'src/app/_models/service-models';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ManageServiceProxy } from 'src/app/_services/service-proxies';

@Component({
  selector: 'app-sponsorsinformation',
  templateUrl: './sponsorsinformation.page.html',
  styleUrls: ['./sponsorsinformation.page.scss'],
})
export class SponsorsinformationPage implements OnInit {
  sponsorForm: FormGroup;

  dispatcher = new Dispatcher().clone();
  loading: any;
  usersCustomersData: any='';
  usersdata:any;
  userRole = "";
  userType = "";
  userProfilePic = "";

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

 
  sponsorUpdate:{
    sponsorname?: string
    sponsoraddress?: string
    sponsorphone?: string
    platenumber?: string
    carname?: string
    carmodel?: string
    caryear?: string
    licenseNumber?: string
  } = {};

  constructor(private loadspinner: LoadingController,
    private AuthenService: AuthenticationService,
    private router: Router,
    private navCtrl: NavController,
    private manageUsers: ManageServiceProxy,
    private toastCtrl: ToastController) { }
  ionViewWillEnter(){
    this.getlatestusers()  
  }
  async getlatestusers(){
    this.loading = await this.loadspinner.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    await this.loading.present();
setTimeout(() => {
  if (this.AuthenService.users.length > 0) {   
    this.usersdata = this.AuthenService.users[0];
          this.userRole = this.usersdata.role[0].name;
          this.dispatcher = this.usersdata.dispatcher;  
          this.customersData.fullName = this.dispatcher.name;
          this.customersData.insuranceUrl  = "string";
          this.customersData.machinePictureUrl  = "string";
          this.customersData.machineRegistrationUrl  = "string";
          this.customersData.residentialCountryId  = 0;
          this.customersData.riderLincesUrl  = "string";        
          this.customersData.residentialStateId  = this.dispatcher.residentialStateId;
          this.customersData.userId = this.usersdata.userId;
          this.customersData.email = this.usersdata.user.email;       
          this.customersData.phoneNumber = this.usersdata.phone;  


    this.sponsorUpdate = {
      sponsorname: this.dispatcher.sponsorName,
      sponsoraddress: this.dispatcher.sponsorAddress,
      sponsorphone: this.dispatcher.sponsorPhoneNumber,
      platenumber: this.dispatcher.plateNumber,
      carname: this.dispatcher.carName,
      carmodel: this.dispatcher.carModel,
      caryear: this.dispatcher.carYear,
      licenseNumber: this.dispatcher.licenseNumber
    }

  }
  this.loading.dismiss()
}, 2000);
 
  }


  async update(){

    this.loading = await this.loadspinner.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    await this.loading.present();
    this.customersData.carModel = this.sponsorUpdate.carmodel;
    this.customersData.carName  = this.sponsorUpdate.carname;
    this.customersData.carYear  = this.sponsorUpdate.caryear;
    this.customersData.licenseNumber  = this.sponsorUpdate.licenseNumber;
    this.customersData.plateNumber  = this.sponsorUpdate.platenumber; 
    this.customersData.sponsorAddress  = this.sponsorUpdate.sponsoraddress;
    this.customersData.sponsorName  = this.sponsorUpdate.sponsorname;
    this.customersData.sponsorPhoneNumber  = this.sponsorUpdate.sponsorphone;

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

  goback(){
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
