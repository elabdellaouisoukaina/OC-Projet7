import {recipes} from "../../data/recipes.js"
import {displayCards} from "../utils/recipeCard.js"
import {search} from "../utils/searchBar.js"
import {searchIngredient} from "../utils/searchIngredients.js"


// ------------------ Initialisation ------------------
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
        const resultRecipes = search(recipes, value);
        displayCards(resultRecipes);

    } else {
        // 5. return nothing
        // input is invalid -- show an error message or show no results
    }

});


// ------------------ Dropdown Ingrédients ------------------

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