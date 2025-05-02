const router = require('express').Router();
const catchAsync = require('../utils/catch_async')
const productController = require('../controllers/product_controller')

router.get('/', catchAsync(productController.loadProducts));

module.exports = router
