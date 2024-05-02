import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ValidationMessagesComponent } from 'src/app/shared/modules/validation';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from '../service/category.service';
import { CategoryDetail } from '../../models/category';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent {
  // Initialization
  formGroup!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private validateService: ValidatorsService,
    public modalService : NgbModal,
    public modal: NgbActiveModal,
    public service : CategoryService

  ) {}

  ngOnInit(): void {
    this.initForm();
}

  // init Form  + validate
  initForm() {
    this.formGroup = this.fb.group({
      labelName: [
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
      thumbail: [
        '',
        Validators.compose([
          ValidationMessagesComponent.KtraKhoangTrang,
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });

  }


  isControlValid(controlName: string): boolean {
    return this.validateService.isControlValid(this.formGroup, controlName)
  }

  isControlNotValid(controlName: string): boolean {
    return this.validateService.isControlInvalid(this.formGroup, controlName)
  }



  // save Data
  save(){
       let res: CategoryDetail = {
        description : this.formGroup.get('description')?.value,
        labelName : this.formGroup.get('labelName')?.value,
        thumbail : this.formGroup.get('thumbail')?.value
       }
      this.service.save(res).subscribe(
        (res)=>{
          this.toastr.success(" Create Category New Seccess !! ")
          setInterval(()=>{
            this.modal.close();
          }
            ,500
          )
        }
      )
  }











}


