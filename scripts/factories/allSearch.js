// Import
import {
    createBtnTag,
    createNewTableOfAppliances,
    createNewTableOfIngredients,
    createNewTableOfUtensils
} from "./filterByTags.js";
import variables from "../../utils/variables.js";
// Export
export const selectedTagsIngredient = new Set();
export const selectedTagsAppliance = new Set();
export const selectedTagsUtensil = new Set();
// Variables
const querySelector = variables();
const arrayTheRecipesFind = [];

export default class AllSearch {
    ingredients;

    /**
     * @param {Array} arrayRecipes - Tableau contenant toutes les recettes
     */
    constructor(arrayRecipes) {
        // Tableau
        this.arrayRecipes = arrayRecipes;
        this.arrayTheRecipesFind = arrayTheRecipesFind;

        // Variables Barre principal
        this.getSearchBarre = document.querySelector(".input_barre_search");

        // Écouteur d'évènements barre de recherche
        this.getSearchBarre.addEventListener(
            "input",
            this.getValueSearchBarre.bind(this)
        );
        this.filterTheRecipes();

        // Écouteur d'évènements sur les filtres
        querySelector.btnIngredient.addEventListener("click", () => {
            this.removeTheDomList(querySelector.deleteListDomIngredient);
            querySelector.listIngredient.style.display = "block";
            querySelector.btnIngredient.style.display = "none";
            createNewTableOfIngredients(this.arrayTheRecipesFind);
            this.filterTheTagByClick(
                ".list_ingredients li",
                querySelector.listIngredient,
                querySelector.btnIngredient,
                selectedTagsIngredient,
                "btn_filter_ingredient",
                "color_1"
            );
        });

        querySelector.btnAppliance.addEventListener("click", () => {
            this.removeTheDomList(querySelector.deleteListDomAppliance);
            querySelector.listAppliance.style.display = "block";
            querySelector.btnAppliance.style.display = "none";
            createNewTableOfAppliances(this.arrayTheRecipesFind);
            this.filterTheTagByClick(
                ".list_appliances li",
                querySelector.listAppliance,
                querySelector.btnAppliance,
                selectedTagsAppliance,
                "btn_filter_appliance",
                "color_2"
            );
        });

        querySelector.btnUtensil.addEventListener("click", () => {
            this.removeTheDomList(querySelector.deleteListDomUtensil);
            querySelector.listUtensil.style.display = "block";
            querySelector.btnUtensil.style.display = "none";
            createNewTableOfUtensils(this.arrayTheRecipesFind);
            this.filterTheTagByClick(
                ".list_utensils li",
                querySelector.listUtensil,
                querySelector.btnUtensil,
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
                this.deleteBtnTag(classNameBtn, selectTags);
                this.filterTheRecipes();
            });
        });
    }

    /**
     * Suppression des tags sélectionnée
     * @param {string} className  Nom de la class des boutons
     * @param {Set<*>} selectTags  Contenant le tag sélectionner
     */
    deleteBtnTag(className, selectTags) {
        const getDomBtnFilter = document.querySelectorAll(`.${className}`);
        getDomBtnFilter.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                btn.style.display = "none";
                selectTags.delete(e.target.innerText.trim());
                this.filterTheRecipes();
            });
        });
    }

    filterTheRecipes() {
        this.arrayTheRecipesFind = [];
        for (let index = 0; index < this.arrayRecipes.length; index++) {
            const element = this.arrayRecipes[index];
            this.getTheRecipesFound(element);
            this.showTheRecipesFound(element);
        }

        this.getErrorText = document.querySelector(".noFound");
        if (this.arrayTheRecipesFind.length === 0) {
            this.getErrorText.innerHTML =
                "Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », " +
                "« poisson », ect.";
        } else {
            this.getErrorText.innerHTML = "";
        }
    }

    /**
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
            hasAllIngredient = this.findTheRecipesShow(hasAllIngredient, selectedTagsIngredient, objectsRecipe.ingredients, "ingredient");
        }

        let hasAllAppliance = true;
        if (selectedTagsAppliance.size) {
            hasAllAppliance = this.findTheRecipesShow(hasAllAppliance, selectedTagsAppliance, [objectsRecipe.appliance]);
        }

        let hasAllUtensil = true;
        if (selectedTagsUtensil.size) {
            hasAllUtensil = this.findTheRecipesShow(hasAllUtensil, selectedTagsUtensil, objectsRecipe.ustensils);
        }

        objectsRecipe.data = ((this.valueInput || "").length <= 2 ||
                recipesTitle ||
                recipesDescription ||
                recipesIngredient) &&
            hasAllIngredient &&
            hasAllAppliance &&
            hasAllUtensil;
    }

    findTheRecipesShow(hasAllElement, selectedTags, recipeElement, ingredient) {
        hasAllElement = Array.from(selectedTags).every(
            (selectedTag) => {
                if (ingredient === "ingredient") {
                    const foundIngredient = recipeElement.find(
                        (elementRecipe) =>
                            elementRecipe.ingredient.toLowerCase() ===
                            selectedTag.toLowerCase()
                    );
                    return foundIngredient !== undefined;
                } else {
                    const foundElement = recipeElement.find(
                        (elementRecipe) =>
                            elementRecipe.toLowerCase() ===
                            selectedTag.toLowerCase()
                    );
                    return foundElement !== undefined;
                }
            }
        );
        return hasAllElement;
    }

    /**
     *
     * @param {String} recipeElement - Contenue des recettes.
     * @param {String} valueInput - Valeur de l'input.
     */

    isResultToBeFoundInTheRecipes(recipeElement, valueInput) {
        const conversionString =
            this.stringConversionWithoutAccents(recipeElement);
        return conversionString.indexOf(valueInput) !== -1;
    }

    isResultToBeFoundTheRecipesInArray(recipesElement, valueInput) {
        for (let i = 0; i < recipesElement.length; i++) {
            const element = recipesElement[i];
            if (element.ingredient) {
                const conversionStringIngredients =
                    this.stringConversionWithoutAccents(
                        element.ingredient
                    );
                return conversionStringIngredients.indexOf(valueInput) !== -1;
            }
        }
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
            this.arrayTheRecipesFind.push(objectRecipe);
        }
    }
}
