import { shoppingCard } from '../variable.js';
import { CheckCardExist } from '../router.js';
import { DisplayTaskCompletePopUp } from './storage-product.js';

// Get userr ID number from URL
function GetUserID() {
	const userInfo = window.location.hash.split('&'); // Split the hash into an array of parts
	const userID_Number = userInfo[0].split('=');

	return userID_Number[1];
}


function SaveShoppingCard(barcode) {
	const shoppingCards = JSON.parse(
		localStorage.getItem('shoppingCards') || '[]'
	);

	const userID = GetUserID();
	// Making object with userID and barcode
	const obj = {
		user_id: userID,
		cardCode: barcode,
	};

	if (shoppingCards.length === 0) {
		localStorage.setItem('shoppingCards', JSON.stringify([obj]));
		DisplayTaskCompletePopUp('Shopping card is saved successfully');
	} else {
		shoppingCards.push(obj);
		localStorage.setItem('shoppingCards', JSON.stringify(shoppingCards));
		DisplayTaskCompletePopUp('Shopping card is saved successfully');
	}

	shoppingCard.deleteSection.classList.remove('hidden');
	shoppingCard.saveSection.classList.add('hidden');
}


function DeleteShoppingCard(barcode) {
	const shoppingCards = JSON.parse(localStorage.getItem('shoppingCards'));
	const userID = GetUserID();

    // Runs through array en gives back the needed object
	const userCardBarcode = shoppingCards.reduce(
		(item) => item.user_id === userID
	);

	const cardIndex = shoppingCards.indexOf(userCardBarcode.barcode);
	shoppingCards.splice(cardIndex, 1);

	// Set the new list back in localstorage
	localStorage.setItem('shoppingCard', JSON.stringify(shoppingCards));
	DisplayTaskCompletePopUp('Shopping Card has successfully been deleted');

    CheckCardExist();
}

export { GetUserID, SaveShoppingCard, DeleteShoppingCard };
