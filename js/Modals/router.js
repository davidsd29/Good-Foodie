import {GetProductData} from '../API/fetch-product.js';
import {FilterProduct} from './filter-products.js';
import {GetGroceriesList} from './render-products.js';
import {StartCameraScan} from './barcode-handler.js';
import {CreateBarcodeImage} from '../API/create-card.js';
import {shoppingCard} from './variable.js';

const page = {
    welcome: document.getElementById("welcome"),
    home: document.getElementById("home"),
    card: document.getElementById("shopping-card"),
    shoppingList: document.getElementById("shopping-list"),
    detail: document.getElementById("product-detail"),
    edit: document.getElementById("edit-product"),
    register: document.getElementById("register"),
    login: document.getElementById("login"),
}

const nav = {
    footer: document.querySelector("footer"),
    header: document.querySelector("header")
}

const listFilter = document.getElementById("filters");
const errorPopUp = document.getElementById("error-pop-up");
const completePopUTpext = document.querySelector("#error-pop-up p");

function DisplayTaskCompletePopUp(message) {
    errorPopUp.classList.add("open");
    completePopUTpext.textContent = message;
}

function CheckCardExist() {
    const shoppingCardBarcode = JSON.parse(localStorage.getItem("shoppingCard") || "[]");

    if (shoppingCardBarcode.length == 0) {
        shoppingCard.card.classList.add("hidden");
    } else {
        shoppingCard.card.classList.remove("hidden");
        shoppingCard.invite.classList.add("hidden");
    }
}

// Hide all pages
function HideAllPages() {
    if (!page.welcome.classList.contains("hidden"))        page.welcome.classList.add("hidden");
    if (!page.home.classList.contains("hidden"))           page.home.classList.add("hidden");
    if (!page.card.classList.contains("hidden"))           page.card.classList.add("hidden");
    if (!page.shoppingList.classList.contains("hidden"))   page.shoppingList.classList.add("hidden");
    if (!page.edit.classList.contains("hidden"))           page.edit.classList.add("hidden");
    if (!page.detail.classList.contains("hidden"))         page.detail.classList.add("hidden");
    if (!page.register.classList.contains("hidden"))       page.register.classList.add("hidden");
    if (!page.login.classList.contains("hidden"))          page.login.classList.add("hidden");
    if (!listFilter.classList.contains("hidden"))          listFilter.classList.add("hidden"); 
}

function RemoveNavigation() {
    nav.footer.classList.add("hidden");
    nav.header.classList.add("hidden");
}

function DisplayNavigation() {
    if (nav.footer.classList.contains("hidden"))          nav.footer.classList.remove("hidden");
    if (nav.header.classList.contains("hidden"))          nav.header.classList.remove("hidden");
}

function GetRouter() {
    const hash = window.location.hash; // Get the hash from the URL
    const linkParts = hash.split('/'); // Split the hash into an array of parts

    if (linkParts.length > 1) {
        switch (linkParts[1]) { // Check which part of the hash we're dealing with 
            case "#home":

                CheckCardExist();
                HideAllPages();
                DisplayNavigation();
                page.home.classList.remove("hidden");
                page.card.classList.remove("hidden");
            break; 

            case "#shopping-list":
                if (linkParts.length >= 3) {
                    const filterLink = linkParts[2]; // Get the filter from the hash
                    FilterProduct(filterLink);
                }
                
                // GetGroceriesListData();
                GetGroceriesList();
                HideAllPages();
                page.shoppingList.classList.remove("hidden");
                listFilter.classList.remove("hidden");
            break;   
            
            case "#product":
                if (linkParts.length >= 3) {
                    const barcode = linkParts[2]; // Get the ID from the hash
                    GetProductData(barcode, "product");
                }

                HideAllPages();
                page.detail.classList.remove("hidden");
            break;         
            
            case "#shopping-card":

                // let number = 2622213062385;
                if (linkParts.length >= 3 ) {
                    const barcode = linkParts[2]; // Get the ID from the hash
                    CreateBarcodeImage(barcode);
                } else {
                    StartCameraScan("shopping-card");
                    // CreateBarcodeImage(number);
                }

                CheckCardExist();
                HideAllPages();
                page.card.classList.remove("hidden");  
            break;  
            
            case "#edit-product":

                if (linkParts.length >= 3) {
                    const barcode = linkParts[2]; // Get the ID from the hash
                    GetProductData(barcode, "edit");
                }

                HideAllPages();
                page.edit.classList.remove("hidden");
            break;               
            
            default:
                DisplayTaskCompletePopUp("We couldn't find the url you are looking for.")
                window.location.hash = "";
        }
    } else {
        switch (linkParts[0]) { // Check which part of the hash we're dealing with
            case "":
                HideAllPages();
                RemoveNavigation();
                page.welcome.classList.remove("hidden");

            break;

            case "#register":

                HideAllPages();
                RemoveNavigation()
                page.register.classList.remove("hidden");
            break;         
            
            case "#login":

                HideAllPages();
                RemoveNavigation()
                page.login.classList.remove("hidden");
            break; 
            
            default:
                DisplayTaskCompletePopUp("We couldn't find the url you are looking for.");
                window.location.hash = "";
        }
    }
}

export { GetRouter };