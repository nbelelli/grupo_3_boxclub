var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const methodOverride = require('method-override');

const setSession = require('../myapp/middlewares/setSession');
const setLocals = require('../myapp/middlewares/setLocals');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');
const apiUsersRouter = require('./routes/api/users');
const apiProductsRouter = require('./routes/api/products');
const apiCategoriesRouter = require('./routes/api/categories');
var app = express();

//express-session
const session = require('express-session');
app.use(cors());
app.use(
	session({
		secret: 'SecretMessage',
		resave: true,
		saveUninitialized: true,
	})
);

// view engine setup - rutas

app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(setSession);
app.use(setLocals);

app.use('/', indexRouter);
app.use('/cart', cartRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/admin', adminRouter);

// api routes
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/categories', apiCategoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
