import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsehandlerRoutingModule } from './responsehandler-routing.module';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [ForbiddenComponent, UnauthorizedComponent, PagenotfoundComponent],
  imports: [
    CommonModule,
    ResponsehandlerRoutingModule
  ]
})
export class ResponsehandlerModule { }
