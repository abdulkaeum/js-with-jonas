/** Ex 1 */

calcAverage = (a, b, c) => (a + b + c) / 3;

avgDolphines = calcAverage(44, 23, 72);
avgKoalas = calcAverage(85, 54, 41);

function checkWinner(avgDolphines, avgKoalas) {
  if (avgDolphines >= 2 * avgKoalas) {
    console.log(`Dolphines win (${avgDolphines} vs ${avgKoalas})`);
  } else if (){
    console.log(`Koalas win (${avgDolphines} vs ${avgKoalas})`);
  }
}

checkWinner(avgDolphines, avgKoalas);