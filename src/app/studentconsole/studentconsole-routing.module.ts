import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookrequestComponent } from './bookrequest/bookrequest.component';
import { WelcomeComponent } from '../dashboard/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'dashboard', component: WelcomeComponent },
  { path: 'list', component: BookrequestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentconsoleRoutingModule { }
