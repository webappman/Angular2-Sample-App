import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: '/users' },
  { path: 'users', loadChildren: 'app/users/users.module#UsersModule'},
  { path: 'users/:id', loadChildren: 'app/user/user.module#UserModule'},
  { path: 'orders', loadChildren: 'app/orders/orders.module#OrdersModule'},
  { path: 'about', loadChildren: 'app/about/about.module#AboutModule'},
  { path: '**', pathMatch:'full', redirectTo: '/users' } //catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
