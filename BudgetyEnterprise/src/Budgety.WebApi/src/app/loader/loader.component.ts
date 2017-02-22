import { Component, OnInit }    from '@angular/core';
import {Response} from '@angular/http';
import { LoaderPostService }  from './loader-post.service'

@Component({
    moduleId: module.id,
    selector: 'loader',
    templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit{
    
    isLoading : boolean = true;
    
    constructor(private _postsService : LoaderPostService) {
         this._postsService.createPosts({userId: 1, title: "a", body: "b"})
    }

    ngOnInit(){
        this._postsService.getPosts()
            .subscribe(post => {
                this.isLoading = false;
                console.log(post);
            });
    }
 
}