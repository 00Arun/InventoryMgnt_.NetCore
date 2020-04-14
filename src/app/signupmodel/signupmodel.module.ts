import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { SignupmodelRoutingModule } from './signupmodel-routing.module';
import { SignupaddupdateComponent } from './signupaddupdate/signupaddupdate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavModule } from '../main-nav/main-nav.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [SignupaddupdateComponent],
  imports: [
    CommonModule,
    SignupmodelRoutingModule,
    FormsModule,
    MainNavModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class SignupmodelModule { }
