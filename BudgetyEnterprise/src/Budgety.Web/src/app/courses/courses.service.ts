import { Injectable } from '@angular/core';

@Injectable()
export class CoursesService {

    constructor() { }

    getCourses() : string[]{
       return  ['Course1', 'Course2', 'Courses3'];
    }

}