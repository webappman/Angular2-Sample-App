import { Injectable } from '@angular/core';

import { IUser, IOrder } from '../../shared/interfaces';

@Injectable()
export class TrackByService {
  
  user(index:number, user: IUser) {
    return user.id;
  }

  order(index:number, order: IOrder) {
    return index;
  }


  
}