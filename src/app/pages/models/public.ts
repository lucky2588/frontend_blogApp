// Type Image
export interface MyFileInfo {
  file?: File;
  src?: any;
  uploadedName?: string; // ten file sau khi upload thanh cong
  hover?: boolean;
  size?: any;
  name?: string; // for zip file
  sizeExceed?: boolean;
}
export interface FileErr {
  isErr: boolean,
  errMessage: string,
}


export interface CategoryItem {
  id : number,
  description? : string,
  labelName : string,
  thumbail? : string
}


