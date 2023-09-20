import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signedin$: BehaviorSubject<boolean>;

  // this method is called automatically with every refresh
  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {
    this.signedin$ = this.authService.signedin$;
  }

  ngOnInit() {
    this.authService.checkAuth().subscribe(({ authenticated }) => {
      if (!authenticated) {
        this.router.navigateByUrl('/');
      }

      if (
        authenticated &&
        (this.location.path() == '' || this.location.path() == '/signup')
      ) {
        this.router.navigateByUrl('/inbox');
      }
    });
  }
}
