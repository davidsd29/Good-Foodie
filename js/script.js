import {GetRouter} from './Modals/router.js';
import {ScanProductBarcode , StopCameraScan, GetFileBarcode} from './Modals/barcode-handler.js';
import {scan, shopping, popUp} from './Modals/variable.js';
import {CheckRegister} from './Modals/user/validate-register.js';
import {CheckLogin} from './Modals/user/login.js';
import {PostProductData} from './API/post-product.js';

const fileinput = document.getElementById("qr-input-file");
const editBtn = document.getElementById("edit-product-btn");
const welcomeBtn = document.querySelector("#welcome button");

const form = {
    edit: document.getElementById("edit-product-form"),
    filter: document.getElementById("filters"),
    register: document.getElementById("registration-sumbit"),
    login: document.querySelector("registration-sumbit input[type='submit']"),
}

const welcomeButtons = document.querySelectorAll("#start-pop-up a");

function GetCodeFromUrl() {
    const hash = window.location.hash; // Get the hash from the URL
    const linkParts = hash.split('/'); // Split the hash into an array of parts

    if (linkParts.length > 1) {
        const code = linkParts[1]; // Get the ID from the hash
        return code;
    }
}


form.filter.addEventListener("input", (e) => {
    e.preventDefault();
    window.location.hash = `#shopping-list/filter= ${e.target.value}`;
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

welcomeBtn.addEventListener("click", () => {
    popUp.start.classList.add("open");
});

popUp.closeBtn.forEach((button) => {
    button.addEventListener("click", () => {
        popUp.error.classList.remove("open");
        popUp.scan.classList.remove("open");
    })
});

welcomeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        popUp.start.classList.remove("open");
    })
});

editBtn.addEventListener("click", () => {
    const barcode = GetCodeFromUrl();
    window.location.hash = `#edit-product/${barcode}`;   
});

shopping.button.addEventListener("click", () => {
    if (window.location.hash === "#shopping-card") {
        window.location.hash = "#home";
    } else shopping.frame.classList.add("hidden");
});

scan.stop.addEventListener("click", StopCameraScan);
scan.start.addEventListener("click", () => {
    ScanProductBarcode();
    popUp.scan.classList.remove("open")
}); 

scan.popup.addEventListener("click", () => {
    popUp.scan.classList.add("open")
}); 

fileinput.addEventListener("change", e => { GetFileBarcode(e); });

window.addEventListener("load", GetRouter);
window.addEventListener("hashchange", () => {
    GetRouter();
}, false);