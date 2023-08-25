import {setCurrentRecipes} from "../utils/state.js"

export function search(recipes, value){ // entry est un mot complet ou au minimum 3 lettres
    const results = [];
    let entry = value.trim().toLowerCase();

    //Parcours tous les recettes données
    for (let index = 0; index < recipes.length; index ++){

        // Cherche entry dans tous les ingrédients de la recette
        const ingredients = recipes[index].ingredients;

        for (let i = 0; i < ingredients.length; i ++){
            let ingredient = ingredients[i].ingredient.trim().toLowerCase();
            if (ingredient.includes(entry)){
                if(!results.includes(recipes[index])){
                    results.push(recipes[index]);
                }
            }
        }

        // Vérifie si l'appareil de la recette correspond à entry
        const appliance = recipes[index].appliance.trim().toLowerCase();
        if (appliance.includes(entry)){
            results.push(recipes[index])
        }

        // Cherche entry dans tous les ustensiles de la recette
        const ustensils = recipes[index].ustensils;

        for (let i = 0; i < ustensils.length; i ++){
            let ustensil = ustensils[i].trim().toLowerCase();

            if (ustensil.includes(entry)){
                if(!results.includes(recipes[index])){
                    results.push(recipes[index]);
                }
            }
        }
    }

    setCurrentRecipes(results);

    return results; // Retourne une liste des recettes correspondant à la recherche, peut être une liste vide
}

