import { Component, DoCheck } from '@angular/core';
import  * as caulse from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements DoCheck{
  isShow = false;
  valueCurrent:any;




  
  isHideSideBar(value:any){ // show side Bar . get value form child header --> move to sidebar
   this.isShow = value
   this.valueCurrent = value;
  }

  ngDoCheck(): void {
    this.isShow =  this.valueCurrent
  }
}
