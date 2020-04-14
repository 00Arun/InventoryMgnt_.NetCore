import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  SessionService, AuthenticationService } from './_services';
import { User } from './_models';
import { AppSettings } from './shared-model/appsettings.model';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'InventoryManagementSystem';
  sessionId: any;
  runningMonitor: boolean;
  currentUser: User;
  isAuthenticated: Boolean;
  firstName: string;
  lastName: string;
  tokenExpirationDate: any;
  iterations: any;
  
  constructor(
    private router: Router,
    private sessionService: SessionService,
    public authenticationService: AuthenticationService
  ) {

    this.sessionId = 0;
    this.runningMonitor = false;
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.sessionService.authenicationEvent.subscribe(event =>
      this.authenicationEvent(event)
    );

    // environment variable
    const appSettings = new AppSettings();
    appSettings.baseApiUrl = environment.apiUrl.base;
    sessionService.setAppSettings(appSettings);
    this.isAuthenticated = sessionService.isAuthenticated;

    sessionService.startSession();
  }
  ngOnInit(): void {
    const userId = this.sessionService.userViewModel.id;  
  }
  ngOnDestroy() {
  
  }

  // Need to add Authentication
  private authenicationEvent(userViewModel: User) {
    this.isAuthenticated = userViewModel.isAuthenticated;
    this.firstName = userViewModel.firstName;
    this.lastName = userViewModel.lastName;
    this.tokenExpirationDate = userViewModel.tokenExpirationDate;
    if (this.isAuthenticated === true && this.runningMonitor === false) {
      this.runningMonitor = true;
      this.monitorSession();
      this.sessionId = setInterval(() => {
        this.monitorSession();
      }, 5000);
    } else {
      if (this.isAuthenticated === false && this.runningMonitor === true) {
        this.clearSessionInterval();
      }
    }
  }
  private monitorSession() {
    const isExpiredSession = this.sessionService.isExpiredSession();
    if (isExpiredSession) {
      this.isAuthenticated = false;
      this.clearSessionInterval();
      this.logout();
    } else {
      this.isAuthenticated = true;
    }
    this.iterations++;
  }
  public logout() {
    this.sessionService.endSession();
    this.router.navigate(["/login"]);
  }
  private clearSessionInterval() {
    if (this.sessionId !== 0) {
      clearInterval(this.sessionId);
      this.sessionId = 0;
    }
    this.runningMonitor = false;
  }
}
