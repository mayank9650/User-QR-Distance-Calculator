const UserModal = require('../models/Users')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

/**
 * Get list of users
 */
const getUsersList = asyncHandler(async (req, res) => {
    const userCount = await UserModal.countDocuments();
    let { page, limit } = req.query;
    page = parseInt(page) || 1
    limit = parseInt(page) || 10
    const skip = (page - 1) * limit
    const users = await UserModal.find().select('-password').skip(skip).limit(limit).lean()
    const data = {
        data: [...users],
        count: userCount,
        message: userCount ? "List of users" : "No users found!"
    }
    res.status(200).json({ data: [...data?.data], message: data?.message, count: data?.count, status: true })
});


const createUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
    // Confirm data
    if (!username || !password) {
        return res.status(400).json({ message: "All fileds are requried" })
    }

    // Check for duplicate
    const duplicate = await UserModal.findOne({ username }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, roles }

    // Create and store user
    const user = await UserModal.create(userObject)

    if (user) {
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

const testUserLocation = asyncHandler(async (req, res) => {
    let { latitude, longitude, qrLatCoor, qrLongCoor } = req.query;

    // Setting default qr coordinates if not getting in the API
    if (qrLatCoor == null) {
        qrLatCoor = 28.601516
    }
    if (qrLongCoor == null) {
        qrLongCoor = 77.062679
    }

    // User coordinates
    if (!latitude || !longitude) {
        return res.status(400).json({ message: "All fileds are requried" })
    }
    let dis = getDistanceFromLatLonInKm(qrLatCoor, qrLongCoor, latitude, longitude)
    res.status(200).json({ message: `Distance between points in Meter:  ${dis}` })
})

// Method to calculate the distance
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 1000; // Distance in meter
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

module.exports = {
    getUsersList,
    createUser,
    testUserLocation
}