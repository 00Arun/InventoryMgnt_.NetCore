import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './navigation/navigation.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "../material/material.module"
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [NavigationComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,   
    FormsModule ,
    CommonModule   
  ],
  exports: [NavigationComponent]
})
export class MainNavModule { }
