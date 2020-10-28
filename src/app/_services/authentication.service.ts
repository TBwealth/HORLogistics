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
                            id : user.id,
                            user_id: user.user_id,
                            company_id:user.company_id,
                            department:user.department,
                            department_id:user.department_id,
                            employee_contract_id:user.employee_contract_id,
                            employee_id:user.employee_id,
                            email:user.email,
                            first_name:user.first_name,
                            last_name:user.last_name,
                            other_name:user.other_name,
                            lstPermissions:user.lstPermissions,
                            serial_no:user.serial_no,
                            session_token:user.session_token,
                            sub_id:user.sub_id,
                            main_session_token:user.main_session_token,
                            user_token:user.user_token,
                            baseUrl:user.baseUrl
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
        this.users = [];
        this.users.push(user);
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