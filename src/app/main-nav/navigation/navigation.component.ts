import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { MatDialog } from '@angular/material/dialog';
import { PasswordresetComponent } from 'src/app/profile/passwordreset/passwordreset.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  currentUser: User;
  stateFlag = false;
  liId: String;
  opened: boolean = true;
  routLink: string;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.opened = true;
  }
  ngOnInit() {
    console.log(this.currentUser.roleName);
    if (this.currentUser.roleName == "Admin") {
      this.routLink = "/adminconsole";
    } else if (this.currentUser.roleName == "Student") {
      this.routLink = "/studenconsole";
    }
    else {
      this.routLink = "/librarianconsole";
    }

  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  Profile() {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: "985px",
      height: "590px",
      data: this.currentUser.id
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  changePassword() {
    const dialogRef = this.dialog.open(PasswordresetComponent, {
      width: "625px",
      height: "360px",
      data: this.currentUser.id
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
