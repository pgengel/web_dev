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
        this._userService.getAllUsers()
             .subscribe(users => {
                 this.isLoading = false;
                 console.log("users" + users);
                 this.users = users;
             });
     }

    deleteUser(users : Users){
		if (confirm("Are you sure you want to delete " + users.name + "?")) {
			var index = this.users.indexOf(users)
			// Here, with the splice method, we remove 1 object
            // at the given index.
            this.users.splice(index, 1);

			this._userService.deleteUser(users.id)
				.subscribe(null, 
					err => {
						alert("Could not delete the user.");
                        // Revert the view back to its original state
                        // by putting the user object at the index
                        // it used to be.
						this.users.splice(index, 0, users);
					});
		}
	}
}