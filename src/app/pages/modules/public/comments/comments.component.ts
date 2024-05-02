import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupingState } from 'src/app/shared/models/grouping.model';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentService } from '../service/comment.service';
import { AuthService } from 'src/app/auth/serivce/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationMessagesComponent } from 'src/app/shared/modules/validation';
import { WarningComponent } from 'src/app/auth/warning/warning.component';
import { Router } from '@angular/router';
import { CommentPost } from 'src/app/shared/models/typePublic';
import { ConvertDataService } from 'src/app/shared';



@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit  {
    // send Child / Parent

    @Input() id: number = 0;
    formGroup!: FormGroup;


    constructor(
      public service: CommentService,
      public modalService : NgbModal,
      public authService : AuthService,
      private fb: FormBuilder,
      private router : Router,
      private convert : ConvertDataService

    ) {}

    ngOnInit(): void {
      this.initForm();
      this.service.fetch(this.id);
    }


   initForm(){
    this.formGroup = this.fb.group({
      content: [
        '',
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
        ]),
      ],
    });
   }

   pushComment(){
    if(!this.authService.getAuthentication()){
      const modalRef = this.modalService.open(WarningComponent,  { centered:true, scrollable: true , backdrop : false });
      modalRef.componentInstance.title = 'You need to Login';
      return;
    }
    let res : CommentPost = {
      targetId : this.id,
      content : this.formGroup.get('content')?.value,
      targetName : 'BLOG'
    }
    this.service.save(res).subscribe({
      complete: () => {
        this.formGroup.get('content')?.setValue('')
        this.service.fetch(this.id)
      },
    })
   }




   coversDate(value : any){
    return this.convert.getDateFormLocalDate(value);

   }
}
