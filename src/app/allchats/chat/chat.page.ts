import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, LoadingController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/_services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;
 
  messages: Observable<any[]>;
  newMsg = '';
  loading: any;
  constructor(private chatService: ChatService, private router: Router, private navCtrl: NavController,
    public loadspinner: LoadingController,) { }
  goback(){
    this.navCtrl.back();
  }
 async ngOnInit() {
    this.loading = await this.loadspinner.create({
      message: "please wait...",
      translucent: true,
      spinner: "bubbles",
    });
    await this.loading.present();
    setTimeout(() => {
      this.messages = this.chatService.getChatMessages();
      this.loading.dismiss();
     }, 3000);

  }
 
  sendMessage() {
    this.chatService.addChatMessage(this.newMsg).then(() => {
      this.chatService.getChatMessages();
      this.newMsg = '';
      this.content.scrollToBottom();
    });
  }



}
