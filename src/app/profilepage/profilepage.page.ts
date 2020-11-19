import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController,ActionSheetController, LoadingController } from '@ionic/angular';
import {  UserPhotoViewModel, UpdateUserViewModel, Dispatcher } from "../_models/service-models";
import { AuthenticationService } from '../_services/authentication.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File, IWriteOptions, FileEntry, } from '@ionic-native/file/ngx';
import {AccountServiceProxy, ApiServiceProxy, CountriesServiceProxy, LocationsServiceProxy, ManageServiceProxy} from '../_services/service-proxies';
import {CustomserviceService } from '../_services/customservice.service';
import { Base64 } from '@ionic-native/base64/ngx';
import {customConfig} from "../custumConfig";
@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.page.html',
  styleUrls: ['./profilepage.page.scss'],
})
export class ProfilepagePage implements OnInit {
  Urlbase = customConfig.baseUrl;
  customersData = new UpdateUserViewModel().clone();
  dispatcher = new Dispatcher().clone();
  usersdata:any;
  userRole = "";
  userType = "";
  userProfilePic = "";
  usersCustomersData: any='';
  userCustomerUser: any = '';
  public captureDataUrl: any;
  loading: any;
  countryList = [];
stateList = [];
busSutopList = [];
userphotoviewmodel = new UserPhotoViewModel().clone();
  constructor(
    private apiService: ApiServiceProxy,
    public alertController: AlertController,
    private AuthenService: AuthenticationService,
    private navCtrl: NavController,
    private router: Router,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private loadspinner: LoadingController,
    private file: File,
    private uploadService: AccountServiceProxy,
    private countrySeervice: CountriesServiceProxy,
    private locationService: LocationsServiceProxy,
    private base64: Base64,
    private manageUsers: ManageServiceProxy,
  ) { 
    //this.getlatestusers()
    }
    ionViewWillEnter(){
      this.getlatestusers()  
    }
    doRefresh(event) {
      this.getlatestusers();
       console.log('Begin async operation');     
       setTimeout(() => {
         console.log('Async operation has ended');
         event.target.complete();
       }, 2000);    
   }

 async getlatestusers(){
  this.AuthenService.addUser(this.AuthenService.users[0])
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
if(this.userRole != 'Rider'){
  this.customersData.fullName = this.usersdata.customer.fullName;
  this.customersData.residentialCountryId = this.usersdata.customer.residentialCountryId;
  this.customersData.residentialStateId = this.usersdata.customer.residentialStateId;
  this.customersData.businessName = this.usersdata.customer.businessName;
    this.customersData.closestLandmark = this.usersdata.customer.closestLandmark;
    this.customersData.closestBustop = this.usersdata.customer.closestBustopId;
    this.customersData.businessAnniversary = this.usersdata.customer.businessAnniversary;
    this.customersData.homeAddress = this.usersdata.customer.homeAddress;
    this.userProfilePic = this.usersdata.customer.companyLogo;
}
this.customersData.email = this.usersdata.user.email;
    
this.customersData.phoneNumber = this.usersdata.phone;

this.dispatcher = this.usersdata.dispatcher;

this.userType = this.usersdata.user.userType;

    var countryId = this.userRole != 'Rider' ? this.customersData.residentialCountryId : 1 ;
    if(this.userRole != 'Rider'){
      var stateId = this.customersData.residentialStateId;
    }else{
      var stateId = this.dispatcher.residentialStateId
    }
    
    this.defaultStateList(countryId);

    this.getBusStopByStateId(stateId);

    this.defaultCountryList();    

  }
  this.loading.dismiss()
}, 2000);
 
  }

  logout(){
    this.AuthenService.clearusers();
    this.router.navigate(['preferedaction']);
    }
    
  updateSponsor(){
    this.router.navigate(['sponsorsinformation']);
  }
  updateDocument(){
    this.router.navigate(['documentupload']);
  }
async updateUser(data,field){
if(field == 'State' && this.userRole != 'Rider' && !this.customersData.residentialCountryId){
  const toast = await this.toastCtrl.create({
    duration: 3000,
    message: 'Please update Country, to enable modification on state field',
    color: "danger"
  });
  toast.present();
  return false;
}
if(field == 'Bus-stop' && !this.customersData.residentialStateId){
  const toast = await this.toastCtrl.create({
    duration: 3000,
    message: 'Please update State, to enable modification on Closest Bus-stop field',
    color: "danger"
  });
  toast.present();
  return false;
}
this.router.navigate(['updateprofilepage'],{queryParams:{data:data,field: field}})
  }
  
  gotoverifyPhone(phoneNumber){
    this.router.navigate(['providephone'],{queryParams:{phoneNumber:phoneNumber}})
  }
  goback(){
    this.navCtrl.navigateBack('/home');
  }

  choosePic() {
    let actionSheet = this.actionSheetCtrl.create({
      header: "choose profile picture from",
      buttons: [
        {
          text: 'camera',
          icon: 'camera-outline',
          handler: () => {
            this.changePic()
          }
        },{
          text: "File",
          icon: 'folder-outline',
          handler: () => {
           this.changePicFromFile()
          }
        },{
          text: "Cancel",
          icon: 'close-outline',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }).then(actionSheet => {
      actionSheet.present();
    });
    
  }

  changePic() { 
    const cameraOptions: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.base64.encodeFile(imageData).then((base64File: string) => {
        this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
          entry.file(file => {
            let fileType   = file.name.substring(file.name.lastIndexOf(".") + 1);
            console.log(base64File)
            this.userphotoviewmodel.file = base64File.split(",")[1];
            this.userphotoviewmodel.fileExtension ="."+ fileType;
            this.userphotoviewmodel.fileSize = file.size;
            this.userphotoviewmodel.userId = this.AuthenService.globalUserId.value;
            this.userphotoviewmodel.fileName = "userone"
            this.readFile(this.userphotoviewmodel);  
          });
        });
      });          
    })

  }

