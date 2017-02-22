import { NgbModule }     from '@ng-bootstrap/ng-bootstrap';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';

//for the autocomplete component.
//import { Observable }    from 'rxjs/Rx';

//1. import files - components
import { AppComponent }           from './app.component';
import { CoursesComponent }       from './courses/courses.component';
import { FavoriteComponent }      from './favorite/favorite.component';
import { LikeComponent }          from './like/like.component'
import { VoterComponent }         from './voter/voter.component'
import { PanelComponent }         from './panel/panel.component'
import { ZippyComponent }         from './zippy/zippy.component'
import { ContactFormComponent }   from './basic-form/contact-form.component'
//import { AutoCompleteComponent }  from './auto-complete/auto-complete.component'
import { HttpModule }             from '@angular/http';
import { JsonpModule }            from '@angular/http';

//import files - service
import { CoursesService }       from './courses/courses.service';
import { LoaderPostService }    from './loader/loader-post.service';
import { LoaderComponent }      from './loader/loader.component';

@NgModule({
  imports: [ 
    NgbModule.forRoot(), 
    BrowserModule, 
    FormsModule, 
    HttpModule, 
    JsonpModule
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
    //AutoCompleteComponent
  ], 

  providers   : [
    CoursesService,
    LoaderPostService,
  ],

  bootstrap   : [ AppComponent ]
})
export class AppModule { }
