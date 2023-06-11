'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

/***********************/
/***********************/
/* Destructuring ARRAYS*/
/***********************/
/***********************/

// Without Destructuring
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// With Destructuring
const [x, y, z] = arr;
// x=2, y=3, z=4
console.log(x, y, z);

// Italian', 'Vegetarian'
const [first, , second] = restaurant.categories;

// Destructuring inside Destructuring
const nested = [2, 4, [5, 6]];
// 2, 5, 6
const [i, , [j, k]] = nested;

// set default values
// when we don't know the arr length
// 8, 9, undefined
const [p, q, r] = [8, 9];
// 8, 9, 1
const [s, t, u = 1] = [8, 9];

/***********************/
/***********************/
/* Destructuring OBJECTS*/
/***********************/
/***********************/

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// variables names to be different to the props
const {
  name: restaurantName,
  openingHours: hrs,
  categories: tags,
} = restaurant;
console.log(restaurantName, hrs, tags);

// setting default values if they don't exist
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// mutating vars while destructering objects
let aa = 111;
let bb = 999;
const obj = { aa: 23, bb: 7, cc: 14 };
({ aa, bb } = obj);
console.log(aa, bb);

// nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);

/***********************/
/***********************/
/* Spread operator */
/***********************/
/***********************/

// 1 2 2 3 4
const newArr = [1, 2, ...arr];
console.log(newArr);

// join 2 arrays into one array
const myMenu = [...restaurant.mainMenu, ...restaurant.starterMenu];

// string = A b d u l
console.log(...'Abdul');

/***********************/
/***********************/
/* Rest Pattern */
/***********************/
/***********************/

const [aaa, bbb, ...theRest] = [1, 2, 3, 4, 5];
// 1 2 (3) [3, 4, 5]
console.log(aaa, bbb, theRest);

const [Pizzaa, , Risottoo, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
// Pizza Risotto (4) ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']
console.log(Pizzaa, Risottoo, otherFood);

// in objects
const { sat, ...weekdayss } = restaurant.openingHours;
// {open: 0, close: 24} {thu: {…}, fri: {…}}
console.log(sat, weekdayss);

/***********************/
/***********************/
/* Rest Paramters */
/***********************/
/***********************/

// numbers var will be packing/compressed into i.e [2, 3, 5, 6]
const add = function (abc, ...numbers) {
  /* 2, [3]
2, [3, 4]
abc, [2, 3, 5, 6] */
  console.log(abc, numbers);
};
add(2, 3);
add(2, 3, 4);
// array will be unpacking/expand i.e 2, 3, 5, 6
add('abc', ...[2, 3, 5, 6]);

/***********************/
/***********************/
/* Short Circuiting (&& and ||) */
/***********************/
/***********************/

//*****/ || operator
// returns the first value that is TRUTHY
// you can use non booleon values as per below
// returns 99 as 99 was the first truthy value
console.log(99 || 'Abdul');
// return Hello as Hello was the first truthy value
console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// instaed of the below
restaurant.numGuestss = 32;
const guests1 = restaurant.numGuestss ? restaurant.numGuestss : 10;

// numGuestss prop does not exist so becomes 10
const guests2 = restaurant.numGuestss || 10;

//*****/ && operator
// returns the first value that is FALSY
console.log(0 && 'and operator'); // returns 0
console.log(1 && 'and operator'); // returns and operator
console.log('hELLO' && 23 && null && 'ABDUL'); // returns null

/***********************/
/***********************/
/* Nullish Coalescing */
/***********************/
/***********************/

// numGuests is undefined/not set
// if it was 0 it would return 0 (0 is not null or undefined)
// so if the first upperhand was to be null or undefined then the second upperhand will return
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); //10

/***********************/
/***********************/
/* Logical Assignment  */
/***********************/
/***********************/

const rest1 = {
  name: ClipboardItem,
  numGuests: 20,
};
const rest2 = {
  name: 'La Piazza',
  Owner: 'Rossi',
};

rest1.numGuests ||= 10;
rest2.numGuests ||= 10; // rest2.numGuests is falsy

/////////////////////////////////////////////////////

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1. place the two player arrays into thare own vars
const [players1, players2] = game.players;
console.log(players1, players2);

//2. team1 - gk and rest fieldplayers
const [gk, ...fieldplayers] = game.players[0];
console.log(gk, fieldplayers);

//3. craete an array allPlayers
const allPlayers = [...game.players[0], ...game.players[1]];
console.log(allPlayers);

//4. add 3 players to tame 1
const players1Final = ['Thiago', 'Coutinho', 'Perisic', ...players1];
console.log(players1Final);

//5.
const { team1, x: draw, team2 } = game.odds;
console.log(team1, draw, team2);

//6. print name and goal cnt
const printGoals = function (...team) {
  for (let i = 0; i < team.length; i++) {
    let scoreCnt = 0;
    for (let x = 0; x < game.scored.length; x++) {
      game.scored[x] == team[i] ? scoreCnt++ : 0;
    }
    console.log(`${team[i]} - ${scoreCnt}`);
  }
};
printGoals(...allPlayers);

/***********************/
/***********************/
/* for-of Loop  */
/***********************/
/***********************/

// item is a array for each element with its index
// can be destructured to get the index
// instead of item use [i, element]
for (const item of myMenu) console.log(item);

