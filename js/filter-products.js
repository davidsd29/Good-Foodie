import {filter} from './variable.js';
import {totalSugars, totalSalt, totalKoolhydr, totalProteins} from './render-products.js';

function FilterProduct(filterlink) {

    const groceriesList = JSON.parse(localStorage.getItem("groceries") || "[]");
    const linkParts = filterlink.split('0'); // Split the hash into an array of parts

    if (linkParts.length > 1 && groceriesList.length > 0) {
        const filterName = linkParts[1]; // Get the ID from the hash
        filter.title.textContent = filterName;

        switch (filterName) { // Check which part of the hash we're dealing with
            case "sugar":
                filter.value.textContent = Math.round(totalSugars) + " g"  
            break; 

            case "salt":
                filter.value.textContent = Math.round(totalSalt) + " g"
            break;        
            
            case "koolhydr":
            filter.value.textContent = Math.round(totalKoolhydr) + " g"
            break;   
            
            case "proteine":
                filter.value.textContent = Math.round(totalProteins) + " g"
            break;        
            
            default:
                console.log("nothing found");
        }

    } else filter.value.textContent = 0 + " products";

}

export { FilterProduct }