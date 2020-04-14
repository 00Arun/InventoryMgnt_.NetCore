import { Component, OnInit, Inject } from '@angular/core';
import { HttpService, SessionService, AlertService, AuthenticationService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/_services/dialog.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {
  userId: string;
  formData: FormGroup;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private alertService: AlertService,
    public dialog: MatDialog,
    public dialogService: DialogService,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<PasswordresetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {
    this.userId = data;
  }
  ngOnInit(): void {
    this.initform();
  }
  private initform() {
    this.formData = new FormGroup({
      OldPassword: new FormControl('', Validators.required),
      NewPassword: new FormControl('', Validators.required),
      ConfirmPassword: new FormControl('', [Validators.required])
    });
  }
  changePassword() {
    if (this.formData.valid) {
      const constsubmitmodel = {
        UserId: this.userId,
        OldPassword: this.formData.controls["OldPassword"].value,
        NewPassword: this.formData.controls["NewPassword"].value,
        ConfirmPassword: this.formData.controls["ConfirmPassword"].value,
      }
      let url = '';
      url = this.sessionService.appSettings.baseApiUrl + 'Profile/ChangePassword';
      this.httpService.HttpPost<any>(url, constsubmitmodel).subscribe((response: any) => {
        this.passwordChangeSuccess(response);
      }, response => this.passwordChangeFailed(response));

    } else {
      this.alertService.showWarning("", "Invalid Form");
    }
  }
  private passwordChangeSuccess(response: any) {
    const successResponse: any = response;
    if (successResponse.status === true) {
      this.alertService.showSuccess("", successResponse.returnMessage[0]);
      this.authenticationService.logout();
      this.dialogRef.close();
      this.router.navigate(['/login']);
    } else {
      this.alertService.showError("", successResponse.returnMessage[0]);
    }
  }

  private passwordChangeFailed(error: HttpErrorResponse) {
    const errorResponse: any = error.error;
    if (error.status > 0) {
      this.alertService.showError("", errorResponse.returnMessage[0]);
    } else {
      this.alertService.showError("", error.message);
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
