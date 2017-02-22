import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Post } from './post';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class LoaderPostService {
    
    private _url : string = "https://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http){
    }

    getPosts() : Observable<Post[]>{
        return  this._http.get(this._url)
            .map((res) => res.json());    
    }

    createPosts(post : Post){
        return this._http.post(this._url, JSON.stringify(post))
                    .map((res) => res.json());
    }
}