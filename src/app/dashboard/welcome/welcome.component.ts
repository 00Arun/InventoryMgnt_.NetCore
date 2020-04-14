import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  currentUser: User;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser.roleName);
   }

  ngOnInit(): void {
  }

}
