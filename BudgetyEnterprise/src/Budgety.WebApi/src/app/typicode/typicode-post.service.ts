import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class TypicodePostService {
    
    private _url : string = "https://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http){
    }

    getPosts(){
        return  this._http.get(this._url)
            .map((res) => res.json());    
    }

    createPosts(post : string){
        return this._http.post(this._url, JSON.stringify(post))
                    .map((res) => res.json());
    }
}