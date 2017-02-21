import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'zippy',
    templateUrl: './zippy.component.html'
})
export class ZippyComponent {

    isExpanded : boolean = false;
    @Input() title : string = ""; //custom class in <zippy title="string here"></zippy>

    onToggleContent(){
        this.isExpanded = !this.isExpanded;
    }

}