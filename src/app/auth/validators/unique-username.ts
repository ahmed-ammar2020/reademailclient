import { AsyncValidator, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  validate = (control: AbstractControl) => {
    const username = control.value;
    // return an observable not an observer so no "subscribe" method
    return this.authService.validateUsername(username).pipe(
      map((_) => null), // on errors
      catchError((err) => {
        if (err.error.username) {
          return of({ usernameTaken: true }); // an error
        }

        return of({ noConnection: true });
      })
    );
  };

  constructor(private authService: AuthService) {}
}
