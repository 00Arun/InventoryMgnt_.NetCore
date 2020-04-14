import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { MainNavModule } from '../main-nav/main-nav.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,    
    MainNavModule
  ],
  exports: [WelcomeComponent]
})
export class DashboardModule { }
