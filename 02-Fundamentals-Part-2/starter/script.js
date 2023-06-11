'use strict';

console.log(`
* CHALLENGE 4 - PASS*
`);

const calcAverage = (s1, s2, s3) => (s1 + s2 + s3) / 3;

const avgDolphines = calcAverage(44, 23, 71);
const avgKoalas = calcAverage(65, 54, 49);

function checkWinner(avgDolphines, avgKoalas) {

    let winner = 'No winners';

    if (avgDolphines >= (avgKoalas ** 2)) {
        winner = 'Dolphines';
    } else if (avgKoalas >= (avgDolphines ** 2)) {
        winner = 'Koalas';
    }

    console.log(`${winner} win (${avgDolphines} vs ${avgKoalas})`);
}

checkWinner(avgDolphines, avgKoalas);

console.log(`
* CHALLENGE 5 - PASS*
`);


const bills = [125, 555, 44];
const tips = [];
const total = [];
function calcTip(bill) {
    let tip = (bill >= 50 && bill <= 300) ? 15 : 20;
    tips.unshift(bill / 100 * tip);
    total.unshift(bill + (bill / 100 * tip));
}

calcTip(bills[0]); //15
calcTip(bills[1]); //20
calcTip(bills[2]); //20

console.log(tips);
console.log(total);


console.log(`
* CHALLENGE 6 - PASS*
`);

const obj = {
    name: 'Sami',
    age: 8,
    job: 'student',
    maths: false,
    info: function () {
        return `${this.name} is a ${this.age} years old ${this.job} and does ${this.maths ? '' : 'not '}like maths`;
    }
}

console.log(obj.info());

console.log(`
* CHALLENGE 5 - PASS*
`);

const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    calcBmi: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    calcBmi: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

mark.calcBmi();
john.calcBmi();

if (mark.bmi > john.bmi) {
    console.log(`Mark's BMI (${mark.bmi}) is higher than John's BMI (${john.bmi})`);
} else {
    console.log(`John's BMI (${john.bmi}) is higher than Mark's BMI (${mark.bmi})`);
}


console.log(`
* CHALLENGE 6 - PASS*
`);

const bills2 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips2 = [];
const totals2 = [];

function calcTip2(bill) {
    let tip2 = (bill >= 50 && bill <= 300) ? 15 : 20;
    tips2.push(bill / 100 * tip2);
    totals2.push(bill + (bill / 100 * tip2));
}

for (let i = 0; i <= bills2.length - 1; i++) {
    calcTip2(bills2[i]);
}

console.log(bills2);
console.log(tips2);
console.log(totals2);

let sum = 0;
for (let i = 0; i <= bills2.length - 1; i++) {
    sum += bills2[i];
}
console.log(`Avergae: ${sum / bills2.length}`);