const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Product', productSchema)