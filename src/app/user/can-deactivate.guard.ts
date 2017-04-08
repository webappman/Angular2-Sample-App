import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

import { UserEditComponent } from './user-edit.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<UserEditComponent> {

  canDeactivate(
    component: UserEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    console.log(`UserId: ${route.parent.params['id']} URL: ${state.url}`);

    //Check with component to see if we're able to deactivate
    return component.canDeactivate();
  }
}