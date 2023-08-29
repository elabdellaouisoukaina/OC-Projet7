// import {displayCards} from "./recipeCard.js"
import  { addSelectedIngredient, removeSelectedIngredient, isIngredientSelected, getAllFilters } 
        from "../utils/state.js"
import { search } from "../pages/index.js";
import {createUstensilDropdown} from "../utils/searchUstensils.js"

export function searchIngredient(value) {

    let returnedRecipes = [];

    // Création de la liste des ingrédients correspondant aux recettes affichées
    const filters = getAllFilters();
    let recipes = search(filters);
    let ingredientsList = [];

    for (let index = 0; index < recipes.length; index ++){
        const ingredientsRecipe = recipes[index].ingredients;

        for (let i = 0; i < ingredientsRecipe.length; i ++){
            const ingredient = ingredientsRecipe[i].ingredient;

            if (value !== ''){
                let comparableValue = value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                let comparableIngredient = ingredient.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
                if (comparableIngredient.includes(comparableValue) ){
                    returnedRecipes.push(recipes[index]);
                    
                    if(!ingredientsList.includes(ingredient)){
                        ingredientsList.push(ingredient);
                    }
                }
            }
            // Utile quand on efface le champs de recherche à 0
            else {
                // Tous les ingrédients des recettes des filtres actuels sont de nouveau affichés dans le dropdown
                ingredientsList.push(ingredient);
            }
        }
    }

    updateIngredientDropdown(ingredientsList);
 
    return returnedRecipes;
}

export function updateIngredientDropdown(ingredients){
    // Mise à 0 de la liste des ingrédients présents dans le dropdown
    let dropdownGenerated = document.querySelectorAll('.dropdown-ingredients-generated');
    let newButtons = [];

    dropdownGenerated.forEach(element => {
        if (!element.classList.contains('dropdownSelected')) {
            element.remove();
        } else {
            newButtons.push(element);
        }
    });
    
    let ingredientsList = [];

    for (let index = 0; index < ingredients.length; index ++){
        const ingredientClass = ingredients[index].split(" ").join("").normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

        if(!ingredientsList.includes(ingredients[index])){

            ingredientsList.push(ingredients[index]);
            
            // Création de l'ingrédient dans le dropdown
            const ingredientsDropdown = document.querySelector('.ingredientsDropdown');
            const li = document.createElement('li');
            li.classList.add(ingredientClass);
            const button = document.createElement('button');
            button.value = ingredientClass;
            button.classList.add('dropdown-item','dropdown-generated', 'dropdown-ingredients-generated');
            button.textContent = ingredients[index][0].toUpperCase() + ingredients[index].slice(1);

            // Ajouter le bouton seulement s'il n'est pas déjà selectionné
            let buttonToAdd = true;
            newButtons.forEach ( element => {
                if (element.value === button.value) {
                    buttonToAdd = false;
                }
            });
            if (buttonToAdd) {
                li.appendChild(button);
                ingredientsDropdown.appendChild(li);
                newButtons.push(button);
            }
            

            // let previousDisplayedRecipes = displayedRecipes;
            
            button.addEventListener("click", () => {
                if (!isIngredientSelected(ingredients[index])) {

                    addSelectedIngredient(ingredients[index]);

                    button.classList.add('dropdownSelected');

                    // Ajout du bouton sélectionné sous le dropdown 
                    const ingredientsDropdownDiv = document.querySelector('.ingredientsDropdownDiv');
        
                    const ingredientSelected = document.createElement("div");
                    ingredientSelected.classList.add("ingredientSelected", ingredientClass, "filterSelected");

                    const p = document.createElement("p");
                    p.textContent = ingredients[index][0].toUpperCase() + ingredients[index].slice(1);

                    const i = document.createElement("i");
                    i.classList.add('fa-solid', 'fa-xmark');

                    // Au click sur la croix l'ingrdédient est deselectionné
                    i.addEventListener("click", () => {
                        removeSelectedIngredient(ingredients[index]);
                        ingredientSelected.remove();
                        button.classList.remove('dropdownSelected');

                        // -> Afficher les recettes selectionnées
                        const filters = getAllFilters();
                        const recipes = search(filters);
                        createIngredientDropdown(recipes);
                        createUstensilDropdown(recipes);
                        search(filters);

                    })

                    ingredientSelected.appendChild(p);
                    ingredientSelected.appendChild(i);
                    ingredientsDropdownDiv.appendChild(ingredientSelected);                   
                }   

                else {
                    removeSelectedIngredient(ingredients[index]);
                    button.classList.remove('dropdownSelected');

                   // -> Afficher les recettes selectionnées
                    const filters = getAllFilters();
                    const recipes = search(filters);
                    createIngredientDropdown(recipes);
                    createUstensilDropdown(recipes);
                    search(filters);
                    
                    let selector = "div." + ingredientClass;
                    let ingredientSelected = document.querySelector(selector);

                    ingredientSelected.remove();
                }

                // -> Afficher les recettes selectionnées
                const filters = getAllFilters();
                const recipes = search(filters);
                createIngredientDropdown(recipes);
                createUstensilDropdown(recipes);
                search(filters);

            })
        }
    }
    // -> Afficher les recettes selectionnées
    const filters = getAllFilters();
    search(filters);
}

export function createIngredientDropdown(recipes){

    // Mise à 0 de la liste des ingrédients présents dans le dropdown
    let dropdownGenerated = document.querySelectorAll('.dropdown-ingredients-generated');
    dropdownGenerated.forEach(element => {
        if (!element.classList.contains('dropdownSelected')) {
            element.remove();
        } 
    });

    // Création de la liste des ingrédients correspondant aux recettes affichées
    let ingredientsList = [];

    for (let index = 0; index < recipes.length; index ++){
        const ingredientsRecipe = recipes[index].ingredients;

        for (let i = 0; i < ingredientsRecipe.length; i ++){
            const ingredient = ingredientsRecipe[i].ingredient;

            if(!ingredientsList.includes(ingredient)){
                ingredientsList.push(ingredient);   
            }
        }
    }

    updateIngredientDropdown(ingredientsList)
}