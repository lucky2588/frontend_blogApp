import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationMessagesComponent } from 'src/app/shared/modules/validation';
import { Observable, Subscription } from 'rxjs';


import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/serivce/auth.service';
import { ConvertDataService } from 'src/app/shared';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { HandlenApiService } from 'src/app/shared/service/handlen-api.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Editor, EditorConfig } from '@ckeditor/ckeditor5-core';
import { ckEditorConfig } from 'src/app/shared/config/ckeditor.config';
import { BlogPublicService } from '../service/blog-public.service';
import { Blog } from '../../admin/models/blog';


@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {


  Editor = ClassicEditor;
  editor: Editor | undefined;

  showCategories : string[] = [];
  id : number | any

  get ckEditorConfig(): EditorConfig {
    return ckEditorConfig;
  }


  // Initialization
  formGroup!: FormGroup;
  // for Date

  blog : Blog | any;
  categories : number[];

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  data?: Date;

  // Initialization for image
  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private covenstation: ConvertDataService,
    private handlenApiService: HandlenApiService,
    private validateService: ValidatorsService,
    private service : BlogPublicService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('blogID');
    this.categories = []
    const currentDate = new Date();
    this.maxDate = currentDate;
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    // this.loadData(); // set Value for Form
    this.service.getDetail(this.id).subscribe((next)=>{
       this.blog = next;
       this.categories = this.blog.categories.map((e:any) => e.id)
       const listImg = this.blog.categories.map((e:any) => e.thumbail)
       this.showCategories =  listImg;
    }
    )
}




  // serivce for filed type Date
  getDateForEditFromMoment(date: moment.Moment, format = 'dd/MM/yyyy') {
    return date ? new Date(moment(date).format(format)) : null;
  }
  //save Value










}
