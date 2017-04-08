import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { IUser, IPagedResults } from '../shared/interfaces';
import { FilterService } from '../core/services/filter.service';

@Component({ 
  moduleId: module.id,
  selector: 'cm-users', 
  templateUrl: 'users.component.html'
})
export class UsersComponent implements OnInit {

  title: string;
  filterText: string;
  users: IUser[] = [];
  filteredUsers: IUser[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private dataService: DataService, private filterService: FilterService) { }
  
  ngOnInit() {
    this.title = 'Users';
    this.filterText = 'Filter Users:';
    this.displayMode = DisplayModeEnum.Card;

    this.getUsersPage(1);
  }

  changeDisplayMode(mode: DisplayModeEnum) {
      this.displayMode = mode;
  }

  pageChanged(page: number) {
    this.getUsersPage(page);
  }

  getUsersPage(page: number) {
    this.dataService.getUsersPage((page - 1) * this.pageSize, this.pageSize)
        .subscribe((response: IPagedResults<IUser[]>) => {
          this.users = this.filteredUsers = response.results;
          this.totalRecords = response.totalRecords;
        },
        (err: any) => console.log(err),
        () => console.log('getUsersPage() retrieved users for page: ' + page));
  }

  filterChanged(data: string) {
    if (data && this.users) {
        data = data.toUpperCase();
        const props = ['firstName', 'lastName', 'city', 'state.name'];
        this.filteredUsers = this.filterService.filter<IUser>(this.users, data, props);
    }
    else {
      this.filteredUsers = this.users;
    }
  }
}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}
