import { Component, Input, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, finalize, of, Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {
  @Input() title: string = '';


  isLoading = false;

  constructor(
    public modal: NgbActiveModal,
    private router : Router,
  ) {
    }

  ngOnInit(): void {

  }



  native(){
  this.modal.close();
  setTimeout(()=> {
    this.router.navigate([`/auth/login`]);
  },500 )
  }
}
