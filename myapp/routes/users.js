const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer=require('multer');
const path=require('path');

//Multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/avatar')
  },
  filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
})

var upload = multer({ storage: storage })

 

/* GET users listing. Esta estaba por express Generator, evaluar si quitar o dejar*/
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});/*

* GET login page. */
router.get('/login', usersController.login);

/* POST register page: User Generator */
router.post('/register', upload.any(), usersController.storeUser);

router.get('/register', usersController.register);


module.exports = router;

