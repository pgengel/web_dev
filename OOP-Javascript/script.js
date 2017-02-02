
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};

// function constructor pattern
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    this.calcAge = function(){
        console.log(2016 - this.yearOfBirth);
    }
}

var j = new Person('j', 1990, 'teacher');
// with the new operator, an empty object is created.
// the constructor function is called with the arg
// the new operator point the this var to the object and not the global.

//add a method to the object
j.calcAge();

// this will add method
Person.prototype.currentDate = function() {
    console.log(2017);
}

// j instanceof Person; j.hasOwnProperty('job') = true; j.hasOwnProperty('currentDate') = false

//more ways to create Object.create define an object act like the prototype then create  new object based on that object.
var personProto = {
    calcAge: function () {  
        console.log(2016);
    }
}

var g = Object.create(personProto);

//primatives vs objects



//first class functions - passing functions as args - This is a callback function 
var years = [1999, 2000, 2001, 2003, 2008];

function calculateAge(el){
    return 2016 - el;
}

function arrCalc (arr, fn) {
    var arrRes = [];
    for(var i = 0; i < arr.lenght; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes
}


ages = arrCalc(years, calculateAge);

//functions returning functions
function interviewQuestion(job){
    if(job === 'designed'){
        return function(name){
            console.log(name);
        }

    }
}

var teacher = interviewQuestion('teacher');
teacher('j');
var teacher = interviewQuestion('teacher')('f');

//IIFE - scoping chain

function game () {
    var score = Math.random() * 10;
    console.log(score >= 5);
}

game();

//IIFE - data privacy
(function(goodluck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodluck);
})(5);

//closures
function retirement (retirementAge) {
    return function(yearOfBirth) {

    }
}

//bind/callapply methods