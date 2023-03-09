import {RenderProduct, EditProduct} from '../Modals/render-details.js';
import {RenderGroceriesListProduct, DataIsLoading} from '../Modals/render-products.js';


// Check input and give correct fetch link
function GetFetchLink (type, barcode) {
    if (type === "string"){
        return fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    } else {
        return fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode.productCode}.json`);   
    }
}

const fetchArray = [];
// Fetch Product Data
function GetProductData(barcode, dataType) {
    DataIsLoading(true);
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
                // const obj = { 
                //     product: data.product,
                //     amount: barcode.productAmount 
                // };
                // fetchArray.push(obj);
                // AwaitFetchData(fetchArray)
                RenderGroceriesListProduct(data.product, barcode.productAmount);
                break; 

            default:
                console.log("data type found");
        }
    }))
    .catch((err) => { console.log(err) })
    .finally(
         setTimeout(() => {DataIsLoading(false)}, 5000)
        );
}

async function AwaitFetchData(list) {
    console.log(await list)
    // await list.forEach(item => {
    //     DataIsLoading(false);
    //     RenderGroceriesListProduct(item.product, item.amount);
    // });
}

export { GetProductData };