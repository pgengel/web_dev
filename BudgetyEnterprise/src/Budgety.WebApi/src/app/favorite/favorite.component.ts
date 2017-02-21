import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'favorite',
    templateUrl: 'favorite.component.html',
    //styles : [`.glyphicon-star {color:orange;}`]
    
})
export class FavoriteComponent  {
    
    @Input('is-favorite') isFavorite : boolean = true;
    
    @Output('favoriteChange') change = new EventEmitter();

    constructor() { }

    onClick(){
        this.isFavorite = !this.isFavorite;
        this.change.emit({newValue: this.isFavorite});
    }
}