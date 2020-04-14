import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService, AuthenticationService, AlertService } from '../_services';
import { first } from 'rxjs/operators';
import { UserResponse } from '../Models/user.response';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from '../_models/role';
import { SignupaddupdateComponent } from '../signupmodel/signupaddupdate/signupaddupdate.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../_services/dialog.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  hide = false;
  submitted = false;
  returnUrl: string;
  constructor(
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public sessionService: SessionService,
    public authenticationService: AuthenticationService,
    public alertService: AlertService,
    public dialog: MatDialog,
    public dialogService: DialogService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe((response: UserResponse) => {
        if (response.status) {
          this.loginSuccess(response);
        } else {
          this.loginFailed(response);
        }
      }, (response: HttpErrorResponse) => this.onFailed(response));
  }
  public loginSuccess(response: UserResponse) {
    if (response.entity.roleName === Role.Admin) {
      this.router.navigate(['/adminconsole']);
    } else if (response.entity.roleName === Role.librarian) {
      this.router.navigate(['/librarianconsole']);
    } else {
      this.router.navigate(['/studentconsole']);
    }
  }
  public loginFailed(response: any) {
    this.loading = false;
    if (response.status === false) {
      this.alertService.showWarning("Error", response.returnMessage[0]);
    } else {
      this.alertService.showWarning("Error", response.message);
    }
  }
  public onFailed(error: HttpErrorResponse) {
    this.loading = false;
    this.alertService.showWarning("Error", error);
  }
  openOpenDialog(): void {
    const dialogRef = this.dialog.open(SignupaddupdateComponent, {
      width: "770px",
      height: "515px"
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/login']);
    });
  }
}