for (const [g, el] of myMenu.entries()) console.log(`${g} ${el}`);

/***********************/
/***********************/
/* Looping Objects  */
// Object.keys(), Object.values() etc converts it into an array
/***********************/
/***********************/

// props/keys
for (const day of Object.keys(openingHours)) {
  console.log(day);
}

// values
for (const day of Object.values(openingHours)) {
  console.log(day);
}

// an enitre KEYS AND VALUES
for (const [key, { open, close }] of Object.entries(openingHours)) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}

/***********************/
/***********************/
/* Challenge  */
/***********************/
/***********************/

// print who scored each goal - FAIL
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// PASS
let oddTotal = 0;
for (const oddV of Object.values(game.odds)) {
  oddTotal += oddV;
}
console.log(oddTotal / Object.values(game.odds).length);

// PASS
for (const [oK, oV] of Object.entries(game.odds)) {
  console.log(oK, oV);
  console.log(`Odd of ${game[oK] ? 'victory ' + game[oK] : 'draw '} ${oV}`);
}

// - FAIL
const scorers = {};
let oldName = '';
let oldscore = 1;
for (let i = 0; i < Object.entries(game.scored).length; i++) {
  let scorer = Object.entries(game.scored)[i][1];
  if (oldName === scorer) oldscore++;
  oldName = scorer;

  scorers[scorer] = oldscore;
}
console.log(scorers);

/***********************/
/***********************/
/* MAPS  */
/***********************/
/***********************/

const rest = new Map();
// add new element to the map
rest.set('name', 'Classico Italiono');
rest.set(1, 'Firenze Italy');
rest.set(2, 'Lisbon Portugal');
// set retuens the updated map
// allows chaining the next set
rest
  .set('categories', ['cat 1', 'Cat 2'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open')
  .set(false, 'We are close');

console.log(rest.get('name')); //Classico
console.log(rest.get(true)); // We are open
console.log(rest.get(1)); // Firenze Italy

console.log(rest.has('categories')); //true

rest.delete(2); // removes Lisbon Portugal
console.log(rest.size); // 7

// using obj / arrays as maps keys
const arrKey = [1, 2];
rest.set(arrKey, 'Test'); // element with key of [1, 2]
// get array key
rest.get(arrKey); // Test / can't use [1, 2] not in heap

// setting new elemets with the Map constructor
const question = new Map([
  ['question', 'what is the best language'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JS'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again'],
]);

// converting obj to maps
// Object.entries() will return openingHours as an array
const openHrsMap = new Map(Object.entries(openingHours));

// looping maps
console.log(question.get('question'));
for (const [k, v] of question) {
  if (typeof k === 'number') console.log(k, v);
}

// convert map to array
console.log(...question);
console.log([...question.keys()]);

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

/***********************/
/***********************/
/* callenge  */
/***********************/
/***********************/

// remove dupes from a map
const events = new Set(gameEvents.values());
console.log(events);

/***********************/
/***********************/
/* Working with strings  */
/***********************/
/***********************/

const airline = 'TAP Air Portugal';
const plane = 'A320';

// get character at position
console.log(plane[1]); // 3
console.log(plane[0]); // A
console.log(airline.length); // 16

// get first position of index
airline.indexOf('r'); // 6
airline.indexOf('Portugal '); // 8

// get last position of index
airline.indexOf('r'); // 10

// substring
airline.slice(4); // Air Portugal
airline.slice(4, 7); // Air

// return 1st word
airline.slice(0, airline.indexOf(' ')); // Air

// read from the right side
airline.slice(-2); // al

// casing
airline.toLowerCase();
airline.toUpperCase();

const passenger = 'jOnAs';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passengerLower[0].toUpperCase() + passenger.slice(1);

// compare emails
const email = 'hello@jonas.io';
const loginEmail = '   Hello@Jonas.Io \n';

const lowerEmail = loginEmail.toLowerCase().trim();

// replacing parts of string
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');

const announcement = 'All passengers to door 23. Boarding door 23';
console.log(announcement.replace('door', 'gate'));

// booleans
const planeNew = 'A32neo';
planeNew.includes('A320'); // TRUE
planeNew.includes('bOEING'); // FALSE
planeNew.startsWith('Air'); // TRUE
planeNew.endsWith('neo'); // TRUE

// split / explode
// ['a', 'very', 'nice', 'hat']
console.log('a+very+nice+hat'.split('+'));

// join / implode an arrays of string parts
const [fName, lName] = 'Abdul Kaeum'.split(' ');
const newName = ['Mr.', fName, lName].join(' ');
console.log(newName);

/***********************/
/***********************/
/* callenge  */
/***********************/
/***********************/

/* 
  underscore_case
  first_name
  Some_Variable 
    calculate_AGE
  delayed_departure 
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn = document.querySelector('button');
btn.addEventListener('click', function () {
  const data = document.querySelector('textarea').value.split('\n');

  for (let [c, str] of data.entries()) {
    str = str.trim().toLowerCase();
    let [one, two] = str.split('_');
    const newWord = one + two[0].toUpperCase() + two.slice(1);
    const row = newWord.padEnd(22, ' ') + 'T'.repeat(c + 1);

    console.log(row);
  }
});
