import {displayCards} from "./recipeCard.js"

export function updateUstensilDropdown(recipes){ 
    // Mise à 0 de la liste des ingrédients présents dans le dropdown
    const dropdownGenerated = document.querySelectorAll('.dropdown-ustensils-generated');
    dropdownGenerated.forEach(element => {
        element.remove();
    });

    // Création de la liste des ingrédients correspondant aux recettes affichées
    let ustensilsList = [];

    for (let index = 0; index < recipes.length; index ++){
        const ustensilsRecipe = recipes[index].ustensils;

        for (let j = 0; j < ustensilsRecipe.length; j++){

            const ustensilClass = ustensilsRecipe[j].split(" ").join("").normalize('NFD').replace(/[\u0300-\u036f]/g, '');

            if(!ustensilsList.includes(ustensilsRecipe[j])){

                ustensilsList.push(ustensilsRecipe[j]);
                
                // Création de l'ingrédient dans le dropdown
                const ustensilsDropdown = document.querySelector('.ustensilsDropdown');
                const li = document.createElement('li');
                li.classList.add(ustensilClass);
                const button = document.createElement('button');
                button.classList.add('dropdown-item','dropdown-generated', 'dropdown-ustensils-generated');
                button.textContent = ustensilsRecipe[j];
                li.appendChild(button);
                ustensilsDropdown.appendChild(li);

                let isUstensilSelected = false;

                let previousDisplayedRecipes = displayedRecipes;
                
                button.addEventListener("click", () => {
                    if (isUstensilSelected === false) {
                        isUstensilSelected = true;
                        button.classList.add('dropdownSelected');
 
                        // Ajout du bouton sélectionné sous le dropdown 
                        const ustensilsDropdownDiv = document.querySelector('.ustensilsDropdownDiv');
            
                        const ustensilSelected = document.createElement("div");
                        ustensilSelected.classList.add("ingredientSelected", ustensilClass);
    
                        const p = document.createElement("p");
                        p.textContent = ustensilsRecipe[j];
    
                        const i = document.createElement("i");
                        i.classList.add('fa-solid', 'fa-xmark');
                        // Au click sur la croix l'ingrdédient est deselectionné
                        i.addEventListener("click", () => {
                            ustensilSelected.remove();
                            button.classList.remove('dropdownSelected');
                            isUstensilSelected = false;

                            displayCards(previousDisplayedRecipes)
                        })
    
                        ustensilSelected.appendChild(p);
                        ustensilSelected.appendChild(i);
                        ustensilsDropdownDiv.appendChild(ustensilSelected);

                        let newDisplayedRecipes = [];

                        for (let index=0; index < displayedRecipes.length; index++) {
                            const ust = displayedRecipes[index].ustensils;
                            for (let v=0; v < ust.length; v++){
                                if (ust[v].trim().toLowerCase() === ustensilsRecipe[j].trim().toLowerCase()) {
                                    if(!newDisplayedRecipes.includes(displayedRecipes[index])){
                                        newDisplayedRecipes.push(displayedRecipes[index])
                                    }
                                }
                            }
                        }

                        displayedRecipes = newDisplayedRecipes;

                        displayCards(displayedRecipes)

                        updateUstensilDropdown(newDisplayedRecipes)
                    }   
                        
                    else {
                        console.log('ici')
                        isUstensilSelected = false

                        button.classList.remove('dropdownSelected');
                            
                        let ingredientSelected = document.getElementsByClassName('ingredientSelected');
                       
                        ingredientSelected.forEach(element => {
                            if (element.firstChild.textContent === ustensilsRecipe[j]) {
                                element.remove();
                            }
                        });

                    }
                })
            }
        }
    }
}