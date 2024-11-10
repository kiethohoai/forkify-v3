import * as model from './model.js';
import recipeView from './views/recipeView.js';

// TODO: timeout
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    console.error(`🚀CHECK > error:`, error);
  }
};

// TODO: Event listener
['hashchange', 'load'].forEach((ev) => window.addEventListener(ev, controlRecipe));
