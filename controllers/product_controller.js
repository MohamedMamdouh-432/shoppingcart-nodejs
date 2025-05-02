const Product = require('../models/product_model');

exports.loadProducts = async (req, res, next) => {
    const products = await Product.find();
    res.render('index', {
        title: 'Shopping Cart',
        products: products,
    });
};

