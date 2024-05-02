import { Component, DoCheck, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit,DoCheck{

  @Input() isShow :boolean = false; // hide when login
  isHide = false;


  ngOnInit(): void {
     this.isHide = this.isShow;
  }

  ngDoCheck(): void {
    this.isHide = this.isShow;
  }





}
