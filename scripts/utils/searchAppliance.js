import {displayCards} from "./recipeCard.js"

export function updateApplianceDropdown(recipes){ 
    // Mise à 0 de la liste des ingrédients présents dans le dropdown
    const dropdownGenerated = document.querySelectorAll('.dropdown-appliance-generated');
    dropdownGenerated.forEach(element => {
        element.remove();
    });

    // Création de la liste des ingrédients correspondant aux recettes affichées
    let applianceList = [];

    for (let index = 0; index < recipes.length; index ++){
        const applianceRecipe = recipes[index].appliance;

        const applianceClass = applianceRecipe.split(" ").join("").normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        if(!applianceList.includes(applianceRecipe)){

            applianceList.push(applianceRecipe);
                
            // Création de l'ingrédient dans le dropdown
            const applianceDropdown = document.querySelector('.applianceDropdown');
            const li = document.createElement('li');
            li.classList.add(applianceClass);
            const button = document.createElement('button');
            button.classList.add('dropdown-item','dropdown-generated', 'dropdown-appliance-generated');
            button.textContent = applianceRecipe;
            li.appendChild(button);
            applianceDropdown.appendChild(li);

            let isApplianceSelected = false;

            let previousDisplayedRecipes = displayedRecipes;
                
            button.addEventListener("click", () => {
                if (isApplianceSelected === false) {
                    isApplianceSelected = true;
                    button.classList.add('dropdownSelected');
 
                    // Ajout du bouton sélectionné sous le dropdown 
                    const applianceDropdownDiv = document.querySelector('.applianceDropdownDiv');
            
                    const applianceSelected = document.createElement("div");
                    applianceSelected.classList.add("applianceSelected", applianceClass, "filterSelected");
    
                    const p = document.createElement("p");
                    p.textContent = applianceRecipe;
    
                    const i = document.createElement("i");
                    i.classList.add('fa-solid', 'fa-xmark');
                    // Au click sur la croix l'ingrdédient est deselectionné
                    i.addEventListener("click", () => {
                        applianceSelected.remove();
                        button.classList.remove('dropdownSelected');
                        isApplianceSelected = false;

                        displayCards(previousDisplayedRecipes)
                    })
    
                    applianceSelected.appendChild(p);
                    applianceSelected.appendChild(i);
                    applianceDropdownDiv.appendChild(applianceSelected);

                    let newDisplayedRecipes = [];

                    for (let index=0; index < displayedRecipes.length; index++) {
                        const app = displayedRecipes[index].appliance;
                        
                        if (app.trim().toLowerCase() === applianceRecipe.trim().toLowerCase()) {
                            if(!newDisplayedRecipes.includes(displayedRecipes[index])){
                                newDisplayedRecipes.push(displayedRecipes[index])      
                            }
                        }
                    }

                    displayedRecipes = newDisplayedRecipes;
                    displayCards(displayedRecipes)
                    updateApplianceDropdown(newDisplayedRecipes)
                }  
                        
                else {
                    isApplianceSelected = false

                    button.classList.remove('dropdownSelected');
                            
                    let applianceSelected = document.getElementsByClassName('applianceSelected');
                       
                    applianceSelected.forEach(element => {
                        if (element.firstChild.textContent === applianceRecipe) {
                            element.remove();
                        }
                    });

                }
            })
            
        }
    }
}