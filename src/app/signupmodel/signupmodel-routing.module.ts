import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupaddupdateComponent } from './signupaddupdate/signupaddupdate.component';


const routes: Routes = [
  { path: 'signup', component:SignupaddupdateComponent},
  { path: '', component:SignupaddupdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupmodelRoutingModule { }
