import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { User, UserClass } from "../_models/user";
import { Storage } from '@ionic/storage';
import {ManageServiceProxy,} from '../_services/service-proxies';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    main_id = 0;
    user: User={}
    users = [];
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
                            role: user.role
                        };
                        this.users.push(saveduser);      
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
            let customerObj ={
                aspNetUser:  {email: undefined, userName: undefined},
                businessAnniversary: "",
                businessName: user.customer.businessName,
                closestBustopId: user.customer.closestBustopId,
                closestLandmark: user.customer.closestLandmark,
                companyLogo: user.customer.companyLogo,
                createdAt: '',
                fullName: user.customer.fullName,
                homeAddress: user.customer.homeAddress,
                location: user.customer.location,
                registerAsPartner: user.customer.registerAsPartner,
                residentialCountry: user.customer.residentialCountry,
                residentialCountryId: user.customer.residentialCountryId,
                residentialState: user.customer.residentialState,
                residentialStateId: user.customer.residentialStateId,
                synergyProgramCustomer: user.customer.synergyProgramCustomer,
                updatedAt: '',
                userId: user.customer.userId,
                wallet: user.customer.wallet
               }
               let userObj = {
                token: user.token,
                phone: user.phone,
                userId: user.userId,
                userType: user.userType,
                isProfileComplete: user.isProfileComplete,
                user: user.user,
                customer: customerObj,
                role: user.role,
               }   
                this.users = [];
                this.users.push(userObj);
                this.storage.set('user', this.users).then(data=>{
            if(data.length > 0){  
                    this.manage.getAuthenticatedUserdatail().subscribe(async data=>{            
                        if(data.code == "000"){
                            var res = data.data;
                            let customerObj ={
                                aspNetUser:  res.customer.aspNetUser,
                                businessAnniversary: "",
                                businessName: res.customer.businessName,
                                closestBustopId: res.customer.closestBustopId,
                                closestLandmark: res.customer.closestLandmark,
                                companyLogo: res.customer.companyLogo,
                                createdAt: '',
                                fullName: res.customer.fullName,
                                homeAddress: res.customer.homeAddress,
                                location: res.customer.location,
                                registerAsPartner: res.customer.registerAsPartner,
                                residentialCountry: res.customer.residentialCountry,
                                residentialCountryId: res.customer.residentialCountryId,
                                residentialState: res.customer.residentialState,
                                residentialStateId: res.customer.residentialStateId,
                                synergyProgramCustomer: res.customer.synergyProgramCustomer,
                                updatedAt: '',
                                userId: res.customer.userId,
                                wallet: res.customer.wallet
                               }
                               let userObj = {
                                token: user.token,
                                phone: res.user.phoneNumber,
                                userId: user.userId,
                                userType: res.user.userType,
                                isProfileComplete: res.user.isProfileCompleted,
                                user: res.user,
                                customer: customerObj,
                                role: user.role
                               }   
                                this.users = [];
                                this.users.push(userObj);
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