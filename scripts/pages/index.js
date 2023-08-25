import {recipes} from "../../data/recipes.js"
import {displayCards} from "../utils/recipeCard.js"
import {searchText} from "../utils/searchBar.js"
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



// ------------------ Fonction générale de recherche ------------------

export function search(filters) { // filters = [[ingredientsSelected], applianceSelected, [ustensilsSelected], [texte searchbar]]
    let displayedRecipes = [];

    for (let index = 0; index < recipes.length; index ++){
        const ingredients = recipes[index].ingredients;
        const appliance = recipes[index].appliance.trim().toLowerCase();
        const ustensils = recipes[index].ustensils;
        

        // ======= [ingredients selectionnés] =======
        if (filters[0].length > 0) {
            for (let i = 0; i < filters[0].length; i ++){

                for (let j = 0; j < ingredients.length; j ++){
                    let ingredient = ingredients[j].ingredient.trim().toLowerCase();
        
                    if (ingredient === filters[0][i].trim().toLowerCase()){ // || ingredient.includes(filters[3].trim().toLowerCase()) mais filters[3] est une array à parcourir
    
                        // ======= appareil selectionné =======
                        if (appliance === filters[1].trim().toLowerCase() || filters[1] === "" ){

                            // ======= ustensiles selectionnés =======
                            for (let k = 0; k < ustensils.length; k ++){
                                for (let l = 0; l < filters[2].length; l ++){
                                    let ustensil = ustensils[k].trim().toLowerCase();

                                    if (ustensil === filters[2][l].trim().toLowerCase()){

                                        if(!displayedRecipes.includes(recipes[index])){
                                            displayedRecipes.push(recipes[index]);
                                        }
                                        // -> faire la recherche du texte
                                    } else {
                                        // -> faire la recherche du texte
                                    }
                                }
                            }
                        } else {
                            // -> faire la recherche des ustensils
                                // -> faire la recherche du texte
                        }
                    }
                }
            }       
        } else {

            // ======= appareil selectionné =======
            if (appliance === filters[1].trim().toLowerCase() || filters[1] === "" ){

                // -> faire la recherche des ustensils
                    // -> faire la recherche du texte
    
                if(!displayedRecipes.includes(recipes[index])){
                    displayedRecipes.push(recipes[index]);
                }
            } 
        }
         
    }
    console.log(displayedRecipes);

    return displayedRecipes;
}

search([["Lait de coco"], 'Blender', ['presse citron'], []])



// ------------------ Search Bar ------------------
// Tests
// console.log(searchText(recipes, "Thon Rouge (ou blanc)").length);
// console.log(searchText(recipes, "Thon").length);
// console.log(searchText(recipes, "Casserole").length);
// console.log(searchText(recipes, "Casse").length);
// console.log(searchText(recipes, "couteau").length);
// console.log(searchText(recipes, "économe").length);

const searchInput = document.querySelector('.searchBar');

searchInput.addEventListener("input", (e) => {
    let value = e.target.value

    // Vérifie si input existe et fait minimum 3 caractères
    if (value && value.trim().length > 2){
        let displayedRecipes = searchText(recipes, value);
        setCurrentRecipes(displayedRecipes)
        displayCards(displayedRecipes);
        updateIngredientDropdown(displayedRecipes);
        // updateUstensilDropdown(displayedRecipes);
        // updateApplianceDropdown(displayedRecipes);
    }

});


// ------------------ Dropdown Ingrédients ------------------

const dropdownSearchInput = document.querySelector('.dropdownSearchInput');

dropdownSearchInput.addEventListener("input", (e) => {
    let value = e.target.value

    // Vérifie si input existe et fait minimum 3 caractères
    if (value && value.trim().length > 2){
        searchIngredient(value)
    } else if (value.length === 0) {
        createIngredientDropdown(getCurrentRecipes());
    }

});