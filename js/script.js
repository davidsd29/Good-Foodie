import {GetRouter} from './Modals/router.js';
import {StartCameraScan , StopCameraScan, GetFileBarcode} from './Modals/barcode-handler.js';
import {CheckRegister} from './Modals/user/validate-register.js';
import {CheckLogin} from './Modals/user/login.js';
import {PostProductData} from './API/post-product.js';
import {DeleteAllProducts} from './Modals/saving/storage-product.js';
import {SaveShoppingCard, DeleteShoppingCard} from './Modals/saving/storage-card.js';
import {scan, shoppingCard, popUp} from './Modals/variable.js';

const fileInput = document.getElementById("qr-input-file");
const editBtn = document.getElementById("edit-product-btn");
const welcomeBtn = document.querySelector("#welcome button");
const checkOutBtn = document.querySelector("#shopping-list button:last-of-type");
const shoppingCardButtons = document.querySelectorAll("#shopping-card a");

const form = {
    edit: document.getElementById("edit-product-form"),
    filter: document.getElementById("filters"),
    register: document.getElementById("registration-sumbit"),
    login: document.getElementById("login-submit"),
}

const welcomeButtons = document.querySelectorAll("#start-pop-up a");

function GetCodeFromUrl() {
    //  Get the hash from the URL and Split the hash into an array of parts
    const linkParts = window.location.hash.split('/'); 
    return linkParts;
}

checkOutBtn.addEventListener("click", DeleteAllProducts);

form.filter.addEventListener("input", (e) => {
    e.preventDefault();
    const userInfo = GetCodeFromUrl();

    window.location.hash = `${userInfo[0]}/#shopping-list/filter= ${e.target.value}`;
});

form.edit.addEventListener("sumbit", (e) => {
    e.preventDefault();
    const barcode = GetCodeFromUrl();
    PostProductData(barcode);
});

form.register.addEventListener("click", (e) => {
    CheckRegister(e);
});

form.login.addEventListener("click", (e) => {
    CheckLogin(e);
});

editBtn.addEventListener("click", () => {
    const linkParts = GetCodeFromUrl();
    window.location.hash = `${linkParts[0]}/#edit-product/${linkParts[2]}`;   
});


welcomeBtn.addEventListener("click", () => {
    popUp.start.classList.add("open");
});

welcomeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        popUp.start.classList.remove("open");
    })
});

popUp.closeBtn.forEach((button) => {
    button.addEventListener("click", () => {
        popUp.error.classList.remove("open");
        popUp.scan.classList.remove("open");
    })
});


shoppingCardButtons.forEach((button) => {
    button.addEventListener("click", () => {
        StartCameraScan(shoppingCard)
    })
});

shoppingCard.saveBtn.addEventListener("click", (e) => {
    SaveShoppingCard(Number(e.target.getAttribute('data-value')));
});

shoppingCard.deleteBtn.addEventListener("click", (e) => {
    DeleteShoppingCard(Number(e.target.getAttribute('data-value')));
});

shoppingCard.notNowBtn.addEventListener("click", () => {
    const linkParts = GetCodeFromUrl();

    if (linkParts[1] === "#shopping-card") {
        window.location.hash = `${linkParts[0]}/#home`;
    } else shoppingCard.frame.classList.add("hidden");
});


scan.stop.addEventListener("click", StopCameraScan);
scan.start.addEventListener("click", () => {
    StartCameraScan("product");
    popUp.scan.classList.remove("open")
}); 

scan.popup.addEventListener("click", () => {
    popUp.scan.classList.add("open")
}); 

fileInput.addEventListener("change", (e) => { GetFileBarcode(e); });

window.addEventListener("load", GetRouter);
window.addEventListener("hashchange", () => {
    GetRouter();
}, false);