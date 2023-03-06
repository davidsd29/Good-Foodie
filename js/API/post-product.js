import { editForm } from '../Modals/variable.js';

function PostProductData(barcode) {
  const productData = {
    name: editFrom.name.value,
    // img: form.img,
    sugar: editFrom.sugar.value,
    salt: editFrom.salt.value,
    nutrition: editFrom.nutrition.value
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