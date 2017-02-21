import { Component }    from '@angular/core';
import {Response} from '@angular/http';
import { TypicodePostService }  from './typicode-post.service'

@Component({
    moduleId: module.id,
    selector: 'typicode',
    template: ''
})
export class TypicodeComponent {
    constructor(private _postsService : TypicodePostService) { 
        
        this._postsService.getPosts()
            .subscribe((post) => console.log(post));
    }

 
}