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
    // console.log(`🚀CHECK > state.recipe:`, state.recipe);
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
  } catch (error) {
    console.error(`🚀CHECK > error (loadSearchResults):`, error);
    throw error;
  }
};

// TODO: getSearchResultsPage
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.splice(start, end);
};
