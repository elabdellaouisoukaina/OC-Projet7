// import {displayCards} from "./recipeCard.js"
import { addSelectedAppliance, removeSelectedAppliance, isApplianceSelected, getAllFilters } from "../utils/state.js"
import { search } from "../pages/index.js";
import { createIngredientDropdown } from "../utils/searchIngredients.js"
import { createUstensilDropdown } from "../utils/searchUstensils.js"


export function searchAppliance(value) {

    // Mise à 0 de la liste des appareils présents dans le dropdown
    let dropdownGenerated = document.querySelectorAll('.dropdown-appliances-generated');
    dropdownGenerated.forEach(element => {
        element.remove();
    });

    const filters = getAllFilters();
    const recipes = search(filters);
    let returnedRecipes = [];

    // Création de la liste des appareils correspondant aux recettes affichées
    let applianceDisplayed = [];

    for (let index = 0; index < recipes.length; index ++){
        const appliance = recipes[index].appliance;

        if (value !== ''){
            let comparableValue = value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            let comparableAppliance = appliance.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            
            if (comparableAppliance.includes(comparableValue) ){
                returnedRecipes.push(recipes[index]); 
                if(!applianceDisplayed.includes(appliance)){
                    applianceDisplayed.push(appliance);
                }
            }
        }
        // Utile quand on efface le champs de recherche à 0
        else {
            // Tous les appareils des recettes des filtres actuels sont de nouveau affichés dans le dropdown
            updateApplianceDropdown(appliance)
        }
    }

    for (let a = 0; a < applianceDisplayed.length; a++){
        updateApplianceDropdown(applianceDisplayed[a]);
    }

    return returnedRecipes;
}

export function updateApplianceDropdown(appliance){

    const applianceClass = appliance.split(" ").join("").normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        
    // Création de l'appareil dans le dropdown
    const appliancesDropdown = document.querySelector('.applianceDropdown');
    const li = document.createElement('li');
    li.classList.add(applianceClass);
    const button = document.createElement('button');
    button.value = applianceClass;
    button.classList.add('dropdown-item','dropdown-generated', 'dropdown-appliances-generated');
    button.textContent = appliance[0].toUpperCase() + appliance.slice(1);

    
    li.appendChild(button);
    appliancesDropdown.appendChild(li);
    
    button.addEventListener("click", () => {
        if (!isApplianceSelected(appliance)) {

            addSelectedAppliance(appliance);

            button.classList.add('dropdownSelected');

            // Ajout du bouton sélectionné sous le dropdown 
            const appliancesDropdownDiv = document.querySelector('.applianceDropdownDiv');

            const applianceSelected = document.createElement("div");
            applianceSelected.classList.add("applianceSelected", applianceClass, "filterSelected");

            const p = document.createElement("p");
            p.textContent = appliance[0].toUpperCase() + appliance.slice(1);

            const i = document.createElement("i");
            i.classList.add('fa-solid', 'fa-xmark');

            // Au click sur la croix l'ingrdédient est deselectionné
            i.addEventListener("click", () => {
                removeSelectedAppliance();
                applianceSelected.remove();
                button.classList.remove('dropdownSelected');

                // -> Afficher les recettes selectionnées
                var filters = getAllFilters();
                const recipes = search(filters);
                createApplianceDropdown(recipes);
                createIngredientDropdown(recipes);
                createUstensilDropdown(recipes);
             })

            applianceSelected.appendChild(p);
            applianceSelected.appendChild(i);
            appliancesDropdownDiv.appendChild(applianceSelected);    
            
            const dropdownGenerated = document.querySelectorAll('.dropdown-appliances-generated');

            dropdownGenerated.forEach(element => {
                if (!element.classList.contains('dropdownSelected')) {
                    element.remove();
                } 
            });
        }   
            
        else {
            removeSelectedAppliance();
            button.classList.remove('dropdownSelected');
            
            let selector = "div." + applianceClass;
            let applianceSelected = document.querySelector(selector);

            applianceSelected.remove()
        }

        // -> Afficher les recettes selectionnées
        const filters = getAllFilters();
        const recipes = search(filters);
        createApplianceDropdown(recipes);
        createIngredientDropdown(recipes);
        createUstensilDropdown(recipes);
    })

    // -> Afficher les recettes selectionnées
    const filters = getAllFilters();
    search(filters);
}

export function createApplianceDropdown(recipes){

    // Mise à 0 de la liste des appareils présents dans le dropdown
    let dropdownGenerated = document.querySelectorAll('.dropdown-appliances-generated');
    dropdownGenerated.forEach(element => {
        element.remove();
    });

    // Création de la liste des appareils correspondant aux recettes affichées
    let appliancesList = [];

    for (let index = 0; index < recipes.length; index ++){
        const appliance = recipes[index].appliance;
        if(!appliancesList.includes(appliance)){
            appliancesList.push(appliance);   
            updateApplianceDropdown(appliance)
        }
    }
}