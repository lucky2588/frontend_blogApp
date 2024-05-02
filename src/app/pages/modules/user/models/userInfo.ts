// export interface UserInfo {
//   name:string,
//   username : string,
//   gender:string,
//   email : string,
//   address : string,
//   msisdn:string,
//   birthday:any
// }


export class UserInfo {
  username:string = "";
  name : string = "";
  email:string = "";
  avatar :string = "";
  gender:string = "";
  address : string = ""
  birthday:any;
  msisdn:string = "";

}

// "id": 7,
// "username": "ckshhhh",
// "name": "Đức Thắng",
// "email": "thangroyal147@yah",
// "avatar": " None ",
// "gender": "MALE",
// "birthday": 1713604058759,
// "msisdn": "0332652232"

export interface ChangeInfoUser {
  id:number;
  name:string,
  gender:string,
  address : string,
  avatar : string,
  msisdn:string,
  birthday:any,
}



export interface ChangePassword {
  
 id:number,

 passwordNew:string,

 passwordOld:string,

 passRepart:string

}



