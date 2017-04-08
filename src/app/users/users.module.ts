import { NgModule }      from '@angular/core';

import { SharedModule }   from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports:      [ UsersRoutingModule, SharedModule ],
  declarations: [ UsersRoutingModule.components ]
})
export class UsersModule { }