'use strict';

// LOOK FOR THE LATEST WAY OF DOING ASYNC FUNCTIONALITY RIGHT AT THE END OF THIS FILE ASYNC AWAITE

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/** AJAX CALL OLD WAY - still exists
 * Here we learn how AJAX calls used to be handled with events and callbacks
 * https://restcountries.com/v2/name/portugal
 */
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send(); // fetches the data in the background now
  // console.log(request);

  request.addEventListener('load', function () {
    // the this is the request var
    // console.log(this.responseText);

    // need to convert this JSON (string) into a JS obj
    const [data] = JSON.parse(this.responseText);
    // console.log(data);

    const html = `
  <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
        </div>
    </article>
  `;

    //countriesContainer.insertAdjacentHTML('beforeend', html);
    //countriesContainer.style.opacity = 1;
  });
};

// calling function twice = calling two ajax calls at the same time
getCountryData('greece');
// this line calles the ajax and sends the request in the back
getCountryData('portugal');
// we move onto this line straight after and a ajax call happens here
// which ever one returns the request first will get added to the browser first

/**
 * Callback Hell
 * When we call the getCountryData() multiple times, multiple ajax calls were made at the *same time*
 * so we can't control which one finished first
 * Here we implement a sequence of AJAX callS, one call depends on the previous call
 * So an AJAX call happening within a callback of the 1st AJAX callback = nested callbacks = callbacks inside of
 * callbacks inside of callbacks inside of callbacks inside of callbacks inside of callbacks ....
 * This is AKA Callback Hell: executing asynchronous tasks in sequence
 * This happens for all asynchronous tasks that are handled by callbacks e.g. a setTimout within a setTimout
 * Very difficult code to maintain
 */

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
      </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const getCountryAndNeigbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send(); // fetches the data in the background now

  request.addEventListener('load', function () {
    // console.log('1st call', this.responseText);

    // need to convert this JSON (string) into a JS obj
    const [data] = JSON.parse(this.responseText);

    // renderCountry 1
    //renderCountry(data);

    // get neighbour country 2 - **fired off within the callback of the 1st addEventListener
    const neighbour = data.borders?.[0];
    if (!neighbour) return;

    // AJAX call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      // console.log('2nd call', this.responseText);  // SPAIN
      const data2 = JSON.parse(this.responseText);

      //renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeigbour('portugal');

/**
 * Promises and the Fetch API
 * Promise: an obj that is used as a placeholder for the future result of an Asynchronous operation
 * Promise: a container for an Asynchronously delivered value
 * Promise: a container for a future value
 * future value: a response from a AJAX call
 * when we start an AJAX call, there is no value yet but there will be in the future
 * so a pormise is used to handle this future value
 *
 * A bit like buying a lottery ticket, you buy the ticket now (the promise), the draw happends asynchronously (in the background), if the outcome is correct, you get the money because it was promised
 *
 * We then no longer need to rely on wriiting call back hell code, instead of nesting callbacks.
 * Essenitally we can chain promises for a sequence of Asynchronous operations = ES6
 *
 * Promosis can be in different states AKA promise lifecycle
 * PENDING > before a future value (Asynchronous task) is available
 *  ASYNC TASK IS NOW WORKING IN THE BACKGROUND
 * SETTLED > Asynchronous task has finished >
 *  either FULLFILLED or REJECTED
 *
 * Promises don't get rid of callbacks they get rid of call back hell
 *
 * then() methods are attached to one another not inluded within eachother
 */

// just a function to show the catch error on screen
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

// const getCountryData2 = function (country) {
//   // fetch() returns a pending promise
//   const request3 = fetch(`https://restcountries.com/v2/name/${country}`)
//     // a then() handles that promise
//     .then(function (response) {
//       // response = AJAX call
//       // execuet when fullfilled
//       console.log(response);

//       // Throwing Errors Manually = 404, A throw in a promise will execute the promise to be rejected status
//       // and propogates all the way down to the catch handler
//       if (!response.ok)
//         // the throw will terminate the current function like return
//         throw new Error(`Country not found "${response.status}`);

//       // to read the data from the reponse we use response.json()
//       // this is now another promise! which still needs to be handled by a then()
//       return response.json();
//     })
//     // the new promise after response.json() is going to be the data
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);

//       // adding the neighbour country
//       const neighbour = data[0].borders?.[0];

//       if (!neighbour) throw new Error(`No neighbour found`);

//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
//     })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       renderCountry(data, 'neighbour');
//     })
//     .catch(function (err) {
//       // catch any promise errors from the entire chain, anywhere! even through it's thrown manually
//       console.error(err);
//       renderError(`Something went wrong: ${err.message}`);
//     })
//     .finally(function () {
//       // always called during the chain
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   // disabled to do the challenge
//   getCountryData2('portugal');
// });

//whereAmI(52.479405, -1.871654);

/**
 * Building a Simple Promise for a Asynchronous behavour
 * Abstracting it aaway into a Promise
 * So convert a call back based Asynchronous behavour to a Promise based
 */

// new Promise creates a new promise stored into lotteryPromise
// the constructor takes in a fn AKA executer and auto executed
//  > executer fn will contain the asyncrounos behaviour
//  > it will result in the future value of the promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Starting lottery draw...');

//   // faking a Asynchronous behavour - 2s
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       // we win the lottery - fullfilled promise
//       // resolve() will mark the prmomise as a fullfilled promise
//       // the value in the resolve() will be the future value dealt with the then()
//       resolve('You WIN');
//     } else {
//       reject(new Error('You loose'));
//     }
//   }, 2000);
// });

// lotteryPromise
//   .then(function (res) {
//     console.log(res);
//   })
//   .catch(function (err) {
//     console.error(err);
//   });

/**
 * Promisifying the callback Geolocation API
 *  use-case: When we need to turn callback-based functionality into promise-based by ourselves.
 */

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      // on success
      function (position) {
        // resolve = fullfilled status
        resolve(position);
      },
      // on fail
      function (err) {
        // reject = rejected status
        reject(err);
      }
    );
  });
};

