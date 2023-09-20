import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmailSummary } from '../interfaces/email-summary';
import { EmailDetails } from '../interfaces/email-details';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Router } from '@angular/router';

interface sendEmail {
  to: string | null | undefined;
  from: string | null | undefined;
  text: string | null | undefined;
  subject: string | null | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient, private router: Router) {}
  baseURL = 'https://api.angular-email.com';

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.baseURL}/emails`);
  }

  getEmail(id: string) {
    return this.http.get<EmailDetails>(`${this.baseURL}/emails/${id}`).pipe(
      catchError(() => {
        this.router.navigateByUrl('/inbox/not-found');
        return EMPTY;
      })
    );
  }

  sendEmail(email: sendEmail) {
    return this.http.post(`${this.baseURL}/emails`, email);
  }
}
