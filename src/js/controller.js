import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable"; //polyfilling all
import "regenerator-runtime/runtime"; //polyfilling async/await
import recipeView from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

///////////////////////////////////////
console.log("Test");

//API call
const controlRecipes = async function () {
  //loading recipe
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    await model.LoadRecipe(id);

    //render the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
