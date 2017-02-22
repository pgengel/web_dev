import { Component } from '@angular/core';
import { Router }    from '@angular/router'; // for navigating to a page.

@Component({
  selector: 'my-app',
  template: `<navbar></navbar>
             <router-outlet></router-outlet>
             
             <h1>Hello {{name}} </h1> 
             <courses></courses> 
             <like></like>
             <favorite [is-favorite] = "post.isFavorite" (favoriteChange)="onFavoriteChange($event)">
             </favorite>
             <voter
                [totalVoterCount]="post?.voteCount"
                [myVote]="post?.myVote"
                (vote)="onVote($event)">
             </voter>
             <panel>
                <div class="heading">The css class is selecting the heading</div>
                <div class="body">The css class is selecting the body</div>
                <div class="body">The css class is selecting the another body</div>
             </panel>
             <zippy title="Expand me">This is content</zippy>
             <loader></loader>
             <ul>
              <li><a routerLink="">Home</a><li>
              <li><a routerLink="messages">Messages</a><li>
              <li><a routerLink="photos">Photos</a><li>
              <li><a [routerLink]="['photos', '1']">Photos</a><li>
             </ul>
             <button (click)="onClick()">Click Me</button>

             `,
})
export class AppComponent  { 
  
  constructor(private _router : Router){

  }

  onClick(){
    this._router.navigate(['photos', 2]);  
  }

  post = {
    name        : 'Angular',
    isFavorite  : true,
    voteCount   : 0,
    myVote      : 0
  };

  onFavoriteChange($event : any){
    console.log($event);
  }

  onVote($event : any){
    console.log($event);
  }
}
