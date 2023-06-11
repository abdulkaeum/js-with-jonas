'use strict';

// *************************************//
// *** SCOPYING ***//
// *************************************//

// defined in the global scope
function calAge(birthYear) {
  const age = 2037 - birthYear;

  // prints Abdul, found in the global scope
  // even though firstName is defined after calAge (which is not an issue)
  console.log(firstName);

  function printAge() {
    let outPut = `${firstName}, Your are ${age}, born in ${birthYear}`;
    // Abdul, Your are 46, born in 1991
    console.log(outPut);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var milllenial = true;
      // 'new' firstName variable
      const firstName = 'Kaeum';
      const str = `${firstName} is a milllenial`;
      // Kaeum is a milllenial
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      // re-assiging a var - line 16 will be overriten
      outPut = 'NEW OUTPUT';

      // or if we created a new outPut it will be a brand new var within the printAge function only
      const outPut = '';
    }

    // ReferenceError
    // a const wriiten in a block are blocked-scoped
    // console.log(str);

    // a var is function-scoped this case the printAge()
    console.log(milllenial); // printts true

    // ReferenceError: add is not defined
    // like let and const wriiten in a block, functions are also blocked-scoped
    // add(2, 3);

    // prints NEW OUTPUT
    console.log(outPut);
  }
  printAge();

  return age;
}

const firstName = 'Abdul';
calAge(1991);
// calAge will return annot access 'firstName' before initialization
// const firstName = 'Abdul';

// can't access printAge() or age from here

// *************************************//
// *** Hoisting and TDZ in Practice ***//
// *************************************//

// prints undefined / hoisted
console.log(me);
// At TDZ: ReferenceError: Cannot access 'job' before initialization
//console.log(job);
// At TDZ: ReferenceError: Cannot access 'year' before initialization
//console.log(year);

var me = 'Abdul';
let job = 'teacher';
const year = 1991;

// normaol function: declared on line 87: added in global
// returns 5, able to access before addDecl is defined
console.log(addDecl(2, 3));

// referenceError: Cannot access 'addExpr' before initialization because it's set to const
// console.log(addExpr(2, 3));

// eferenceError: Cannot access 'addArrow ' before initialization because it's set to const
// console.log(addArrow(2, 3));

// function declaration
function addDecl(a, b) {
  return a + b;
}

// function expression
const addExpr = function (a, b) {
  return a + b;
};

// function arrow
const addArrow = (a, b) => a + b;

// *************************************//
// *** The this keyword ***//
// *************************************//

// this keyword - points to the window
console.log(this);

//regular function - this keyword
const calAgeThis = function (birthYear) {
  console.log(2037 - birthYear); // 46
  // strict mode = undefined
  // sloppy mode = window obj which can lead to issues
  console.log(this);
};

// calling without/attached to/an owner
calAgeThis(1991);

//arrow function - this keyword
const calAgeArrow = birthYear => {
  console.log(2037 - birthYear); // 57
  // arrows don't get there own this key word
  // points to window in this case - in general it uses the lexical this keyword = uses the one from it's 'parent scope'  - in this case here it's the window
  console.log(this);
};

calAgeArrow(1980);

//object - this keyword
const jonas = {
  year: 1991,
  calAge: function () {
    console.log(this); // returns the jonas obj
    console.log(this.year); // returns the jonas obj.year
  },
};

// calling with/attached to/an owner = method call
jonas.calAge();

// *************************************//
// *** Arrow vs regular functions (the pitfalls) ***//
// *************************************//

const ArrowVsregular = {
  year: 1991,
  fName: 'Abdul',
  calAge: function () {
    console.log(this);
    console.log(this.year);
  },

  // prints Hey undefined
  greet: () => console.log(`Hey ${this.fName}`),
};

// Arrow functions do not get their own this keyword
// it uses the this keyword from its *parent scope* wherever that is
// So an arrow function inherits the this keyword from it's parent scope
// in this case the global scope i.e window / window.fName
// rule: never use an arrow function as a method on an abj
// can be used from within a method
ArrowVsregular.greet();

// *************************************//
// *** Primitives vs. Objects ***//
// *************************************//

let PvsOage = 30;
let oldAge = PvsOage; // preserve age in oldAge
PvsOage = 31;
console.log(PvsOage, oldAge); //31, 30

// the aove will work just fine - works as expected

// object
const PvsOobjMe = {
  name: 'Abdul',
  age: 30,
};

// copy obj instead of creating a new one
// but friend has new age 27
const friend = PvsOobjMe;
friend.age = 27;

// both age prop are 27!
console.log('Friend:', friend);
console.log('Me:', PvsOobjMe);

/* 
WHY? because objects are a non primitive.
Primitives are stored in the call stack/execution context.
non primitives are stored in the HEAP beacuse they are too large (of data).
None primitive types are reference types and carry the same address that holds tha data.
So when you copy an obj and update one of it's props,
you are actually just updating the original obj.prop because the copy is referencing the SAME obj 
*/

// another example

let lname = 'William';
let oldLname = lname;
lname = 'Kaeum';
console.log(lname, oldLname); // Kaeum, William
// works, because each primitive is stored in own memory in the stack

// obj = stored in the heap, the stack keeps the same reference as to the one in the heap

const jessica = {
  fname: 'Jessica',
  nameLast: 'Williams',
  age: 27,
};
// looks like you're copying the entire obj
// but behind the scenes JS is pointing marriedJessica to
// jessica = same obj as same address from stack to heap
const marriedJessica = jessica;
marriedJessica.nameLast = 'Kaeum';
console.log('Before', jessica); // nameLast = Kaeum
console.log('After', marriedJessica); // nameLast = Kaeum
// Because it's a refernce type, you changed the same obj because they are both same address in the stack to heap

// work around
const jessica2 = {
  fname: 'Jessica',
  nameLast: 'Williams',
  age: 27,
};

// completly new obj with new address in stack to heap
// ONLY works on first level obj not any within it
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.nameLast = 'Kaeum';
console.log('Before', jessica2); // nameLast = Williams
console.log('After', jessicaCopy); // nameLast = Kaeum
