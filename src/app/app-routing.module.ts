import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helper/auth.guard';
import { Role } from './_models';
import { LoginComponent } from './Login/login.component';
import { NavigationComponent } from './main-nav/navigation/navigation.component';
import { ForbiddenComponent } from './responsehandler/forbidden/forbidden.component';
import { PagenotfoundComponent } from './responsehandler/pagenotfound/pagenotfound.component';
import { UnauthorizedComponent } from './responsehandler/unauthorized/unauthorized.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: "adminconsole",
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
    loadChildren: () => import('./adminconsole/adminconsole.module').then(m => m.AdminconsoleModule)
  },
  {
    path: "librarianconsole",
    canActivate: [AuthGuard],
    data: { roles: [Role.librarian] },
    loadChildren: () => import('./librarianconsole/librarianconsole.module').then(m => m.LibrarianconsoleModule)
  },
  {
    path: "studentconsole",
    canActivate: [AuthGuard],
    data: { roles: [Role.Student] },
    loadChildren: () => import('./studentconsole/studentconsole.module').then(m => m.StudentconsoleModule)
  },
  {
    path: "profile",
    canActivate: [AuthGuard],
    data: { roles: [Role.librarian, Role.Admin, Role.Student] },
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: "signup",
    loadChildren: () => import('./signupmodel/signupmodel.module').then(m => m.SignupmodelModule)
  },
   {
    path: "forbidden",
    component: ForbiddenComponent
  },
  {
    path: "pagenotfound",
    component: PagenotfoundComponent
  },
  {
    path: "unauthorized",
    component: UnauthorizedComponent
  },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
