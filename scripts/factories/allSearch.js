import {
    createBtnTag,
    createNewTableOfAppliances,
    createNewTableOfIngredients,
    createNewTableOfUtensils
} from "./filterByTags.js";

export const selectedTagsIngredient = new Set();
export const selectedTagsAppliance = new Set();
export const selectedTagsUtensil = new Set();

const arrayTheRecipesFind = new Set();
/**
 * @TODO : remplacer les boucles par des boucles for.
 * @TODO : refactoriser le code.
 */
export default class AllSearch {
    ingredients;
    /**
     *
     * @param {Array} arrayRecipes - Tableau contenant toutes les recettes
     */
    constructor(arrayRecipes) {
        // Tableau
        this.arrayRecipes = arrayRecipes;
        this.arrayTheRecipesFind = arrayTheRecipesFind;
        this.newArrayRecipes();
        this.getSearchBarre = document.querySelector(".input_barre_search");
        this.getSearchBarre.addEventListener(
            "input",
            this.getValueSearchBarre.bind(this)
        );

        // Variables ingredient
        this.btnIngredient = document.querySelector(
            "#container_btn_ingredient"
        );
        this.listIngredient = document.querySelector(
            ".container_list_ingredient"
        );
        const deleteListDomIngredient =
            document.querySelector(".list_ingredients");

        this.btnIngredient.addEventListener("click", () => {
            this.removeTheDomList(deleteListDomIngredient);
            this.listIngredient.style.display = "block";
            this.btnIngredient.style.display = "none";
            createNewTableOfIngredients(this.arrayTheRecipesFind);
            this.filterTheTagByClick(
                ".list_ingredients li",
                this.listIngredient,
                this.btnIngredient,
                selectedTagsIngredient,
                "btn_filter_ingredient",
                "color_1"
            );
        });

        this.btnAppliance = document.querySelector("#container_btn_appareil");
        this.listAppliance = document.querySelector(".container_list_appareil");
        const deleteListDomAppliance =
            document.querySelector(".list_appliances");

        this.btnAppliance.addEventListener("click", () => {
            this.removeTheDomList(deleteListDomAppliance);
            this.listAppliance.style.display = "block";
            this.btnAppliance.style.display = "none";
            createNewTableOfAppliances(this.arrayTheRecipesFind);
            this.filterTheTagByClick(
                ".list_appliances li",
                this.listAppliance,
                this.btnAppliance,
                selectedTagsAppliance,
                "btn_filter_appliance",
                "color_2"
            );
        });

        this.btnUstensil = document.querySelector("#container_btn_utensil");
        this.listUstensil = document.querySelector(".container_list_utensil");


        const deleteListDomUtensil = document.querySelector(".list_utensils");

        // Écouteur D'évènements type Click sur les btn filtre
        this.btnUstensil.addEventListener("click", () => {
            this.removeTheDomList(deleteListDomUtensil);
            this.listUstensil.style.display = "block";
            this.btnUstensil.style.display = "none";
            createNewTableOfUtensils(this.arrayTheRecipesFind);
            this.filterTheTagByClick(
                ".list_utensils li",
                this.listUstensil,
                this.btnUstensil,
                selectedTagsUtensil,
                "btn_filter_utensil",
                "color_3"
            );
        });
    }
    removeTheDomList(deleteList) {
        while (deleteList.firstChild) {
            deleteList.removeChild(deleteList.firstChild);
        }
    }

    newArrayRecipes() {
        this.arrayRecipes.forEach((el) => {
            this.arrayTheRecipesFind.add(el);
        });
    }
    stringConversionWithoutAccents(string) {
        return string
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase();
    }

    getValueSearchBarre(e) {
        this.valueInput = this.stringConversionWithoutAccents(
            e.target.value.trim()
        );
        this.filterTheRecipes();
    }

    /**
     *
     * @param {string} classNameSelector Nom de la class de la list
     * @param {Element} listElement sélecteur list
     * @param {Element} btn sélecteur btn
     * @param {Set<any>} selectTags
     * @param {string} classNameBtn
     * @param {string} color couleur du bouton
     */
    filterTheTagByClick(classNameSelector, listElement, btn, selectTags, classNameBtn, color) {
        this.getDomListsLi = document.querySelectorAll(classNameSelector);
        this.getDomListsLi.forEach((li) => {
            li.addEventListener("click", (e) => {
                listElement.style.display = "none";
                btn.style.display = "flex";
                selectTags.add(e.target.innerHTML);
                createBtnTag(e.target.innerHTML, classNameBtn, color, selectTags);
                this.deleteFilterBtn(classNameBtn, selectTags);
                this.filterTheRecipes();
            });
        });
    }

