import { Injectable } from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Post }            from './post';
import { PostComments }            from './post-comments';
import { Observable }       from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

    private _postUrl            : string = "https://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http) { }

    getAllPosts() : Observable<Post[]>{
        return this._http.get(this._postUrl)
                    .map(res => res.json());
    }

    getPostsComments(postId : number) : Observable<PostComments[]>{
        console.log(this._postUrl + '/' + postId + '/comments');
        return this._http.get(this._postUrl + '/' + postId + '/comments')
                    .map(res => res.json());
    }

}