import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'voter',
    templateUrl: 'voter.component.html',
    styleUrls : ['voter.component.css']
})
export class VoterComponent {

    @Input() totalVoterCount : number = 0;
    @Input() myVote : number = 0;

    @Output() vote = new EventEmitter();

    onClickUpVote(){
        if(this.myVote == 1)
            return;

        this.totalVoterCount++;

        this.vote.emit({myVote: this.myVote});
        
    }

    onClickDownVote(){
        if(this.myVote == -1)
            return;

        this.totalVoterCount--;

        this.vote.emit({myVote: this.myVote});
        
    }    
}