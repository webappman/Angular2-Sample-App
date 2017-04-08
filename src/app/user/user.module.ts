import { NgModule }      from '@angular/core';

import { SharedModule }   from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports:      [ UserRoutingModule, SharedModule ],
  declarations: [ UserRoutingModule.components ]
})
export class UserModule { }