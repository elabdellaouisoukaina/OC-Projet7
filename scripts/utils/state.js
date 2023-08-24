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