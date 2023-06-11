// Remember, we're gonna use strict mode in all scripts now!
"use strict";

const arr = [12, 5, -5, 0, 4];

function printForecast(arr) {
  let str = "";

  for (let i = 0; i <= arr.length - 1; i++) {
    str += `... ${arr[0]}°C in ${i + 1} day${i + 1 <= 1 ? "" : "s"} `;
  }

  return str;
}

console.log(printForecast(arr));
