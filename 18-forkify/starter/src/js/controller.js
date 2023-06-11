import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// ## GET A RECIPE
// async fn will not block the stack/thread, they will run in the background
const controlRecipes = async function () {
  try {
    // from the entire url get the hash id and remove the # using slice
    const id = window.location.hash.slice(1);

    // stop execution of controlRecipes() bom out
    if (!id) return;

    // show holding spinner where we'd show the recipe section
    recipeView.renderSpinner();

    // update results view to mark selected recipe
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // loadRecipe = async fn
    await model.loadRecipe(id);

    // pass the live state genrated from loadRecipe()
    recipeView.render(model.state.recipe);
  } catch (err) {
    // the controller will be the link between the errors from the model to the view for loadRecipe() if failed just above
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // get search query
    const query = searchView.getQuery();
    if (!query) return;

    // store data in to the state
    await model.loadSearchResults(query);

    // render results
    resultsView.render(model.getSearchResultsPage());

    // render initial pagination btns
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // render NEW btns
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);

  // update the recipe view
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  // we have not yet bookmarked into our state
  if (!model.state.recipe.bookmarked) model.addBookmarks(model.state.recipe);
  // we have bookmarked into our state
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  // when the page re-loads check for bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    recipeView.render(model.state.recipe);

    addRecipeView.renderMsg();

    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2500);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

// start program
const init = function () {
  // run addHandlerRender
  // Event Handlers in MVC: Publisher-Subscriber Pattern - pass the Subscriber to the publisher
  // Subscriber = controlRecipes - IN THE CONTROLLER
  // Publisher = addHandlerRender - IN THE VIEW
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);

  // In english - execute these fn's on startup that live in the views and pass in these controller functions.
  // When they are executed in the view, they will have in them event listeners that will then take on the controller function that we passed in... on an event, call this controller function = handler
};
init();
