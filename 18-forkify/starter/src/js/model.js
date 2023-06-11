import { API_URL, RES_PER_PAGE, KEY } from './config';
import { AJAX } from './helpers';

// state.recipe will get updated by the loadRecipe()
export const state = {
  recipe: {},
  search: {
    // start of as defaults
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  // detructure into recipe from data.data
  const { recipe } = data.data;

  // re-build the recipe obj into state.recipe obj (our live state) from recipe to get rid of props with _
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    // this will be the 'resolved' VALUE becasue we are returning the data from the async AJAX()
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    // if any of the bookedmarked recipe id === id
    if (state.bookmarks.some(RecipeBookmarked => RecipeBookmarked.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    // need to re-throw err so it can get sent down to controller recipeView.renderError(); in the catch block of controlRecipes so it can be presented in the view
    throw err;
  }
};

export const loadSearchResults = async function (qry) {
  // called by the controller - will tell this function what to search for

  state.search.query = qry;

  try {
    const data = await AJAX(`${API_URL}?search=${qry}&key=${KEY}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });

    // after a new search always re-set the page btns back to page 1
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  // 10 is the amount we want to show
  // if we requested page 1, 1-1=0 so 0*10=0..... so start will now be 0
  const start = (page - 1) * state.search.resultsPerPage; //0;

  // if we requested page 1, 1*10=10, slice will take 9
  const end = page * state.search.resultsPerPage; //9;
  return state.search.results.slice(start, end);

  // if page is 2, 2-1=1*10=10.........start is 10
  // 2*10= 20... end 20
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmarks = function (recipe) {
  // add bookmarks
  state.bookmarks.push(recipe);

  // mark current recipe as bookmark: set new prop on state
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // loop over and find the index with the id
  const index = state.bookmarks.findIndex(el => el.id === id);
  // delete 1 from this index
  state.bookmarks.splice(index, 1);

  // mark current recipe as un-bookmark: set new prop on state
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
//clearBookmarks();

init();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());

        if (ingArr.length !== 3) {
          throw new Error('ingredient format incorrect');
        }

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmarks(state.recipe);
  } catch (err) {
    // re throw it so it propagate up to when returning the await on uploadRecipe
    throw err;
  }
};
