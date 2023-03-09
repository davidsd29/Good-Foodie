import {GetGroceriesList, CheckListAmount, SetProductAmount} from '../render-products.js';
import { GetUserID } from './storage-card.js';

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
    if (groceriesList.length === 0) {
      localStorage.setItem("groceries", JSON.stringify([product]));
    } else {

    // Empty groceriesList before adding new items
    while (listFrame.lastElementChild) {
        listFrame.removeChild(listFrame.lastElementChild);
    }

      groceriesList.forEach(listItem => {
        if (product.productCode == listItem.productCode) {
          listItem.productAmount = listItem.productAmount + product.productAmount;
        } else {
          groceriesList.push(product);
        }
      });

      localStorage.setItem("groceries", JSON.stringify(groceriesList));

      DisplayTaskCompletePopUp("Product is saved successfully")
    }
}


// Remove the product of the user from localstorage
function DeleteProduct(productCode, listItem) {
  const groceriesList = JSON.parse(localStorage.getItem("groceries") || "[]");
  const userID = GetUserID();

  	// const products = groceriesList.filter(
		// (item) => item.user_id === userID );
    // console.log(products)
    
    groceriesList.forEach(item => {
      if ( item.user_id === userID && item.productCode == productCode) {

        // Get index of the product
        const productIndex = groceriesList.indexOf(item);
        groceriesList.splice(productIndex, 1);
      }
    });

  // // Set the new list back in localstorage
  localStorage.setItem("groceries", JSON.stringify(groceriesList));
  DisplayTaskCompletePopUp("Product has successfully been deleted");

  // Remove list HTML Item
  listItem.remove();

    const products = groceriesList.filter((item) => item.user_id === userID );

  //   console.log(products)
  //   products.forEach((item) => {
  //     let totalAmount = 0;
  //     totalAmount = totalAmount + item.productAmount;

  //     console.log(totalAmount)
  //  })
    // SetProductAmount(amount)
    CheckListAmount(products.length);
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


export { 
  SaveProduct, 
  DeleteProduct, 
  DeleteAllProducts, 
  DisplayTaskCompletePopUp 
}