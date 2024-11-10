import * as model from './model.js';
import recipeView from './views/recipeView.js';

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

// TODO: init()
const init = (function () {
  recipeView.addHandlerRender(controlRecipe);
})();
