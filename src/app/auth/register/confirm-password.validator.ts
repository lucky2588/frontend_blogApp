import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchPassword(control: AbstractControl): void | null {
    const password = control.get('password')?.value;

    const confirmPassword = control.get('reTypePassword')?.value;

    if (password !== confirmPassword) {
      control.get('reTypePassword')?.setErrors({ ConfirmPassword: true });
    } else {
      return null;
    }
  }
}
