import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent }   from './user.component';
import { UserOrdersComponent } from './user-orders.component';
import { UserDetailsComponent } from './user-details.component';
import { UserEditComponent } from './user-edit.component';
import { CanActivateGuard } from './can-activate.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  { 
    path: '', 
    component: UserComponent,
    children: [
      { path:'orders',  component: UserOrdersComponent },
      { path:'details', component: UserDetailsComponent },
      { path:'edit', 
        component: UserEditComponent,  
        canActivate: [ CanActivateGuard ],
        canDeactivate: [ CanDeactivateGuard ] 
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers:    [ CanActivateGuard, CanDeactivateGuard ]
})
export class UserRoutingModule { 
  static components = [ UserComponent, UserOrdersComponent, UserDetailsComponent, UserEditComponent ];
}

