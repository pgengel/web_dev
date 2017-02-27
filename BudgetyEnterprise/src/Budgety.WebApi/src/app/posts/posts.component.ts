import { Component, OnInit  }   from '@angular/core';
import { Post }        from './post';
import { PostsService } from './posts.service';

@Component({
    moduleId: module.id,
    selector: 'posts',
    templateUrl: 'posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    
    private isLoading       : boolean = true;
    private posts           : Post[] = [];
    currentPost    : Post;

    constructor(private _postsService : PostsService){    
    }

    ngOnInit(){
        this._postsService.getAllPosts()
            .subscribe(posts => {
                this.isLoading = false;
                this.posts = posts;
            });
    }

    selectPost(post : Post){
        this.currentPost = post;
        console.log("post click");
    }

}