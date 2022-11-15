export default function variables() {
    // Variables ingredient
    const inputIngredient = document.querySelector(".input_ingredient input");
    const btnIngredient = document.querySelector("#container_btn_ingredient");
    const listIngredient = document.querySelector(".container_list_ingredient");
    const deleteListDomIngredient =
        document.querySelector(".list_ingredients");

    // Variables appliance
    const btnAppliance = document.querySelector("#container_btn_appareil");
    const listAppliance = document.querySelector(".container_list_appareil");
    const inputAppliance = document.querySelector(".input_appliance input");
    const deleteListDomAppliance =
        document.querySelector(".list_appliances");

    // Variables Utensil
    const btnUtensil = document.querySelector("#container_btn_utensil");
    const listUtensil = document.querySelector(".container_list_utensil");
    const inputUtensil = document.querySelector(".input_utensil input");
    const deleteListDomUtensil = document.querySelector(".list_utensils");

    return {
        inputIngredient,
        btnIngredient,
        listIngredient,
        btnAppliance,
        listAppliance,
        inputAppliance,
        btnUtensil,
        listUtensil,
        inputUtensil,
        deleteListDomIngredient,
        deleteListDomAppliance,
        deleteListDomUtensil
    };
}