import { Injectable } from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Post }            from './post';
import { Observable }       from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class PostsService {

    private _url : string = "https://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http) { }

    getAllPosts() : Observable<Post[]>{
        return this._http.get(this._url)
                    .map(res => res.json());
    }

}