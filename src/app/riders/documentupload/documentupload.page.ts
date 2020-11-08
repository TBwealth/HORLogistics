import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {FileTransfer,FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documentupload',
  templateUrl: './documentupload.page.html',
  styleUrls: ['./documentupload.page.scss'],
})
export class DocumentuploadPage implements OnInit {
  uploadText: any;
  downloadText: any;
  fileTransfer: FileTransferObject;
  arrayType = ["pdf", "doc", "docx", "png", "jpg", "gif","jpeg"];
  loading: any;
  constructor( public alertCtrl: AlertController, public navCtrl: NavController,
    private transfer:FileTransfer,private file: File, private filepath: FilePath, 
      private filechooser: FileChooser,
      private loadspinner: LoadingController,
      private router: Router,
      private toastCtrl: ToastController) { }
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
    userId: '',
    dispatcherId: ''
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
