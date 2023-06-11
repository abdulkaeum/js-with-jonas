'use strict';

// set secret number
let secretNUmber = Math.trunc(Math.random() * 20) + 1;

// get high score
let score = 20; // we always start at 20

// set high scroe
let highScore = 0;

// set message
function displayMessage(msg) {
  document.querySelector('.message').textContent = msg;
}

// on click event listener
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('No number!');
  } else if (guess === secretNUmber) {
    document.querySelector('.number').textContent = secretNUmber;
    displayMessage('Correct Number');
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    // whenever you win a game set highscore if ever the score is ever > than the current highscore
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNUmber) {
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;
      displayMessage(guess > secretNUmber ? 'Too High!' : 'Too Low!');
    } else {
      // if score === 0
      displayMessage('You lost the game!');
      document.querySelector('.score').textContent = 0;
    }
  }
});

// reset the game and state
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNUmber = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.score').textContent = score;
  displayMessage('Start guessing...');
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
});
