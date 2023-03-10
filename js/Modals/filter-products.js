import {filter} from './variable.js';
import {totalSugars, totalSalt, totalCarb, totalProteins} from './render-products.js';

function FilterProduct(filterlink) {
    console.log("werkt")

    const groceriesList = JSON.parse(localStorage.getItem("groceries") || "[]");
    const linkParts = filterlink.split('0'); // Split the hash into an array of parts
    // let linkParts;

    if (linkParts.length > 1 && groceriesList.length > 0) {
        const filterName = linkParts[1]; // Get the ID from the hash
        filter.title.textContent = filterName;

        switch (filterName) { // Check which filter we're dealing with
            case "sugar":
                filter.value.textContent = Number(Math.round(totalSugars)) + " g"  
            break; 

            case "salt":
                console.log(totalSalt)
                filter.value.textContent = Number(Math.round(totalSalt)) + " g"
            break;        
            
            case "carb":
            filter.value.textContent = Number(Math.round(totalCarb)) + " g"
            break;   
            
            case "proteine":
                filter.value.textContent = Number(Math.round(totalProteins)) + " g"
            break;        
            
            default:
                console.log("nothing found");
        }

    } else filter.value.textContent = 0 + " products";

}

export { FilterProduct }