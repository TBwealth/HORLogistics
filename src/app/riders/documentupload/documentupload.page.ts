import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {FileTransfer,FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import { Router } from '@angular/router';
import { UpdateStatus } from 'src/app/_models/service-models';
import { AuthenticationService } from 'src/app/_services/authentication.service';

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
  constructor( public alertCtrl: AlertController, public navCtrl: NavController,
    private transfer:FileTransfer,private file: File, private filepath: FilePath, 
      private filechooser: FileChooser,
      private loadspinner: LoadingController,
      private router: Router,
      private toastCtrl: ToastController,
      private AuthenService: AuthenticationService,) { }
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
              this.UpdateStatus.dispatcherId = this.usersdata.userId;
              this.UpdateStatus.statusId = this.usersdata.dispatcher.dispatcherStatusesId;
      }
      this.loading.dismiss()
    }, 2000);
     
      }
      
  goback(){
    this.navCtrl.back();
  }
 async uploadFile(filekey){
   
    this.filechooser.open().then((uri)=>{
this.filepath.resolveNativePath(uri).then(async(nativepath)=>{
  console.log(nativepath);
  let fileName   = nativepath.substring(nativepath.lastIndexOf("/") + 1);
  let fileType   = fileName.substring(fileName.lastIndexOf(".") + 1);
this.fileTransfer = this.transfer.create();
let options: FileUploadOptions = {
  fileKey: filekey,
  fileName: fileName,
  chunkedMode: false,
  headers:{},
  mimeType: fileType,
  params: {
    statusId: this.UpdateStatus.statusId,
    dispatcherId: this.UpdateStatus.dispatcherId
  }
}
if(this.arrayType.indexOf(fileType) > -1){
  this.loading = await this.loadspinner.create({
    message: "please wait...",
    translucent: true,
    spinner: "bubbles",
  });
  await this.loading.present();
this.fileTransfer.upload(nativepath,'',options,false).then(async(data:any)=>{
if(data.code == "000"){
  const toast = await this.toastCtrl.create({
    duration: 3000,
    message: data.message,
    color: "success"
  });
  toast.present();
  this.loading.dismiss();
}else{
  this.loading.dismiss();
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
},(error)=>{
  console.log(JSON.stringify(error))
})
}else{
  this.loading.dismiss();
  const toast = await this.toastCtrl.create({
    duration: 3000,
    message: "File Type not allowed",
    color: "danger"
  });
  toast.present();
}

},(error)=>{
  console.log(JSON.stringify(error))
})
    },(error)=>{
      console.log(JSON.stringify(error))
    })
  }
  update(){

  }
  ngOnInit() {
  }

}
