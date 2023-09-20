import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailDetails } from 'src/app/interfaces/email-details';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent {
  email: EmailDetails;
  constructor(private route: ActivatedRoute) {
    // fetching data coming from a resolver
    this.route.data.subscribe({
      next: ({ email }) => {
        this.email = email;
      },
    });
  }

  ngOnInit() {}
}
