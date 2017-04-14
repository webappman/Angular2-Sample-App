import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { IUser, IPagedResults } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';

@Component({
    moduleId: module.id,
    selector: 'cm-users-orders',
    templateUrl: 'orders.component.html'
})
export class OrdersComponent implements OnInit {

    users: IUser[];
    totalRecords: number = 0;
    pageSize: number = 5;

    constructor(private dataService: DataService, private trackbyService: TrackByService) { }

    ngOnInit() {
        this.getUsersPage(1);
    }

    pageChanged(page: number) {
        this.getUsersPage(page);
    }

    getUsersPage(page: number) {
        this.dataService.getUsersPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe((response: IPagedResults<IUser[]>) => {
                this.totalRecords = response.totalRecords;
                this.users = response.results;
            });
    }

}