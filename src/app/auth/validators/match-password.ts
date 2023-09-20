// creating a custom validator is so easy
// class-based sync validator
import { Injectable } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';

// now you can use DI to make instances of that class
@Injectable({
  providedIn: 'root',
})
export class MatchPassword implements Validator {
  validate(form: AbstractControl) {
    const { password, passwordConfirmation } = form.value;

    if (password === passwordConfirmation) {
      return null;
    }

    return { passwordsDontMatch: true };
  }
}
