import { LoginResourceUserType } from "../_models/service-models";
export class UserClass {
  token: string | undefined;
  userId: string | undefined;
  userType: LoginResourceUserType | undefined;
  isProfileComplete: boolean | undefined;

  constructor(data?: User) {
    if (data) {
        for (var property in data) {
            if (data.hasOwnProperty(property))
                (<any>this)[property] = (<any>data)[property];
        }
    }
}



}
export interface Message {
  createdAt: firebase.firestore.FieldValue;
  id: string;
  sessionId: string;
  from: string;
  to: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
  sessionStatus: string;
  msgReadStatus: string;
  createdBy: string
}

export interface User {
  token?: string | undefined;
  userId?: string | undefined;
  userType?: LoginResourceUserType | undefined;
  isProfileComplete?: boolean | undefined;
}

export interface socialUser {
  email?: string,
  displayName?: string,
  emailVerified?: boolean,
  photoURL?: string,
  phoneNumber?: string
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
