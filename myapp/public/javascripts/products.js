window.onload = function () {
	const API_BASE_URL = 'http://localhost:3000/api/products';

	const axiosAPI = axios.create({
		baseURL: API_BASE_URL,
	});

	const productsContainer = document.querySelector('#prueba');

	function renderProducts(products) {
		for (product of products) {
			productsContainer.innerHTML += `
            <div class="card" style="width: 18rem; margin-bottom: 20px">
            <img          
                src="/images/Products/${product.Images[0].file_name} " 
                class="card-img-top prodImage"
                alt="..."
            />
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">$${product.price}</p>
                <a href="/products/${product.id}" class="btn btn-primary"
                    >Ver</a
                >
                <a href="#" class="btn btn-primary"
                    >Agregar al carrito</a
                >
            </div>
        </div>
            `;
		}
	}
	const queryString = window.location.search;
	const params = new URLSearchParams(queryString);
	const category = params.get('category');
	const keyword = params.get('keyword');
	let request = '';
	if (category) {
		request += '/category/' + category;
	}
	if (keyword) {
		request += '/keyword/' + keyword;
	}

	function loadProducts(request) {
		axiosAPI.get(request).then((res) => {
			console.log(res.data.data.products);
			renderProducts(res.data.data.products);
		});
	}

	loadProducts(request);
};
