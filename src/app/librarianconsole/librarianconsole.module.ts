import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrarianconsoleRoutingModule } from './librarianconsole-routing.module';
import { InventoryaddupdateComponent } from './inventoryaddupdate/inventoryaddupdate.component';
import { BookListComponent } from './book-list/book-list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MainNavModule } from '../main-nav/main-nav.module';
import { NgxPaginationModule } from "ngx-pagination";
import { HistoryComponent } from './history/history.component';
@NgModule({
  declarations: [InventoryaddupdateComponent, BookListComponent, HistoryComponent],
  imports: [
    CommonModule,
    LibrarianconsoleRoutingModule,
    FormsModule,
    MainNavModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    NgxPaginationModule
  ]
})
export class LibrarianconsoleModule { }
