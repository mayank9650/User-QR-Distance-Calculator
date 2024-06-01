const express = require('express')
const { getUsersList, createUser, testUserLocation } = require('../controllers/userController')

const router = express.Router()

// router.get('/api/v1/list', getUsersList)
// router.post('/api/v1/newuser', createUser)

// Route to find the distance
router.get('/api/v1/location', testUserLocation)

module.exports = router