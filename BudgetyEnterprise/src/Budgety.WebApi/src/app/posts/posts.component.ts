import { Component, OnInit  }   from '@angular/core';
import { Post }                 from './post';
import { PostComments }         from './post-comments';
import { PostsService }         from './posts.service';
import { UsersService }         from '../users/users.service';

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

    private users : any[] = [];
    private _userId : number = 1;

    constructor(private _postsService : PostsService, 
                private _userService : UsersService){    
    }

    ngOnInit(){

        this.loadUsers();

        this.loadPosts();

    }

    selectPost(post : Post){
        this.currentPost = post;
        this._postsService.getPostsComments(this.currentPost.id)
            .subscribe(comments => {
                this.commentsLoading = false;
                this.commentPosts = comments;
            });
    }

    private loadUsers(){
        this._userService.getAllUsers()
            .subscribe(users => {
                this.users = users;
            });
    }

    private loadPosts(userId? : number){
        this.postsLoading = true;
        this._postsService.getAllPosts(userId)
            .subscribe(posts => {
                this.postsLoading = false;
                this.posts = posts;
            });  

        console.log("posts: " + this.posts);      
    }

    reloadPosts(filter : any){
        this._userId = filter.userId;
        this.loadPosts(this._userId);
    }

}