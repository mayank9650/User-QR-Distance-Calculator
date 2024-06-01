const { usersList, ProductsList } = require('../constants/DummyData');
const UserModal = require('../models/Users')
const ProductModal = require('../models/Product')


const insertData = async (overRide = false) => {
    try {
        // Delete existing data 
        if (overRide) {
            await UserModal.deleteMany()
            await ProductModal.deleteMany()

        }
        // Inserting User Data
        const userCount = await UserModal.countDocuments();
        const productCount = await ProductModal.countDocuments();
        if (!userCount) {
            const users = await UserModal.insertMany(usersList)
            console.log('User Data added successfully', users)
        }

        // Inseting Product Data
        if (!productCount) {
            const user = await UserModal.findOne({ username: 'May' }).exec()
            const updatedProducts = ProductsList.map(productItem => {
                return {
                    ...productItem,
                    userId: user?.id
                }
            })
            const products = await ProductModal.insertMany(updatedProducts)
            console.log('Product Data added successfully', products)
        }

    } catch (error) {
        console.log('Error: ', error)
    }
}

module.exports = {
    insertData
}