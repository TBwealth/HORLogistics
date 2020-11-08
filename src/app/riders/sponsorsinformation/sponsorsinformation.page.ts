import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { UpdateUserViewModel } from 'src/app/_models/service-models';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-sponsorsinformation',
  templateUrl: './sponsorsinformation.page.html',
  styleUrls: ['./sponsorsinformation.page.scss'],
})
export class SponsorsinformationPage implements OnInit {
  sponsorForm: FormGroup;
  customersData = new UpdateUserViewModel().clone();
  loading: any;
  usersCustomersData: any='';
  usersdata:any;
  userRole = "";
  userType = "";
  userProfilePic = "";
 
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
    private AuthenService: AuthenticationService,) { }
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
    this.customersData.fullName = this.usersdata.customer.fullName;
    this.customersData.email = this.usersdata.user.email;
    this.customersData.residentialCountryId = this.usersdata.customer.residentialCountryId;
    this.customersData.residentialStateId = this.usersdata.customer.residentialStateId;
    this.customersData.phoneNumber = this.usersdata.phone;
    this.customersData.businessName = this.usersdata.customer.businessName;
    this.customersData.closestLandmark = this.usersdata.customer.closestLandmark;
    this.customersData.closestBustop = this.usersdata.customer.closestBustopId;
    this.customersData.businessAnniversary = this.usersdata.customer.businessAnniversary;
    this.customersData.homeAddress = this.usersdata.customer.homeAddress;
    this.userRole = this.usersdata.role[0].name;
    this.userType = this.usersdata.user.userType;
    this.userProfilePic = this.usersdata.customer.companyLogo;

  }
  this.loading.dismiss()
}, 2000);
 
  }
  ngOnInit() {
  }

}
