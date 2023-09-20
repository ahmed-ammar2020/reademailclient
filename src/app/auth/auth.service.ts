import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface ValidateUsernameResponse {
  available: true;
}

interface signupCredentials {
  username?: string | null | undefined;
  password?: string | null | undefined;
  passwordConfirmation?: string | null | undefined;
}
interface signinCredentials {
  username?: string | null | undefined;
  password?: string | null | undefined;
  passwordConfirmation?: string | null | undefined;
}

interface signupResponse {
  username: string;
}

interface SigninResponse {
  username: string;
}

interface checkAuthResponse {
  authenticated: boolean;
  username: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // not signed in as a default value
  signedin$ = new BehaviorSubject<any>(null);
  username: string | null;

  constructor(private http: HttpClient) {}

  baseURL = 'https://api.angular-email.com';

  validateUsername(username: string) {
    // using generic makes TS smarter
    return this.http.post<ValidateUsernameResponse>(
      `${this.baseURL}/auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: signupCredentials) {
    return this.http
      .post<signupResponse>(`${this.baseURL}/auth/signup`, credentials)
      .pipe(
        // this will be executed in successful request only (signup successfully)
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }

  checkAuth() {
    return this.http
      .get<checkAuthResponse>(`${this.baseURL}/auth/signedin`)
      .pipe(
        // tap here is better than map, as tap must not return any thing
        tap(({ authenticated, username }) => {
          this.signedin$.next(authenticated);
          this.username = username;
        })
      );
  }

  signout() {
    return this.http.post(`${this.baseURL}/auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false);
      })
    );
  }

  signin(credentials: signinCredentials) {
    return this.http
      .post<SigninResponse>(`${this.baseURL}/auth/signin`, credentials)
      .pipe(
        tap(({ username }) => {
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}
