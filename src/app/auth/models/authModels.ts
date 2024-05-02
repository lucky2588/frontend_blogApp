
// for Login / Register
export interface LoginRequest {
  username : string,
  password:string
}

export interface RegisterRequest {
  name:string,
  username : string,
  password:string,
  gender:string,
  email : string,
  address : string,
  reTypePassword:string,
  msisdn:string,
  birthday:any
}


// for save LocalStronage

export interface AuthInfo{
  id : number,
  username : string,
  isAuthenticated: boolean,
  name : string
  avatar : string,
  email : string,
  roles : any[],
  token : string
}

export interface AuthFail{
  isAuthenticated:false;
}








