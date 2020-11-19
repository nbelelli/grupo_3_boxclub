const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer=require('multer');
const path = require('path');

//Multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'tmp/my-uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now + path.extname(file.originalname))
    }
  })


//Ir al listado de productos
router.get('/', productsController.products);
//ir a la pagina de carga de producto
router.get('/create', productsController.create);
//ir a la pagina de Edicion de producto
router.get('/edit', productsController.edit);
//ir a la pagina de Detalle de Producto
router.get('/detail', productsController.detail);


module.exports = router;
