const ProductModal = require('../models/Product')
const UserModal = require('../models/Users')
const asyncHandler = require("express-async-handler")
const mongoose = require('mongoose');

const getProductList = asyncHandler(async (req, res) => {
    const productCount = await ProductModal.countDocuments();
    let { page, limit } = req.query;
    page = parseInt(page) || 1
    limit = parseInt(page) || 10
    const skip = (page - 1) * limit
    const products = await ProductModal.find().skip(skip).limit(limit).lean()

    res.status(200).json({ data: products, message: 'Proudcts list', count: productCount, status: true })
})

const createProduct = asyncHandler(async (req, res) => {
    const { productName, productDescription, userId } = req.body
    if (!productName) {
        return res.status(400).json({ data: null, status: false, message: "Product Name is required!" })
    }
    // Validate ObjectId
    if (!userId || !mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ data: null, status: false, message: "User Id is either invalid or required!" });
    }

    // Check for valid user
    const user = await UserModal.findById(userId).exec()
    if (!user) {
        return res.status(400).json({ data: null, status: false, message: "Invalid user!" })
    }

    const product = await ProductModal.create({ productName, productDescription, userId })

    if (product) {
        return res.status(201).json({ data: product, message: `New product created`, status: true })
    }

    res.status(400).json({ data: null, status: false, message: "Invalid data received!" })
})

module.exports = {
    getProductList,
    createProduct
}