import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ResolveFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EmailService } from './email.service';

export const emailResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<{}> => {
  let id = route.params['id'];

  // waiting for the request to be done, then show the data
  return inject(EmailService).getEmail(id);
};
