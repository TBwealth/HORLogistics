import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {FileTransfer,FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import { Dispatcher, IUpdateUserViewModel, UpdateStatus, RiderDocument } from 'src/app/_models/service-models';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import {customConfig} from "../../custumConfig";
import { CustomserviceService } from 'src/app/_services/customservice.service';
import { Base64 } from '@ionic-native/base64/ngx';
import { RiderServiceProxy } from 'src/app/_services/service-proxies';

@Component({
  selector: 'app-documentupload',
  templateUrl: './documentupload.page.html',
  styleUrls: ['./documentupload.page.scss'],
})
export class DocumentuploadPage implements OnInit {
  UpdateStatus = new  UpdateStatus().clone();
  uploadText: any;
  downloadText: any;
  fileTransfer: FileTransferObject;
  arrayType = ["pdf", "doc", "docx", "png", "jpg", "gif","jpeg"];
  loading: any;
  usersdata:any;
  dispatcher :any='';
  dispatcherCertificate: any = '';
  userRole = "";
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
      Urlbase: string = customConfig.baseUrl;
      userphotoviewmodel = new RiderDocument().clone();
  constructor( public alertCtrl: AlertController, public navCtrl: NavController,
    private transfer:FileTransfer,private file: File, private filepath: FilePath, 
      private filechooser: FileChooser,
      private loadspinner: LoadingController,
      private router: Router,
      private toastCtrl: ToastController,
      private AuthenService: AuthenticationService,
      private customserviceservice: CustomserviceService,
      private base64: Base64,
      private riderservice: RiderServiceProxy
      ) { }
      ionViewWillEnter(){
        this.getlatestusers()  
      }
      async getlatestusers()  {
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
        this.dispatcherCertificate = this.dispatcher.dispatcherCertificate;
       //console.log(this.dispatcherCertificate)             
      }
      this.loading.dismiss()
    }, 2000);
     
      }
      
  goback(){
    this.navCtrl.back();
  }
  getFileSize(fileUri) {
    console.log('filesize')
    return new Promise((resolve, reject)=> {    
      this.file.resolveLocalFilesystemUrl(fileUri).then((fileEntry:any) =>{
            fileEntry.file((fileObj)=> {
                resolve(fileObj);
            },
            function(err){
                reject(err);
            });
        }, 
        function(err){
            reject(err);
        });
    });
}
 async uploadFile(filekey){   
    this.filechooser.open().then((uri)=>{
this.filepath.resolveNativePath(uri).then(async(nativepath)=>{  
  let fileName   = nativepath.substring(nativepath.lastIndexOf("/") + 1);
  let fileType   = fileName.substring(fileName.lastIndexOf(".") + 1);
  console.log(nativepath)
  this.getFileSize(uri).then((fileObj:any)=>{
    console.log('uri',uri)
    this.converttobase64(nativepath,filekey,fileType,fileObj);
  }, async (err)=>{
    const toast = await this.toastCtrl.create({
       duration: 3000,
       message:'Oops! something went wrong',
       color: "danger"
     });
     toast.present();
   })
 
},(error)=>{
  console.log(JSON.stringify(error))
})
    },(error)=>{
      console.log(JSON.stringify(error))
    })
  }
converttobase64(uri,filekey, fileType, fileObj){
  console.log('fileMeta',fileObj)
  console.log('uri',uri);
  this.base64.encodeFile(uri).then(async (base64File: string) => {
    console.log('base64',base64File )
    console.log(base64File.split(",")[1])
    console.log('dispatcher id',this.dispatcher.id);
    this.userphotoviewmodel.file = base64File.split(",")[1];
    this.userphotoviewmodel.fileExtension = "."+  fileType;
    this.userphotoviewmodel.fileSize = fileObj.size;
    this.userphotoviewmodel.dispatcherId = this.dispatcher.id;
    this.userphotoviewmodel.fileName = filekey

    if(this.arrayType.indexOf(fileType) > -1){
      console.log('fileModel',this.userphotoviewmodel)
     this.senduploadriderdoc(this.userphotoviewmodel);        
    
      }else{
        const toast = await this.toastCtrl.create({
          duration: 3000,
          message: "File Type not allowed",
          color: "danger"
        });
        toast.present();
      }

  },async (err) => {
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message:'Oops! something went wrong',
      color: "danger"
    });
    toast.present();
  });
}
async senduploadriderdoc(docData){
  console.log('entered')
  this.loading = await this.loadspinner.create({
    message: "please wait...",
    translucent: true,
    spinner: "bubbles",
  });
  await this.loading.present();
  this.riderservice.riderDocuments(docData).subscribe(async(data:any)=>{
  if(data.code == "000"){
    this.AuthenService.addUser(this.usersdata); 
    console.log('success', data)
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: data.message,
      color: "success"
    });
    toast.present();
    setTimeout(() => {
      this.loading.dismiss();
      this.getlatestusers();
    }, 2000);
    
  }else{
    console.log('failed', data)
    this.loading.dismiss();
    const toast = await this.toastCtrl.create({
      duration: 3000,
      message: data.message,
      color: "danger"
    });
    toast.present();
    if(data.message == "Unauthorized"){
      this.AuthenService.clearusers()
      this.router.navigate(['login']);
            }
  }
  },(error)=>{
    this.loading.dismiss()
    console.log(JSON.stringify(error))
  })
}
  update(){
    this.AuthenService.addUser(this.usersdata); 
    this.navCtrl.back();
  }
  ngOnInit() {
  }

}
