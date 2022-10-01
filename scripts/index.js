import { recipes } from "../data/recipes.js";

class Card {
    constructor(recipe) {
        this.recipe = recipe;
        this.arrayListIngredient = recipe.ingredients;

        this.card();
    }

    listIngredient(lists) {
        const list = document.createElement("div");
        list.setAttribute("class", "ingredients");
        if (lists.quantity !== undefined && lists.unit !== undefined) {
            list.innerHTML = `${lists.ingredient} : ${lists.quantity}  ${lists.unit} `;
        } else {
            list.innerHTML = `${lists.ingredient} `;
        }
        // this.createCard.appendChild(list);
        return list;
    }
    card() {
        this.getCard = document.getElementById("card_article");
        this.createCard = document.createElement("article");
        this.div = document.createElement("div");
        this.div.setAttribute("class", "card card_style");
        this.div.innerHTML = ` 
			<img src="./assets/recette-du-quinoa-bol-1024x683.jpg.webp" class="card-img-top" alt="...">
			<div class="card-body card_title ">
				<h5>${this.recipe.name} </h5>
				<span><i class="fa-regular fa-clock"></i> ${this.recipe.time}</span>
			</div>
        `;
        this.getCard.appendChild(this.createCard);
        this.createCard.appendChild(this.div);

        const lists = this.arrayListIngredient;
        lists.forEach((list) => {
            const test = this.listIngredient(list);
            this.div.appendChild(test);
        });
    }
}

recipes.forEach((recipe) => {
    new Card(recipe);
});
// function test2(ingredient) {
//     const createCard = document.createElement("article");
//     const list = document.createElement("div");
//     list.setAttribute("ingredients", "class");
//     list.innerHTML = ingredient;
//     createCard.appendChild(list);
// }

/* <div class="recette">
<p class="card-text">${recipe.description} </p>
</div>
</div>`; */
