// Import
import AllSearch from "./factories/allSearch.js";
import api from "../utils/api.js";

// Export
export const recipes = await api();

class Card {
    /**
     *
     * @param {Object} recipe - liste des recettes
     */
    constructor(recipe) {
        this.recette = recipe;
        this.arrayListIngredient = recipe.ingredients;
        this.createCardDom();

    }

    listIngredient(lists) {
        const list = document.createElement("li");
        list.setAttribute("class", "ingredients");
        if (lists.unit === "grammes") {
            lists.unit = "g";
        } else if (lists.unit === "cuillères à soupe") {
            lists.unit = "c à s";
        } else if (lists.unit === "cuillères à café") {
            lists.unit = "c à c";
        }

        if (lists.quantity === undefined) {
            list.innerHTML = `<strong>${lists.ingredient}</strong>`;
        } else if (lists.unit === undefined) {
            list.innerHTML = `<strong>${lists.ingredient} </strong>: ${lists.quantity}`;
        } else {
            list.innerHTML = `<strong> ${lists.ingredient} </strong>: ${lists.quantity} ${lists.unit} `;
        }
        return list;
    }

    createCardDom() {
        this.getDomCard = document.getElementById("card_article");
        this.createCard = this.createBaliseWithClass(
            "article",
            "data-id",
            this.recette.id
        );
        this.createCard.setAttribute("class", "block_article");
        this.cardDiv = this.createBaliseWithClass(
            "div",
            "class",
            "card card_style"
        );
        this.cardDiv.innerHTML = `
        	<img src="./assets/recette-du-quinoa-bol-1024x683.jpg.webp" class="card-img-top" alt="...">
        	<div class="card-body card_title ">
        		<h5>${this.recette.name}</h5>
        		<span><strong> <i class="fa-x6 fa-regular fa-clock"></i></strong> ${this.recette.time} mn </span>
        	</div>
        `;

        const contentRecette = this.createBaliseWithClass(
            "div",
            "class",
            "container_recette"
        );
        const ul = document.createElement("ul");
        const texteDiv = this.createBaliseWithClass(
            "div",
            "class",
            "paragraphe_recette"
        );

        const paragraphe = this.createBaliseWithClass(
            "p",
            "class",
            "paragraphe"
        );
        paragraphe.innerHTML = this.recette.description;

        this.cardDiv.appendChild(contentRecette);
        this.getDomCard.appendChild(this.createCard);
        this.createCard.appendChild(this.cardDiv);
        contentRecette.appendChild(ul);
        contentRecette.appendChild(texteDiv);
        texteDiv.appendChild(paragraphe);

        this.arrayListIngredient.forEach((list) => {
            const li = this.listIngredient(list);
            ul.appendChild(li);
        });
    }

    /**
     *
     * @param {String} createElement
     * @param {String} attribute
     * @param {String} valueAttribute
     * @returns {HTMLElement}
     */
    createBaliseWithClass(createElement, attribute, valueAttribute) {
        let balise = document.createElement(createElement);
        balise.setAttribute(attribute, valueAttribute);
        return balise;
    }
}

recipes.forEach((recipe) => {
    new Card(recipe);
});
new AllSearch(recipes);

