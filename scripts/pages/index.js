import {recipes} from "../../data/recipes.js"
import {createCard} from "../utils/recipeCard.js"
import {search} from "../utils/searchBar.js"

for (let i=0; i < recipes.length; i++) {
    createCard(recipes[i])
}


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
        document.querySelector('.resultsGallery').innerHTML = "";
        const resultRecipes = search(recipes, value);
        
        for (let i=0; i < resultRecipes.length; i++) {
            createCard(resultRecipes[i])
        }
    } else {
        // 5. return nothing
        // input is invalid -- show an error message or show no results
    }

});