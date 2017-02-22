import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { Users }            from './users';

@Component({
    moduleId: module.id,
    selector: 'users',
    templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit{

     isLoading : boolean = true;

     users : any[];
     constructor(private _userService : UsersService){

     }

     ngOnInit(){
        this._userService.getUsers()
             .subscribe(users => {
                 this.isLoading = false;
                 console.log("users" + users);
                 this.users = users;
             });
     }
}