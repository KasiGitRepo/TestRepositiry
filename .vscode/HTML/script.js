/*
//Object with function
const details = {
    name: 'Kasi Jangiti',
    age: 30,
    city: 'Guntur',
    designation: 'Salesforce Developer',
    salary: 100000,

     description: function() {
        return `My Name is ${this.name} and my age is ${this.age}. I am belong to ${this.city} city working as a ${this.designation} with ${this.salary} salary `
    }
}

Note : to print the function : details.description()

//Object with getter
const details = {
    name: 'Kasi Jangiti',
    age: 30,
    city: 'Guntur',
    designation: 'Salesforce Developer',
    salary: 100000,

    get description() {
        return `My Name is ${this.name} and my age is ${this.age}. I am belong to ${this.city} city working as a ${this.designation} with ${this.salary} salary `
    }
 Note: to print the getter : details()
}


//Object with setter
const details = {
    designation: '',
    location: 'Hyderabad',

    set empdesig(name) {
        this.designation = name;
    }  
}

Note: to set values from the setter: details.sempdesig='Kasi'


 //General function
function foo(bar){

}

//Function with expression
const foo = function(bar){

}

//Named function expressions
 const foo = fucntion foo(bar){
 //It will be helpful to know where the error occured
}



//Arrow function

without arrow function:
const info = function () {
    console.log('My Name is Kasi and I am a Salesforce Developer');
}

With arrow function:
const info1 = () => {
    console.log('My Name is Kasi and I am a Salesforce Developer');
}

//If you want to return with single value use below code
const info1 = () => 'My Name is Kasi and I am a Salesforce Developer';

//Arrow function with single parameter
const info1 = name => `My Name is ${name} and age is 31 salary is 50000`
console.log(info1('Kasi'));

//Arrow function with multiple parameter
const info1 = (name, age, salary) => `My Name is ${name} and age is ${age} salary is ${salary}`
console.log(info1('Kasi', 31, 10000));

//Arrow function return object from the parameter
const info1 = (name, age, salary) => ({ name: name, age: age, salary: salary })
console.log(info1('Kasi', 31, 100000));

Note : If the key and value is same name in the object,you can write like below
const info1 = (name, age, salary) => ({ name, age, salary })
console.log(info1('Kasi', 31, 100000));


Destructring:
------------

Object:

const myData = {
    des: 'Developer',
    loc: 'Hyderabad',
    sal: 100000
}

//General way of accessing the properties from object
const desc = myData.des;
const locc = myData.loc;
const sall = myData.sal;

//With Destructring
const { des, loc, sal } = myData;

//With Destructring some another name like alias
const { des: d, loc: l, sal: s } = myData

// We can assign default values to the object
const { des, loc, sal, promotion = true } = myData

Array:
------
const arrayOperator = ['Kasi', 'Jangiti', 'Guntur', 31, 100000];

Array Destructuring:
const [firstname, lastname, city, age, salary] = arrayOperator

const arrayOperator = ['Kasi', 'Jangiti', 'Guntur', 31, 100000];

Array Destructuring with restOperator:
const [firstname, lastname, ...otherInfo] = arrayOperator
//We can access restOperator with index,to print values in the restOperator we use like below
 restOperator[0], restOperator[1], restOperator[2]

loops:
-----
const roles = ['Admin', 'Developer', 'Consultant', 'Architect'];

//Generay way
for (let i = 0; i < roles.length; i++) {
    console.log(roles[i]);
}

//forEach with arrow function
roles.forEach((roleName) => {
    console.log(roleName)
})

//With index and curly braces
roles.forEach((roleName, index) => {
    console.log(`My ${index + 1} Role is ${roleName} `);
})

//With index and removing curly braces only one console statement
roles.forEach((roleName, index) => console.log(`My ${index + 1} Role is ${roleName} `))

//for of without index
for (const value of roles) {
    console.log(value)
}

//for of with index
for (const [index, value] of roles.entries()) {
    console.log(`My ${index + 1} role is ${value}`)
}

Note: We cannot use for( of ){} to the objects

for in loop for objects:

const studentInfo = {
    name: 'Sri',
    college: 'BEC',
    branch: 'Mechanical',
    yop: 2018
}

for (let property in studentInfo) {
    //console.log(property, studentInfo[property])
    console.log(property) // Keys => property name
    console.log(studentInfo[property]) // Values => value name
}

Note : We don't use for(in) to the arrays.


//While loop
const cars = ['bmw', 'land rover', 'benz', 'audi'];
let i = 0;
while (i < cars.length) {
    console.log(`${cars[i]} is my ${i} car`);
    i = i + 1;
}

//do while
const cars = ['bmw', 'land rover', 'benz', 'audi'];
let i = 0;

do {
    console.log(`${cars[i]} is my ${i} car`);
    i = i + 1
}
while (i < cars.length);

hoisting:
--------
--> Whenever you try to print the variable without declaration, it will throw an error as variable is not declared.
--> In the function(), if you define a variable anywhere in the function,it will come to the top.
--> If you declare a variable with "var" within the function, it will say undefined.
--> If you assign any value to it, it will print he value when we call the function().
--> Like variable, we can print the function(),before cretaed or after created.
foobar()
function foobar() {
    //some where over here
    console.log(fullname); // undefined without assign value to variablw but variable is declared
    var fullname = 'Kasi Jangiti';
    console.log(fullname); //print the value which we have assigned to the variable. 
}


Rest Operator:
--> Rest will print the data in the form of array anf it holds the partial data only.
const empInfo = ['Kasi', 'Jangiti', 'Developer', 'Infosys', 'Hyderabad']
const [firstname, lastname, ...myInfo] = empInfo

Spread Operator:
--> It can give the complete data of an array or object.
const empInfo = ['Kasi', 'Jangiti', 'Developer', 'Infosys', 'Hyderabad']
const myData = [...empInfo]

Example:
function sum(a, b, c) {
    return a + b + c
}

const nums = [10, 30, 40]

console.log('Addition result is', sum(...nums)) //we can pass array as a parametr to the function

Array methods:
-------------
.some():
--> It will execute until it return true from the array.
-->Once the method returns true,it will stop the execution.

const data = ['Engineer', 'Programmer', 'Coder', 'Reviewer'] //Array

function checkValueExists(value) {
    console.log(value)  // get the values from the array,till it returns true.
    return 'Engineer' == value
}

function checkValue() {
    console.log(data.some(checkValueExists)); //.some() method with parameter
}


.every():
--> It is exactly opposite to the .some() method.
--> It will execute until it returns false,once return false it will stop executing.

const years = [1992, 1346, 1985, 2014, 2025, 2030, 4693]

function compare(year) {
    console.log(year)
    return 2025 > year
}

function checkyears() {
    console.log(years.every(compare))
}

push:
--> It is used to add the elements to the array at the end.
const a = [1, 2, 3, 4, 5, 6]
a.push(7)
a.push(8, 9, 10, 11) //1, 2, 3, 4, 5, 6,7,8, 9, 10, 11
Note: we can add more than element with single go

unshift:
--> It is used to add the elements at the starting of the array.
const a = [1, 2, 3, 4, 5, 6]
a.unshift(-1, -2, -3, 0) // -1, -2, -3, 0,1, 2, 3, 4, 5, 6

pop():
--> It is used to remove last element from the array.
const nums = [1, 2, 3, 4, 5, 6]
nums.pop()   //1, 2, 3, 4, 5

shift():
-->It is used to remove the first element from the array.
const nums = [1, 2, 3, 4, 5, 6]
nums.shift() // 2, 3, 4, 5, 6

map();
-->It is used to access all elements from the array and perfrom some logic.
--> map will always return an array
const values = [1, 2, 3, 4, 5, 6]
function sumation() {
    console.log(values.map(item => item * 10)) // 10, 20, 30, 40, 50, 60
}

filter():
--> It is used to filter the values from the array.
--> It will execute until it return false,and it returns a new array.

const y = [1913, 1967, 1986, 2011, 2036]
function checkYears() {
    console.log(y.filter(year => year < 2023)) // 1913, 1967, 1986, 2011
}

reduce():
--> It is used to perfrom sum with predefined value called accumalator.

const n = [1, 2, 3, 4, 5]

//callback function
const sum = (accumalator, item) => accumalator + item  //25

function addition() {
    console.log(n.reduce(sum, 10)); //accumalator value is 10(pre-defined)
}

Note : If you don't specify any value to accumalator default value is 0.

Immediate Invoke Function Expression(IIFE):
--> It will invoke immediately before the DOM attched.
--> window.onload executes after IIFE function.
--> Whe you want to performa logic onload of the component,and you wouldn't need those variables later.
-->you can specify let and const variables and those will not be leagued into the global scope.

IIFE:
(function () {
    console.log('I am from IIFE');
})()

window.onload():
window.onload = function () {
    console.log('I am from window.onload function')

this:
--> "this" keyword reference to the complete object,if you want to print the particular value you have to use this.propertyName.
--> "this" keyword reference to the scope.

"this" function within the object
let vehicle = {
    name: 'car',
    colour: 'black',
    wheels: 4,

    description: function () {
        console.log(this)   // It will return the complete object
        console.log(`This is a ${this.colour} colour ${this.name}`) 
        //console.log(`This is a ${colour} colour ${name}`) //It will throw an error as not defined
    }
  }
}

"this" arrow function within the object:
let vehicle = {
    name: 'car',
    colour: 'black',
    wheels: 4,

    description: () => {
        console.log(this) // it will print the window functions
        console.log(`This is a ${this.colour} colour with ${this.wheels} wheels`) // properties as undefined
    }
}

Note: "this" keyword we don't use with arrow function.
      If you use it, it will print undefined and window functions.

continue:
--> If the condition is satisfied then print the value,If the condition is not satisfied it will not print the value but it goes to next iteration check the condition.

for (let i = 1; i < 10; i++) {
    if (i % 2 == 1) {
        continue;
    }
    console.log(i) // 2,4,6,8
}

break:
--> Once the condition is satisfied, it will come out from the loop and stops the execution.

for (let i = 1; i < 10; i++) {
    if (i == 5) {
        break;
    }
    console.log(i) // 1, 2, 3, 4
}

Note :  At 5, it break and even not print the value.


Maps:

//How to initialize a Map
let s = new Map() //Map with empty 

//How to set the values to the Map
let s = new Map()
s.set('name', 'Kasi');
s.set('age', 31)
s.set('profession', 'salaried')
s.set('role', 'developer')

//How to print the values from the Map
let n = s.get('role')
console.log(n) //developer

let m = s.get('profession')
console.log(m)  // salaried

//How to check, key contains in the Map
let x = s.has('name')
console.log(x)        //true

let y = s.has('age');
console.log(y) //true

//how to delete a key from the Map
let d = s.delete('age')
console.log(d)

//How to delete all the keys from the Map
let b = s.clear()
console.log(s)

//How to initialize a Map with some keys and values
let newMap = new Map([['designation', 'architect'], ['company', 'Infosys'], ['location', 'Hyderabad']])
console.log(newMap)

//How to print the keys and values with spread operator

let k = [...newMap.keys()]
console.log(k) // all the keys

let o = [...newMap.values()]
console.log(o) //all the values

let p = [...newMap]
console.log(p) //It will print the key and value in the form of arrays


//How to iterate a Map with all the keys
for (let i of newMap.keys()) {
    console.log(i)
}

//How to iterate a Map with all the values
for (let i of newMap.values()) {
    console.log(i)
}

//How to iterate a Map with all the keys and values
for (let [i, j] of newMap) {
    console.log(i, j)
}

Set:
let s = new Set() //empty set
console.log(s)

//adding values to the set
s.add('Kasi')
s.add('Mounika')
s.add('Sathya')
s.add('Narasimha')
console.log(s); //'Kasi', 'Mounika', 'Sathya', 'Narasimha'

//check value conatains a set
let a = s.has('Mounika')
console.log(a)   //true

//delete a value from set
let c = s.delete('Narasimha')
console.log(c) //true

//remove all the values from the set
let de = s.clear()
console.log(s)

//How to initialize a set with values
let newSet = new Set(['Mr', 'Ms', 'Mrs', 'She', 'Her'])
console.log(newSet) //'Mr', 'Ms', 'Mrs', 'She', 'Her'

//Loop the values with set
console.log('keys and values')
for (let i of newSet) {
    console.log(i) //'Mr', 'Ms', 'Mrs', 'She', 'Her'(vertical mode)
}

//Loop the values with set.keys()
console.log('keys')
for (let q of newSet.keys()) {
    console.log(q) //'Mr', 'Ms', 'Mrs', 'She', 'Her'(vertical mode)
}

////Loop the values with set.values()
console.log('values')
for (let q of newSet.values()) {
    console.log(q) //'Mr', 'Ms', 'Mrs', 'She', 'Her'(vertical mode)
}

//Iteration with forEach loop
console.log('for each loop')
newSet.forEach(item => console.log(item)) //'Mr', 'Ms', 'Mrs', 'She', 'Her'(vertical mode)


// A simple callback function within another
console.log('Starting')
setTimeout(() => {
    console.log('I am calling first')
    setTimeout(() => {
        console.log('I am calling second')
        setTimeout(() => {
            console.log('I am calling third')
        }, 7000)
    }, 5000)
}, 3000)
console.log('Finished')

//Promise
const p = new Promise((resolve, reject) => {
    if (true) {
        resolve('SUCCESS')
    } else {
        reject('FAILURE')
    }
})

//General call back function invocation
function checkDetails(verifyFname, verifyLname, verifyAddress) {
    verifyFname('Kasi')
    verifyLname('Jangiti')
    verifyAddress('Address')
}

let checkFname = firstname => {
    if (firstname === 'Kasi') {
        console.log('Firstname is verified');
    }
}

let checkLname = lastname => {
    if (lastname === 'Jangiti') {
        console.log('Lastname is verified');
    }
}

let checkAddress = address => {
    if (address === 'Address') {
        console.log('Address is verified');
    }
}

checkDetails(checkFname, checkLname, checkAddress);


//Promise
function checkFname(fname) {
    return new Promise((resolve, reject) => {
        if (fname === 'Kasi') {
            resolve('Firstname is verified')
        }
    })
}

function checkLname(lname) {
    return new Promise((resolve, reject) => {
        if (lname === 'Jangiti') {
            resolve('Lastname is verified')
        }
    })
}

function checkAddress(address) {
    return new Promise((resolve, reject) => {
        if (address === 'Address') {
            resolve('Address is verified')
        }
    })
}

function checkPromise() {
    checkFname('Kasi')
        .then((msg) => {
            console.log(msg)
            return checkLname('Jangiti')
        }).then((msg) => {
            console.log(msg)
            return checkAddress('Address')
        }).then((msg) => {
            console.log(msg)
            console.log('Details are verified')
        })
}
*/

function beforesubmit() {
    let inputdate = document.querySelector(".inputdate");
    let outputdate = document.querySelector(".outputdate");
    console.log("inputdate", inputdate.value);

    //Find the user locale(User Locale => en-IN) => System.debug(UserInfo.getLocale())
    //converting from string to date format 
    let formattedDate = new Date(inputdate.value).toLocaleDateString("en-IN");
    outputdate.value = formattedDate;
}








