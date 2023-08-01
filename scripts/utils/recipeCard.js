function createTime(recipe, cardDiv) {
    const time = document.createElement("p");
    time.classList.add("card-text", "card--ingredient__time");
    time.textContent = recipe.time + "min";

    cardDiv.appendChild(time);
}

function createImg(recipe, cardDiv) {
    const imgCard = document.createElement("img");
    imgCard.src = `/assets/images/recettes/${recipe.image}`;
    imgCard.alt = recipe.name;
    imgCard.classList.add('card-img-top')

    cardDiv.appendChild(imgCard);
}

function createTitle(recipe, cardBody) {
    const title = document.createElement("h2");
    title.classList.add("card-title");
    title.textContent = recipe.name;

    cardBody.appendChild(title);
}

function createRecipe(recipe, cardBody) {
    const recipeInstructions = document.createElement("p");
    recipeInstructions.classList.add('card-text', 'card-recipe');
    recipeInstructions.textContent = recipe.description;

    cardBody.appendChild(recipeInstructions);
}

function createIngredients(ingredients, ingredientsDiv) {
    for (let i = 0; i < ingredients.length; i++) {
        const ingredientInfos = document.createElement("div");
        ingredientInfos.classList.add('card--ingredient');

        const ingredientName = document.createElement("p");
        ingredientName.classList.add('card-text', 'card--ingredient__name');
        ingredientName.textContent = ingredients[i].ingredient;
    
        const ingredientQuantity = document.createElement("p");
        ingredientQuantity.classList.add('card-text', 'card--ingredient__quantity');

        if (ingredients[i].hasOwnProperty('unit')) { 
                ingredientQuantity.textContent = ingredients[i].quantity + ingredients[i].unit;
            if (ingredients[i].unit === "grammes" || ingredients[i].unit === "cl" || ingredients[i].unit === "ml" || ingredients[i].unit === "kg") {
                ingredientQuantity.textContent = ingredients[i].quantity + ingredients[i].unit;
            } else {
                ingredientQuantity.textContent = ingredients[i].quantity + " " + ingredients[i].unit;
            }
        } else {
            ingredientQuantity.textContent = ingredients[i].quantity;
        }
    
        ingredientInfos.appendChild(ingredientName);
        ingredientInfos.appendChild(ingredientQuantity);

        ingredientsDiv.appendChild(ingredientInfos);
    }
}

export function createCard(recipe) {
    const results = document.querySelector('.resultsGallery');

    const card = document.createElement("a");
    card.href = "";
    card.classList.add('card');

    createTime(recipe, card);
    
    createImg(recipe, card);

    const cardBody =  document.createElement("div");
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    createTitle(recipe, cardBody); 
    
    const recipeSubtitle = document.createElement("h3");
    recipeSubtitle.textContent = "RECETTE";
    cardBody.appendChild(recipeSubtitle);

    createRecipe(recipe, cardBody);

    const ingredientsSubtitle = document.createElement("h3");
    ingredientsSubtitle.textContent = "INGRÉDIENTS";
    cardBody.appendChild(ingredientsSubtitle);

    const ingredientsDiv = document.createElement("div");
    ingredientsDiv.classList.add('ingredients-list');
    cardBody.appendChild(ingredientsDiv);
    createIngredients(recipe.ingredients, ingredientsDiv)

    results.appendChild(card);
}


export function displayCards (recipes){
    document.querySelector('.resultsGallery').innerHTML = "";
    
    for (let i=0; i < recipes.length; i++) {
        createCard(recipes[i])
    }
    
    document.querySelector('.resultNumber').innerHTML = recipes.length.toString() + " RECETTES";
}