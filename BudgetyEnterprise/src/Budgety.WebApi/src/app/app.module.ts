import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule }      from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

//1. import files - components
import { AppComponent }     from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LikeComponent } from './like/like.component'
import { VoterComponent } from './voter/voter.component'
import { PanelComponent } from './panel/panel.component'
import { ZippyComponent } from './zippy/zippy.component'

//import files - service
import { CoursesService } from './courses/courses.service';

@NgModule({
  imports:      [ NgbModule.forRoot(), BrowserModule ],
  declarations: [ // 1.1 import components
    AppComponent, 
    CoursesComponent,
    FavoriteComponent,
    LikeComponent, 
    VoterComponent,
    PanelComponent,
    ZippyComponent,
  ], 
  providers   : [CoursesService],
  bootstrap   :    [ AppComponent ]
})
export class AppModule { }
