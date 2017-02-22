import { Component , OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'photos-details',
    template: '<h1>Photo details {{ id }}</h1>'
})
export class PhotosDetailsComponent implements OnInit, OnDestroy{
    id           : number;
    subscription : any;
    
    constructor(private _route: ActivatedRoute){

    }

    ngOnInit(){
        this.subscription = this._route.params.subscribe(params => {
            this._route.params.subscribe(params => {
                this.id = +params["id"];
            });
        });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}