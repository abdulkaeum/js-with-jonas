'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  // reset the containerMovements html
  containerMovements.innerHTML = '';

  // slice will take a copy for this example - we need a copy
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>`;

    // insert new elements
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(function (el) {
      return el > 0;
    })
    .reduce(function (acc, el) {
      return acc + el;
    }, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(function (el) {
      return el < 0;
    })
    .reduce(function (acc, el, i, arr) {
      return acc + el;
    });
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(function (el) {
      return el > 0;
    })
    .map(function (deposit) {
      return (deposit * acc.interestRate) / 100;
    })
    .filter(function (int) {
      return int >= 1;
    })
    .reduce(function (acc, int) {
      return acc + int;
    }, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const calcDisplaytBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, el) {
    return acc + el;
  }, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

// gen usernames - add prop username to each account
// Abdul Kaeum => abdul kaeum => ['abdu','kaeum'] => ['a','k'] => ak
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (el) {
        return el[0];
      })
      .join('');
  });
};
createUsername(accounts);

const updateUi = function (currAcc) {
  displayMovements(currAcc.movements);
  calcDisplaySummary(currAcc);
  calcDisplaytBalance(currAcc);
};

// login in
let currentAccount;
btnLogin.addEventListener('click', function (eventParam) {
  // prevents form from submitting
  eventParam.preventDefault();

  // will return 1 array element if found
  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });

  // use optional chaining to check if anything in array
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and msg
    labelWelcome.textContent = `Welcome back, ${
      // Abdul Kaeum => ['Abdul','Kaeum'] => Abdul
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); // remove focus

    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (eventParam) {
  eventParam.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUi(currentAccount);
  }
});

btnLoan.addEventListener('click', function (eventParam) {
  eventParam.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some(function (mov) {
      return mov >= amount * 0.1;
    })
  ) {
    currentAccount.movements.push(amount);
    updateUi(currentAccount);
  }

  inputLoanAmount.value = '';
});

