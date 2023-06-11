'use strict';

//>> Constructor Functions and the new Operator - this is not JS feature it's a pattern use by devs

const Person = function (fNmae, bYear) {
  //console.log(this); //Person empty at this point
  this.fNmae = fNmae; // filling the this obj
  this.bYear = bYear;

  // bad practice
  // all obj's will be attached with this method
  // use Prototypes inheritance instead - line 25
  this.calAge = function () {
    console.log(2037 - this.bYear);
  };
};

abdul = new Person('Abdul', 1984);
console.log(abdul); // obj Person Abdul 1984

//>> Prototypes inheritance / delegation

// this method will only exist ONCE, accessed/linked via Obj.prototype
// calAge2 is now linked to Person and called whenever needed from their intances
Person.prototype.calAge2 = function () {
  console.log(2037 - this.bYear);
};

abdul.calAge2();

// ES6 class declaraton
class PersonCl {
  constructor(firstNmae, birthYear) {
    this.firstNmae = firstNmae;
    this.birthYear = birthYear;
  }

  // Prototypes inheritance / delegation auto/suger applied
  calAge3() {
    console.log(2037 - this.birthYear);
  }
}

const jessica = new PersonCl('Jessica', 1996);

//>> Static methods
// static props/methods as per php = is a helper only
// not available on instances
// only available on the class itself

//>> ES6 Class Inheritance
// as per php
class StudentCl extends PersonCl {
  constructor(firstNmae, birthYear, course) {
    // always needs to happen first - so the this keyword can be set on StudentCl
    super(firstNmae, birthYear); // call to parent constructor
  }

  // can overide methods as per php
  // methods added here are placed into the .protype prop and not on the instances
  // but to access them like this jessica.greet()
}

//>> Prototype chain
// works a bit like the scope chain
// 1st layer of prototype is what's in the class
// 2nd layer are those from the extended class
// when accessing methods and props it will keep looking up in the chain to located the methods and props traying to be accessed
// AKA prototypal inheritance I.E instances inheterit through this chain... they dont actually have it

//>> Encapsulation
// as per php keeping it private and accessible via an interface
// public fields are placed above the constructor var = something
// use #var #method() for making props/method private
// cant't access pricate outside of class, use an api method to access and change the props within the class
// use _var _method in front of props = convention for making protected

//>> chaining
// to chain class methods, the method must simply have return this so the nethods know where to call it from
