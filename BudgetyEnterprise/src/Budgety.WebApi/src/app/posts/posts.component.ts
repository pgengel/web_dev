import { Component, OnInit  }   from '@angular/core';
import { Post }                 from './post';
import { PostComments }         from './post-comments';
import { PostsService }         from './posts.service';

@Component({
    moduleId: module.id,
    selector: 'posts',
    templateUrl: 'posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    
    private postsLoading    : boolean = true;
    private commentsLoading    : boolean = true;
    private posts           : Post[] = [];
    private currentPost     : Post;

    private commentPosts     : PostComments[] = [];
    private currentCommentPost     : PostComments[];

    constructor(private _postsService : PostsService){    
    }

    ngOnInit(){
        this._postsService.getAllPosts()
            .subscribe(posts => {
                this.postsLoading = false;
                this.posts = posts;
            });
    }

    selectPost(post : Post){
        this.currentPost = post;
        this._postsService.getPostsComments(this.currentPost.id)
            .subscribe(comments => {
                this.commentsLoading = false;
                this.commentPosts = comments;
            });
    }

}