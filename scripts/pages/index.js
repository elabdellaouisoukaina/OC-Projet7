import {recipes} from "../../data/recipes.js"
import {createCard} from "../utils/recipeCard.js"

for (let i=0; i < recipes.length; i++) {
    createCard(recipes[i])
}