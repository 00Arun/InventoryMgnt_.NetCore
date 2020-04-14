import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminconsoleRoutingModule } from './adminconsole-routing.module';
import { AdminbooklistComponent } from './adminbooklist/adminbooklist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from "@angular/flex-layout";
import { MainNavModule } from '../main-nav/main-nav.module';
import { NgxPaginationModule } from "ngx-pagination";
import { MaterialModule } from '../material/material.module';
@NgModule({
  declarations: [AdminbooklistComponent],
  imports: [
    CommonModule,
    AdminconsoleRoutingModule,
    FormsModule,
    MainNavModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    NgxPaginationModule
  ]
})
export class AdminconsoleModule { }
