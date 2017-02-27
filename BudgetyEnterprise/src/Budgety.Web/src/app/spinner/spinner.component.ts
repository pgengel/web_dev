import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'spinner',
    template: `
            <i [ngClass]="{ 'fa'         : visible,
                            'fa-spinner'  : visible,
                            'fa-spin'     : visible,
                            'fa-3x'       : visible }">
            </i>
    `
})
export class SpinnerComponent {
    
    constructor() { }

    @Input() visible : boolean = false;

}