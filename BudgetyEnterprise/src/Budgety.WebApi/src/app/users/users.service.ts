import { Injectable }       from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Users }            from './users';
import { Observable }       from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
    
    private _url : string = "https://jsonplaceholder.typicode.com/users"; 
    
    constructor(private _http: Http) { }

    getUsers() : Observable<Users[]>{
        return this._http.get(this._url)
                    .map(res => res.json());
    }
}