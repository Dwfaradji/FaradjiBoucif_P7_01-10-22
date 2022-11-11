
const arrayIngredients = new Set();
const arrayAppliances = new Set();
const arrayUtensils = new Set();


// Variables ingredient
const inputIngredient = document.querySelector(".input_ingredient input");
const btnIngredient = document.querySelector("#container_btn_ingredient");
const listIngredient = document.querySelector(".container_list_ingredient");

// Variables appliance
const btnAppliance = document.querySelector("#container_btn_appareil");
const listAppliance = document.querySelector(".container_list_appareil");
const inputAppliance = document.querySelector(".input_appliance input");

// Variables Utensil
const btnUtensil = document.querySelector("#container_btn_utensil");
const listUtensil = document.querySelector(".container_list_utensil");
const inputUtensil = document.querySelector(".input_utensil input");

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
    displayTheList(arrayIngredients, ".list_ingredients", "color_1");
    inputTagFilter(inputIngredient, ".list_ingredients li");
}

function createNewTableOfAppliances(recipes) {
    arrayAppliances.clear();
    recipes.forEach((recipe) => {
        const appliance = recipe.appliance.toLowerCase();
        arrayAppliances.add(appliance);
    });
    displayTheList(arrayAppliances, ".list_appliances", "color_2");
    inputTagFilter(inputAppliance, ".list_appliances li");
}

function createNewTableOfUtensils(recipes) {
    arrayUtensils.clear();
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((recipeElement) => {
            const recipesUtensilString = recipeElement.toLocaleLowerCase();
            arrayUtensils.add(recipesUtensilString);
        });
    });
    displayTheList(arrayUtensils, ".list_utensils", "color_3");
    inputTagFilter(inputUtensil, ".list_utensils li");
}

function displayTheList(newArray, listLi, color) {
    newArray.forEach((ingredient) => {
        createDomList(ingredient, listLi, color);
    });
}
// Creation de la liste
function createDomList(elementRecipes, domList, color) {
    const getDomList = document.querySelector(domList);
    const li = document.createElement("li");
    li.setAttribute("class", `list-group-item ${color} color_text`);
    li.setAttribute("data-list", "false");
    li.innerHTML = elementRecipes[0].toUpperCase() + elementRecipes.slice(1);
    return getDomList.appendChild(li);
}
//Click sur le tag
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
        listIngredient.style.display = "none";
        btnIngredient.style.display = "flex";
        inputIngredient.value = "";
    }
    if (
        e.target.id !== "btn-appareil" &&
        e.target.id !== "input_search_appliance"
    ) {
        listAppliance.style.display = "none";
        btnAppliance.style.display = "flex";
        inputAppliance.value = "";
    }
    if (
        e.target.id !== "btn-utensil" &&
        e.target.id !== "input_search_utensil"
    ) {
        listUtensil.style.display = "none";
        btnUtensil.style.display = "flex";
        inputUtensil.value = "";
    }
}

function stringConversionWithoutAccents(string) {
    return string
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase();
}

function inputTagFilter(getInput, domAllList) {
    const getDomListsLi = document.querySelectorAll(domAllList);
    getInput.addEventListener("input", (e) => {
        const conversionStringInput = stringConversionWithoutAccents(
            e.target.value.trim()
        );

        getDomListsLi.forEach((ingredientInList) => {
            const conversionString = stringConversionWithoutAccents(
                ingredientInList.innerHTML
            );
            if (conversionString.includes(conversionStringInput) !== true) {
                ingredientInList.setAttribute("data-list", "false");
            } else {
                ingredientInList.setAttribute("data-list", "true");
            }

            if (
                e.target.value.length <= 0 ||
                ingredientInList.dataset.list === "true"
            ) {
                ingredientInList.style.display = "block";
            } else {
                ingredientInList.style.display = "none";
            }
        });
    });
}

export {
    createNewTableOfIngredients,
    createNewTableOfAppliances,
    createNewTableOfUtensils,
    createBtnTag,
};
