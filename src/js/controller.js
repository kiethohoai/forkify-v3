import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

// TODO: controlRecipe
const controlRecipe = async function () {
  try {
    // Get id from the hash changed
    const id = window.location.hash.slice(1);
    if (!id) return;

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
    // Get query from UI
    const query = searchView.getQuery();
    if (!query) return;
    console.log(`🚀CHECK > query:`, query);

    // Load search results
    await model.loadSearchResults(query);
    console.log(`🚀CHECK > model.state.search:`, model.state.search);
  } catch (error) {
    console.log(`🚀CHECK > error:`, error);
  }
};

// TODO: init()
const init = (function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
})();
