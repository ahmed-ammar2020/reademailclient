import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailDetails } from 'src/app/interfaces/email-details';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent {
  modalShown = false;
  username: string | null;
  email: EmailDetails = {
    id: '',
    text: '',
    html: '',
    from: '',
    to: '',
    subject: '',
  };

  constructor(private authService: AuthService) {}

  toggleModal() {
    this.modalShown = !this.modalShown;
  }

  ngOnInit() {
    this.username = this.authService.username + '@angular-email.com';
    this.email = {
      ...this.email,
      from: this.username,
    };
  }
}
