// Import
import variables from "../../utils/variables.js";

// Variables
const querySelector = variables();

// Tableau
const arrayIngredients = new Set();
const arrayAppliances = new Set();
const arrayUtensils = new Set();

// Écouteur d'évènement : Ferme la liste des filtres
document.addEventListener("click", closeListTags);

function createNewTableOfIngredients(recipes) {
    arrayIngredients.clear();
    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((recipeElement) => {
            const recipesIngredientString =
                recipeElement.ingredient.toLocaleLowerCase();
            arrayIngredients.add(recipesIngredientString);
        });
    });
    displayTheDomList(arrayIngredients, ".list_ingredients", "color_1");
    inputTagFilter(querySelector.inputIngredient, ".list_ingredients li");
}

function createNewTableOfAppliances(recipes) {
    arrayAppliances.clear();
    recipes.forEach((recipe) => {
        const appliance = recipe.appliance.toLowerCase();
        arrayAppliances.add(appliance);
    });
    displayTheDomList(arrayAppliances, ".list_appliances", "color_2");
    inputTagFilter(querySelector.inputAppliance, ".list_appliances li");
}

function createNewTableOfUtensils(recipes) {
    arrayUtensils.clear();
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((recipeElement) => {
            const recipesUtensilString = recipeElement.toLocaleLowerCase();
            arrayUtensils.add(recipesUtensilString);
        });
    });
    displayTheDomList(arrayUtensils, ".list_utensils", "color_3");
    inputTagFilter(querySelector.inputUtensil, ".list_utensils li");
}

// Creation de la liste
function displayTheDomList(newArray, listLi, color) {
    newArray.forEach((ingredient) => {
        createDomList(ingredient, listLi, color);
    });
}

function createDomList(elementRecipes, domList, color) {
    const getDomList = document.querySelector(domList);
    const li = document.createElement("li");
    li.setAttribute("class", `list-group-item ${color} color_text`);
    li.setAttribute("data-list", "false");
    li.innerHTML = elementRecipes[0].toUpperCase() + elementRecipes.slice(1);
    return getDomList.appendChild(li);
}

function createBtnTag(string, className, colorBtn) {
    const getBtnFilter = document.querySelector(".btn_filter");
    const btn = document.createElement("button");
    btn.setAttribute("class", `btn ${colorBtn} ${className} color_text`);
    btn.innerHTML = `${string} <i class="fas fa-times"></i> `;
    getBtnFilter.appendChild(btn);

}

function closeListTags(e) {
    if (
        e.target.id !== "btn_ingredient" &&
        e.target.id !== "input_search_ingredient"
    ) {
        querySelector.listIngredient.style.display = "none";
        querySelector.btnIngredient.style.display = "flex";
        querySelector.inputIngredient.value = "";
    }
    if (
        e.target.id !== "btn-appareil" &&
        e.target.id !== "input_search_appliance"
    ) {
        querySelector.listAppliance.style.display = "none";
        querySelector.btnAppliance.style.display = "flex";
        querySelector.inputAppliance.value = "";
    }
    if (
        e.target.id !== "btn-utensil" &&
        e.target.id !== "input_search_utensil"
    ) {
        querySelector.listUtensil.style.display = "none";
        querySelector.btnUtensil.style.display = "flex";
        querySelector.inputUtensil.value = "";
    }
}

function stringConversionWithoutAccents(string) {
    return string
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase();
}

function inputTagFilter(getInputTag, domAllList) {
    getInputTag.addEventListener("input", (e) => {
        const conversionStringInput = stringConversionWithoutAccents(
            e.target.value.trim()
        );
        const getDomListsLi = document.querySelectorAll(domAllList);
        getDomListsLi.forEach((elementInList) => {
            const conversionString = stringConversionWithoutAccents(
                elementInList.innerHTML
            );
            if (conversionString.includes(conversionStringInput) !== true) {
                elementInList.setAttribute("data-list", "false");
            } else {
                elementInList.setAttribute("data-list", "true");
            }

            if (
                e.target.value.length <= 0 ||
                elementInList.dataset.list === "true"
            ) {
                elementInList.style.display = "block";
            } else {
                elementInList.style.display = "none";
            }
        });
    });
}

export {
    createNewTableOfIngredients,
    createNewTableOfAppliances,
    createNewTableOfUtensils,
    createBtnTag
};
