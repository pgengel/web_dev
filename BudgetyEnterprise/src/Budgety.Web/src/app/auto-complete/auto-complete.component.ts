// /// <reference path="./../../../typings/tsd.d.ts" />
// import { Component }    from '@angular/core';
// import {Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/mergeMap';


// @Component({
//     moduleId: module.id,
//     selector: 'auto-complete',
//     templateUrl: './auto-complete.component.html'
// })
// export class AutoCompleteComponent {
    
//     constructor(){
//         //create observable
//         var keyups = Observable.fromEvent(document.getElementById("#search"), "keyup")
//             .map(e => e.taget.value)
//             .filter(text => text.length >= 3)
//             .debounceTime(400)
//             .distinctUntilChanged()
//             .mergeMap(searchTerm => {
//                 var url = "https://api/spotify.com/v1/search?type=artist&q=" + searchTerm;
//                 var promise = $.getJSON(url);
//                 return Observable.fromPromise(promise);
//             });

//         keyups.subscribe(data => console.log(data));
//     }
// }