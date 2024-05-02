import { ToastrServiceCustomer } from './../../shared/service/toastr.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService, setData } from '../serivce/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationMessagesComponent } from 'src/app/shared/modules/validation';
import { LoginRequest } from '../models/authModels';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    // Initialization
  loginForm!: FormGroup;
  isLoggin: boolean | undefined = false;
  hidePassword = true;


  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.service.getAuthentication() == true) { // If isAuthentication return Home
      this.router.navigateByUrl("home");
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([ValidationMessagesComponent.KtraKhoangTrang, Validators.required, Validators.minLength(3)])],
      password: ['', Validators.required],
    })
  }

  submitForm() {
    let resquest: LoginRequest = {
      username: this.loginForm.get('username')!.value,
      password: this.loginForm.get('password')!.value
    }
    this.service.login(resquest).subscribe(
      (response) => {
        if (response.isAuthenticated) {
          this.toastr.success(" Login Seccess !! ")
          this.isLoggin = true;
          // save User Info to Local
          this.service.saveInfo(response)
          const data = this.service.saveInfo(response)
          this.router.navigateByUrl(""); // move to Home
          this.service.saveUserInfo(data) // value transmission to Header
        } else {
          // Login Fail !!
          this.toastr.error("Bad credentials . Please Check Again Account And Password ")
          this.isLoggin = false;
        }
      },
      (error) => {
        // Do some about code
        this.toastr.error("Bad credentials . Please Check Again Account And Password")
        this.isLoggin = false;
      }
    );
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }







}
