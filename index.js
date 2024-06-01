// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' });
// const { insertData } = require('./helper/setup');

// const mongoose = require('mongoose');
// mongoose.connect(process.env.DATABASE_URI);

// mongoose.connection.once('open', async () => {
//     console.log('Connected to MongoDB')
//     await insertData()
// });


// mongoose.connection.on('error', (error) => {
//     console.error(`Error → : ${error.message}`);

// });

// Start our app!
const app = require('./app');
const PORT = process.env.PORT || 9090
const server = app.listen(PORT, () => {
    console.log(`Express running → On PORT : ${server.address().port}`);
});