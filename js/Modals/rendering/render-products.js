import { ReplanishData } from '../../API/fetch-product.js';
import { filter, popUp } from '../variable.js';
import { DeleteProduct } from '../saving/storage-product.js';
import { GetUserID } from '../saving/storage-card.js';

const filterToggle = document.querySelector("input[name='open-filter']");
const filterSumbit = document.getElementById('filter-submit');
const listFeedback = document.getElementById('empty-list');
const listFrame = document.getElementById('list-frame');

const listItemScaling = [{ transform: 'scale(1)' }, { transform: 'scale(0)' }];

const listItemTiming = {
	duration: 1000,
	iterations: 1,
};

let dataIsLoading = false;

let totalSugars = 0,
	totalSalt = 0,
	totalProteins = 0,
	totalCarb = 0,
	listProductsAmount = 0;

function DataIsLoading(loading) {
	if (loading) {
		dataIsLoading = true;
		popUp.loading.classList.add('open');
	} else {
		dataIsLoading = false;
		popUp.loading.classList.remove('open');
	}
}

function RenderGroceriesListProduct(productInfo, productAmount) {
	const groceriesList = JSON.parse(localStorage.getItem('groceries') || '[]');
	let listItem;

	if (!dataIsLoading) {
		popUp.loading.classList.remove('open');

		for (let index = 0; index < groceriesList.length; index++) {
			totalSugars = totalSugars + productInfo.nutriments.sugars;
			totalSalt = totalSalt + productInfo.nutriments.salt;
			totalProteins = totalProteins + productInfo.nutriments.proteins;
			totalCarb = totalCarb + productInfo.nutriments.carbohydrates;

			// If value does not exist give a value of 0
			if (productInfo.nutriments.sugars !== 'undefined')
				productInfo.nutriments.sugars = 0;
			if (productInfo.nutriments.salt !== 'undefined')
				productInfo.nutriments.salt = 0;
			if (productInfo.nutriments.proteins !== 'undefined')
				productInfo.nutriments.proteins = 0;
			if (productInfo.nutriments.carbohydrates !== 'undefined')
				productInfo.nutriments.carbohydrates = 0;

			// Make HTML Block
			const xmlString = `<li> 
                    <div>
                        <img src='${productInfo.image_url}' alt='${productInfo.product_name}'></img>
                        <aside>
                            <div>
                                <h3>${productInfo.product_name}</h3>
                                <span>${productAmount} x</span>
                            </div>

                            <section>
                                <div>
                                    <p>Proteins:</p>
                                    <p id='proteins'>${productInfo.nutriments.proteins} g</p>
                                </div>
                                <div>
                                    <p>Carbs:</p>
                                    <p id='carb'>${productInfo.nutriments.carbohydrates} g</p>
                                </div>
                                <div>
                                    <p>Sugar:</p>
                                    <p id='sugar'>${productInfo.nutriments.sugars} g</p>
                                </div>
                                <div>
                                    <p>Salt:</p>
                                    <p id='salt'>${productInfo.nutriments.salt} g</p>
                                </div>
                            </section>
                        </aside>
                    </div>
                        
                    <button class="list-delete" data-value="${productInfo.id}">Delete</button>
                </li> `;

			listItem = new DOMParser().parseFromString(xmlString, 'text/xml');
		}

		// Append to another element:
		listFrame.appendChild(listItem.documentElement);

		// Of By One Error. childElementCount startes with 0. legnth starts with 1
		let listChilderenCount = listFrame.childElementCount - 1;
		const userID = GetUserID();

		// Get The amount of products of the user
		const UserProductsAmount = groceriesList.filter(
			(x) => x.user_id === userID
		);

		if (listChilderenCount === UserProductsAmount.length) {
			const itemButtons = listFrame.querySelectorAll('button');
			itemButtons.forEach((deleteButton) => {
				deleteButton.addEventListener('click', (e) => {
					let listItem = e.target.closest('li');

					// Web API animation
					listItem.animate(listItemScaling, listItemTiming);

					setTimeout(() => {
						DeleteProduct(Number(e.target.getAttribute('data-value')),listItem);
					}, 900);
				});
			});
		}
	}
}


function CheckListAmount(list) {
	if (list == 0) {
		filter.value.textContent = list + ' products';
		listFeedback.classList.remove('hidden');
	} else listFeedback.classList.add('hidden');
}

function GetGroceriesList(empty) {
	const groceriesList = JSON.parse(localStorage.getItem('groceries') || '[]');
	const userID = GetUserID();
	const hash = window.location.hash; // Get the hash from the URL
	const linkParts = hash.split('/'); // Split the hash into an array of parts

	const list = groceriesList
		.filter((item) => item.user_id === userID)
		.map((x) => x);
		
	const fetchArrays = list.map((item) => {
		return ReplanishData(item, 'listItem');
	});

	// whille loop hier
	if (!empty) {
	    // Empty groceriesList HTML
	    while (listFrame.children.length > 1) {
	        listFrame.removeChild(listFrame.lastChild);
	    }

		// Get amount of all the products
		groceriesList.forEach((item) => {
			if (item.user_id === userID)
			listProductsAmount = listProductsAmount + item.productAmount;
		});
	}

	CheckListAmount(list.length);

	// Check if filtertoggle is not active or if there is no filter in url
	if (filterToggle.checked == false || linkParts.length < 3) SetProductAmount(listProductsAmount);

	Promise.all(fetchArrays).then(data => {
		data.forEach(list => {
			DataIsLoading(false);
			RenderGroceriesListProduct(list.product, list.productAmount);
		});
	})
}

function SetProductAmount(amount) {
	filter.title.textContent = 'Products';
	filter.value.textContent = amount + ' items';
}

filterSumbit.addEventListener('click', () => {
	SetProductAmount(listProductsAmount);
});

export {
	totalCarb,
	totalSalt,
	totalSugars,
	totalProteins,
	DataIsLoading,
	CheckListAmount,
	SetProductAmount,
	GetGroceriesList,
	RenderGroceriesListProduct,
};
