
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValidationMessagesComponent } from 'src/app/shared/modules/validation';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { ConvertDataService } from 'src/app/shared';
import { FileErr } from 'src/app/pages/models/public';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { Access, BlogDetail } from 'src/app/shared/models/typePublic';
import { HandlenApiService } from 'src/app/shared/service/handlen-api.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ckEditorConfig } from '../../../../../shared/config/ckeditor.config'
import { Editor, EditorConfig } from '@ckeditor/ckeditor5-core';
import { BlogService } from '../service/blog.service';
import { SaveBlog } from '../../models/blog';


@Component({
  selector: 'app-create-or-update-blog',
  templateUrl: './create-or-update-blog.component.html',
  styleUrls: ['./create-or-update-blog.component.scss']
})
export class CreateOrUpdateBlogComponent implements OnInit{

  @Input() id: number = 0;
  get ckEditorConfig(): EditorConfig {
    return ckEditorConfig;
  }
  Editor = ClassicEditor;
  editor: Editor | undefined;
  // Initialization
  formGroup!: FormGroup;
  // for Date
  selectAccess: any;
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

  showCategories : number;
  blog : BlogDetail | any;
  categories : number[];

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
    this.showCategories = 0;
    const currentDate = new Date();
    this.maxDate = currentDate;

  }

  ngOnInit(): void {
    this.initForm();
    if(this.id != 0) { // for Update
      this.service.getDetail(this.id).subscribe((next)=>{
        this.blog = next;
        this.categories = this.blog.categories.map((e:any)=>e.id)
        this.showCategories = this.categories.length;
        this.loadData() // load data for form
     })
    }
}





  // init Form + input Data + validate
  initForm() {
    this.selectAccess = 1;
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
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      description: [
        '',
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      created_date: [new Date(), Validators.required],
      title: [
        '',
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
        ]),
      ],
      active :[
        this.access[0] , Validators.compose([
          Validators.required,
        ]),
      ]
    });
    this.formGroup.get('author')?.disable()
    this.formGroup.get('created_date')?.disable()


  }



  loadData() {
    this.selectAccess = this.blog.active === 'PUBLIC' ? 1 : 2
    this.imageAvatar = this.blog.image;
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
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      description: [
        this.blog.description,
        Validators.compose([
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
        this.selectAccess, Validators.compose([
          Validators.required,
        ]),
      ]
    });
    this.formGroup.get('author')?.disable()
    this.formGroup.get('created_date')?.disable()
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
  //save Value


  // service for Image
  onHoverThumbnail() {
    this.hoverImg = true;
  }
  onLeaveThumbnail() {
    this.hoverImg = false;
  }
  onSelectThumbnailImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const typeImg = file.name?.split('.');
      if (this.imageType.includes(typeImg[1])) { // get value frist update
        if (file.size > 5 * 1024 * 1024) { // catch Exp in update image
          this.imageAvatar = undefined;
          this.imageError.isErr = true;
          this.imageError.errMessage = 'Max data about 5Mb';
          this.imgValid = false;
        } else {
          this.isChangeImg = true; // have event Change img
          this.imgValid = true;
          this.imageError.isErr = true;
          this.imageError.errMessage = '';
          this.avatarImageFile = file;
          this.hoverImg = false;
          this.imageAvatar = this.sanitizer.bypassSecurityTrustResourceUrl(
            reader.result!.toString()
          );
        }
      } else {
        this.imgValid = false;
        this.imageAvatar = undefined;
        this.imageError.isErr = true;
        this.imageError.errMessage =
          'Ảnh không đúng định dạng hoặc vượt quá dung lượng cho phép';
      }
    };
    reader.readAsDataURL(file);
    event.target.value = null;
  }
  onSelectScreenShot(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageAvatar = reader.result;
    };
    reader.readAsDataURL(file);
  }
  deleteScreenShot() {
    this.imageAvatar = undefined;
    this.imgValid = false;
  }
  getFileSizeInMb(file: File) {
    return (file.size / (1024 * 1024)).toFixed(2);
  }


  getCategories(event:number[]){
   this.categories = event;
  }

  save(){
    if(this.imageAvatar == null){
      this.toastr.error('Image Of Blog Not Empty !! ')
      return;
    }

    let res : SaveBlog = {
      id: this.id == 0 ? null : this.id,
      title:  this.formGroup.get('title')?.value,
      active: this.selectAccess == 1 ? "PUBLIC" : "PRIVATE",
      image : this.id == 0 ? "" : this.blog.image,
      description : this.formGroup.get('description')?.value,
      content: this.formGroup.get('content')?.value,
      userId : 1,
      categoryList: this.categories,
     }

      if(!this.isChangeImg){
        this.service.saveBlog(res).subscribe((res)=>{
          this.toastr.success("Update Seccess !! ")
          setInterval(()=>{
            this.modal.close();
          }
            , 500
          )
        })
      }else{ // if change Img
        this.handlenApiService.uploadImage(this.avatarImageFile!).subscribe((urlImg:string) => {
          // secucess
          res.image = urlImg; // override avatar from res send File
          this.service.saveBlog(res).subscribe((res)=>{
            this.toastr.success("Update Seccess !! ")
            setInterval(()=>{
              this.modal.close();
            }
              , 500
            )
          })
        });
      }
  }


}


