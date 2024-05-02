import { ToastrServiceCustomer } from './../../shared/service/toastr.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators, ReactiveFormsModule
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService, setData } from '../serivce/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationMessagesComponent } from 'src/app/shared/modules/validation';
import { Observable, Subscription } from 'rxjs';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import {
  City,
  District,
  districtList,
  filteredList,
  Ward,
  wardList,
} from 'src/app/shared/fakeData/location';
import { RegisterRequest } from '../models/authModels';
import * as moment from 'moment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  // Initialization
  registrationForm!: FormGroup;
  hasError!: boolean;
  isLoading$: Observable<boolean> | undefined;

  // for Date
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  data?: Date;

  selectedGender: string = 'male';


  // variable location
  // city
  cities: City[];
  selectedCity: any;
  // distrinct
  selectedDistrinct: any;
  districtDefault: District[];
  districtFiltered: District[];
  // ward
  selectedWard: any;
  wardDefualt: Ward[];
  wardFiltered: Ward[];

  cacheAddress: string = '';
  fullAddress: string = '';

  // private fields
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    // for Location
    this.cities = filteredList;
    this.districtDefault = districtList;
    this.districtFiltered = [];

    this.wardDefualt = wardList;
    this.wardFiltered = [];
    // Set maxDate bằng ngày hiện tại
    const currentDate = new Date();
    this.maxDate = currentDate;
    this.bsRangeValue = [this.bsValue, this.maxDate];
    // redirect to home if already logged in
  }

  ngOnInit(): void {
    if (this.authService.getAuthentication() == true) {
      // If isAuthentication return Home
      this.router.navigateByUrl('home');
    }
    // dùng để khởi tạo form mặc định
    this.initForm();
    // Initialization Location
    this.cities = filteredList;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        firstName: [
          '',
          Validators.compose([
            ValidationMessagesComponent.containsHaveNumber,
            ValidationMessagesComponent.KtraKhoangTrang,
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        lastName: [
          '',
          Validators.compose([
            ValidationMessagesComponent.containsHaveNumber,
            ValidationMessagesComponent.KtraKhoangTrang,
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        birthdayDate: [new Date(), Validators.required],
        selectedCity: [''],
        selectedDistrinct: [''],
        selectedWard: [''],
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
            Validators.required,
            ValidationMessagesComponent.containsNonDigit,
            ValidationMessagesComponent.KtraKhoangTrangNumber,
            Validators.minLength(10),
            Validators.maxLength(11),
            ValidationMessagesComponent.isValidPhoneNumber,
          ]),
        ],
        address: [
          this.fullAddress,
          Validators.compose([
            ValidationMessagesComponent.KtraKhoangTrang,
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(320),
          ]),
        ],
        username: [
          '',
          Validators.compose([
            ValidationMessagesComponent.KtraKhoangTrang,
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(320),
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
        gender: [''],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  resetInfo() {
    this.initForm();
  }

  // Handle Service

  // for Fied Address
  clearAddress() {
    this.fullAddress = '';
    this.registrationForm.get('address')?.setValue('');
    this.districtFiltered = [];
    this.wardFiltered = [];
  }

  getDistrict(event: any) {
    this.fullAddress = event.labelName;
    this.districtFiltered = this.districtDefault.filter(
      (item) => item.parentCode === event.id
    );
    this.cacheAddress = event.labelName;
  }

  setDistrict() {
    this.fullAddress = this.cacheAddress;
  }

  getWard(event: any) {
    this.fullAddress = event.labelName + ' ' + this.cacheAddress;
    this.wardFiltered = this.wardDefualt.filter(
      (item) => item.parentCode === event.id
    );
  }
  setAddressDefault() {
    if (this.fullAddress === '') {
      this.registrationForm.get('selectedDistrinct')!.setValue('');
    }
  }

  setAddress(event: any) {
    this.registrationForm.get('address')!.setValue(event.fullAdrress);
  }
  // for Fied Date/Birday
  getDateForEditFromMoment(date: moment.Moment, format = 'dd/MM/yyyy') {
    return date ? new Date(moment(date).format(format)) : null;
  }
  //save Value
  onValueChange(value: Date): void {
    this.data = value;
  }



  submitForm() {
    const resquest: RegisterRequest = {
      name:
        this.registrationForm.get('firstName')?.value.trim() +
        ' ' +
        this.registrationForm.get('lastName')?.value.trim(),
      username: this.registrationForm.get('username')?.value.trim(),
      password: this.registrationForm.get('password')?.value.trim(),
      gender: this.selectedGender.toLocaleUpperCase().trim(),
      email: this.registrationForm.get('email')?.value.trim(),
      address: this.registrationForm.get('address')?.value.trim(),
      reTypePassword: this.registrationForm.get('reTypePassword')?.value.trim(),
      msisdn: this.registrationForm.get('msisdn')?.value.trim(),
      birthday: this.data, // covers sang String
    };
    this.authService.register(resquest).subscribe(
      (response) => {
        if (response) {
          this.toastr.success(' Successful Account Registration . Comeback Login !! ');
          setInterval(() => {
            this.authService.setUserInfoDefalut();
            this.router.navigateByUrl('/auth/login');
          }
            , 500
          )
        } else {
          // Login Fail !!
          this.toastr.error(
            'Bad credentials . Please check infomation of You type !!'
          );
        }
      },
      (error) => {
        // Do some about code
        this.toastr.error(error.error.message);
      }
    );
  }




}
