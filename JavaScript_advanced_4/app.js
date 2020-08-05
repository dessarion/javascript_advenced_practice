'use strict'; // can use in local scopes
// const hello = `Hello, World`;

// function sayHello(param) {
//     phrase = param; // app.js:5 Uncaught ReferenceError: phrase is not defined
//     console.log(phrase);
// }

// sayHello('hello')

// const object = {}

// Object.defineProperty(object, 'property', {
//     enumerable: false,
//     configurable: false,
//     writable: false,
//     value: "Read Only"
// })

// object.property = 'Change' //Cannot assign to read only property 'property' of object '#<Object>'

// console.log(object.property);

// const person = {
//     name: 'Dessarion',
//     surname: 'Des'
// }

// const dight = 10

// delete person.surname
// delete person // Delete of an unqualified identifier in strict mode.
// delete dight // Delete of an unqualified identifier in strict mode.

// console.log(person);
// console.log(dight);

// function double(param, some, param){ // Duplicate parameter name not allowed in this context
//     console.log(param);
// }

// double('one','two','last')

// const x = 230
// const y = 012 // Octal literals are not allowed in strict mode
// const z = 002 // Octal literals are not allowed in strict mode.

// console.log(x + y + z);

// const x = 230
// const y = parseInt(12, 8)
// const z = parseInt(2, 8)

// console.log(x + y + z);

// const obj = {
//     param: 'Well hello!',
//     say: function(){
//         console.log(this.param);
//     }
// }

// // obj.say()

// const obj2 = {
//     param: 'Helolo?'
// }
// const say = obj.say
// obj2.say = obj.say
// say.bind(obj2)()

// // obj2.say()

// const Construct = function(){
//     const self = this
//     self.hello = 'Hello'

//     self.sayHello = function(){
//         console.log(self.hello);
//     }

//     self.delayHello = function(){
//         setTimeout(self.sayHello, 1000)
//     }
// }

// const objC = new Construct()
// objC.sayHello()
// objC.delayHello()