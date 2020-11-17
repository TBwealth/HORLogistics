import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
//import {Message} from '../_models/user';
import { LoginResource} from '../_models/service-models';
import { Storage } from '@ionic/storage';
export interface User {
  uid: string;
  email: string;
}

export interface Message {
  createdAt: firebase.default.firestore.FieldValue
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User = null;
  sessionId = '';
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore,
    private storage: Storage) { 
     this.storage.get('session').then((sessionId)=>{
    this.sessionId = sessionId;
     });
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;      
    });
  }

  addChatMessage(msg) {
    if(this.sessionId){
      this.afs.collection('messages').doc(this.sessionId).collection(this.sessionId).add({
        msg: msg,
        from: this.currentUser.uid,
        createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
      })
    }else{
      return this.afs.collection('messages').add({
        session: 'new session'
      }).then(data=>{
        this.afs.collection('messages').doc(data.id).collection(data.id).add({
          msg: msg,
          from: this.currentUser.uid,
          createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
        })
        this.storage.set('session',data.id);
      })
    }
  
  
  }

  public getMessages(id): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('messages').doc(id).collection('chats').get().subscribe((messages: any) => {
        console.log(messages);
        let data = messages.docs.map(element => {
          let item = element.data();
          item.id = element.id;
          return item;
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }

  getChatMessages() {

    if(this.sessionId){
      let users = [];
      return this.getUsers().pipe(
        switchMap(res => {
          users = res;
          return this.afs.collection('messages').doc(this.sessionId).collection(this.sessionId, ref => ref.orderBy('createdAt')).valueChanges({ idField: 'id' }) as Observable<Message[]>;
        }),
        map(messages => {
          // Get the real name for each user
          for (let m of messages) {          
            m.fromName = this.getUserForMsg(m.from, users);
            m.myMsg = this.currentUser.uid === m.from;
          }        
          return messages
        })
      )
    }else{
      let messages: Observable<Message[]>;
      return messages
    }

    
  }

  private getUsers() {
    return this.afs.collection('users').valueChanges({ idField: 'uid' }) as Observable<User[]>;
  }
   
  private getUserForMsg(msgFromId, users: User[]): string {    
    for (let usr of users) {
      if (usr.uid == msgFromId) {
        return usr.email;
      }
    }
    return 'Anonymous';
  }
}
