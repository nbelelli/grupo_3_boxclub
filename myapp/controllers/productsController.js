const { renderFile } = require('ejs');
const fs = require('fs');
const path = require('path');

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

function getAllProducts() {
	//Devuelve la DB en un array de objetos literales
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}

function writeProducts(productsToSave) {
	//Recibe un Array de objetos literales.
	//Lo convierte en un JSON
	//Reemplaza TODO el json de DB con este nuevo JSON
	const productsToStringify = JSON.stringify(productsToSave, null, ' ');
	return fs.writeFileSync(productsFilePath, productsToStringify);
}

function generateNewId() {
	const products = getAllProducts();
	return products.pop().id + 1;
}

const productsController = {
	/* Navigates to the products list page */
	products: (req, res) => {
		res.locals.title = 'Products';
		const products = getAllProducts();
		res.render('Products/productsList', { products: products });
	},

	/* Navigates to the Create product page */
	create: (req, res) => {
		res.locals.title = 'Create';
		res.render('Products/productCreate');
	},
  	edit: (req, res) => {
		res.locals.title = 'Edit';
		res.render('Products/productEdit');
	},
	/*  Store new product  */
	store:(req,res)=>{
		const newProduct ={
			id: generateNewId(),
			name: req.body.name,
			price: req.body.price,   
			discount: req.body.discount,
			//select ver como lo solicito, no tiene name
			stock: req.body.stock,
			bestSeller: req.body.bestSeller,
			description: req.body.description,
			image: "vino1.jpg"
			//image: req.files[0].filesname 
			}
		//return newProduct;
		const products = getAllProducts();
		products.push(newProduct);
		writeProducts(products);
		res.redirect("/");
	
	},

	detail: (req, res) => {
		const products = getAllProducts();
		const theProduct = products.find((prod) => {
			return prod.id == req.params.id;
		});

		if (theProduct == undefined) {
			res.send('Producto no encontrado');
		} else {
			res.render('Products/productDetail', { theProduct: theProduct });
		}
	},
	delete: (req, res) => {
		const products = getAllProducts();
		const newProducts = [];
		for (product of products) {
			if (product.id != req.params.id) {
				newProducts.push(product);
			}
		}

		writeProducts(newProducts);
		res.redirect('/products');
	},
};

module.exports = productsController;
