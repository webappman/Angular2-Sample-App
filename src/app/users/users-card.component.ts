import { Component, Input, OnInit, ChangeDetectionStrategy,
         trigger, state, style, transition, animate } from '@angular/core';

import { IUser } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';

@Component({ 
  moduleId: module.id,
  selector: 'cm-users-card', 
  templateUrl: 'users-card.component.html',
  styleUrls: [ 'users-card.component.css' ],
  //Add [@flyInOut]="'in'" into template on card
  // animations: [
  //   trigger('flyInOut', [
  //     state('in', style({transform: 'translateX(0)', opacity: 1})),
  //     transition('void => *', [
  //       style({transform: 'translateX(25%)', opacity: 0}),
  //       animate(300)
  //     ]),
  //     transition('* => void', [
  //       animate(300, style({transform: 'translateX(-25%)', opacity: 1}))
  //     ])
  //   ])
  // ],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class UsersCardComponent implements OnInit {

  @Input() users: IUser[] = [];
  
  constructor(public trackbyService: TrackByService) { }
  
  ngOnInit() {

  }

}

