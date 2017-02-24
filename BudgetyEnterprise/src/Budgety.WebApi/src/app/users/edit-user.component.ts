import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router'


@Component({
    moduleId: module.id,
    selector: 'edit-user',
    templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit, OnDestroy {

     isLoading : boolean = true;
     userId : number;

     users : any[] = []; //prevents a null ref expetion.
     subscription : any;
     
     constructor(private _userService : UsersService, private _route: ActivatedRoute){

     }

     ngOnInit(){
        var id = this._route

        this.subscription = this._route.params.subscribe(params => {
            this._route.params.subscribe(params => {
                this.userId = +params["id"];
            });
        });

        this._userService.getUser(this.userId)
             .subscribe(user => {
                 this.isLoading = false;
                 this.users = user;
             });
     }

     saveUser(){

     }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

}