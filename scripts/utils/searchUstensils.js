// import {displayCards} from "./recipeCard.js"
import { addSelectedUstensil, removeSelectedUstensil, isUstensilSelected, getAllFilters } from "../utils/state.js"
import { search } from "../pages/index.js";
import { createIngredientDropdown } from "../utils/searchIngredients.js"
import { createApplianceDropdown } from "../utils/searchAppliance.js"


export function searchUstensil(value) {

    let returnedRecipes = [];

    // Création de la liste des ustensiles correspondant aux recettes affichées
    const filters = getAllFilters();
    let recipes = search(filters);
    let ustensilsList = [];

    for (let index = 0; index < recipes.length; index ++){
        const ustensilsRecipe = recipes[index].ustensils;

        for (let i = 0; i < ustensilsRecipe.length; i ++){
            const ustensil = ustensilsRecipe[i];

            if (value !== ''){

                let comparableValue = value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                let comparableUstensil = ustensil.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
                if (comparableUstensil.includes(comparableValue) ){
                    returnedRecipes.push(recipes[index]);
                    
                    if(!ustensilsList.includes(ustensil)){
                        ustensilsList.push(ustensil);
                    }
                }
            }
            // Utile quand on efface le champs de recherche à 0
            else {
                // Tous les ustensiles des recettes des filtres actuels sont de nouveau affichés dans le dropdown
                ustensilsList.push(ustensil);
            }
        }
    }

    updateUstensilDropdown(ustensilsList);

    return returnedRecipes;
}

export function updateUstensilDropdown(ustensils){
    // Mise à 0 de la liste des ustensiles présents dans le dropdown
    const dropdownGenerated = document.querySelectorAll('.dropdown-ustensils-generated');
    let newButtons = [];

    dropdownGenerated.forEach(element => {
        if (!element.classList.contains('dropdownSelected')) {
            element.remove();
        } else {
            newButtons.push(element);
        }
    });
    
    let ustensilsList = [];

    for (let index = 0; index < ustensils.length; index ++){
        const ustensilClass = ustensils[index].split(" ").join("").normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

        if(!ustensilsList.includes(ustensils[index])){

            ustensilsList.push(ustensils[index]);
            
            // Création de l'ustensile dans le dropdown
            const ustensilsDropdown = document.querySelector('.ustensilsDropdown');
            const li = document.createElement('li');
            li.classList.add(ustensilClass);
            const button = document.createElement('button');
            button.value = ustensilClass;
            button.classList.add('dropdown-item','dropdown-generated', 'dropdown-ustensils-generated');
            button.textContent = ustensils[index][0].toUpperCase() + ustensils[index].slice(1);

            // Ajouter le bouton seulement s'il n'est pas déjà selectionné
            let buttonToAdd = true;
            newButtons.forEach ( element => {
                if (element.value === button.value) {
                    buttonToAdd = false;
                }
            });
            if (buttonToAdd) {
                li.appendChild(button);
                ustensilsDropdown.appendChild(li);
                newButtons.push(button);
            }
            

            // let previousDisplayedRecipes = displayedRecipes;
            
            button.addEventListener("click", () => {
                if (!isUstensilSelected(ustensils[index])) {

                    addSelectedUstensil(ustensils[index]);

                    button.classList.add('dropdownSelected');

                    // Ajout du bouton sélectionné sous le dropdown 
                    const ustensilsDropdownDiv = document.querySelector('.ustensilsDropdownDiv');
        
                    const ustensilSelected = document.createElement("div");
                    ustensilSelected.classList.add("ustensilSelected", ustensilClass, "filterSelected");

                    const p = document.createElement("p");
                    p.textContent = ustensils[index][0].toUpperCase() + ustensils[index].slice(1);

                    const i = document.createElement("i");
                    i.classList.add('fa-solid', 'fa-xmark');

                    // Au click sur la croix l'ingrdédient est deselectionné
                    i.addEventListener("click", () => {
                        removeSelectedUstensil(ustensils[index]);
                        ustensilSelected.remove();
                        button.classList.remove('dropdownSelected');

                        // -> Afficher les recettes selectionnées
                        const filters = getAllFilters();
                        const recipes = search(filters);
                        createUstensilDropdown(recipes);
                        createIngredientDropdown(recipes);
                        createApplianceDropdown(recipes);
                        search(filters);

                    })

                    ustensilSelected.appendChild(p);
                    ustensilSelected.appendChild(i);
                    ustensilsDropdownDiv.appendChild(ustensilSelected);                    
                }   
                    
                else {
                    removeSelectedUstensil(ustensils[index]);
                    button.classList.remove('dropdownSelected');
                    // -> Afficher les recettes selectionnées
                    const filters = getAllFilters();
                    const recipes = search(filters);
                    createUstensilDropdown(recipes);
                    createIngredientDropdown(recipes);
                    createApplianceDropdown(recipes);
                    search(filters);

                    
                    let selector = "div." + ustensilClass;
                    let ustensilSelected = document.querySelector(selector);

                    ustensilSelected.remove()
                }

                 // -> Afficher les recettes selectionnées
                 const filters = getAllFilters();
                 const recipes = search(filters);
                 createUstensilDropdown(recipes);
                 createIngredientDropdown(recipes);
                 createApplianceDropdown(recipes);
                 search(filters);
            })
        }
    }

    // -> Afficher les recettes selectionnées
    const filters = getAllFilters();
    search(filters);
}

export function createUstensilDropdown(recipes){

    // Mise à 0 de la liste des ustensiles présents dans le dropdown
    const dropdownGenerated = document.querySelectorAll('.dropdown-ustensils-generated');
    dropdownGenerated.forEach(element => {
        if (!element.classList.contains('dropdownSelected')) {
            element.remove();
        } 
    });

    // Création de la liste des ustensiles correspondant aux recettes affichées
    let ustensilsList = [];

    for (let index = 0; index < recipes.length; index ++){

        const ustensilsRecipe = recipes[index].ustensils;

        for (let i = 0; i < ustensilsRecipe.length; i ++){
            const ustensil = ustensilsRecipe[i];

            if(!ustensilsList.includes(ustensil)){
                ustensilsList.push(ustensil);   
            }
        }
    }

    updateUstensilDropdown(ustensilsList)
}