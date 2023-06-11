/* Ex 1 */

const markWeight = 78;
const markHight = 1.69;

const johnWeight = 92;
const johnHight = 1.95;

const markBMI = markWeight / (markHight * markHight);
const johnBMI = johnWeight / (johnHight * johnHight);

const markHigherBMI = markBMI > johnBMI;

/* Ex 2 */

if (markHigherBMI) {
  console.log(`Mark is higher ${markBMI}`);
} else {
  console.log(`John is higher ${johnBMI}`);
}

/* Ex 3 */

const dolphines = (96 + 108 + 89) / 3;
const kalos = (88 + 91 + 100) / 3;

if (dolphines > kalos && dolphines >= 100) {
} else if (kalos > dolphines && kalos >= 100) {
} else if (kalos === dolphines && kalos >= 100 && dolphines >= 100) {
}

/** Ex 4 */
const tip = 275 >= 50 && 275 <= 300 ? 15 : 20;
const total = 275 + (275 * tip) / 100;
console.log(`The bill was 275, the tip was ${tip} and the total is ${total}`);
