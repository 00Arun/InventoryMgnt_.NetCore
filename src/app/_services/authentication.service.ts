import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SessionService } from './session.service';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';
import { UserResponse } from '../Models/user.response';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private httpService: HttpService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const url =
      this.sessionService.appSettings.baseApiUrl + "Account/Login";
    return this.httpService.HttpPost<UserResponse>(url, { username, password})
      .pipe(
        map((response: UserResponse) => {
          const user = response.entity;
          if (user && user.token) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            localStorage.setItem("token", user.token);
            this.currentUserSubject.next(user);
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    this.currentUserSubject.next(null);
  }

}
