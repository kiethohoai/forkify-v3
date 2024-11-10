import { API_URL } from './config.js';

const recipeContainer = document.querySelector('.recipe');

// TODO: timeout
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// TODO: showRecipe
const showRecipe = async function () {
  try {
    // Fetch & Get Data from API
    // const res = await fetch(`${API_URL}/5ed6604591c37cdc054bc886`);
    // const res = await fetch(`${API_URL}/664c8f193e7aa067e94e8438`);
    const res = await fetch(`${API_URL}/664c8f193e7aa067e94e8706`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // Convert to Local Data
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(`🚀CHECK > recipe:`, recipe);
  } catch (error) {
    console.log(`🚀CHECK > error:`, error);
  }
};
showRecipe();
