import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavModule } from '../main-nav/main-nav.module';
import { MaterialModule } from '../material/material.module';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';


@NgModule({
  declarations: [ProfileComponent, PasswordresetComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    MainNavModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class ProfileModule { }
