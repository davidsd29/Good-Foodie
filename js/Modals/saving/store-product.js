import {GetGroceriesList} from '../render-products.js';
import {shoppingCard} from '../variable.js';

const completePopUp = document.getElementById("complete-pop-up");
const completePopUTpext = document.querySelector("#complete-pop-up p");
const listFrame = document.getElementById("list-frame");

function DisplayTaskCompletePopUp(message) {
    completePopUp.classList.add("open");
    completePopUTpext.textContent = message;
    setTimeout(function() {completePopUp.classList.remove("open");}, 2000);
}


function SaveProduct(product) {
  const groceriesList = JSON.parse(localStorage.getItem("groceries") || "[]");
  console.log(product)
    if (groceriesList.length == 0) {
      console.log("no products in de list");
      localStorage.setItem("groceries", JSON.stringify([product]));
    } else {

    // Empty groceriesList before adding new items
    while (listFrame.lastElementChild) {
        listFrame.removeChild(listFrame.lastElementChild);
    }

      groceriesList.forEach(listItem => {
        if (product.productCode === listItem.productCode) {
          console.log("hallo")
          listItem.productAmount = listItem.productAmount + product.productAmount;
        } else {
          groceriesList.push(product);
        }
      });

      console.log("product saved");
      localStorage.setItem("groceries", JSON.stringify(groceriesList));

      DisplayTaskCompletePopUp("Product is saved successfully")
    }
}


// Remove the story from localstorage
function DeleteProduct(product) {
  const groceriesList = JSON.parse(localStorage.getItem("groceries") || "[]");
  
  // Get index of the product
  const productIndex = groceriesList.indexOf(product);
  groceriesList.splice(productIndex, 1);
  
  // Set the new list back in localstorage
  localStorage.setItem("groceries", JSON.stringify(groceriesList));
  DisplayTaskCompletePopUp("Product has successfully been deleted")
}

function DeleteAllProducts() {
  const groceriesList = JSON.parse(localStorage.getItem("groceries") || "[]");

    for (let i = 0; i <= groceriesList.length; i++) {;
      // groceriesList.splice(groceriesList.indexOf(i), 1);
      console.log(groceriesList.length)
      groceriesList.pop();

      if (groceriesList.length == 0) {
        // Set the new list back in localstorage
        localStorage.setItem("groceries", JSON.stringify(groceriesList));
        DisplayTaskCompletePopUp("Groceries has successfully been deleted");
        GetGroceriesList();
      }

    }

}


function SaveShoppingCard(barcode) {
  const shoppingCardBarcode = JSON.parse(localStorage.getItem("shoppingCard") || "[]");

  if (shoppingCardBarcode.length == 0) {
    console.log("no card in saved");
    localStorage.setItem("shoppingCardBarcode", JSON.stringify(barcode));
    DisplayTaskCompletePopUp("Shopping card is saved successfully")
  } else {
      shoppingCard.card.classList.remove("hidden");
      shoppingCard.invite.classList.add("hidden");
  }
}


function DeleteShoppingCard(barcode) {
  const cardBarcode = JSON.parse(localStorage.getItem("shoppingCard") || "[]");

  const cardIndex = cardBarcode.indexOf(barcode);
  cardBarcode.splice(cardIndex, 1);

  // Set the new list back in localstorage
  localStorage.setItem("shoppingCard", JSON.stringify(cardBarcode));
  DisplayTaskCompletePopUp("Shopping Card has successfully been deleted")
  shoppingCard.card.classList.add("hidden");
  shoppingCard.invite.classList.remove("hidden");
}


export { 
  SaveProduct, 
  DeleteProduct, 
  SaveShoppingCard,
  DeleteAllProducts, 
  DeleteShoppingCard,
  DisplayTaskCompletePopUp 
};