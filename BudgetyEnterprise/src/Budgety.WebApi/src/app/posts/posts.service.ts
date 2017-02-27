import { Injectable } from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Post }            from './post';
import { PostComments }            from './post-comments';
import { Observable }       from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

    private _postUrl : string = "https://jsonplaceholder.typicode.com/posts";
    private _url = "";


    constructor(private _http: Http) { }

    getAllPosts(filter?:number) : Observable<Post[]>{

        var _url = this._postUrl;

        if (filter) {

            _url += "?userId=" + (filter);
        }

        console.log("The filter is: " + filter);

        return this._http.get(_url)
                    .map(res => res.json());
    }

    getPostsComments(postId : number) : Observable<PostComments[]>{
        return this._http.get(this._postUrl + '/' + postId + '/comments')
                    .map(res => res.json());
    }

}