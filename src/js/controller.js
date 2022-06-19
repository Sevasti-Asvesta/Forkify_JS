import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import recipeView from "./views/recipeView.js";
import "core-js/stable"; //polyfilling all
import "regenerator-runtime/runtime"; //polyfilling async/await

console.log("Test");

if (module.hot) {
  module.hot.accept();
}

//API call
const controlRecipes = async function () {
  try {
    //resultsView.renderSpinner();
    const id = window.location.hash.slice(1);

    if (!id) return;

    //recipeView.renderSpinner();

    //Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    //loading recipe
    await model.LoadRecipe(id);

    //render the recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    recipeView.renderSpinner();
    //Get search query
    const query = searchView.getQuery();
    if (!query) return;
    //load search results
    await model.loadSearchResults(query);
    //render results
    resultsView.render(model.getSearchResultsPage());

    //render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update recipe servings( in state )
  model.updateServings(newServings);

  //update the recipe view

  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
