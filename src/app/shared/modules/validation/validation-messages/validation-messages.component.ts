import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
@Component({
  selector: 'show-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss'],
})
export class ValidationMessagesComponent {

  @Input() control!: AbstractControl<any>;

  get message() {
    try {
      if (this.control?.errors) {
        for (const err in this.control.errors) {
          if (Object.prototype.hasOwnProperty.call(this.control.errors, err)) { // hứng tất cả resquest trả xuống
            return this.getErrorMessage(err);
          }
        }
      }
    } catch (error) {
    }
  }

  // kiểm tra dấu cách - nếu có dấu cách là lỗi
  public static KtraKhoangTrang(control: AbstractControl) {
    // nếu k phai số trả về true
    if (control.value != null && control.value != "") {
      if (control.value.trim().length == 0) {
        return { required: true };
      }
      return null;
    }
    return null;
  }


  public static KtraSoEmail(control: AbstractControl) {
    // nếu k phai số trả về
    if (control.value != null && control.value != "") {
      if (!/^[a-zA-Z0-9.+]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/.test(control.value.trim())) {
        return { patternEmail: true };
      }
      return null;
    }
    return null;
  }






  public static KtraSoLuong(control: AbstractControl) {
    // nếu k phai số trả về
    if (control.value != null && control.value != "") {
      if (!/^[0-9]*$/.test(`${control.value}`?.trim())) {
        return { patternSoLuong: true };
      }
      return null;
    }
    return null;
  }


  public static containsNonDigit(control: AbstractControl){ // only digit not text
    if(/\D/.test(control.value)) {
      return { containsNonDigit: true };
    }
    return null;
  }


  public static containsHaveNumber(control: AbstractControl){
    if(/\d/.test(control.value)) {
      return { containsHaveNumber: true };
    }
    return null;
  }




  public static KtraTenDangNhap(control: AbstractControl) {
    // nếu k phai số trả về
    if (control.value != null && control.value != "") {
      if (!/^[a-zA-Z0-9]{3,20}$/.test(control.value)) {
        if (control.value.length < 3) {
          return { minlength: true}
        } else if (control.value.length > 20) {
          return { maxlength: true}
        } else {
          return { patternTenDangNhap: true };
        }
      }
      return null;
    }
    return null;
  }

  public static KtraTenTieuDe(control: AbstractControl) {
    // nếu k phai số trả về
    if (control.value != null && control.value != "") {
      if (!/^[a-zA-Z0-9!@#\\$%\\^\\&*\\)\\(+=._-]{0,}$/.test(control.value.trim())) {
        return { patternTenTieuDe: true };
      }
      return null;
    }
    return null;
  }



  public static KtraMatKhau(control: AbstractControl) {
    // nếu k phai số trả về
    if (control.value != null && control.value != "") {
      if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{3,}$/.test(control.value.trim())) {
        return { patternMatKhau: true };
      }
      return null;
    }
    return null;
  }

  public static isValidPhoneNumber(control: AbstractControl) {
    // nếu k phai số trả về true
      const cleanPhoneNumber = control.value.replace(/\D/g, '');
      const isCheck =  /^(0|84)(\d{9,10})$/.test(cleanPhoneNumber)
      if (!isCheck){
        return { patternNumberPhone: true };
      }else{
        return null;
      }
  }


  public static KtraKhoangTrangNumber(control: AbstractControl) {
    // nếu k phai số trả về true
    if (control.value != null && control.value != "") {
      if (control.value.toString().trim().length == 0) {
        return { required: true };
      }
      return null;
    }
    return null;
  }
  public static validUrl(control: AbstractControl) {
    var res = control.value?.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (!res && control.value?.length > 0) {
      return { urlValid: true };
    }
    return null;
  }

  public static KtraDauSo(control: AbstractControl) {
    // nếu k phai số trả về
    if (control.value != null && control.value != "") {
      if (!/^[0-9]*$/.test(control.value.trim())) {
        return { patternDauSo: true };
      }
      return null;
    }
    return null;
  }
  getErrorMessage(err: any) {
    const messages: any = {
      'required': "This field not blank", // Đây là trường bắt buộc
      'email': "Email không đúng định dạng", // Email không đúng định dạng
      'patternSDT': "Số điện thoại không đúng định dạng", // SĐT không đúng định dạng
      'patternPrice': "Thông tin không đúng định dạng", // SĐT không đúng định dạng
      // 'pattern': "Không đúng định dạng",   // Không đúng định dạng
      'containsNonDigit' : 'Không được chứa chữ',
      'containsHaveNumber' : 'Không được chứa số',
      'ConfirmPassword' : ' Password and rePassword not equal ',
      'minlength': "Tối thiểu " + this.control?.errors?.['minlength']?.requiredLength + " số",
      'maxlength': "Tối đa " + this.control?.errors?.['maxlength']?.requiredLength + " số",
      'patternNumberPhone' : 'Đầu số không đúng định dạng , +84 hoặc 0',
      'patternTenTieuDe': "Tiêu đề không đúng định dạng",
      'invalidCode2': "Bao gồm 10 hoặc 13 ký tự",
      'xacNhanMatKhau': "Mật khẩu không khớp",
      'patternMatKhau': "Bắt buộc bao gồm 1 ký tự chữ hoa, 1 chữ thường, 1 ký tự số và 1 ký tự đặc biệt",
      'urlValid': 'URL không đúng định dạng',
      'patternMinDoUuTien': 'Độ ưu tiên phải lớn hơn 0',
      'patternSoLuong': 'Số lượng không đúng định dạng',
      'patternEmail': 'Email không đúng định dạng',
      'patternMoTaErorr': "Tối đa 4000 ký tự",
      'patternEditorImg': "Không cho phép thêm ảnh vào trường này",
      'patternDauSo': 'Đầu số không đúng định dạng',
    };
    return messages[err];
  }

}
