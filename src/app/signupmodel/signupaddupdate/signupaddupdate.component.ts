import { Component, OnInit, Inject } from '@angular/core';
import { HttpService, SessionService, AlertService, AuthenticationService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/_services/dialog.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/_models';
@Component({
  selector: 'app-signupaddupdate',
  templateUrl: './signupaddupdate.component.html',
  styleUrls: ['./signupaddupdate.component.scss']
})
export class SignupaddupdateComponent implements OnInit {
  userId: string;
  userViewModel: any[];
  formData: FormGroup;
  containerTitle: string;
  UserViewModel: any;
  submitButtonValue = "Save";
  currentUser: User;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private alertService: AlertService,
    public dialog: MatDialog,
    public dialogService: DialogService,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<SignupaddupdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.userId = data;
    this.userViewModel = new Array();
  }
  ngOnInit() {
    this.initform();
    if (this.userId != null) {
      this.containerTitle = "Edit";
      this.getUserById(this.userId);
    }
  }
  private initform() {
    this.formData = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      MobileNumber: new FormControl('', [Validators.required]),
      Suburb: new FormControl(''),
      State: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      Country: new FormControl('', [Validators.required]),
      PostCode: new FormControl('', [Validators.min(4), Validators.pattern("^[0-9]*$")]),
      City: new FormControl('', [Validators.required])
    });
  }
  public getUserById(userId: string) {
    const url = this.sessionService.appSettings.baseApiUrl + 'Profile';
    this.httpService.HttpGetById<any>(url, userId).subscribe((response: any) => {
      this.bindFormData(response.entity);
    }, response => this.addOrUpdateUserFailed(response));
  }
  public bindFormData(response: any) {
    this.submitButtonValue = "Publish";
    this.userId = response.id;
    this.formData.patchValue({
      Email: response.email,
      FirstName: response.firstName,
      LastName: response.lastName,
      MobileNumber: response.mobileNumber,
      Suburb: response.suburb,
      State: response.state,
      Country: response.country,
      PostCode: response.postCode,
      City: response.city
    });
  }
  public getUserFailed(error: HttpErrorResponse) {
    const errorResponse: any = error.error;
    if (error.status > 0) {
      this.alertService.showError("Error", errorResponse.returnMessage[0]);
    } else {
      this.alertService.showError("Error", error.message);
    }
  }
  public addOrUpdateUser(status: string) {
    if (this.formData.valid) {
      let entity = new User();
      entity = this.formData.value;
      entity.State = Number(this.formData.controls["State"].value);
      entity.PostCode = Number(this.formData.controls["PostCode"].value)
      let url = '';
      if (this.userId == null) {
        url = this.sessionService.appSettings.baseApiUrl + 'Account/Register';
        this.httpService.HttpPost<any>(url, entity).subscribe((response: any) => {
          this.addOrUpdateUserSuccess(response);
        }, response => this.addOrUpdateUserFailed(response));
      } else {
        url = this.sessionService.appSettings.baseApiUrl + 'Profile/UpdateProfile/' + this.userId;
        this.httpService.HttpPut<any>(url, entity).subscribe((response: any) => {
          this.onUpdateSuccess(response);
        }, response => this.addOrUpdateUserFailed(response));
      }
    } else {
      this.alertService.showWarning("", "Invalid form");
    }
  }
  public onUpdateSuccess(response: any) {
    this.alertService.showSuccess("", response.returnMessage[0]);
    this.dialogRef.close();

  }
  public addOrUpdateUserSuccess(response: any) {
    this.alertService.showSuccess("", response.returnMessage[0]);
    this.router.navigate(['/login']);
    this.dialogRef.close();

  }
  public addOrUpdateUserFailed(error: HttpErrorResponse) {
    const errorResponse: any = error.error;
    console.log(error);
    if (error.status > 0) {
      this.alertService.showError("Error", errorResponse.returnMessage[0]);
    } else {
      this.alertService.showError("Error", error.message);
    }
  }
  public closeModal() {
    this.dialogRef.close();
  }
}
