export class UserClass {
  constructor( 
    public id?: number,
    public user_id?: number,
    public company_id?: number,
    public department?: string,
    public department_id?: number,
    public employee_contract_id?: number,
    public employee_id?: number,
    public email?: string,
    public first_name?: string,
    public last_name?: string,
    public other_name?: string,
    public lstPermissions?: Array<any>,
    public serial_no?: string,
    public session_token?: string,
    public sub_id ?: number,
    public main_session_token?: string,
    public user_token?: string,
    public baseUrl?: string){}

   setId(id: number){
 this.id = id;
   } 
   setuserId(user_id: number ){
     this.user_id = user_id;
   }
   setcompanyId(company_id: number){
 this.company_id = company_id
   }
   setemployeecontractid(employee_contract_id: number){
this.employee_contract_id = employee_contract_id
   }
 setemployeeid(employee_id: number){
this.employee_id = employee_id;
 }
setemail(email: string){
  this.email = email;
}
setfirstname(first_name: string){
  this.first_name = first_name;
}
setlastname(last_name: string){
this.last_name = last_name;
}
setothername(other_name: string){
this.other_name = other_name;
} 
setlastpermission(lstPermissions: any){
  this.lstPermissions = lstPermissions;
}
setserialno(serial_no: string){
this.serial_no = serial_no;
}
setsessiontoken(session_token: string){
  this.session_token = session_token;
}
setsubid(sub_id: number){
this.sub_id = sub_id
} 
setmainsessiontoken(main_session_token: string){
this.main_session_token = main_session_token;
}
setusertoken(user_token: string){
this.user_token = user_token;
}
setbaseUrl(baseUrl: string){
this.baseUrl = baseUrl;
}

}

export interface User {
  id?: number,
  user_id?: number,
  company_id?: number,
  department?: string,
  department_id?: number,
  employee_contract_id?: number,
  employee_id?: number,
  email?: string,
  first_name?: string,
  last_name?: string,
  other_name?: string,
  lstPermissions?: Array<any>,
  serial_no?: string,
  session_token?: string,
  sub_id ?: number,
  main_session_token?: string,
  user_token?: string,
  baseUrl?: string
}

export interface userRegistration{
  email?: string,
  fullName?: string,
  password?: string,
  confirmPassword?: string,
  userType?: number,
  businessName?: string,
  businessAnniversary?: string,
  tcAccepted?: boolean,
  userPicsUrl?: string
}
