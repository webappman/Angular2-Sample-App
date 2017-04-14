import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { UsersCardComponent } from './users-card.component';
import { UsersGridComponent } from './users-grid.component';

const routes: Routes = [
  { path: '', component: UsersComponent }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule { 
  static components = [ UsersComponent, UsersCardComponent, UsersGridComponent ];
}