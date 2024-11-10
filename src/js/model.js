// TODO: STATE
export const state = {
  recipe: {},
};

// TODO:loadRecipe
export const loadRecipe = async function (id) {
  try {
    // Fetch & Get Data from API
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

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
    console.error(`🚀CHECK > error at loadRecipe:`, error);
  }
};