// getPosition().then(pos => {
//   const { latitude, longitude } = pos.coords;
//   console.log(latitude, longitude);
// });

/**
 * CHALLENGE: 1
 */
// const wait = function (seconds) {
//   return new Promise(function (resole) {
//     setTimeout(resole, seconds * 1000);
//   });
// };

const imgContainer = document.querySelector('.images');
const createImage = function (imgPath) {
  // return a promise
  return new Promise(function (resolve, reject) {
    // create a new image
    const img = document.createElement('img');

    // set the src attr
    img.src = imgPath;

    // check to see if the image is done loading
    img.addEventListener('load', function () {
      // add it to the div element with the class .images
      imgContainer.append(img);

      // resolve the img element
      resolve(img);
    });

    // in case id didnt load, set the promis to reject
    img.addEventListener('error', function () {
      reject(new Error('image not found'));
    });
  });
};
// let currentImg;
// createImage('img/img-1.jpg')
//   .then(function (img) {
//     currentImg = img;
//     // dont need to do anything as image was found and loaded
//     console.log('Loaded: img/img-1.jpg');

//     // pause execution for 2 seconds usingn the wait function we created then hide it
//     return wait(2);
//   })
//   .then(function () {
//     // the wait function does not have any resolve value = no need to spcify any params on this then
//     // hide 1st image
//     currentImg.style.display = 'none';

//     // display next image
//     return createImage('img/img-2.jpg');
//   })
//   .then(function (img) {
//     currentImg = img;
//     // dont need to do anything as image was found and loaded
//     console.log('Loaded: img/img-2.jpg');
//     // pause execution for 2 seconds usingn the wait function we created then hide it
//     return wait(2);
//   })
//   .then(function () {
//     // the wait function does not have any resolve value = no need to spcify any params on this then
//     // hide 1st image
//     currentImg.style.display = 'none';
//   })
//   .catch(function (err) {
//     console.error(err);
//   });

