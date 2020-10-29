import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { User, UserClass } from "../_models/user";
import { Storage } from '@ionic/storage';


@Injectable()
export class AuthenticationService {
    main_id = 0;
    user: User={}
    users = [];
 constructor(public storage: Storage){}

    getuser(){
        this.users = [];    
        return new Promise ((resolve)=>{
          this.storage.get('user').then((users)=>{   
                if(users){
                  this.users;
                    for(let user of users){
      
                        let saveduser = {
                            token: user.token,
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
           console.log(user);
       let customerObj ={
        aspNetUser:  {email: undefined, userName: undefined},
        businessAnniversary: user.customer.businessAnniversary,
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
        userId: user.userId,
        userType: user.userType,
        isProfileComplete: user.isProfileComplete,
        user: user.user,
        customer: customerObj,
         role: user.role
       }   
        this.users = [];
        this.users.push(userObj);
        this.storage.set('user', this.users);  
              
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
            this.storage.set('user', this.users);    
        }

}