changePicFromFile() {
  const cameraOptions: CameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    quality: 10,
    encodingType: this.camera.EncodingType.PNG,
  }; 
  this.camera.getPicture(cameraOptions).then((imageData) => {
    this.base64.encodeFile(imageData).then((base64File: string) => {
      this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
        entry.file(async file => {
          let loading = await this.loadspinner.create({
            message: "please wait...",
            translucent: true,
            spinner: "bubbles",
          });
          await loading.present();
          let fileType   = file.name.substring(file.name.lastIndexOf(".") + 1);
          console.log(base64File.split(",")[1])
          this.userphotoviewmodel.file = base64File.split(",")[1];
          this.userphotoviewmodel.fileExtension ="."+ fileType;
          this.userphotoviewmodel.fileSize = file.size;
          this.userphotoviewmodel.userId = this.AuthenService.globalUserId.value;
          this.userphotoviewmodel.fileName = "userone"
          loading.dismiss();
          this.readFile(this.userphotoviewmodel);   
        });
      });
    }, (err) => {
      console.log(err);
    });
  }, async(err) => {
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: 'Oops! something went wrong',
      color: "danger"
    });
    toast.present();
})
}
async readFile(payloadData) {
  let loading = await this.loadspinner.create({
    message: "please wait...",
    translucent: true,
    spinner: "bubbles",
  });
  await loading.present();
  this.uploadService.uploadprofilepic(payloadData).subscribe(async dataRes => {   
    console.log(dataRes)  
    if(dataRes.code == '000'){
      setTimeout(() => {
        this.AuthenService.addUser(this.usersdata);      
      this.getlatestusers();
      }, 3000);
      
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: dataRes.message,
        color: "success"
      });
      toast.present();
    }else{
   
      const toast = await this.toastCtrl.create({
        duration: 3000,
        message: dataRes.message,
        color: "danger"
      });
      toast.present();
      if(dataRes.message == "Unauthorized"){
        this.AuthenService.clearusers();
       this.router.navigate(['prefredaction']);
      
      }
    }
  
   loading.dismiss()
  },async error =>{
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: 'Oops! something went wrong',
      color: "danger"
    });
    toast.present();
    loading.dismiss()
  });

}
getBusStopByStateId(stateId){ 

  if(stateId){
    this.locationService.getLocationinstate(stateId).subscribe(data=>{
      this.busSutopList = data.data;
      })
  }else{
    this.busSutopList = [];
  }

}
getBusStopName(busStopId){
  if( this.busSutopList.length > 0){
    var bustStopName = this.busSutopList.find(x=>x.id == busStopId).name;
return bustStopName;
  }else{
    return null
  }
}
getstateName(stateId){
if(this.stateList.length > 0){
 var stateName = this.stateList.find(x => x.id === stateId).name;
 return stateName;
}else{
  return null;
}
}
getCountryName(countryId){
if(this.countryList.length > 0){
  var countryName = this.countryList.find(x => x.id === countryId).name;
  return countryName;
}else{
  return null;
}
}
defaultStateList(CountryId){

  this.countrySeervice.states(CountryId).subscribe(data=>{
    this.stateList = data;
  })
}
defaultCountryList(){
  this.apiService.countries().subscribe(data=>{
    this.countryList = data;
  })
}
async changepassword(){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Change Password',
    inputs: [
      {
        name: 'oldPassword',
        type: 'password',
        placeholder: 'Old Password',
        
      },
      {
        name: 'newPassword',
        type: 'password',
        placeholder: 'New Password',
        
      },
      {
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Confirm New Password',
        
      }
    ],
    buttons:  [
    {
        text: 'Change Password',
        handler: async (data) => {
         console.log(data);
          this.loading = await this.loadspinner.create({
            message: "please wait...",
            translucent: true,
            spinner: "bubbles",
          });
          await this.loading.present();
          this.manageUsers.changePassword(data).subscribe(async res=>{
            if(res.code == "000"){
              const toast = await this.toastCtrl.create({
                duration: 3000,
                message: res.message,
                color: "success"
              });
              toast.present();
              this.loading.dismiss()
            }else{
              const toast = await this.toastCtrl.create({
                duration: 3000,
                message: res.message,
                color: "danger"
              });
              toast.present();
              this.loading.dismiss()
              if(res.code == "004"){
                this.router.navigate(['prefredaction']);
              }
            }
          },async error=>{
            const toast = await this.toastCtrl.create({
              duration: 3000,
              message: 'Oops! something went wrong',
              color: "danger"
            });
            toast.present();
            this.loading.dismiss()
          })
        }
      }
    ]
  });

  await alert.present();

}
  ngOnInit() {
    
  }

}
