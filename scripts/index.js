import { recipes } from "../data/recipes.js";

class Card {
    constructor(recipe) {
        this.recipe = recipe;
        this.arrayListIngredient = recipe.ingredients;

        this.card();
    }

    listIngredient(lists) {
        const list = document.createElement("li");
        list.setAttribute("class", "ingredients");
        if (lists.unit == "grammes") {
            lists.unit = "g";
        } else if (lists.unit === "cuillères à soupe") {
            lists.unit = "c à s";
        } else if (lists.unit == "cuillères à café") {
            lists.unit = "c à c";
        }

        if (lists.quantity == undefined) {
            list.innerHTML = `<strong>${lists.ingredient}</strong>`;
        } else if (lists.unit == undefined) {
            list.innerHTML = `<strong>${lists.ingredient} </strong>: ${lists.quantity}`;
        } else {
            list.innerHTML = `<strong> ${lists.ingredient} </strong>: ${lists.quantity} ${lists.unit} `;
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
				<h5>${this.recipe.name}</h5>
				<span><strong> <i class="fa-x6 fa-regular fa-clock"></i></strong> ${this.recipe.time} mn </span>
			</div>
        `;
        const createBlocParaAndList = document.createElement("div");
        createBlocParaAndList.setAttribute("class", "container_recette");
        const ul = document.createElement("ul");

        const divP = document.createElement("div");
        divP.setAttribute("class", "paragraphe_recette");
        const p = document.createElement("p");
        p.setAttribute("class", "paragraphe");
        p.innerHTML = this.recipe.description;
        this.div.appendChild(createBlocParaAndList);
        this.getCard.appendChild(this.createCard);
        this.createCard.appendChild(this.div);

        createBlocParaAndList.appendChild(ul);
        createBlocParaAndList.appendChild(divP);
        divP.appendChild(p);

        const lists = this.arrayListIngredient;
        lists.forEach((list) => {
            const test = this.listIngredient(list);
            ul.appendChild(test);
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
