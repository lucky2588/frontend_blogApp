


export interface Gender {
  id : number,
  labelName : string
}


export interface Access{
  id : number,
  labelValue : string,
}


export interface Category {
  id :  number,
  labelName : string,
  description : string,
  thumbail : string,
}


export interface BlogDetail {
  id :  number,
  view : string,
  title : string,
  createdDate : any,
  content : string,
  description : string,
  categories : Category[]
}
