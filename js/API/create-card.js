import {shoppingCard} from '../Modals/variable.js';

function CreateBarcodeImage(barcode, saved) {
    document.getElementById('card-code').setAttribute("src", `https://barcodeapi.org/api/${barcode}`);
    if (!shoppingCard.invite.classList.contains("hidden"))     shoppingCard.invite.classList.add("hidden");
    if (shoppingCard.card.classList.contains("hidden"))        shoppingCard.card.classList.remove("hidden");
    
    
    if (saved) {
        if (shoppingCard.deleteSection.classList.contains("hidden")) shoppingCard.deleteSection.classList.remove("hidden");
    } else {
        if (shoppingCard.saveSection.classList.contains("hidden")) shoppingCard.saveSection.classList.remove("hidden");
    }

    shoppingCard.saveBtn.setAttribute("data-value", `${barcode}`);
    shoppingCard.deleteBtn.setAttribute("data-value", `${barcode}`);
}

 export {
    CreateBarcodeImage
 }
 

