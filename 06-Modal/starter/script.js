'use strict';

// furst select all the elements and store them in state
const modal = document.querySelector('.modal');
const overLay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const closeModal = function () {
  modal.classList.add('hidden');
  overLay.classList.add('hidden');
};
const openModal = function () {
  //console.log('btn clicked');
  modal.classList.remove('hidden');
  overLay.classList.remove('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  // if ANY of the btns are clicked
  btnsOpenModal[i].addEventListener('click', openModal);
}

// if the btnCloseModal is clicked
btnCloseModal.addEventListener('click', closeModal);

// if the overLay is clicked
overLay.addEventListener('click', closeModal);

// listen for key press on the entire DOM
document.addEventListener('keydown', function (event) {
  // access to the key that was pressed
  //console.log(event);

  // if model is visible i.e not hidden
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
