import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// TODO: STATE
export const state = {
  recipe: {},
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
    console.log(`🚀CHECK > state.recipe:`, state.recipe);
  } catch (error) {
    console.error(`🚀CHECK > error (loadRecipe):`, error);
  }
};
