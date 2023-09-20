import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailService } from 'src/app/inbox/email.service';
import { EmailDetails } from 'src/app/interfaces/email-details';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent {
  @Output() submitted = new EventEmitter();
  @Input() email: EmailDetails;
  @Input() readOnlyFrom: boolean;
  @Input() readOnlyTo: boolean;
  @Input() readOnlySubject: boolean;

  message: string;
  action: string;

  emailForm = new FormGroup({
    to: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    from: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    subject: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(
    private emailService: EmailService,
    private _snackBar: MatSnackBar
  ) {}

  submitForm() {
    this.submitted.emit();
    let { to, from, content, subject } = this.emailForm.value;
    this.emailService
      .sendEmail({ to, from, subject, text: content })
      .pipe(
        catchError(() => {
          console.log('error');
          this.openSnackBar(
            'Failed to send, Please  check  your  connection',
            'Close'
          );
          return EMPTY;
        })
      )
      .subscribe(() => {
        // show a message (successfully sent) by angular material
        // catch the error in catchEror and show a failure notification too
        this.openSnackBar('Email Sent', 'OK');
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
    });
  }

  ngOnChanges() {
    this.emailForm.patchValue({
      to: this.email.to,
      from: this.email.from,
      subject: this.email.subject,
      content: this.email.text,
    });
  }
}
