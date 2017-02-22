import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}} </h1> 
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
             
             `,
})
export class AppComponent  { 
  
  constructor(){

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
