console.log(`* CHALLENGE 1 - PASS*
`);

const marksWeight = 78;
const marksHight = 1.69;

const johnsWeight = 92;
const johnsHight = 1.95;

const marksBmi = marksWeight / (marksHight * marksHight);
const johnsBmi = johnsWeight / (johnsHight * johnsHight);

let isMarksBmiHigher = marksBmi > johnsBmi;

console.log(marksBmi, johnsBmi, isMarksBmiHigher);

console.log(`
* CHALLENGE 2 - PASS*
`);

if (isMarksBmiHigher) {
    console.log(`Mark's BMI (${marksBmi}) is higher than John's (${johnsBmi})!`);
} else {
    console.log(`John's BMI (${johnsBmi}) is higher than Mark's (${marksBmi})!`);
}

console.log(`
* CHALLENGE 3 - PASS*
`);

const dolphinesAverage = (96 + 108 + 89) / 3;
const koalasAverage = (88 + 91 + 110) / 3;

console.log(`dolphinesAverage: ${dolphinesAverage}, koalasAverage: ${koalasAverage}`);

if (dolphinesAverage > koalasAverage && dolphinesAverage >= 100) {
    console.log('Dolphines WIN!');
} else if (koalasAverage > dolphinesAverage && koalasAverage >= 100) {
    console.log('Koalas WIN!');
} else if (koalasAverage === dolphinesAverage && koalasAverage >= 100 && dolphinesAverage >= 100) {
    console.log(`It's a DRAW!`);
} else {
    console.log('No one wins!');
}

console.log(`
* CHALLENGE 4 - PASS*
`);

const bill = 275;
const tip = (bill >= 50 && bill <= 300) ? 15 : 20;
console.log(`bill: ${bill} - tip: ${bill / 100 * tip} - total ${bill + (bill / 100 * tip)}`);