    /**
     * Suppression des tags sélectionnée
     * @param {string} className  Nom de la class des boutons
     * @param {Set<*>} selectTags  Contenant le tag sélectionner
     */
    deleteFilterBtn(className, selectTags) {
        const getDomBtnFilter = document.querySelectorAll(`.${className}`);
        getDomBtnFilter.forEach((btn) => {
            btn.closest(className);
            btn.addEventListener("click", (e) => {
                btn.style.display = "none";
                selectTags.delete(e.target.innerText.trim());
                this.filterTheRecipes();
            });
        });
    }

    filterTheRecipes() {
        this.arrayTheRecipesFind.clear();
        this.arrayRecipes.forEach((recipe) => {
            this.getTheRecipesFound(recipe);
            this.showTheRecipesFound(recipe);
        });

        this.getErrorText = document.querySelector(".noFound");
        if (this.arrayTheRecipesFind.size === 0) {
            this.getErrorText.innerHTML =
                "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », ect.";
        } else {
            this.getErrorText.innerHTML = "";
        }
    }

    /**
     *
     * @param {object} objectsRecipe list object des recettes
     */
    getTheRecipesFound(objectsRecipe) {
        this.objectRecipes = objectsRecipe;
        const recipesTitle = this.isResultToBeFoundInTheRecipes(
            this.objectRecipes.name,
            this.valueInput
        );

        const recipesDescription = this.isResultToBeFoundInTheRecipes(
            this.objectRecipes.description,
            this.valueInput
        );
        const recipesIngredient = this.isResultToBeFoundTheRecipesInArray(
            this.objectRecipes.ingredients,
            this.valueInput
        );

        let hasAllIngredient = true;
        if (selectedTagsIngredient.size) {
            hasAllIngredient = Array.from(selectedTagsIngredient).every(
                (selectedIngredient) => {
                    const foundIngredient = objectsRecipe.ingredients.find(
                        (ingredient) =>
                            ingredient.ingredient.toLowerCase() ===
                            selectedIngredient.toLowerCase()
                    );
                    return foundIngredient !== undefined;
                }
            );
        }

        let hasAllAppliance = true;
        if (selectedTagsAppliance.size) {
            hasAllAppliance = Array.from(selectedTagsAppliance).every(
                (selectedAppliance) => {
                    const foundAppliance = [objectsRecipe.appliance].find(
                        (appliance) =>
                            appliance.toLowerCase() ===
                            selectedAppliance.toLowerCase()
                    );
                    return foundAppliance !== undefined;
                }
            );
        }

        let hasAllUtensil = true;
        if (selectedTagsUtensil.size) {
            hasAllUtensil = Array.from(selectedTagsUtensil).every(
                (selectedUtensil) => {
                    const foundUtensil = objectsRecipe.ustensils.find(
                        (utensil) =>
                            utensil.toLowerCase() ===
                            selectedUtensil.toLowerCase()
                    );
                    return foundUtensil !== undefined;
                }
            );
        }
        objectsRecipe.data = ((this.valueInput || "").length <= 2 ||
                recipesTitle ||
                recipesDescription ||
                recipesIngredient) &&
            hasAllIngredient &&
            hasAllAppliance &&
            hasAllUtensil;
    }
    /**
     *
     * @param {String} recipeElement - Contenue des recettes.
     * @param {String} valueInput - Valeur de l'input.
     */

    isResultToBeFoundInTheRecipes(recipeElement, valueInput) {
        const conversionString =
            this.stringConversionWithoutAccents(recipeElement);
        return conversionString.includes(valueInput) === true;
    }

    isResultToBeFoundTheRecipesInArray(recipesElement, valueInput) {
        const searchForTheRecipes = recipesElement.some((recipeElement) => {
            if (recipeElement.ingredient) {
                const conversionStringIngredients =
                    this.stringConversionWithoutAccents(
                        recipeElement.ingredient
                    );
                return conversionStringIngredients.includes(valueInput) === true;
            }
        });
        return searchForTheRecipes === true;
    }

    showTheRecipesFound(objectRecipe) {
        this.recipesId = objectRecipe.id;
        this.getCardsArticle = document.querySelector(
            `article[data-id="${this.recipesId}"]`
        );
        if (objectRecipe.data !== true) {
            this.getCardsArticle.style.display = "none";
        } else {
            this.getCardsArticle.style.display = "block";
            this.arrayTheRecipesFind.add(objectRecipe);
        }
    }
}
