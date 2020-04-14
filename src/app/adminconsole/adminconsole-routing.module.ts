import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminbooklistComponent } from './adminbooklist/adminbooklist.component';
import { WelcomeComponent } from '../dashboard/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'dashboard', component: WelcomeComponent },
  { path: 'list', component: AdminbooklistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminconsoleRoutingModule { }
