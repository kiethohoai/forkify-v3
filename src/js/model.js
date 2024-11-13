import { API_KEY, API_URL, RES_PER_PAGE } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

// TODO: STATE
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

// todo createRecipeObject
const createRecipeObject = function (data) {
  const { recipe } = data.data;
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

// TODO: loadRecipe
export const loadRecipe = async function (id) {
  try {
    // Fetching & Getting Data from API
    const data = await getJSON(`${API_URL}/${id}`);

    // Convert to Local Data
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some((el) => el.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (error) {
    throw error;
  }
};

// TODO: loadSearchResults
export const loadSearchResults = async function (query) {
  try {
    // Fetch data via "query"
    const data = await getJSON(`${API_URL}?search=${query}`);

    // Save to local "state"
    state.search.query = query;
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });

    // restore default page = 1
    state.search.page = 1;
  } catch (error) {
    console.error(`error (loadSearchResults):`, error);
    throw error;
  }
};

// TODO: getSearchResultsPage
export const getSearchResultsPage = function (page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

// TODO: updateServings
export const updateServings = function (newServing) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
  });
  state.recipe.servings = newServing;
};

/* persistBookmark */
const persistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

/* addBookmark */
export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // mark current recipe as bookmark
  if (state.recipe.id === recipe.id) state.recipe.bookmarked = true;

  // save bookmarks to LocalStorage
  persistBookmark();
};

/* deleteBookmark */
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((el) => el.id === id);
  if (index >= 0) state.bookmarks.splice(index, 1);

  // mark current recipe as NOT bookmark
  if (state.recipe.id === id) state.recipe.bookmarked = false;

  // save bookmarks to LocalStorage
  persistBookmark();
};

/* init */
const init = (function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
})();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

//TODO uploadRecipe
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((ing) => ing[0].startsWith('ingredient') && ing[1] !== '')
      .map((ing) => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(`Wrong ingredient format! Please use the correct format!`);
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      publisher: newRecipe.publisher,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };

    const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
    console.log(`🚀CHECK > state.recipe:`, state.recipe);
  } catch (error) {
    throw error;
  }
};
