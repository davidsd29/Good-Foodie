import {SetProduct} from '../set-list.js';
import {editForm, popUp} from '../variable.js';

let dataIsLoading = true;

const product = {
    img: document.querySelector(".heading img"),
    name: document.querySelector(".heading h1"),
    ingredients: document.getElementById("ingredients"),
}

const productValues = {
    carb: document.getElementById("detail-carb"),
    energy: document.getElementById("detail-energy"),
    fat: document.getElementById("detail-fat"),
    sFat: document.getElementById("detail-Sfat"),
    proteins: document.getElementById("detail-proteins"),
    sugar: document.getElementById("detail-sugar"),   
}

const productValues100g = {
    carb: document.getElementById("detail-carb-100g"),
    energy: document.getElementById("detail-energy-100g"),
    fat: document.getElementById("detail-fat-100g"),
    sFat: document.getElementById("detail-Sfat-100g"),
    proteins: document.getElementById("detail-proteins-100g"),
    sugar: document.getElementById("detail-sugar-100g"),   
}

const nutrition = {
  a: document.getElementById("nutriscore-A"),
  b: document.getElementById("nutriscore-B"),
  c: document.getElementById("nutriscore-C"),
  d: document.getElementById("nutriscore-D"),
  e: document.getElementById("nutriscore-E"),
  text: document.querySelector(".nutriscore + p"),
}

const addButton = document.getElementById("add-item");

// Render prodcut and updating the UI
function RenderProduct(productInfo, barcode) {

    product.img.setAttribute("src", `${productInfo.image_url}`);

    if (product.img.hasAttributeNS(" ","src")) { 
        dataIsLoading = true;
        popUp.loading.classList.add("open");
    } else {
            dataIsLoading = false;
            popUp.loading.classList.remove("open");
        }


    if (!dataIsLoading) {
        product.name.textContent = `${productInfo.product_name}`;
        product.img.setAttribute("alt", `${productInfo.product_name}`);

        if (productInfo.nutriscore_grade !== 'undefined') GetNutrionGrade(productInfo);
        SetProductValues(productInfo);

        addButton.addEventListener("click",() => {
        SetProduct(barcode)
        });
    }
}

function EditProduct(product) {
    editForm.name.value = product.product_name;
    editForm.savedImg.setAttribute("src", `${product.image_url}`);
    editForm.sugar.value = product.nutriments.sugars;
    editForm.salt.value = product.nutriments.salt;
    editForm.nutrition.value = product.nutrition_grades;
}

function SetProductValues(productInfo) {
    product.ingredients.textContent =           productInfo.ingredients_text;
    productValues.carb.textContent =            productInfo.nutriments.carbohydrates + " g";
    productValues.energy.textContent =          productInfo.nutriments.energy + " g";
    productValues.fat.textContent =             productInfo.nutriments.fat + " g";
    productValues.sFat.textContent =            productInfo.nutriments["saturated-fat_100g"] + " g";
    productValues.proteins.textContent =        productInfo.nutriments.proteins + " g";
    productValues.sugar.textContent =           productInfo.nutriments.sugars + " g";
    
    productValues100g.carb.textContent =        productInfo.nutriments.carbohydrates_100g + " g";
    productValues100g.energy.textContent =      productInfo.nutriments.energy_100g + " g";
    productValues100g.fat.textContent =         productInfo.nutriments.fat_100g + " g";
    productValues100g.sFat.textContent =        productInfo.nutriments["saturated-fat_100g"] + " g";
    productValues100g.proteins.textContent =    productInfo.nutriments.proteins_100g + " g";
    productValues100g.sugar.textContent =       productInfo.nutriments.sugars_100g + " g";
}

function GetNutrionGrade (productInfo) {
        
    switch (productInfo.nutrition_grades) { // Check which part of the hash we're dealing with
        case "a":
            nutrition.a.classList.add("currentScore");
            break;        
        case "b":
            nutrition.b.classList.add("currentScore");
            break;        
        case "c":
            nutrition.c.classList.add("currentScore");
            break;        
        case "d":
            nutrition.d.classList.add("currentScore");
            break;        
        case "e":
            nutrition.e.classList.add("currentScore");
        break;       

        default:
            nutrition.text.textContent = "There is no known nutrition grade";
            console.log("no grade given")
    }
}

export { RenderProduct, EditProduct };