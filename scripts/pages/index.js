import {recipes} from "../../data/recipes.js"
import {displayCards} from "../utils/recipeCard.js"
import {search} from "../utils/searchBar.js"
import {searchIngredient, updateIngredientDropdown} from "../utils/searchIngredients.js"
import {updateUstensilDropdown} from "../utils/searchUstensils.js"
import {updateApplianceDropdown} from "../utils/searchAppliance.js"


// ------------------ Initialisation ------------------
displayedRecipes = recipes;
displayCards(recipes);


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
        displayedRecipes = search(recipes, value);
        displayCards(displayedRecipes);
        updateIngredientDropdown(displayedRecipes);
        updateUstensilDropdown(displayedRecipes);
        updateApplianceDropdown(displayedRecipes);

    } else {
        // 5. return nothing
        // input is invalid -- show an error message or show no results
    }

});


// ------------------ Dropdown Ingrédients ------------------

updateIngredientDropdown(recipes); // Initialisation de la liste de tous les ngrédients 
updateUstensilDropdown(recipes); // Initialisation de la liste de tous les ustensils 
updateApplianceDropdown(displayedRecipes); // Initialisation de la liste de tous les appareils 



const dropdownSearchInput = document.querySelector('.dropdownSearchInput');

dropdownSearchInput.addEventListener("input", (e) => {
    let value = e.target.value

    let dropdownGenerated = document.querySelectorAll('.dropdown-generated');
    dropdownGenerated.forEach(element => {
        element.remove();
    });

    // 2. check: if input exists and if input is minimum 3
    if (value && value.trim().length > 2){
        searchIngredient(recipes, value)
    } else {
        // 5. return nothing
        // input is invalid -- show an error message or show no results
    }

});