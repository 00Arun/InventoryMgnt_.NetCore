import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { InventoryaddupdateComponent } from './inventoryaddupdate/inventoryaddupdate.component';
import { WelcomeComponent } from '../dashboard/welcome/welcome.component';
import { HistoryComponent } from './history/history.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'list', component: BookListComponent },
  { path: 'entrybooks', component: InventoryaddupdateComponent },
  { path: 'update/:id', component: InventoryaddupdateComponent },
  { path: 'dashboard', component: WelcomeComponent },
  { path: 'history', component: HistoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibrarianconsoleRoutingModule { }
