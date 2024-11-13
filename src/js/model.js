import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

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

// TODO: loadRecipe
export const loadRecipe = async function (id) {
  try {
    // Fetching & Getting Data from API
    const data = await getJSON(`${API_URL}/${id}`);

    // Convert to Local Data
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

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
    console.error(`🚀CHECK > error (loadSearchResults):`, error);
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

/* addBookmark */
export const addBookmark = function (recipe) {
  // add bookmark
  state.bookmarks.push(recipe);

  // mark current recipe as bookmark
  if (state.recipe.id === recipe.id) state.recipe.bookmarked = true;
};

/* deleteBookmark */
export const deleteBookmark = function (id) {
  console.log(`deleteBookmark func`);

  const index = state.bookmarks.findIndex((el) => el.id === id);
  if (index >= 0) state.bookmarks.splice(index, 1);

  // mark current recipe as NOT bookmark
  if (state.recipe.id === id) state.recipe.bookmarked = false;
};
