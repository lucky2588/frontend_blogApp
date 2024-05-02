

import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationMessagesComponent } from 'src/app/shared/modules/validation';
import { Observable, Subscription } from 'rxjs';
import {
  City,
  District,
  districtList,
  filteredList,
  Ward,
  wardList,
} from 'src/app/shared/fakeData/location';

import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/serivce/auth.service';
import { ConvertDataService } from 'src/app/shared';

import { FileErr } from 'src/app/pages/models/public';

import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { Access, BlogDetail, Gender } from 'src/app/shared/models/typePublic';
import { HandlenApiService } from 'src/app/shared/service/handlen-api.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ckEditorConfig } from '../../../../../shared/config/ckeditor.config'
import { Editor, EditorConfig } from '@ckeditor/ckeditor5-core';
import { BlogService } from '../service/blog.service';


@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit{

  @Input() id: number = 0;
  showCategories : number = 0;

  get ckEditorConfig(): EditorConfig {
    return ckEditorConfig;
  }
  Editor = ClassicEditor;
  editor: Editor | undefined;
  // Initialization
  formGroup!: FormGroup;
  // for Date
  access: Access[] = [
    {
      id: 1,
      labelValue: 'PUBLIC'
    },
    {
      id: 2,
      labelValue: 'PRIVATE'
    },
  ]

  blog : BlogDetail | any;
  categories : number[];


  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  data?: Date;

  // Initialization for image
  isChangeImg = false;
  hoverImg: boolean = false;
  imageAvatar: any;
  avatarImageFile?: File;
  imgValid: boolean = false;
  imageError: FileErr;
  imageType = [
    'apng',
    'ico',
    'cur',
    'jpg',
    'jpeg',
    'pjpeg',
    'jfif',
    'pjg',
    'png',
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private covenstation: ConvertDataService,
    private handlenApiService: HandlenApiService,
    private validateService: ValidatorsService,
    public modalService : NgbModal,
    public modal: NgbActiveModal,
    private service : BlogService
  ) {
    this.imageError = {
      isErr: false,
      errMessage: '',
    };
    this.categories = []
    const currentDate = new Date();
    this.maxDate = currentDate;
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit(): void {
    // this.loadData(); // set Value for Form
    this.initForm();
    this.service.getDetail(this.id).subscribe((next)=>{
       this.blog = next;
       this.categories = this.blog.categories.map((e:any)=>e.id)
       this.showCategories = this.categories.length;
       this.loadData()
    }
    )


}





  // init Form + input Data + validate
  initForm() {
    this.formGroup = this.fb.group({
      author: [
        'Administrators',
        Validators.compose([
          ValidationMessagesComponent.containsHaveNumber,
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      content: [
        '',
        Validators.compose([
          ValidationMessagesComponent.containsHaveNumber,
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      description: [
        '',
        Validators.compose([
          ValidationMessagesComponent.containsHaveNumber,
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      created_date: ['', Validators.required],
      title: [
        '',
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
        ]),
      ],
      active :[
        this.access , Validators.compose([
          Validators.required,
        ]),
      ]
    });

  }



  loadData() {
     this.imageAvatar = this.blog.image;
     console.log(this.covenstation.getDateFormLocalDate(this.blog.createdDate))
    this.formGroup = this.fb.group({
      author: [
        'Administrators',
        Validators.compose([
          ValidationMessagesComponent.containsHaveNumber,
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      content: [
        this.blog.content,
        Validators.compose([
          ValidationMessagesComponent.containsHaveNumber,
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      description: [
        this.blog.description,
        Validators.compose([
          ValidationMessagesComponent.containsHaveNumber,
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      created_date: [this.covenstation.getDateFormLocalDate(this.blog.createdDate) , Validators.required],
      title: [
        this.blog.title,
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
        ]),
      ],
      active :[
         this.blog.active , Validators.compose([
          Validators.required,
        ]),
      ]


    });
    // disable fied not permisson update
   this.formGroup.disable();
  }




  isControlValid(controlName: string): boolean {
    return this.validateService.isControlValid(this.formGroup, controlName)
  }

  isControlNotValid(controlName: string): boolean {
    return this.validateService.isControlInvalid(this.formGroup, controlName)
  }
  // serivce for filed type Date
  getDateForEditFromMoment(date: moment.Moment, format = 'dd/MM/yyyy') {
    return date ? new Date(moment(date).format(format)) : null;
  }
















}

