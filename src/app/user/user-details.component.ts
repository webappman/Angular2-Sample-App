import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { IUser } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';

@Component({
  moduleId: module.id,
  selector: 'cm-user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: [ 'user-details.component.css' ]
})
export class UserDetailsComponent implements OnInit {

  user: IUser;
  mapEnabled: boolean;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
      //Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
      this.route.parent.params.subscribe((params: Params) => {
        let id = +params['id'];
        this.dataService.getUser(id)
            .subscribe((user: IUser) => {
              this.user = user;
              this.mapEnabled = true;
            });
      });
  }


}