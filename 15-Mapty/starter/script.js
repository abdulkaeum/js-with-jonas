'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, long]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDesciption() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDesciption();
  }

  calcPace() {
    // min per km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setDesciption();
  }

  calcSpeed() {
    //km / h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

class App {
  // # = private
  #map; // coming from calling L.map() on the leaflet lib (#map = L.map())
  #mapEvent; // the event handlers param coming from calling #map.on() which is an event on the leaflet lib
  #workouts = []; // stored objs of the new workouts either running or a cycling obj

  constructor() {
    // very 1st thing run the geolocation
    this._getPosition();

    // get data from local storage
    this._getLocalStorage();

    // handle workout data submition
    // the this had to be binded otherwise it will point to the DOM form element as it's a addEventListener
    // we need to point the event handler this._newWorkout to the app class this._newWorkout.bind(this)
    form.addEventListener('submit', this._newWorkout.bind(this));

    // Rendering Workout Input Form
    // the event handler does not make use of the this keyword so no binding is required here
    inputType.addEventListener('change', this._toggleElevationField);

    // the event handler makes use of the #workouts so need to bind it with the this to make use of
    // this.#workouts within the _moveToPopup method

    // event delegation
    // add event handler to the parent containerWorkouts and then...
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _getPosition() {
    // navigator.geolocation coming from geolocation browser API
    // getCurrentPosition called by geolocation (not us) as a regular function call, therfore the this is undefined
    if (navigator.geolocation) {
      // getCurrentPosition: 1st param = sucess callback, 2nd param = failed callback
      navigator.geolocation.getCurrentPosition(
        /*
        If access to Geo localization is granted, the navigator.geolocation.getCurrentPosition() method *calls the first callback function* that we passed as an argument. In this case, it's our this._loadMap() method.

        The problem here is with how the this._loadMap() method is called. It's called as a callback = regular fn.
        So it's not a method no more, it's a call back.

        However, the getCurrentPosition() doesn't call our _loadMap() method on any specific object. It treats it as a regular function, a call back function. Because we are in a call back function, the this is lost/undefined as we are in a callback function within the navigator.geolocation.getCurrentPosition(

        This is the reason we need to bind the current value of 'this'. The current value of 'this' is the App instance at this point in the code, right <here>

        So, we are trying to access the this keyword within the callback _loadMap() but _loadMap is at this point in the code is a regular function working inside navigator.geolocation.getCurrentPosition.
        If we were trying to use the this keyword outside of the callback it would work because the this keyword would be set, in this case the App instance. So in esense we are passing the this keyword into the callback function.
        Refer to chapter-237.png

        237 = 13:00
        ERROR: Cannot set property '#map' of undefined at _localMap

        In a regular fn call, the this keyword is undefined
        Regular fn call i.e a seperate fn on it's own not belonging to anything

        So any this keyword in those functions will be undefined and point to the parent in that case the window

        bind: creates a copy of the function and sets the this keyword in the function to whatever value we pass into bind. Bind does not call the function, it returns a new function
        */
        this._loadMap.bind(this),
        function () {
          // poistion failed callback
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    // load current loaction in to the div html element using leaflet lib
    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // handling click events on the map - show the HTML form as it's hideen by default
    this.#map.on('click', this._showForm.bind(this)); // the this is the app obj

    // render markups
    this.#workouts.forEach(work => {
      this._renderWorkoutmarker(work);
    });
  }

  _showForm(mapE) {
    // copy mapE to mapEvent so can use elsewhere, we don't need it here to use it, we need it on the form submit
    this.#mapEvent = mapE;
    // show html form
    form.classList.remove('hidden');
    // start at this input
    inputDistance.focus();
  }

  _hideForm() {
    // empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    // this scenerio has nothing to do with the value selected from the drop down - we are not checking the value - just toggling classes from what's already there for the input fields in relation - this wat has less code
    // use DOM travesal
    // 1. select the closest parent with class .form__row for the input
    // 2. toggle the class form__row--hidden
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    // using toggling to make sure only one of the input is ever switched on/displayed
  }

  _newWorkout(e) {
    // form submit event
    e.preventDefault();

    // every = checks to see if all tests pass as true - excuted untill false is return
    // if all elements pass fn returns true
    // fn (...inputs) will make it an array - takes in an arbatary amount of elements
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // get data from form and set all other state
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    if (type === 'running') {
      const cadence = +inputCadence.value;
      // guard clause - checks for opposite of what we are interested in
      // if the opposite is true we can throw an error
      // i.e if validInputs() returns false then we invert that to true to run our guard close
      if (
        !validInputs(cadence, duration, duration) ||
        !allPositive(cadence, duration, duration)
      )
        return alert('Enter positive number');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(elevation, duration, duration) ||
        !allPositive(duration, duration)
      )
        return alert('Enter positive number');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // add new workout obj to the array
    this.#workouts.push(workout);

    // render workout on map as marker
    this._renderWorkoutmarker(workout);

    // render workout on list
    this._renderWorkout(workout);

    // hide form and clear fields
    this._hideForm();

    // set local storage
    this._setLocalStorage();
  }

  _renderWorkoutmarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'cycling' ? '🚴‍♀️' : '🏃‍♂️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === 'cycling' ? '🚴‍♀️' : '🏃‍♂️'
      } </span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">min</span>
    </div>`;

    if (workout.type === 'running')
      html += `
      <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(0)}</span>
        <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
    </div>
    </li>`;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    // and then no matter where we clicked we will move up to the closest .workout li that was clicked from with the ul
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    // setting all the workouts to local storage
    // localStorage API is provided by the browser
    // JSON.stringify() convert obj to string
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    // JSON.parse() string to obj
    // NOTE: they are just normal objs, no longer objects of the class running etc so the prototype chain is now lost on these objects. In which case they will not be able to inherit any of their methods
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    // executed when page loads; at this point we will have no #workouts data
    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  // pulic interface to delete workouts from local storage
  reset() {
    localStorage.removeItem('workouts');
    // localation the page for the browser
    location.reload();
  }
}

const app = new App();
