import { Injectable, EventEmitter } from '@angular/core';
import { AppSettings } from '../shared-model/appsettings.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';
@Injectable({
    providedIn: 'root'
})
export class SessionService {

    public appSettings: AppSettings;
    public userViewModel: User;
    public isAuthenticated: Boolean;
    public tokenExpirationDate: any;

    public authenicationEvent: EventEmitter<User>;
    public moduleLoadedEvent: EventEmitter<any>;
    private jwtHelperService: JwtHelperService;

    constructor() {
        this.appSettings = new AppSettings();
        this.userViewModel = new User();
        this.isAuthenticated = false;
        this.authenicationEvent = new EventEmitter<User>();
        this.moduleLoadedEvent = new EventEmitter<any>();
        this.jwtHelperService = new JwtHelperService();
    }

    public setAppSettings(appSettings: AppSettings) {
        this.appSettings = appSettings;
    }
    public setUserViewModel(userViewModel: User) {
        this.userViewModel = userViewModel;
        const token = userViewModel.token;
        this.userViewModel.tokenExpirationDate = this.jwtHelperService.getTokenExpirationDate(token);
        this.isAuthenticated = userViewModel.isAuthenticated;
        this.authenicationEvent.emit(userViewModel);
    }
    public isExpiredSession(): Boolean {
        if (this.userViewModel.token === null || this.userViewModel.token === undefined) {
            return true;
        }
        const isExpired: Boolean = this.jwtHelperService.isTokenExpired(this.userViewModel.token);
        return isExpired;
    }

    public endSession() {
        localStorage.removeItem('token');
        this.userViewModel = new User();
        this.userViewModel.isAuthenticated = false;
        this.authenicationEvent.emit(this.userViewModel);
    }

    public startSession() {
        const token: string = localStorage.getItem('token');
        if (token != null && token !== undefined) {
            const jwtHelperService: JwtHelperService = new JwtHelperService();
            const decodedToken = jwtHelperService.decodeToken(token);
            this.userViewModel = new User();
            this.userViewModel.token = token;
            this.userViewModel.firstName = decodedToken.name;
            this.userViewModel.email = decodedToken.email;
            this.userViewModel.userName = decodedToken.email;
            this.userViewModel.usertype = decodedToken.role;
            this.userViewModel.roleName = decodedToken.role;

            this.userViewModel.isAuthenticated = true;
            this.userViewModel.tokenExpirationDate = jwtHelperService.getTokenExpirationDate(token);
            this.authenicationEvent.emit(this.userViewModel);
        }
    }
}
