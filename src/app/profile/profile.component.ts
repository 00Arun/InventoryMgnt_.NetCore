import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../_models';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService, SessionService, AlertService, AuthenticationService } from '../_services';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { SignupaddupdateComponent } from '../signupmodel/signupaddupdate/signupaddupdate.component';
import { DialogService } from '../_services/dialog.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userViewModel: any;
  currentUserSubscription: Subscription;
  formData: FormGroup;
  userId: string;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private alertService: AlertService,
    public dialog: MatDialog,
    public dialogService: DialogService,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.userId = data;
    this.userViewModel = new Array();
  }
  ngOnInit() {
    this.initform();
    this.getUserProfileById(this.userId);
  }
  private initform() {
    this.formData = new FormGroup({
      FirstName: new FormControl('', Validators.required),
      LastName: new FormControl('', Validators.required),
      MobileNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.max(10)]),
      Suburb: new FormControl(''),
      State: new FormControl('', [Validators.required]),
      Country: new FormControl('', [Validators.required]),
      PostCode: new FormControl('', [Validators.min(4)]),
      City: new FormControl('', [Validators.required])
    });
  }
  public getUserProfileById(userId: string) {
    let url = '';
    url = this.sessionService.appSettings.baseApiUrl + 'Profile';
    this.httpService.HttpGetById<any>(url, userId).subscribe((response: any) => {
      this.bindDataForm(response.entity);
    }, response => this.onFailed(response));
  }
  private bindDataForm(response: any) {
    this.userViewModel = response;
    this.formData.patchValue({
      FirstName: response.firstName,
      LastName: response.lastName,
      Email: response.email,
      MobileNumber: response.mobileNumber,
      Suburb: response.suburb,
      State: response.state,
      Country: response.country,
      PostCode: response.postCode
    });
  }
  public onFailed(error: HttpErrorResponse) {
    const errorResponse: any = error.error;
    if (error.status > 0) {
      this.alertService.showError("", errorResponse.returnMessage[0]);
    } else {
      this.alertService.showError("", error.message);
    }
  }
  openBasicInfoDialog(): void {
    const dialogRef = this.dialog.open(SignupaddupdateComponent, {
      width: "770px",
      height: "547px",
      data: this.userId,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUserProfileById(this.userId);
    });
  }
  closeModal(){
    this.dialogRef.close();
  }
}
