import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentconsoleRoutingModule } from './studentconsole-routing.module';
import { BookrequestComponent } from './bookrequest/bookrequest.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavModule } from '../main-nav/main-nav.module';
import { MaterialModule } from '../material/material.module';
import { NgxPaginationModule } from "ngx-pagination";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [BookrequestComponent],
  imports: [
    CommonModule,
    StudentconsoleRoutingModule,
    FormsModule,
    MainNavModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    NgxPaginationModule
  ]
})
export class StudentconsoleModule { }
