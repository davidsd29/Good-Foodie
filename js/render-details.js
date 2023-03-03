import {SetProduct} from './set-list.js';
import {form} from './variable.js';

const product = {
    img: document.querySelector(".heading img"),
    name: document.querySelector(".heading h1"),
    addButton: document.querySelector(".heading button"),
    nutrition: document.querySelector("nutrition-score"),
    productContent: document.querySelector("product-content"),
    nutritionalValues: document.querySelector("nutritional-values"),
}

const nutrition = {
  a: document.getElementById("nutriscore-A"),
  b: document.getElementById("nutriscore-B"),
  c: document.getElementById("nutriscore-C"),
  d: document.getElementById("nutriscore-D"),
  e: document.getElementById("nutriscore-E"),
}

const addButton = document.getElementById("add-item");

// Render prodcut and updating the UI
function RenderProduct(productInfo, barcode) {
    // detailPage.classList.remove("hidden");
    console.log(productInfo);
    product.name.textContent = `${productInfo.product_name}`;
    product.img.setAttribute("src", `${productInfo.image_url}`);
    product.img.setAttribute("alt", `${productInfo.product_name}`);

    if (productInfo.nutrition_grades == "a") {
        nutrition.a.classList.add("currentScore");
    } else if (productInfo.nutrition_grades == "b") {
        nutrition.b.classList.add("currentScore");
    } else if (productInfo.nutrition_grades == "c") {
        nutrition.c.classList.add("currentScore");
    } else if (productInfo.nutrition_grades == "d") {
        nutrition.d.classList.add("currentScore");
    } else if (productInfo.nutrition_grades == "e") {
        nutrition.e.classList.add("currentScore");
     }


    addButton.addEventListener("click",() => {
      SetProduct(barcode)
    });
}

function EditProduct(product, barcode) {

    console.log(product.product_name);
    // form.name.setAttribute("value", `${product.product_name}`);
    form.name.value = product.product_name;

    form.savedImg.setAttribute("src", `${product.image_url}`);
    form.sugar.value = product.nutriments.sugars;
    form.salt.value = product.nutriments.salt;
    form.nutrition.value = product.nutrition_grades;
}

export { RenderProduct, EditProduct };