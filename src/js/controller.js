import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// TODO: controlRecipe
const controlRecipe = async function () {
  try {
    // Get id from the hash changed
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // Loading spinner before data arrived
    recipeView.renderSpinner();

    // Loading recipe data
    await model.loadRecipe(id);

    // Render Recipe Data
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(`🚀CHECK > error (controlRecipe):`, error);
    recipeView.renderError();
  }
};

// TODO: controlSearchResults
const controlSearchResults = async function () {
  try {
    // Display spinner while loading data
    resultsView.renderSpinner();

    // Get query from UI
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.loadSearchResults(query);

    // Render ALL search results to the view
    // resultsView.render(model.state.search.results);

    // Render search results with pagination
    resultsView.render(model.getSearchResultsPage(1));

    // Render initial Pagination Button
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(`🚀CHECK > error:`, error);
  }
};

// TODO: controlPagination
const controlPagination = function (goToPage) {
  // Render NEW Result with Pagination
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render NEW Pagination Button
  paginationView.render(model.state.search);
};

// TODO: controlServings
const controlServings = function (newServing) {
  // console.log(`🚀CHECK > newServing:`, newServing);

  // Update the recipe servings (in state)
  model.updateServings(newServing);

  // Update the recipe view (All)
  // recipeView.render(model.state.recipe);

  // Update the recipe view (Part)
  recipeView.update(model.state.recipe);
};

// TODO: init()
const init = (function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
})();
