export interface SaveBlog {
  id: number | any;
  title: string,
  active: string,
  image: string,
  description: string,
  content: string,
  userId: number,
  categoryList: number[],
}



export interface Blog {
  id: number
  view: number,
  title: string,
  createdDate: any,
  active: string
  image: string,
  description: string,
  content: string,
  categories: any
}


export interface iTableBlog {
  hasNext : boolean ,
  pageCurrent : number,
  totalElements : number,
  totalPages : number,
}

