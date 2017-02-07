// Let and const

//ES5
var name5 = 'Jane Smith';
var age5 = 23;
name5 = 'Jane Miller';

console.log(name5);

// ES6
//const name6 = 'Jane Smith'; //Error
let age6 = 34;
name6 = 'Jane Miller';
//console.log(name6); //error - cannot change the value of a const.

//ES 5
function driversLic5 (passedTest) {
    if (passedTest) {
        var firstName = 'John';
        var yourOfBirth = 1999;
        console.log(firstName + yourOfBirth);
    } 

    firstName = 'Pete';
}

driversLic(true);

function driversLic6(passedTest){
    //console.log(firstName);//error - prev it was hoisted and undefined.
    
    if (passedTest) {
        let firstName = 'John';
        var yourOfBirth = 1999;
        console.log(firstName + yourOfBirth);
    } 

    //firstName = 'Pete'; //error
}


let i = 23;
for (let i = 0; i < 5; i++) {
    console.log(i); // i are different variables.
}
console.log(i); 

///////////////////////////
//Strings - tenplate literals
console.log(`this is ${name6}`);

console.log(name6.startsWith('je'));

name6.includes(' '); //check something in the middle of the string.

// arrow functions - they do have a this key word.
const years = [1999, 2000, 2001];

//ES5
var ages5 = years.map(function(el) {
    return 2016 - el;
});

let ages6 = years.map(el => 2016 -  el);

ages6 = years.map((el, index) => {
     console.log(index);
     return 2016 - el;
});

// ES5

var box5 = {
    color : 'green',
    position : 1,
    clickMe : function() {
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'Yhis is box' + self.position + self.color; //in this case the this keyword moves to the window when the function is created.    
        });
    }
}

// ES6

var box6 = {
    color : 'green',
    position : 1,
    clickMe : function() {
        var self = this;
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'Yhis is box' + this.position + this.color; //arrow function shares the lexigen of the surounding.   
        });
    }
}


//function constructor

function Person(name){
    this.name = name;
}

Person.prototype.myFriends5 = function(arrFriends) {
    // body
};

//destruct
//ES5
var john = ['John', 26];
var name = john[0];
var age = john[1];


const [name6, year6] = ['John', 26];
console.log(name6);
console.log(year6);

const obj = {
    firstName6 : 'Pete',
    lastName6 : 'engelbrecht'
};

const {firstName6, lastName6} = obj;

//arr in ES6


//spread operator.
function addFourAges (a,b,c,s) {
    return a + b +c + d;
}

var sum1 = addFourAges(1,2,3,4);

// ES 5
var ages = [1,2,3,4];
var sum2 = addFourAges.apply(null, ages);

//ES 6
const max3 = addFourAges(... ages);

function isFullAge6 (...years) {
    years.forEach(cur => console.log(2016 - cur));
}


//Rest params - opiste of the spread - take single values and translate it to arr.



