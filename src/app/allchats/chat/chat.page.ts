import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, LoadingController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/_services/chat.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../../_services/authentication.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;
  @ViewChildren('messages') messagesList: QueryList<any>;
  message: any;
  messages: any[] = [];
  id: any;
  count: any = 0;

  @ViewChild(IonContent) content: IonContent; 
  //messages: Observable<any[]>;
  newMsg = '';
  loading: any;
  constructor(
    private adb: AngularFirestore,
    private chatService: ChatService, 
    private router: Router, 
    private navCtrl: NavController,
    public loadspinner: LoadingController,
    private AuthenService: AuthenticationService,) { }
     ionViewWillEnter(){
      this.id = this.AuthenService.globalUserId;
      this.getMessages();
    }
     getMessages() {
      this.adb.collection('messages').doc(this.id).collection('chats').snapshotChanges().subscribe((data) => {
        console.log(data);
        this.chatService.getMessages(this.id).then(info => {
          console.log(info);
          info.sort((a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
          this.messages = info;
          console.log('info', this.messages);
          this.scrollToBottomOnInit();
        }).catch(error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    }

    send() {
      console.log('this.mess', this.message);  
      if (this.message && this.id) {
        const text = this.message;
        this.message = '';
        console.log('send');
        const id = Math.floor(100000000 + Math.random() * 900000000);
        const data = {
          msg: text,
          from: 'user',
          timestamp: new Date().toISOString(),
          id: this.id,
          docId: id
        };
        this.adb.collection('messages').doc(this.id).collection('chats').doc(id.toString()).set(data).then((data) => {
          console.log('sent', data);
        }).catch(error => {
          console.log(error);
        });
      
      }
    }

    scrollToBottomOnInit() {
      try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      } catch (err) { }
    }


  goback(){
    this.navCtrl.back();
  }



//  async ngOnInit() {
//     this.loading = await this.loadspinner.create({
//       message: "please wait...",
//       translucent: true,
//       spinner: "bubbles",
//     });
//     await this.loading.present();
//     setTimeout(() => {
//       this.messages = this.chatService.getChatMessages();
//       this.loading.dismiss();
//      }, 3000);

//   }
 
//   sendMessage() {
//     this.chatService.addChatMessage(this.newMsg).then(() => {
//       this.chatService.getChatMessages();
//       this.newMsg = '';
//       this.content.scrollToBottom();
//     });
//   }

ngOnInit() {
}

}
