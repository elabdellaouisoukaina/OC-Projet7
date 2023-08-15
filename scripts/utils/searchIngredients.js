import {search} from "../utils/searchBar.js"

let recipesFiltered = [];


export function searchIngredient(recipes, value) {
    // Cherche entry dans tous les ingrédients de la recette
    let entry = value.trim().toLowerCase();
    let result = [];

    for (let index = 0; index < recipes.length; index ++){

        const ingredients = recipes[index].ingredients;

        for (let i = 0; i < ingredients.length; i ++){
            let ingredient = ingredients[i].ingredient.trim().toLowerCase();
            
            if (ingredient.includes(entry)) { // évite les répétitions d'ingrédients dans la liste
                
                if (!result.includes(ingredient)){
                    const ingredientsDropdown = document.querySelector('.ingredientsDropdown');
                    const li = document.createElement('li');
                    const button = document.createElement('button');
                    button.classList.add('dropdown-item','dropdown-generated');
                    button.textContent = ingredient;
                    li.appendChild(button);
                    ingredientsDropdown.appendChild(li);

                    result.push(ingredient);

                    let isIngredientSelected = false;

                    button.addEventListener("click", () => {
                        if (isIngredientSelected === false) {
                            button.classList.add('dropdownSelected');

                            const ingredientsDropdownDiv = document.querySelector('.ingredientsDropdownDiv');
            
                            const ingredientSelected = document.createElement("div");
                            ingredientSelected.classList.add("ingredientSelected");
    
                            const p = document.createElement("p");
                            p.textContent = ingredient;
    
                            const i = document.createElement("i");
                            i.classList.add('fa-solid', 'fa-xmark');
    
                            ingredientSelected.appendChild(p);
                            ingredientSelected.appendChild(i);
                            ingredientsDropdownDiv.appendChild(ingredientSelected);

                            isIngredientSelected = true;

                            recipesFiltered.push(recipes[index]);
                        } 
                        
                        else {
                            
                            recipesFiltered = recipesFiltered.filter(item => item !== recipes[index])

                            button.classList.remove('dropdownSelected');
                            
                            let ingredientSelected = document.querySelectorAll('.ingredientSelected');

                            ingredientSelected.forEach(element => {
                                if (element.firstChild.textContent === ingredient) {
                                    element.remove();
                                }
                            });

                            isIngredientSelected = false
                        }
                        console.log(recipesFiltered)
                    })
                }
            }
        }
    }

    // for (let i=0; i<recipes.length; i++){
    //     search
    // }
}
