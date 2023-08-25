import {recipes} from "../../data/recipes.js"
import {displayCards} from "../utils/recipeCard.js"
import {search} from "../utils/searchBar.js"
import {searchIngredient, createIngredientDropdown, updateIngredientDropdown} from "../utils/searchIngredients.js"
import {updateUstensilDropdown} from "../utils/searchUstensils.js"
import {updateApplianceDropdown} from "../utils/searchAppliance.js"
import {setCurrentRecipes, getCurrentRecipes} from "../utils/state.js"


// ------------------ Initialisation ------------------
function init() {
    setCurrentRecipes(recipes);
    displayCards(recipes);

    createIngredientDropdown(recipes); // Initialisation de la liste de tous les ngrédients 
    // updateUstensilDropdown(recipes); // Initialisation de la liste de tous les ustensils 
    // updateApplianceDropdown(recipes); // Initialisation de la liste de tous les appareils 
}

init();


// ------------------ Search Bar ------------------
// Tests
// console.log(search(recipes, "Thon Rouge (ou blanc)").length);
// console.log(search(recipes, "Thon").length);
// console.log(search(recipes, "Casserole").length);
// console.log(search(recipes, "Casse").length);
// console.log(search(recipes, "couteau").length);
// console.log(search(recipes, "économe").length);

const searchInput = document.querySelector('.searchBar');

searchInput.addEventListener("input", (e) => {
    let value = e.target.value

    // 2. check: if input exists and if input is minimum 3
    if (value && value.trim().length > 2){
        let displayedRecipes = search(recipes, value);
        setCurrentRecipes(displayedRecipes)
        displayCards(displayedRecipes);
        updateIngredientDropdown(displayedRecipes);
        // updateUstensilDropdown(displayedRecipes);
        // updateApplianceDropdown(displayedRecipes);

    } else {
        // 5. return nothing
        // input is invalid -- show an error message or show no results
    }

});


// ------------------ Dropdown Ingrédients ------------------

const dropdownSearchInput = document.querySelector('.dropdownSearchInput');

dropdownSearchInput.addEventListener("input", (e) => {
    let value = e.target.value

    // 2. check: if input exists and if input is minimum 3
    if (value && value.trim().length > 2){
        searchIngredient(value)
    } else if (value.length === 0) {
        createIngredientDropdown(getCurrentRecipes());
    }
    else {
        // 5. return nothing
        // input is invalid -- show an error message or show no results
    }

});