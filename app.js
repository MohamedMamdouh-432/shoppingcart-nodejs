// core & third party modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const expressHbs = require('express-handlebars');
const handlebars = require('handlebars');
const hbsAccess = require('@handlebars/allow-prototype-access');
const expressSession = require('express-session');
// custom modules
const indexRouter = require('./routes/index_route');
const usersRouter = require('./routes/user_route');
const { handleRenderError } = require('./controllers/error_controller');

// express setup
const app = express();
app.engine(
    '.hbs',
    expressHbs.engine({
        handlebars: hbsAccess.allowInsecurePrototypeAccess(handlebars),
        defaultLayout: 'layout',
        extname: '.hbs',
    })
);
app.set('view engine', '.hbs');

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    expressSession({
        secret: 'shopping-cart_?@!',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(express.static(path.join(__dirname, 'public')));

// database setup
mongoose
    .connect('mongodb://localhost:27017/shopping-cart')
    .then(() => console.log('🔥 Connected to Shopping Cart Database 🔥'))
    .catch((err) => console.log('🐛 Error connecting to MongoDB 🐛', err));

// routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter);

// error handling
app.use(handleRenderError);
app.all('*', (req, res, next) => {
    error = {
        statusCode: 404,
        name: 'NotFoundError',
    };
    handleRenderError(error, req, res, next);
});

module.exports = app;