/**
 * ES17 Consuming Promises with Async/Await
 * An async (asynchronous) function will keep running in the background, while performing the cose inside of it, then when the function is done it *returns a promise*
 * async means we are telling JS run this in the background as we have awaits in there
 * await: stops/awaits code execution for the resolved value a promise, until the promise is fullfilled
 *
 *  an await takes a a promise... await then the promise here e.g. fetch
 *  an await returns the promise beacuse you tell it to await a promise
 *  an await does not stop the execution, it happends async i.e not blocking the call stack
 *  makes the code look sync code but it's actually working async
 *  NO MORE CALLBACKS AND THEN() BUT SYNTACTIC SUGER OF IT
 *  anything that returns a promise needs the keyword await before it
 *  There are 5 promises below
 * these awaits mean pause here till you get a reposnse and only then move on
 * https://www.youtube.com/watch?v=wKY4-WMmbZw
 */

const whereAmI2 = async function (cntry) {
  // a try catch is used for an async await function
  try {
    // Geoloaction / getPosition() is setup to return a promisify, either will get resolved or rejected
    const pos = await getPosition();
    // no need to throw error manually for this, it rejects if it falls over and wil be caught in the try catch
    //- code writen in the getPosition()
    const { latitude: lat, longitude: lng } = pos.coords;

    // reverse geolocation
    // respGeo = fullfilled promise value, either rejected or resolved
    const respGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=42160109211998792182x60905`
    );
    // these two fetches don't reject a promise so we need to manually throw error
    if (!respGeo.ok) throw new Error('geocode error');
    const dataGeo = await respGeo.json();

    // respAwait  = the response
    const respAwait = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!respAwait.ok) throw new Error('restcountries error');

    // get the json from the promise = returns anther promise
    const data = await respAwait.json();
    renderCountry(data[0]);
  } catch (err) {
    console.error(err.message);
  }
};
console.log('1 DISPLAY FIRST: ES17 Consuming Promises with Async/Await');
whereAmI2(); // async fn this will run in background.... continue code
console.log('3 DISPLAY FIRST: ES17 Consuming Promises with Async/Await');

/**
 * 264. Returning Values from Async Functions
 */

// if we need to return data/value from an Async Functions, then we simply wrap it around an async iffi function  and within that we use again a try catch, do the try on the async fn with an await

/**
 * Running Promises in Parallel - WITH NO ORDER - one does not need to wait for the other
 * Promise.all() = give me all but if one fails all fail
 * Promise.allSettled() give me all whether fullfilled or rejected
 * Promise.race() = give me the first whether fullfilled or rejected
 * Promise.any() = give me the first fullfilled unless all are rejected
 */

const getThreeCounyty = async function (c1, c2, c3) {
  try {
    const all = await Promise.all(
      [
        function () {
          const c1data = fetch(`https://restcountries.com/v2/name/${c1}`);
          return c1data.json();
        },
      ],
      [
        function () {
          const c2data = fetch(`https://restcountries.com/v2/name/${c2}`);
          return c2data.json();
        },
      ],
      [
        function () {
          const c3data = fetch(`https://restcountries.com/v2/name/${c3}`);
          return c3data.json();
        },
      ]
    );
    // returns an array
    console.log(all);
  } catch (err) {
    console.error(err.message);
  }
};

/** Challenge - re-create our createImage() with an async await to consume it */

const loadNPause = async function () {
  try {
    // createImage is setup to return us a promise, anything that returns a promise needs to be awaited
    // why did we use async in map herr!? I think it's because we are in a callback function, so if you're awaiting in a callback function then you'll need async to it
    // 262. Consuming Promises with Async/Await -> each map is just like thie line of code @ 15:00
    const imgs = imgArr.map(async function (img) {
      return await createImage(img);
    });
    // returns 3 promises not the images itself
    console.log(imgs);

    // .all takes an array in order to resolve all and for all we want to show on page
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach(img => {
      img.classList.add('parallel');
    });
  } catch (err) {
    console.error(err.message);
  }
};
loadNPause(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
