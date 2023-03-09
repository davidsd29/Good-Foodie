import {SaveProduct} from './saving/storage-product.js';

let counter = 0;
let shoppingCartAmount = 0;

const count = {
    increaseBtn: document.querySelector(".increase"),
    decreaseBtn: document.querySelector(".decrease"),
    counterIndex: document.getElementById("counter"),
    shoppingListIndex: document.getElementById("shopping-list-index"),
}

count.counterIndex.textContent = counter;

if (counter < 0) counter = 0;

function SetProduct(barcode) {
    const userInfo = window.location.hash.split('&'); // Split the hash into an array of parts

    const IDNummer = userInfo[0].split("=");

    const obj = { 
        user_id: IDNummer[1],
        productCode: barcode,
        productAmount: counter 
    };

    if (counter != 0) {
        SaveProduct(obj);
        CheckShoppingList(counter);

        counter = 0;
        count.counterIndex.textContent = counter;  
    } else {
        count.counterIndex.classList.add("required");
        console.log("Please give an amount");
    }
}

function CheckShoppingList(productAmount) {
    shoppingCartAmount = shoppingCartAmount + productAmount;

    if ( shoppingCartAmount != 0){
        count.shoppingListIndex.style.display = "block";
        count.shoppingListIndex.textContent = shoppingCartAmount;
    }
}
export { SetProduct }

count.increaseBtn.addEventListener("click", () => {
    if (count.counterIndex.classList.contains("required")) count.counterIndex.classList.remove("required");
    counter++;
    count.counterIndex.textContent = counter;
});

count.decreaseBtn.addEventListener("click", () => {
    counter--;
    count.counterIndex.textContent = counter;
});