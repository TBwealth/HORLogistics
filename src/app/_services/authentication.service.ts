import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { User, UserClass } from "../_models/user";
import { Storage } from '@ionic/storage';
import {ManageServiceProxy,} from '../_services/service-proxies';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
@Injectable()
export class AuthenticationService {
    main_id = 0;
    user: User={}
    users = [];
  public  globalUser = new BehaviorSubject<any>('');
  public  globalUserRole = new BehaviorSubject<any>('');
  public  globalUserType = new BehaviorSubject<any>('');
 constructor(public storage: Storage,
     private manage: ManageServiceProxy,
     private toastCtrl: ToastController,
     
     private router: Router){}

    getuser(){
        this.users = [];    
        return new Promise ((resolve)=>{
          this.storage.get('user').then((users)=>{   
                if(users){
                  this.users;
                    for(let user of users){
      
                        let saveduser = {
                            token: user.token,
                            phone: user.phone,
                            userId: user.userId,
                            userType: user.userType,
                            isProfileComplete: user.isProfileComplete,
                            user: user.user,
                            customer: user.customer,
                            dispatcher: user.dispatcher,
                            role: user.role
                        };
                        this.users.push(saveduser);  
                        this.globalUserRole = this.users[0].role[0].name;    
                        this.globalUserType = this.users[0].user.userType;
                        this.globalUser.next(this.users[0])
                    }
                   
                }
                resolve(this.users);
            });
        });   
    
         
        }

        save(): any {
            this.storage.set('user', this.users);              
         }

        addUser(user){      
           
               let userObj = {
                token: user.token,
                phone: user.phone,
                userId: user.userId,
                userType: user.userType,
                isProfileComplete: user.isProfileComplete,
                user: user.user,
                customer: user.customer,
                dispatcher: user.dispatcher,
                role: user.role,
               }   
                this.users = [];
                this.users.push(userObj);
                this.globalUserRole = this.users[0].role[0].name;    
                this.globalUserType = this.users[0].user.userType;
                this.globalUser.next(this.users[0])
                this.storage.set('user', this.users).then(data=>{
            if(data.length > 0){  
                    this.manage.getAuthenticatedUserdatail().subscribe(async data=>{            
                        if(data.code == "000"){
                            var res = data.data;
                           
                               let userObj = {
                                token: user.token,
                                phone: res.user.phoneNumber,
                                userId: user.userId,
                                userType: res.user.userType,
                                isProfileComplete: res.user.isProfileCompleted,
                                user: res.user,
                                customer: res.customer,
                                dispatcher: res.dispatcher,
                                role: user.role
                               }   
                                this.users = [];
                                this.users.push(userObj);
                                this.globalUserRole = this.users[0].role[0].name;    
                                this.globalUserType = this.users[0].user.userType;
                                this.globalUser.next(this.users[0])
                                this.storage.set('user', this.users); 
                        }else{
                            const toast = await this.toastCtrl.create({
                                duration: 3000,
                                message: data.message,
                                color: "danger"
                              });
                              toast.present();
                            if(data.message == "User is not authorized"){
                                this.router.navigate(['login']);
                            }
                        }
                     
                       })
                
            }
                                    
                });
              }

        updateuser(user){        
        this.users = [];
        this.users.push(user);
        this.storage.set('user', this.users);   
      
        }

        removeUser(user): void {

            let index = this.users.indexOf(user);
      
            if(index > -1){
                this.users.splice(index, 1);
                this.save();
            }
      
        }

        clearusers(){
            this.users = [];
            this.storage.remove('user');
           // this.storage.set('user', this.users);    
        }

}