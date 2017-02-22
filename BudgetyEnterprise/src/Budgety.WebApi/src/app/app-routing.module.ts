import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { HomeComponent }          from './home/home.component';
import { MessageComponent }       from './message/message.component';
import { UsersComponent }         from './users/users.component';
import { PostsComponent }         from './posts/posts.component';
import { NotFoundComponent }      from './not-found/not-found.component';

const routes: Routes = [ //need the const
  { 
      path      : '', 
      component : HomeComponent 
  },
  { 
      path      : 'home', 
      component : HomeComponent 
  },
  { 
      path      : 'messages', 
      component : MessageComponent 
  },
  {
      path      : 'users',
      component : UsersComponent
  },
  {
      path      : 'posts',
      component : PostsComponent
  },
  { 
      path      : '**', 
      component : NotFoundComponent
  }, //wild-card
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

