import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, 
         ReactiveFormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';
import { HttpModule }          from '@angular/http';

import { Users }                from './users';
import { AddUserComponent }   from './add-user.component';
import { UsersComponent }      from './users.component';
import { UsersService }         from './users.service';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule
    ],
    declarations: [
        AddUserComponent, 
        UsersComponent
    ],
    exports: [
        AddUserComponent, 
        UsersComponent
    ],
    providers: [
        UsersService,
    ]
})
export class UsersModule { 
}