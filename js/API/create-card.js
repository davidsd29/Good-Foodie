function CreateBarcodeImage(barcode) {
    document.getElementById('card-code').src = `https://barcodeapi.org/api/${barcode}`;
}

 export {
    CreateBarcodeImage
 }
 

