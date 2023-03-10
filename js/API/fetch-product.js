import { RenderProduct, EditProduct } from '../Modals/render-details.js';
import {
	RenderGroceriesListProduct,
	DataIsLoading,
} from '../Modals/render-products.js';
import { GetUserID } from '../Modals/saving/storage-card.js';

// Check input and give correct fetch link
function GetFetchLink(type, barcode) {
	if (type === 'string') {
		return fetch(
			`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
		);
	} else {
		return fetch(
			`https://world.openfoodfacts.org/api/v0/product/${barcode.productCode}.json`
		);
	}
}

// Fetching data
async function FetchData(url) {
	try {
		const response = await url;
		if (!response.ok) {
			throw new Error('This product is not available');
		}

		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

// Fetch Product Data
async function GetProductData(barcode, dataType) {
	DataIsLoading(true);
	const fetchArray = [];
	const data = await FetchData(GetFetchLink(typeof barcode, barcode));

	switch (dataType) {
		case 'product':
			// Product Detail

			RenderProduct(data.product, barcode);
			DataIsLoading(false);
			break;

		case 'edit':
			// Edit product
			EditProduct(data.product);
			DataIsLoading(false);
			break;

		case 'listItem':
			// Groceries List
			const obj = {
				product: data.product,
				productAmount: barcode.productAmount,
			};

			fetchArray.push(obj);
			AwaitFetchData(fetchArray);
			break;

		default:
			console.log('data type found');
	}
}

function AwaitFetchData(fetchArray) {
	const groceriesList = JSON.parse(localStorage.getItem('groceries') || '[]');
	const userID = GetUserID();
	const list = groceriesList
		.filter((item) => item.user_id === userID)
		.map((x) => x);

	let fetchArrayLength = fetchArray.length

	if (list.length > 1) fetchArray.length ++;
	if (list.length === fetchArray.length ) {
		DataIsLoading(false);

		fetchArray.forEach((list) => {
			RenderGroceriesListProduct(list.product, list.productAmount);
		});
	}
}

export { GetProductData };
