import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { AddUserComponent } from './add-user.component';

const routes: Routes = [

    { path: 'users/add-user', component: AddUserComponent },
    { path: 'users', component: UsersComponent },
    { 
        path: 'users/:id', 
        component: AddUserComponent,
        //canDeactivate: [ PreventUnsavedChangesGuard ]  
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule],
})
export class UsersRoutingModule { }
