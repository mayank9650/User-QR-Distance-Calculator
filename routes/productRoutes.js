const express = require('express');
const { getProductList, createProduct } = require('../controllers/productController');

const route = express.Router()

route.get('/api/v1/list', getProductList)
route.post('/api/v1/createProduct', createProduct)

module.exports = route