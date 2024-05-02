import { HandlenApiService } from './../../../../shared/service/handlen-api.service';

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationMessagesComponent } from 'src/app/shared/modules/validation';
import { Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth/serivce/auth.service';
import { ConvertDataService } from 'src/app/shared';
import { UserService } from '../service/user.service';
import { FileErr } from 'src/app/pages/models/public';
import { ChangeInfoUser, ChangePassword, UserInfo } from '../models/userInfo';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { Gender } from 'src/app/shared/models/typePublic';
import { ConfirmPasswordValidator } from 'src/app/auth/register/confirm-password.validator';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  // Initialization for User Filed
  id: any;
  user: any;
  res: any;

  selectGender: any;
  gender: Gender[] = [
    {
      id: 1,
      labelName: 'MALE'
    },
    {
      id: 2,
      labelName: 'FEMALE'
    },
    {
      id: 3,
      labelName: 'OTHER'
    }
  ]

  // Initialization
  updateForm!: FormGroup;
  changePasswordForm!: FormGroup;

  // for Date
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

  ngOnInit(): void {
    this.id = this.authService.getUserInfo().id;
    // this.loadData(); // set Value for Form
    this.initForm();
    this.initFormChangePassword();
    this.service.getUserById(this.id).subscribe(
      {
        next: value => this.user = value,
        complete: () => this.loadData(this.user)
      }
    )


  }


  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private authService: AuthService,
    private service: UserService,
    private router: Router,
    private toastr: ToastrService,
    private covenstation: ConvertDataService,
    private handlenApiService: HandlenApiService,
    private validateService: ValidatorsService
  ) {
    this.imageError = {
      isErr: false,
      errMessage: '',
    };
    const currentDate = new Date();
    this.maxDate = currentDate;
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  // init Form + input Data + validate
  initForm() {
    this.updateForm = this.fb.group({
      name: [
        '',
        Validators.compose([
          ValidationMessagesComponent.containsHaveNumber,
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      username: [
        '',
        Validators.compose([
          ValidationMessagesComponent.containsHaveNumber,
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      birthday: [this.user?.birthday, Validators.required],
      email: [
        '',
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      msisdn: [
        '',
        Validators.compose([
          ValidationMessagesComponent.containsNonDigit,
          ValidationMessagesComponent.isValidPhoneNumber,
          ValidationMessagesComponent.KtraKhoangTrangNumber,
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.minLength(9),
          Validators.required,
          Validators.maxLength(11),
        ]),
      ],
      address: [
        '',
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      sex: [this.gender, Validators.required],
    });
  }



  loadData(user: any) {
    this.selectGender = this.convertGender(this.user?.gender)
    this.imageAvatar = this.user?.avatar == 'UNAVAILABLE' ? undefined : this.user?.avatar
    this.updateForm = this.fb.group({
      name: [
        this.user?.name,
        Validators.compose([
          ValidationMessagesComponent.containsHaveNumber,
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      username: [
        this.user?.username,
        Validators.compose([
          ValidationMessagesComponent.containsHaveNumber,
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      birthday: [new Date(this.user?.birthday), Validators.required],
      email: [
        this.user?.email,
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      msisdn: [
        this.user?.msisdn,
        Validators.compose([
          ValidationMessagesComponent.containsNonDigit,
          ValidationMessagesComponent.isValidPhoneNumber,
          ValidationMessagesComponent.KtraKhoangTrangNumber,
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.minLength(9),
          Validators.required,
          Validators.maxLength(11),
        ]),
      ],
      address: [
        this.user?.address,
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      sex: [this.selectGender, Validators.required],


    });
    // disable fied not permisson update
    this.updateForm.get('email')?.disable();
    this.updateForm.get('username')?.disable();
  }

  convertGender(value: any) {
    if (value == 'MALE') return 1
    if (value == 'FEMALE') return 2
    if (value == 'OTHER') return 3
    return null;
  }
  convertValueGenderToString(value: any) {
    if (value == 1) return 'MALE'
    if (value == 2) return 'FEMALE'
    if (value == 3) return 'OTHER'
    return null;
  }

  isControlValid(controlName: string): boolean {
    return this.validateService.isControlValid(this.updateForm, controlName)
  }

  isControlNotValid(controlName: string): boolean {
    return this.validateService.isControlInvalid(this.updateForm, controlName)
  }
  // serivce for filed type Date
  getDateForEditFromMoment(date: moment.Moment, format = 'dd/MM/yyyy') {
    return date ? new Date(moment(date).format(format)) : null;
  }
  //save Value
  onValueChange(value: Date): void {
    this.data = value;
  }
  setGender(event: any) {
    console.log(event);
  }
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


  // Service for  save + update
  save() {
    let valueGender = this.convertValueGenderToString(this.updateForm.get('sex')?.value)
    const resquest: ChangeInfoUser = {
      id: this.id,
      name: this.updateForm.get('name')?.value.trim(),
      gender: valueGender!,
      address: this.updateForm.get('address')?.value.trim(),
      avatar: this.isChangeImg ? '' : this.user?.avatar, // check avatar have change ?
      msisdn: this.updateForm.get('msisdn')?.value.trim(),
      birthday: this.data, // covers sang String
    }

    if (this.isChangeImg && this.imageAvatar) {
      this.handlenApiService.uploadImage(this.avatarImageFile!) // handlen Image , if seccuss --> post Data
        .subscribe((res) => {
          // secucess
          resquest.avatar = res; // override avatar from res send File
          this.service.updateUser(resquest).subscribe((res) => {
            this.toastr.success("Update Seccess !! ")
            this.authService.setInfoAfterUpdate(res);
            window.location.reload();
          })
        });
    } else {
      if (this.imageAvatar == undefined) resquest.avatar = 'UNAVAILABLE' // if Delete IMG after not update im --> set Default
      this.service.updateUser(resquest).subscribe((res) => {
        this.toastr.success("Update Seccess !! ")
        this.authService.setInfoAfterUpdate(res);
        window.location.reload();
      },
        (error) => {
          console.log(error),
            this.toastr.error("Update Failed !! ")
        }
      )
    }
  }



  initFormChangePassword() {
    this.changePasswordForm = this.fb.group({
      passwordOld: [
        '',
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      reTypePassword: [
        '',
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  saveChangePassword(){
    const resquest : ChangePassword = {
      id : this.id,
      passwordNew : this.changePasswordForm.get('password')?.value.trim(),
      passwordOld : this.changePasswordForm.get('passwordOld')?.value.trim(),
      passRepart : this.changePasswordForm.get('reTypePassword')?.value.trim(),
    }
    this.service.changePassword(resquest).subscribe( (res)=> {
        this.toastr.success("Change Passwrod Seccess, Please Login Again !! ")
        
        this.authService.logout();
        this.router.navigateByUrl('/auth/login');
    } , (error) => {
      // Do some about code
      this.toastr.error(error.message);
    }
  )

  }






}
