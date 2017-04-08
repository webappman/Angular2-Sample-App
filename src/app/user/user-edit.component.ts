import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { DataService } from '../core/services/data.service';
import { ModalService, IModalContent } from '../core/modal/modal.service';
import { IUser, IState } from '../shared/interfaces';
import { GrowlerService, GrowlerMessageType } from '../core/growler/growler.service';

@Component({
  moduleId: module.id,
  selector: 'cm-user-edit',
  templateUrl: 'user-edit.component.html',
  styleUrls: [ 'user-edit.component.css' ]
})
export class UserEditComponent implements OnInit {

  user: IUser = 
  {
    id: 0,
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    city: '',
    state: {
        abbreviation: '',
        name: ''
    }
  };
  states: IState[];
  errorMessage: string;
  deleteMessageEnabled: boolean;
  operationText: string = 'Insert';
  @ViewChild('userForm') userForm: NgForm;
  
  constructor(private router: Router, 
              private route: ActivatedRoute, 
              private dataService: DataService,
              private growler: GrowlerService,
              private modalService: ModalService) { }

  ngOnInit() {
      //Subscribe to params so if it changes we pick it up. Don't technically need that here
      //since param won't be changing while component is alive. 
      //Could use this.route.parent.snapshot.params["id"] to simplify it.
      this.route.parent.params.subscribe((params: Params) => {
        let id = +params['id'];
        if (id !== 0) {
          this.operationText = 'Update';
          this.getUser(id);
        }
      });

      this.dataService.getStates().subscribe((states: IState[]) => this.states = states);
  }

  getUser(id: number) {
      this.dataService.getUser(id).subscribe((user: IUser) => {
        this.user = user;
      });
  }

  submit() {
      if (this.user.id === 0) {
        this.dataService.insertUser(this.user)
          .subscribe((insertedUser: IUser) => {
            if (insertedUser) {
              //Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
              this.userForm.form.markAsPristine();
              this.router.navigate(['/users']);
            } else {
              const msg = 'Unable to insert user';
              this.growler.growl(msg, GrowlerMessageType.Danger);
              this.errorMessage = msg;
            }
          },
          (err: any) => console.log(err));
      } else {
        this.dataService.updateUser(this.user)
          .subscribe((status: boolean) => {
            if (status) {
              //Mark form as pristine so that CanDeactivateGuard won't prompt before navigation
              this.userForm.form.markAsPristine();
              this.growler.growl('Operation performed successfully.', GrowlerMessageType.Success);
              //this.router.navigate(['/users']);
            }
            else {
              const msg = 'Unable to update user';
              this.growler.growl(msg, GrowlerMessageType.Danger);
              this.errorMessage = msg;
            }
        },
        (err: any) => console.log(err));
      }
  }
  
  cancel(event: Event) {
    event.preventDefault();
    //Route guard will take care of showing modal dialog service if data is dirty
    this.router.navigate(['/users']);
  }

  delete(event: Event) {
    event.preventDefault();
    this.dataService.deleteUser(this.user.id)
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['/users']);
          }
          else {
            this.errorMessage = 'Unable to delete user';
          }
        },
        (err) => console.log(err));
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.userForm.dirty) {
      return true;
    }

    //Dirty show display modal dialog to user to confirm leaving
    const modalContent: IModalContent = {
      header: 'Lose Unsaved Changes?',
      body: 'You have unsaved changes! Would you like to leave the page and lose them?',
      cancelButtonText: 'Cancel',
      OKButtonText: 'Leave'
    }
    return this.modalService.show(modalContent);
  }

}