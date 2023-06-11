'use strict';

// select the TOTAL score elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// select the CURRENT players scores
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

// hide dice
const diceEl = document.querySelector('.dice');

// select the button elements
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// declare state
let scores, currentScore, activePlayer, playing;

function init() {
  // re-assign state
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // reset all visual scores = textContent
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // hide dice
  diceEl.classList.add('hidden');

  // reset css
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

init();

function switchPlayer() {
  // set currentScore state to 0
  currentScore = 0;

  // set current player's score back to 0
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  // keep track who was playing and switch the activePlayer
  activePlayer = activePlayer == 0 ? 1 : 0;

  // remove the player--active class
  // toggle checks to see if it exists; adds or removes the class
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate dice roll between 1 - 6
    const dice = Math.trunc(Math.random() * 6) + 1;

    // show dice
    diceEl.classList.remove('hidden');

    // display dice rolled
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      // add dice to the current players score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if dice is 1 then switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      // check if score is >= 20, finish game

      playing = false;

      // hide dice
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('active--player');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
