import {form} from '../variable.js';

function PostProductData(barcode) {
  const productData = {
    name: form.name.value,
    // img: form.img,
    sugar: form.sugar.value,
    salt: form.salt.value,
    nutrition: form.nutrition.value
  };

  console.log(productData);

    try {
        fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: productData
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
            })
    } catch(error) {
        // enter your logic for when there is an error (ex. error toast)
        console.log("Het werkt niet gap kijk hier:" + error)
    } 
}

export { PostProductData }