import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, ToastController,ActionSheetController, LoadingController } from '@ionic/angular';
import {  LoginResource, UpdateUserViewModel,UserPhotoViewModel } from "../_models/service-models";
import { AuthenticationService } from '../_services/authentication.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File, IWriteOptions, FileEntry, } from '@ionic-native/file/ngx';
import {AccountServiceProxy} from '../_services/service-proxies';
@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.page.html',
  styleUrls: ['./profilepage.page.scss'],
})
export class ProfilepagePage implements OnInit {
  customersData = new UpdateUserViewModel().clone();
  filemodel = new UserPhotoViewModel().clone()
  usersdata = new LoginResource().clone();
  userRole = "";
  usersCustomersData: any='';
  userCustomerUser: any = '';
  public captureDataUrl: any;
  loading: any
  constructor(
    public alertController: AlertController,
    private AuthenService: AuthenticationService,
    private navCtrl: NavController,
    private router: Router,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private loadspinner: LoadingController,
    private file: File,
    private uploadService: AccountServiceProxy
  ) { 
    this.AuthenService.getuser().then(async (usersdata:LoginResource[])=>{
      if(usersdata.length > 0){
        this.usersdata = usersdata[0];
        this.customersData.fullName = this.usersdata.customer.fullName;
        this.customersData.email = this.usersdata.user.email;
        this.customersData.residentialCountryId = this.usersdata.customer.residentialCountryId;
        this.customersData.residentialStateId = this.usersdata.customer.residentialStateId;
        this.customersData.phoneNumber = "";
        this.customersData.businessName = this.usersdata.customer.businessName;
        this.customersData.closestLandmark = this.usersdata.customer.closestLandmark;
        this.customersData.closestBustop = this.usersdata.customer.closestBustopId;
        this.customersData.businessAnniversary = this.usersdata.customer.businessAnniversary;
        this.customersData.homeAddress = this.usersdata.customer.homeAddress;
  
        this.userRole = this.usersdata.role[0].name;
      }
    });

  }
async updateUser(data,field){
if(field == 'State' && !this.customersData.residentialCountryId){
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
    this.navCtrl.back();
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
      this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
        entry.file(file => {
          console.log(file);
          this.readFile(file);
        });
      });     
    })

  }

  
async processProfilePicture(captureData) {
console.log(captureData)
}

changePicFromFile() {
  const cameraOptions: CameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    quality: 10,
    encodingType: this.camera.EncodingType.PNG,
  }; 
  this.camera.getPicture(cameraOptions).then((imageData) => {
    this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
      entry.file(file => {
        console.log(file);
        this.readFile(file);
      });
    });
  })
}
readFile(file: any) {
  const reader = new FileReader();
  reader.onloadend = () => {
    const imgBlob = new Blob([reader.result], {
      type: file.type
    });
    const formData = new FormData();
    formData.append('userId', this.usersdata.userId);
    formData.append('file', imgBlob, file.name);
    this.uploadService.uploadprofilepic(formData).subscribe(dataRes => {
      console.log(dataRes);
    });
  };
  reader.readAsArrayBuffer(file);
}
  ngOnInit() {
  }

}
