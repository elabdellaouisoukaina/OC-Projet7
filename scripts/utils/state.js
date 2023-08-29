// -------------------- Tous les filtres --------------------

let allFilters = [[], '', [], []]; // [[ingredientsSelected], applianceSelected, [ustensilsSelected], [texte searchbar]]

export function getAllFilters() {
    allFilters[0] = getSelectedIngredients();
    allFilters[1] = getSelectedAppliance();
    allFilters[2] = getSelectedUstensils();
    allFilters[3] = getSearchedText();

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
    const index = selectedIngredients.indexOf(ingredient);
    selectedIngredients.splice(index, 1);    
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

export function isApplianceSelected(appliance) {
    if (appliance === selectedAppliance) {
        return true;
    } else {
        return false;
    }
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
    const index = selectedUstensils.indexOf(ustensil);
    if (index!== -1) {
        selectedUstensils.splice(index, 1); 
    }
}

export function isUstensilSelected(ustensil) {
    if (selectedUstensils.includes(ustensil)) {
        return true;
    } else {
        return false;
    }
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

    // const index = selectedIngredients.indexOf(text);
    // selectedIngredients.splice(index, 1); 
}