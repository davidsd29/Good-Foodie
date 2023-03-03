import {RenderProduct} from '../render-details.js';
import {EditProduct} from '../render-details.js';
import {RenderGroceriesListProduct} from '../render-products.js';


function GetProductData(barcode) {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
    .then((response) => response.json())
    .then(( data => {
        RenderProduct(data.product, barcode);
    }));
}

function GetSelectedProductData(barcode) {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
    .then((response) => response.json())
    .then(( data => {
        EditProduct(data.product, barcode);
    }));
}

function FetchGroceriesList(item) {          
    fetch(`https://world.openfoodfacts.org/api/v0/product/${item.productCode}.json`)
    .then((response) => response.json())
    .then(( data => {
            RenderGroceriesListProduct(data.product, item.productAmount);
        }));
} 


// GetGroceriesListData();
export { GetProductData, FetchGroceriesList, GetSelectedProductData };