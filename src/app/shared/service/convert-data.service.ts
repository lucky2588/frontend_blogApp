import { Injectable } from '@angular/core';
import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class ConvertDataService {

  constructor() { }

  getDateForEditFromMoment(date: moment.Moment, format = 'YYYY/MM/DD HH:mm') {
    return date ? new Date(moment(date).format(format)) : null;
  }

  // getStringFormLocalDate(value:any[]){
  //   return new Date(value).toLocaleDateString()
  // }


  getDateFormLocalDate(dateArray: any[]) {
    const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
    return dateObject;
  }

  getDateStringFormLocalDate(dateArray: any[]) {
    const dateObject = new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Thêm số 0 ở đầu nếu tháng chỉ có một chữ số
    const day = dateObject.getDate().toString().padStart(2, '0'); // Thêm số 0 ở đầu nếu ngày chỉ có một chữ số

    // Ghép các thành phần lại với nhau
    const formattedDate = `${year}/${month}/${day}`;

    console.log(formattedDate); // Kết quả: '2024/04/05'
  }



  //   covertMomentFromDate(value : Date){
  //      myMoment: moment. = moment(value);
  //   }
  // }
}
