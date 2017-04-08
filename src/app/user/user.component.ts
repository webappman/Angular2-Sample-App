import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({ 
  moduleId: module.id,
  selector: 'cm-orders',
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {
  
    //displayMode: UserDisplayModeEnum;
    //displayModeEnum = UserDisplayModeEnum;
  
    constructor(private router: Router) { }

    ngOnInit() {

      //No longer needed due to routerLinkActive feature in Angular
      // const path = this.router.url.split('/')[3];
      // switch (path) {
      //   case 'details':
      //     this.displayMode = UserDisplayModeEnum.Details;
      //     break;
      //   case 'orders':
      //     this.displayMode = UserDisplayModeEnum.Orders;
      //     break;
      //   case 'edit':
      //     this.displayMode = UserDisplayModeEnum.Edit;
      //     break;
      // }
    }

}

// enum UserDisplayModeEnum {
//   Details=0,
//   Orders=1,
//   Edit=2
// }
