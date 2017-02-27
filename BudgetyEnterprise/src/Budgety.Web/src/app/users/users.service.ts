import { Injectable }       from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Users }            from './users';
import { Observable }       from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {
    
    private _url : string = "https://jsonplaceholder.typicode.com/users"; 
    
    constructor(private _http: Http) { }

    getAllUsers() : Observable<Users[]>{
        return this._http.get(this._url)
                    .map(res => res.json());
    }

    getUser(userId : number){
		return this._http.get(this.getUserUrl(userId))
			.map(res => res.json());
	}
    
    addUser(user : number){
		return this._http.post(this._url, JSON.stringify(user))
			.map(res => res.json());
	}
    
    updateUser(user : Users){
		return this._http.put(this.getUserUrl(user.id), JSON.stringify(user))
			.map(res => res.json());
	}
    
    deleteUser(userId : number){
		return this._http.delete(this.getUserUrl(userId))
			.map(res => res.json());
	}
    
    private getUserUrl(userId : number){
		return this._url + "/" + userId;
	}
}