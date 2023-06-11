'use strict';

/**********************/
/****** Default Parameters *******/
/**********************/

const bookings = [];
const createBooking = function (flightnum, numPass = 1, price = 199 * numPass) {
  const booking = {
    flightnum,
    numPass,
    price,
  };
  bookings.push(booking);
  console.log(bookings);
};

createBooking('LH123');

/**********************/
/****** Passing Arguments Works: Value vs. Reference *******/
/**********************/

const flight = 'LH234';
const jonas = {
  name: 'Abdul Kaeum',
  passport: 123456789,
};

const checkIn = function (flightNum2, passenger) {
  flightNum2 = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport == 123456789) {
    alert('Check in');
  } else {
    alert('Wrong passport');
  }
};
checkIn(flight, jonas);
console.log(flight); // flight is still LH234
console.log(jonas); // but this reference value has changed

/**********************/
/****** First-Class and Higher-Order Functions *******/
/****** functions accepting function as args / Callback *******/
/**********************/

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

//low-order level function
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//high-order level function
const transFormer = function (str, fn) {
  console.log(`${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed string: ${fn.name}`);
};

transFormer('JavaScript is the best!', upperFirstWord);
transFormer('JavaScript is the best!', oneWord);

/**********************/
/****** Functions Returning Functions *******/
/**********************/

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}}`);
  };
};

const greetHey = greet('Hey');
greetHey('Abdul'); // Hey Abdul
greet('Hello')('Abdul'); // Hello Abdul

/**********************/
/****** The call and apply Methods *******/
/**********************/

const lufthansa = {
  airline: 'lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum3, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum3}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum3}`, name });
  },
};

// Abdul booked a seat on lufthansa flight LH239
lufthansa.book(239, 'Abdul');
// Kaeum booked a seat on lufthansa flight LH635
lufthansa.book(635, 'Kaeum');
console.log(lufthansa);

const eurowings = {
  airline: 'eurowings',
  iataCode: 'EW',
  bookings: [],
};

// store method as a reg function value to re-use on eurowings and lufthansa
// book is not linked to lufthansa
// so the this keyword is lost / undefined
const book = lufthansa.book;
// this line will not work
//book(23, 'Sarah') // cannot read prop this.airline
/* ERROR: Cannot read property 'airline' of undefined

In a regular fn call, the this keyword is undefined
Regular fn call i.e a seperate fn on it's own like the book

So any this keyword in those functions will be undefined and point to the parent in this case the window */

// the call can fix this an attach the eurowings obj so that book can have a parent for the this keyword
// Sarah booked a seat on *eurowings* flight *EW*23
book.call(eurowings, 23, 'Sarah');
console.log(eurowings);

book.call(lufthansa, 23, 'Mar  y');
console.log(lufthansa);
/*
0: {flight: 'LH239', name: 'Abdul'}
1: {flight: 'LH635', name: 'Kaeum'}
2: {flight: 'LH23', name: 'Mary'}
*/

// apply is the same as call but takes an array
book.apply(eurowings, [583, 'Cooper']);

/**********************/
/****** The bind Method *******/
/**********************/

// lets say we need to use the book for eurowings all the time
// the bind will not call book but return a new function where this this keyword is set to eurowings
const bookEW = book.bind(eurowings);
bookEW(23, 'Steven'); // this keyword set in stone to eurowings

// set default args
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Steven'); // booked on flight 23
bookEW23('Adam'); // booked on flight 23

// bind with event listeners
lufthansa.planes = 300; // add new prop
// add new fn
lufthansa.buyPlane = function () {
  console.log(this); // lufthansa obj
  this.planes++;
  console.log(this.planes); // 301
};
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// another bind example not related to the this keyword
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // 0.23 set in stone
console.log(addVAT(100));

/**********************/
/****** Challenge *******/
/**********************/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(`${this.answers}`);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
  registerNewAnswer() {
    const num = Number(
      prompt(
        `${this.question}\n${this.options.join(
          '\n'
        )}\n(Write your option below)`
      )
    );

    if (typeof num === 'number' && num >= 0 && num <= 3) {
      this.answers[num]++;

      this.displayResults();
      this.displayResults('string');
    } else {
      alert(`num >= 0 && num <= 3`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

/**********************/
/****** Immediately Invoked Function Expressions  *******/
/**********************/

const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// trick - as it's a function expression at this point IIFE
(function () {
  console.log('This will never run again');
})();

/**********************/
/****** Closures *******/
/**********************/

const secureBooking = function () {
  let passengerCnt = 0;

  return function () {
    passengerCnt++;
    console.log(passengerCnt);
  };
};

// booker will still have access to passengerCnt even after secureBooking is long gone from the execution context
const booker = secureBooking();
booker(); // 1
booker(); // 2
booker(); // 3
