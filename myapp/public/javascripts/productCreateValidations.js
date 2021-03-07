window.addEventListener('load', function () {
	const form = document.querySelector('.createEditForm');
	const name = document.querySelector('#name');
	const price = document.querySelector('#price');
	const discount = document.querySelector('#discount');
	const image = document.querySelector('#image');
	const category = document.querySelector('#category');
	const description = document.querySelector('#description');
	function getFileExtn(filename) {
		return filename.split('.').pop();
	}

	form.addEventListener('submit', function (e) {
		let errors = [];

		let ulErrores = document.querySelector('div.errores ul');

		/*  Comprueba si existen errores */
		if (ulErrores.innerHTML != '') {
			ulErrores.innerHTML = '';
		}
		if (name.value == '') {
			errors.push('El Nombre es obligatorio');
		}

		if (price.value == '') {
			errors.push('El Precio es obligatorio');
		}

		if (discount.value == '') {
			errors.push('Si no hay descuento, por favor ingrese 0');
		}

		if (discount.value > 99) {
			errors.push('El maximo descuento es de 99%');
		}

		if (image.value == '') {
			errors.push('El producto debe tener al menos 1 imagen');
		}

		for (image of image.files) {
			let extn = getFileExtn(image.name);
			if (!(extn == 'jpg' || extn == 'png' || extn == 'jpeg')) {
				errors.push('Los formatos correctos son JPG, PGN y JPEG');
			}
		}

		if (description.value == '') {
			errors.push('La descripción del producto no puede estar vacia');
		}

		if (errors.length > 0) {
			e.preventDefault();
			for (error of errors) {
				ulErrores.innerHTML += '<li>' + error + '</li>';
			}
		}
	});
});
