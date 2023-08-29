import {recipes} from "../../data/recipes.js"
import {displayCards} from "../utils/recipeCard.js"
// import {searchText} from "../utils/searchBar.js"
import {searchIngredient, createIngredientDropdown} from "../utils/searchIngredients.js"
import {searchUstensil, createUstensilDropdown} from "../utils/searchUstensils.js"
// import {updateApplianceDropdown} from "../utils/searchAppliance.js"


// ------------------ Fonction générale de recherche ------------------------------------------------------------------------

export function search(filters) { // filters = [[ingredientsSelected], 'applianceSelected', [ustensilsSelected], [searchbar]]
    let displayedRecipes = [];

    for (let index = 0; index < recipes.length; index ++){
        let isRecipeAResult = true;
        let ingredientsFilter = filters[0];
        let applianceFilter = filters[1].trim().toLowerCase();
        let ustensilsFilter = filters[2];
        // let searchbarFilter = filters[3];

        while (isRecipeAResult) {

            // ============== [ingredients selectionnés] ==============
            const recipeIngredients = recipes[index].ingredients;

            // seulement s'il y a des ingrédients dans les filtres
            if (ingredientsFilter.length > 0) {

                for (let i = 0; i < ingredientsFilter.length; i ++){
                    let currentFilterIngredient = ingredientsFilter[i].trim().toLowerCase();

                    // Vérifie si l'ingrédient de la liste des filtres est dans la recette
                    let isIngredientAResut = false;
                    for (let j = 0; j < recipeIngredients.length; j ++){
                        let currentRecipeIngredient = recipeIngredients[j].ingredient.trim().toLowerCase();
                        if (currentFilterIngredient === currentRecipeIngredient ) {
                            isIngredientAResut = true;
                        }
                    }

                    // Si ingrédient pas dans la recette, 
                    // Alors la recette n'est pas un résultat de la recherche -> on passe à la recette suivante
                    if (!isIngredientAResut) {
                        isRecipeAResult = false;
                    }
                }           
            }


            // ============== 'appareil selectionné' ==============
            const recipeAppliance = recipes[index].appliance.trim().toLowerCase();

            // S'il y a un appareil dans les filtres et s'il est différent de celui de la recette
            // Alors la recette n'est pas un résultat de la recherche -> on passe à la recette suivante
            if (applianceFilter !== "" ){
                applianceFilter = applianceFilter.trim().toLowerCase()
                if (recipeAppliance !== applianceFilter) {
                    isRecipeAResult = false;
                }
            }

            
            // ============== [ustensiles selectionnés] ==============
            const recipeUstensils = recipes[index].ustensils;

            if (ustensilsFilter.length > 0) {

                for (let i = 0; i < ustensilsFilter.length; i ++){
                    let currentFilterUstensil = ustensilsFilter[i].trim().toLowerCase();

                    // Vérifie si ustensile actuel de la liste des filtres est dans la recette
                    let isUstensilAResut = false;
                    for (let j = 0; j < recipeUstensils.length; j ++){
                        let currentRecipeUstensil = recipeUstensils[j].trim().toLowerCase();
                        if (currentFilterUstensil === currentRecipeUstensil ) {
                            isUstensilAResut = true;
                        }
                    }

                    // Si ustensile actuel pas dans la recette, 
                    // Alors la recette n'est pas un résultat de la recherche -> on passe à la recette suivante
                    if (!isUstensilAResut) {
                        isRecipeAResult = false;
                    }
                }           
            }


            // ============== [textes searchbar] ==============
            // A FAIRE


            // Si la recette contient tous les filtres, on l'ajoute au résultat
            if (isRecipeAResult) {
                displayedRecipes.push(recipes[index]);
                isRecipeAResult = false; // Stop le while
            }
        }
    }

    if (displayedRecipes.length !== 0) {
        displayCards(displayedRecipes);
    } else {
        // AFFICHER :
        // Aucune recette ne contient ‘XXX ’ vous pouvez chercher « tarte aux pommes», « poisson », etc.
    }


    return displayedRecipes;
}


// ------------------ Initialisation ------------------------------------------------------
function init() {
    displayCards(recipes);

    // ============== Searchbar ============================
    // const searchInput = document.querySelector('.searchBar');

    // searchInput.addEventListener("input", (e) => {
    //     let value = e.target.value

    //     // Vérifie si input existe et fait minimum 3 caractères
    //     if (value && value.trim().length > 2){
    //         let displayedRecipes = searchText(recipes, value);
    //         displayCards(displayedRecipes);
    //         updateIngredientDropdown(displayedRecipes);
    //         // updateUstensilDropdown(displayedRecipes);
    //         // updateApplianceDropdown(displayedRecipes);
    //     }

    // });

    // ============== Dropdown ingrédients =======================================================================
    createIngredientDropdown(recipes); // Initialisation de la liste de tous les ingrédients 

    // Champs de recherche du dropdown
    const dropdownIngredientInput = document.querySelector('.dropdownIngredientInput');
    dropdownIngredientInput.addEventListener("input", (e) => {
        let ingredientInput = e.target.value

        // Vérifie si input existe et fait minimum 3 caractères
        if (ingredientInput && ingredientInput.trim().length > 2){
            searchIngredient(ingredientInput)
        } else if (ingredientInput.length === 0) {
            searchIngredient(''); // Permet de réafficher la liste compléte des ingrédients des recettes actuelles
        }
    });

    // ============== Dropdown appareil ====================================================
    // updateApplianceDropdown(recipes); // Initialisation de la liste de tous les appareils

    // ============== Dropdown ustensiles =================================================
    // updateUstensilDropdown(recipes); // Initialisation de la liste de tous les ustensils 
    createUstensilDropdown(recipes); // Initialisation de la liste de tous les ingrédients 

    // Champs de recherche du dropdown
    const dropdownUstensilInput = document.querySelector('.dropdownUstensilInput');
    dropdownUstensilInput.addEventListener("input", (e) => {
        let ustensilInput = e.target.value

        // Vérifie si input existe et fait minimum 3 caractères
        if (ustensilInput && ustensilInput.trim().length > 2){
            searchUstensil(ustensilInput)
        } else if (ustensilInput.length === 0) {
            searchUstensil(''); // Permet de réafficher la liste compléte des ingrédients des recettes actuelles
        }
    });
    
}

init();




// ------------------ Tests search() ------------------ 
// search([['ing1', 'ing2', 'ing3', 'ing4'], '', [], []]) 
// console.log('bon résultat : 1, recette 53')

// search([['ing1', 'ing3'], '', [], []]) 
// console.log('bon résultat : 2, recettes 53 54')

// search([[], 'app2', [], []]) 
// console.log('bon résultat : 2, recettes 52 53')

// search([["ing1", "ing3"], 'app1', [], []]) 
// console.log('bon résultat : 1, recette 54')

// search([["ing2", "ing4"], 'app1', [], []]) 
// console.log('bon résultat : 0')

// search([[], '', ['ust1'], []]) 
// console.log('bon résultat : 4, recettes 51 52 53 54')

// search([['ing1', 'ing4'], 'app2', ['ust2', 'ust4'], []]) 
// console.log('bon résultat : 2, recettes 52 53')