import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../core/services/data.service';
import { IUser, IOrder, IOrderItem } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'cm-user-orders',
  templateUrl: 'user-orders.component.html'
})
export class UserOrdersComponent implements OnInit {

  orders: IOrder[] = [];
  user: IUser;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
      //Subscribe to params so if it changes we pick it up.  Could use this.route.parent.snapshot.params["id"] to simplify it.
      this.route.parent.params.subscribe((params: Params) => {
        let id = +params['id'];
        this.dataService.getUser(id).subscribe((user: IUser) => {
          this.user = user;
        });
      });
  }

  ordersTrackBy(index: number, orderItem: any) {
    return index;
  }

}