import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

//Grab everything with import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { IUser, IOrder, IState, IPagedResults } from '../../shared/interfaces';

@Injectable()
export class DataService {
  
    usersBaseUrl: string = '/api/users';
    ordersBaseUrl: string = '/api/orders';
    orders: IOrder[];
    states: IState[];

    constructor(private http: Http) { }
    
    getUsers() : Observable<IUser[]> {
        return this.http.get(this.usersBaseUrl)
                    .map((res: Response) => {
                        let users = res.json();
                        this.calculateUsersOrderTotal(users);
                        return users;
                    })
                    .catch(this.handleError);
    }

    getUsersPage(page: number, pageSize: number) : Observable<IPagedResults<IUser[]>> {
        return this.http.get(`${this.usersBaseUrl}/page/${page}/${pageSize}`)
                   .map((res: Response) => {
                       const totalRecords = +res.headers.get('X-InlineCount');
                       let users = res.json();
                       this.calculateUsersOrderTotal(users);
                       return {
                           results: users,
                           totalRecords: totalRecords
                       };
                   })
                   .catch(this.handleError);
    }
    
    getUser(id: number) : Observable<IUser> {
        return this.http.get(this.usersBaseUrl + '/' + id)
                   .map((res: Response) => {
                       let user = res.json();
                       this.calculateUsersOrderTotal([user]);
                       return user;
                   })
                   .catch(this.handleError);
    }

    insertUser(user: IUser) : Observable<IUser> {
        return this.http.post(this.usersBaseUrl, user)
                   .map((res: Response) => res.json())
                   .catch(this.handleError);
    }
    
    updateUser(user: IUser) : Observable<boolean> {
        return this.http.put(this.usersBaseUrl + '/' + user.id, user)
                   .map((res: Response) => res.json())
                   .catch(this.handleError);  
    }

    deleteUser(id: number) : Observable<boolean> {
        return this.http.delete(this.usersBaseUrl + '/' + id)
                   .map((res: Response) => res.json().status)
                   .catch(this.handleError);
    }
    
    getStates(): Observable<IState[]> {
        return this.http.get('/api/states')
                   .map((res: Response) => res.json())
                   .catch(this.handleError); 
    }
    
    handleError(error: any) {
        console.error('server error:', error); 
        if (error instanceof Response) {
          let errMessage = '';
          try {
            errMessage = error.json().error;
          } catch(err) {
            errMessage = error.statusText;
          }
          return Observable.throw(errMessage);
        }
        return Observable.throw(error || 'Node.js server error');
    }

    //Not using now but leaving since they show how to create
    //and work with custom observables
       
    createObservable(data: any) : Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next(data);
            observer.complete();
        });
    }

    calculateUsersOrderTotal(users: IUser[]) {
        for (let user of users) {
            if (user && user.orders) {
                let total = 0;
                for (let order of user.orders) {
                    total += order.itemCost;
                }
                user.orderTotal = total;
            }
        }
    }

}