// close and account
btnClose.addEventListener('click', function (eventParam) {
  eventParam.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(function (acc) {
      acc.username === currentAccount.username;
    });
    // remove the account fron the array
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted; // set back to false to un-sort
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// SLICE - like subtring
let arr = ['a', 'b', 'c', 'd', 'e'];
arr.slice(2); // c, d, e
arr.slice(-1); // e (last el)
arr.slice(-2); // d, e (last 2 el)

// SPLICE (DELETES FROM ORIG ARR)
arr.splice(-1); // a, b, c, d
arr.splice(1, 2); // a, d

// REVERSE (MUTATES ORIG ARR)
const arr2 = ['j', 'i', 'h', 'g', 'f'];
arr2.reverse(); //f, g, h, i, j

// CONCAT
const letters = arr.concat(arr2);
//console.log([...arr, ...arr2]);
// a, b, c, d, f, g, h, i, j

// JOIN
letters.join(' - ');
// a - b - c - d - f - g - h - i - j

// NEW at method
const arr3 = [23, 11, 64];
arr3.at[-1]; // 64
arr3.at[0]; // 23
// works on strings too

// forEach - can't use break and continue
movements.forEach(function (movement, index) {
  //console.log(`${index} ${movement}`);
});

// forEach on a MAP
currencies.forEach(function (value, key, map) {
  //console.log(`${key} ${value}`);
  // prints EUR - Euro
});

const currenciesUnique = new Set(['USD', 'USD', 'EUR', 'EUR', 'GBP']);
console.log(currenciesUnique); // only will have unique values
currenciesUnique.forEach(function (v, k, m) {
  //console.log(`${k} ${v}`);
  // prints USD USD
  // SETS do not have keys
  // here the k === v
});
const checkDogs = function (dogsJulia, dogsKate) {
  // correct dogsJulia
  const correctDogsJulia = [...dogsJulia]; // create new array
  correctDogsJulia.splice(3, 4);

  // create new array
  const remaining = [...correctDogsJulia, ...dogsKate];

  remaining.forEach(function (el, i) {
    // if el >= adult
    //puppy
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// map
const eurToUsd = 1.1;
const eurToUsdRes = movements.map(function (el) {
  return el * eurToUsd;
});

// filter
const deposits = movements.filter(function (mov) {
  return mov > 0;
});

// reduce - CREAT A TOTAL
const balance = movements.reduce(function (accumulator, el, i) {
  return accumulator + el;
  // accumulator keeps getting added to
  // 0 means where to accumulator will start from
}, 0);

// reduce - get Max value chapter 153. The reduce Method
const max = movements.reduce(function (accumulator, el) {
  // keep track of the current max value
  // is 200 > 200?
  if (accumulator > el) return accumulator;
  // el will be the current acc, the one that will return in end
  else return el;
}, movements[0]);

// challenge - pass
const calcAverageHumanAge = function (ages) {
  const humanAge = ages
    .map(function (age) {
      return age <= 2 ? 2 * age : 16 + age * 4;
    })
    .filter(function (el) {
      return el >= 18;
    })
    .reduce(function (acc, el, i, arr) {
      return acc + el / arr.length;
    }, 0);

  return humanAge;
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));

// find - loop ovr array, get the 1st element from the array based on a condition
movements.find(function (mov) {
  return mov < 0;
});

// some - return boolen value if 'any' elements satisfy the condition
movements.some(function (mov) {
  return mov > 0;
});

// every - return boolen value if 'all' elements satisfy the condition
movements.every(function (mov) {
  return mov > 0;
});

// return the INDEX that satisfies the condition
accounts.findIndex(function (acc) {
  return acc.username == 123;
});

// indexOf = search for value, returns true/false
// arr.indexOf();

// array flat 1 level deep
const arrFlat = [[1, 2, 3], [4, 5, 6], 7, 8];
arrFlat.flat(); // [1 2 3 4 5 6 7 8]
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
arrDeep.flat(2); // go 2 level deep

// 1. map over it
// 2. flattern the results
const accountMovsTotal = accounts
  .map(function (acc) {
    return acc.movements;
  })
  .flat()
  .reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

// use flatMap to perform step 1 and 2 in one go
// flatMap works only 1 level deep so you still need flat()
const accountMovsTotal2 = accounts
  .flatMap(function (acc) {
    return acc.movements;
  })
  .reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

// sort() string - mutates the original arr
const owners = ['Jonas', 'Zack', 'Adam', 'Martha'];
owners.sort(); // a - z

// sort() numbers in asc order
movements.sort(); // -200, -450, -400, 1300, 200, 3000, 450, 70
// does not work on nuumbers - fix as per below
movements.sort(function (nextValue, currentValue) {
  // a and b are two connsective numbers
  // if < 0 then A will be before B (keep order)
  // if > 0 then B will be before A (swith order)
  if (nextValue > currentValue) return 1;
  if (currentValue < nextValue) return -1;

  // e.g a = 200, b = 450 return
});
console.log(movements); // now sorted in asc order
// sort() numbers in desc order but code shorter
//b  - a returns either 1 or -1
movements.sort((a, b) => b - a);

// ARRAY FILLING
const x = new Array(7);
console.log(x); // empty x 7 / can't use  map to fill up array
x.fill(1, 3, 5); // fill it up with 1's from pos 3 to pos 5
// wworks on filled arrays

// ARRAY FILLING FROM
const xY = Array.from(x, function (_, i) {
  return i + 'B';
});
console.log(xY); // ['0B', '1B', '2B', '3B', '4B', '5B', '6B']

//** EXERCISE */

// get all movements into one array and sum it all up
//const bankDepositeSum = accounts.map(acc => acc.movements).flat();
const bankDepositeSum = accounts
  .flatMap(acc => acc.movements) // return 1 level array from a multi
  .filter(mov => mov > 0) // return those > 0
  // sum = acc starts at 0, curr = curr el
  .reduce((sum, cur) => sum + cur, 0); // add each el to sum
console.log(bankDepositeSum); // 25100

//how many deposits have there been in the bank >= 1000
const numDeposits1k = accounts
  .flatMap(acc => acc.movements)
  //filter(mov => mov >= 1000).length; // return the array then get the legnth
  .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); // count something in an array
console.log(numDeposits1k); // 5

let sums = [];
// create a object of the sum of all the deposits and widtraws
const { depositss, withdrwals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // is cur value a deposits or a withdrwals
      //cur > 0 ? (sums.depositss += cur) : (sums.withdrwals += cur);
      sums[cur > 0 ? 'depositss' : 'withdrwals'] += cur;
      return sums;
    },
    { depositss: 0, withdrwals: 0 }
  );
console.log(depositss, withdrwals);

// This Is a Nice Title
const convertTitleCase = function (title) {
  const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};
console.log(convertTitleCase('this is a nice title EXMAPLE'));

// challange

// TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1.
dogs.forEach(function (el, i, arr) {
  el.recFood = Math.trunc(el.weight ** 0.75 * 28);
});

// 2.
const { curFood, recFood } = dogs.find(function (el, i, cur) {
  return el.owners.includes('Sarah');
});
console.log(curFood > recFood ? 'too much' : 'too less');

// 3.
let ownersEatTooMuch = [];
let ownersEatTooLittle = [];
dogs
  .map(dogObj => {
    return dogObj.curFood > dogObj.recFood
      ? ownersEatTooMuch.unshift(dogObj.owners)
      : ownersEatTooLittle.unshift(dogObj.owners);
  })
  .flat();
console.log(ownersEatTooLittle.flat(), ownersEatTooMuch.flat());

// 4.
//Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 8.
const dogsSorted = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsSorted);
