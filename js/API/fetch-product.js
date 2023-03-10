import { RenderProduct, EditProduct } from '../Modals/rendering/render-details.js';
import { DataIsLoading,} from '../Modals/rendering/render-products.js';

// Check input and give correct fetch link
function GetFetchLink(type, barcode) {
	if (type === 'string') {
		return fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
	} else {
		return fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode.productCode}.json`);
	}
}


// Fetching data
async function GetData(url) {
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
async function ReplanishData(barcode, dataType) {
	DataIsLoading(true);
	const data = await GetData(GetFetchLink(typeof barcode, barcode));

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

			return obj;
		default:
			console.log('data type found');
	}
}

export { ReplanishData };
