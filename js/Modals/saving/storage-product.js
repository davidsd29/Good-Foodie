import {GetGroceriesList, CheckListAmount, SetProductAmount} from '../render-products.js';
import { GetUserID } from './storage-card.js';

const completePopUp = document.getElementById("complete-pop-up");
const completePopUTpext = document.querySelector("#complete-pop-up p");
const listFrame = document.getElementById("list-frame");
const userID = GetUserID();

function DisplayTaskCompletePopUp(message) {
    completePopUp.classList.add("open");
    completePopUTpext.textContent = message;
    setTimeout(function() {completePopUp.classList.remove("open");}, 2000);
}


function SaveProduct(product) {
  const groceriesList = JSON.parse(localStorage.getItem("groceries") || "[]");
  const products = groceriesList.filter((item) => item.user_id === userID ).map(x => x);
    if (groceriesList.length !== 0) {
      console.log(products)
      console.log(products.length)
      console.log("appel")
      
       if (products.length == 0) {
            groceriesList.push(product);
            console.log("banaan")
            StoreGroceriesList(groceriesList);
        } else {
          console.log("citroen")

      // Empty groceriesList before adding new items
      while (listFrame.lastElementChild) {
          listFrame.removeChild(listFrame.lastElementChild);
      }

      products.forEach(listItem => {  
        if (product.productCode === listItem.productCode) {
          console.log("druif")
          console.log(listItem)

          listItem.productAmount = listItem.productAmount + product.productAmount;
        } else {
          console.log("peer")
          groceriesList.push(product);
        }
      });

      StoreGroceriesList(groceriesList);
    }
  } else {
      localStorage.setItem("groceries", JSON.stringify([product]));
      DisplayTaskCompletePopUp("Product is saved successfully");

  }
}

function StoreGroceriesList(groceriesList) {
  console.log("mango")
    localStorage.setItem("groceries", JSON.stringify(groceriesList));
    DisplayTaskCompletePopUp("Product is saved successfully");
}


// Remove the product of the user from localstorage
function DeleteProduct(productCode, listItem) {
  const groceriesList = JSON.parse(localStorage.getItem("groceries") || "[]");

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
  const products = groceriesList.filter((item) => item.user_id === userID).map((x) => x);

  // Empty groceriesList HTML
  while (listFrame.children.length > 1) {
    listFrame.removeChild(listFrame.lastChild);
  }

  products.forEach(item => {
    const productIndex = groceriesList.indexOf(item);
    groceriesList.splice(productIndex, 1);

    console.log(groceriesList)
    localStorage.setItem("groceries", JSON.stringify(groceriesList));
    DisplayTaskCompletePopUp("Groceries has successfully been deleted");
    GetGroceriesList(true);
  });
}


export { 
  SaveProduct, 
  DeleteProduct, 
  DeleteAllProducts, 
  DisplayTaskCompletePopUp 
}