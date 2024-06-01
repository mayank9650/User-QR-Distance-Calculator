require('dotenv').config();
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const corsOptions = require('./config/corsOptions')
// const appRoutes = require('./routes/appRoutes');
const userRoutes = require('./routes/userRoutes');
// const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express()

app.use(cors(corsOptions))

app.use(express.json()) // Middleware to parse JSON request bodies
app.use(cookieParser()) // Middleware to parse cookies
app.use('/', express.static(path.join(__dirname, 'public'))) // Serve static files from the 'public' directory

app.use('/users', userRoutes)
// app.use('/', appRoutes)
// app.use('/product', productRoutes)

app.use(errorHandler)

module.exports = app;