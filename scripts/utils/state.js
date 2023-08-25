let currentRecipes = [];

export function getCurrentRecipes() {
    return currentRecipes;
}

export function setCurrentRecipes(recipesArray){
    currentRecipes = recipesArray;
}

// -------------------- Tous les filtres --------------------

let allFilters = [[], '', [], []]; // [[ingredientsSelected], applianceSelected, [ustensilsSelected], [texte searchbar]]

export function getAllFilters() {
    if (getSelectedIngredients() !== []) {
        allFilters[0] = getSelectedIngredients();
    }

    if (getSelectedAppliance() !== "") {
        allFilters[1] = getSelectedAppliance();
    }

    if (getSelectedUstensils() !== []) {
        allFilters[2] = getSelectedUstensils();
    }

    if (getSearchedText() !== []) {
        allFilters[3] = getSearchedText();
    }

    return allFilters;
}

// -------------------- Ingrédients --------------------

let selectedIngredients = [];

export function getSelectedIngredients() {
    return selectedIngredients;
}

export function addSelectedIngredient(ingredient) {
    selectedIngredients.push(ingredient)
}

export function removeSelectedIngredient(ingredient) {
    selectedIngredients = selectedIngredients.filter(element => element !== ingredient)
}

export function isIngredientSelected(ingredient) {
    if (selectedIngredients.includes(ingredient)) {
        return true;
    } else {
        return false;
    }
}



// -------------------- Appareil --------------------

let selectedAppliance = '';

export function getSelectedAppliance() {
    return selectedAppliance;
}

export function addSelectedAppliance(appliance) {
    selectedAppliance = appliance;
}

export function removeSelectedAppliance() {
    selectedAppliance = "";
}



// -------------------- Ustensiles --------------------

let selectedUstensils = [];

export function getSelectedUstensils() {
    return selectedUstensils;
}

export function addSelectedUstensil(ustensil) {
    selectedUstensils.push(ustensil)
}

export function removeSelectedUstensil(ustensil) {
    selectedUstensils = selectedUstensils.filter(element => element !== ustensil)
}



// -------------------- Search bar --------------------

let searchedText = [];

export function getSearchedText() {
    return searchedText;
}

export function addSearchedText(text) {
    searchedText.push(text)
}

export function removeSearchedText(text) {
    searchedText = searchedText.filter(element => element !== text)
}