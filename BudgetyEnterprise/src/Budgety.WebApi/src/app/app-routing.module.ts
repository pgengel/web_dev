import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }        from './home.component';
import { PhotosComponent }      from './photos/photos.component';
import { MessageComponent }     from './message/message.component';
import { NotFoundComponent }    from './not-found.component';

const routes: Routes = [ //need the const
  { path: '', component: HomeComponent },
  { path: 'messages', component: MessageComponent },
  { path: 'photos', component: PhotosComponent },
  { path: '**', component: NotFoundComponent }, //wild-card
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
