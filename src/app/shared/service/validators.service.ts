import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {
  formGroup!: FormGroup;

  constructor() { }


  isWhitespaceOnly(text: string): boolean {
    // Kiểm tra xem văn bản chỉ chứa dấu cách và không chứa ký tự khác
    return /^\s*$/.test(text);
  }

  getFileSizeInMb(file: File) {
    return (file.size / (1024 * 1024)).toFixed(2);
  }

  // helpers for View
  isControlValid(value : any , controlName: string): boolean {
    const control = value.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(value : any ,controlName: string): boolean {
    const control = value.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(value:any,validation:any, controlName:any): boolean {
    const control = value.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(value : any , controlName:any): boolean {
    const control = value.controls[controlName];
    return control.dirty || control.touched;
  }




}
