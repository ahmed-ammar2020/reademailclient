import { Component, Input } from '@angular/core';
import { EmailDetails } from 'src/app/interfaces/email-details';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent {
  @Input() email: EmailDetails;
  modalShown = false;
  replyEmail: EmailDetails;

  toggleModal() {
    this.modalShown = !this.modalShown;
  }

  ngOnChanges() {
    this.replyEmail = this.email;
    this.replyEmail = {
      ...this.replyEmail,
      from: this.replyEmail.to,
      to: this.replyEmail.from,
    };
  }
}
