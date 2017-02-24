import { Component, OnInit  }   from '@angular/core';
import { Post }        from './post';
import { PostsService } from './posts.service';

@Component({
    moduleId: module.id,
    selector: 'posts',
    templateUrl: 'posts.component.html'
})
export class PostsComponent implements OnInit {
    
    isLoading   : boolean = true;
    private posts : Post[] = []

    constructor(private _postsService : PostsService){

    }

    ngOnInit(){
        this._postsService.getAllPosts()
            .subscribe(posts => {
                this.isLoading = false;
                this.posts = posts;
            });
    }

}