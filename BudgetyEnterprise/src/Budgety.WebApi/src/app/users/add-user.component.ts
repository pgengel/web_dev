import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './users.service';
import { Users }            from './users';

@Component({
    moduleId: module.id,
    selector: 'add-user',
    templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
    
    title: string;
    //users = new Users;
    addUserForm: FormGroup;

 constructor(
        fb: FormBuilder,
        private _router: Router,
        private _route: ActivatedRoute,
        private _usersService: UsersService
    ) {
		this.addUserForm = fb.group({
			name: ['', Validators.required],
			email: ['', Validators.required],
			phone: [],
			address: fb.group({
				street: [],
				suite: [],
				city: [], 
				zipcode: []
			})
		});
	}

    ngOnInit(){
        var id = this._route.params.subscribe(params => {
            var id = +params["id"];

              this.title = id ? "Edit User" : "New User";
        
        if (!id)
			return;
            
        this._usersService.getUsers()
			.subscribe(
                //users => this.users = users,
                response => {
                    // if (response.status == 404) {
                    //     this._router.navigate(['NotFound']);
                    // }
                });
        });
    }

    // addUser(){
    //     var result;
        
    //     if (this.users.id) 
    //         result;// = this._usersService.updateUser(this.users);
    //     else
    //         result = this._usersService.addUser(this.users)
            
	// 	result.subscribe(x => {
    //         // Ideally, here we'd want:
    //         // this.form.markAsPristine();
    //         this._router.navigate(['users']);
    //     });
    // }
}