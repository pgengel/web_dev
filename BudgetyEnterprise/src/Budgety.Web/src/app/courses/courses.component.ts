import { Component }        from '@angular/core';
import { CoursesService }   from './courses.service'; //1.1 - DI
import { AutoGrowDirective} from './auto-grow.directive';

@Component({
    moduleId    : module.id,
    selector    : 'courses',
    templateUrl : 'courses.component.html',
    //providers   : [CoursesService] //1.2 - DI - register this in module level
    // directives  : [AutoGrowDirective],
})
export class CoursesComponent {

    courses     : string[];
    title       : string = 'The title of the page.';
    isActive    : boolean = false;

    constructor (courseService : CoursesService){ //1.3 - DI

         this.courses = courseService.getCourses();
    }

    onClick($event: any){
        $event.stopPropagation();
        console.log($event);
    }

}

