import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Component, Input} from '@angular/core';

@Component({
    moduleId    : module.id,
    selector    : 'like',
    templateUrl : './like.component.html',
    styleUrls   : ['./like.component.css']
})
export class LikeComponent {
    @Input() totalLikes = 0;
    @Input() iLike = false;
    
    onClick(){
        this.iLike = !this.iLike;
        this.totalLikes += this.iLike ? 1 : -1;
    }
}