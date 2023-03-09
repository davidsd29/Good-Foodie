import {RenderProduct, EditProduct} from '../Modals/render-details.js';
import {RenderGroceriesListProduct} from '../Modals/render-products.js';

// Check input and give correct fetch link
function GetFetchLink (type, barcode) {
    if (type === "string"){
        return fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    } else {
        return fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode.productCode}.json`);   
    }
}

// Fetch Product Data
function GetProductData(barcode, dataType) {
    let fetchlink = GetFetchLink(typeof(barcode), barcode);

    fetchlink
    .then((response) => response.json())
    .then(( data => {

        switch (dataType) {
            case "product":

                // Product Detail
                RenderProduct(data.product, barcode);
                break; 

            case "edit":

                // Edit product
                EditProduct(data.product);
                break;  

            case "listItem":

                // Groceries List
                RenderGroceriesListProduct(data.product, barcode.productAmount);
                break; 

            default:
                console.log("data type found");
        }
    })).catch((err) => { console.log(err) });
}

export { GetProductData };