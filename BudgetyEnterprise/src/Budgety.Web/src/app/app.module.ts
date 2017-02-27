import { NgbModule }            from '@ng-bootstrap/ng-bootstrap';
import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { AppRoutingModule }     from './app-routing.module';
import { PhotosRoutingModule }  from './photos/photos.routing';
import { UsersRoutingModule }   from './users/users.routing';
// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

//for the autocomplete component.
//import { Observable }    from 'rxjs/Rx';

//1. import files - components
import { AppComponent }           from './app.component';
import { CoursesComponent }       from './courses/courses.component';
import { FavoriteComponent }      from './favorite/favorite.component';
import { LikeComponent }          from './like/like.component';
import { VoterComponent }         from './voter/voter.component';
import { PanelComponent }         from './panel/panel.component';
import { ZippyComponent }         from './zippy/zippy.component';
import { ContactFormComponent }   from './basic-form/contact-form.component';
import { NavBarComponent }        from './navbar/navbar.component';
import { SpinnerComponent }        from './spinner/spinner.component';
//import { AutoCompleteComponent }  from './auto-complete/auto-complete.component'
import { HttpModule }             from '@angular/http';
import { JsonpModule }            from '@angular/http';

//routing
import { HomeComponent }          from './home/home.component';
import { MessageComponent }       from './message/message.component';
import { NotFoundComponent }      from './not-found/not-found.component';
import { PhotosDetailsComponent}  from './photos/photos-details.component';
import { PhotosComponent }        from './photos/photos.component'
import { UsersComponent }         from './users/users.component';
import { AddUserComponent }       from './users/add-user.component';
import { PostsComponent }         from './posts/posts.component';
import { EditUserComponent }         from './users/edit-user.component';

//import files - service
import { CoursesService }       from './courses/courses.service';
import { LoaderPostService }    from './loader/loader-post.service';
import { LoaderComponent }      from './loader/loader.component';
import { UsersService }         from './users/users.service';
import { PostsService }         from './posts/posts.service';

@NgModule({
  imports: [ 
    NgbModule.forRoot(), 
    BrowserModule, 
    FormsModule, 
    HttpModule, 
    JsonpModule,
    PhotosRoutingModule,
    //UsersRoutingModule,
    AppRoutingModule,      // routing
    
    // Forms
    FormsModule,
    ReactiveFormsModule,
    
    
 ],

  declarations: [ // 1.1 import components
    AppComponent, 
    CoursesComponent,
    FavoriteComponent,
    LikeComponent, 
    VoterComponent,
    PanelComponent,
    ZippyComponent,
    ContactFormComponent,
    LoaderComponent,
    NavBarComponent,
    EditUserComponent,
    SpinnerComponent,
    //AutoCompleteComponent
    
    //routing
    AddUserComponent,
    UsersComponent,
    AddUserComponent,
    PostsComponent,
    PhotosComponent,
    PhotosDetailsComponent,
    HomeComponent,
    MessageComponent,
    NotFoundComponent, 
  ], 

  providers   : [
    CoursesService,
    LoaderPostService,
    UsersService,
    PostsService
  ],

  bootstrap   : [ AppComponent ]
})
export class AppModule { }
