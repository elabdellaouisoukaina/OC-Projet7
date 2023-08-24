// import {search} from "../utils/searchBar.js"

// import {displayCards} from "./recipeCard.js"
import  {addSelectedIngredient, getSelectedIngredients, removeSelectedIngredient, isIngredientSelected} from "../utils/state.js"

// let recipesFiltered = [];


export function searchIngredient(recipes, value) {
    // Cherche entry dans tous les ingrédients de la recette
    // let entry = value.trim().toLowerCase();
    // let result = [];

    // for (let index = 0; index < recipes.length; index ++){

    //     const ingredients = recipes[index].ingredients;

    //     for (let i = 0; i < ingredients.length; i ++){
    //         let ingredient = ingredients[i].ingredient.trim().toLowerCase();
            
    //         if (ingredient.includes(entry)) { // évite les répétitions d'ingrédients dans la liste
                
    //             if (!result.includes(ingredient)){
    //                 const ingredientsDropdown = document.querySelector('.ingredientsDropdown');
    //                 const li = document.createElement('li');
    //                 const button = document.createElement('button');
    //                 button.classList.add('dropdown-item','dropdown-generated');
    //                 button.textContent = ingredient;
    //                 li.appendChild(button);
    //                 ingredientsDropdown.appendChild(li);

    //                 result.push(ingredient);

    //                 let isIngredientSelected = false;

    //                 button.addEventListener("click", () => {
    //                     if (isIngredientSelected === false) {
    //                         button.classList.add('dropdownSelected');

    //                         const ingredientsDropdownDiv = document.querySelector('.ingredientsDropdownDiv');
            
    //                         const ingredientSelected = document.createElement("div");
    //                         ingredientSelected.classList.add("ingredientSelected");
    
    //                         const p = document.createElement("p");
    //                         p.textContent = ingredient;
    
    //                         const i = document.createElement("i");
    //                         i.classList.add('fa-solid', 'fa-xmark');
    
    //                         ingredientSelected.appendChild(p);
    //                         ingredientSelected.appendChild(i);
    //                         ingredientsDropdownDiv.appendChild(ingredientSelected);

    //                         isIngredientSelected = true;

    //                         recipesFiltered.push(recipes[index]);
    //                     } 
                        
    //                     else {
                            
    //                         recipesFiltered = recipesFiltered.filter(item => item !== recipes[index])

    //                         button.classList.remove('dropdownSelected');
                            
    //                         let ingredientSelected = document.querySelectorAll('.ingredientSelected');

    //                         ingredientSelected.forEach(element => {
    //                             if (element.firstChild.textContent === ingredient) {
    //                                 element.remove();
    //                             }
    //                         });

    //                         isIngredientSelected = false
    //                     }
    //                     console.log(recipesFiltered)
    //                 })
    //             }
    //         }
    //     }
    // }

    //// for (let i=0; i<recipes.length; i++){
    ////     search
    //// } 
}


export function updateIngredientDropdown(recipes){

    // Mise à 0 de la liste des ingrédients présents dans le dropdown
    let dropdownGenerated = document.querySelectorAll('.dropdown-ingredients-generated');
    dropdownGenerated.forEach(element => {
        element.remove();
    });

    // Création de la liste des ingrédients correspondant aux recettes affichées
    let ingredientsList = [];

    for (let index = 0; index < recipes.length; index ++){
        const ingredientsRecipe = recipes[index].ingredients;

        for (let i = 0; i < ingredientsRecipe.length; i ++){
            const ingredient = ingredientsRecipe[i].ingredient;
            const ingredientClass = ingredient.split(" ").join("").normalize('NFD').replace(/[\u0300-\u036f]/g, '');

            if(!ingredientsList.includes(ingredient)){

                ingredientsList.push(ingredient);
                
                // Création de l'ingrédient dans le dropdown
                const ingredientsDropdown = document.querySelector('.ingredientsDropdown');
                const li = document.createElement('li');
                li.classList.add(ingredientClass);
                const button = document.createElement('button');
                button.classList.add('dropdown-item','dropdown-generated', 'dropdown-ingredients-generated');
                button.textContent = ingredient;
                li.appendChild(button);
                ingredientsDropdown.appendChild(li);

                // let previousDisplayedRecipes = displayedRecipes;
                
                button.addEventListener("click", () => {
                    if (!isIngredientSelected(ingredient)) {

                        addSelectedIngredient(ingredient);

                        button.classList.add('dropdownSelected');
 
                        // Ajout du bouton sélectionné sous le dropdown 
                        const ingredientsDropdownDiv = document.querySelector('.ingredientsDropdownDiv');
            
                        const ingredientSelected = document.createElement("div");
                        ingredientSelected.classList.add("ingredientSelected", ingredientClass, "filterSelected");
    
                        const p = document.createElement("p");
                        p.textContent = ingredient;
    
                        const i = document.createElement("i");
                        i.classList.add('fa-solid', 'fa-xmark');

                        // Au click sur la croix l'ingrdédient est deselectionné
                        i.addEventListener("click", () => {
                            removeSelectedIngredient(ingredient);
                            console.log(getSelectedIngredients())

                            ingredientSelected.remove();
                            button.classList.remove('dropdownSelected');

                            // displayCards(previousDisplayedRecipes)
                        })
    
                        ingredientSelected.appendChild(p);
                        ingredientSelected.appendChild(i);
                        ingredientsDropdownDiv.appendChild(ingredientSelected);

                        // let newDisplayedRecipes = [];

                        // for (let index=0; index < displayedRecipes.length; index++) {
                        //     const ingr = displayedRecipes[index].ingredients;
                        //     for (let j=0; j < ingr.length; j++){
                        //         if (ingr[j].ingredient.trim().toLowerCase() === ingredient.trim().toLowerCase()) {
                        //             if(!newDisplayedRecipes.includes(displayedRecipes[index])){
                        //                 newDisplayedRecipes.push(displayedRecipes[index])
                        //             }
                        //         }
                        //     }
                        // }

                        // displayedRecipes = newDisplayedRecipes;

                        // displayCards(displayedRecipes)

                        // updateIngredientDropdown(newDisplayedRecipes)
                    }   
                        
                    else {
                        removeSelectedIngredient(ingredient);
                        console.log(getSelectedIngredients())

                        button.classList.remove('dropdownSelected');
                        
                        let selector = "div." + ingredientClass;
                        let ingredientSelected = document.querySelector(selector);

                        ingredientSelected.remove();

                    }
                })
            }
        }
    }
}