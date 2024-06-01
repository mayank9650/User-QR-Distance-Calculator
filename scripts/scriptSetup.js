require('dotenv').config({ path: '.env' });
// seeders/admin-seeder.js
const mongoose = require("mongoose");
const { insertData } = require('../helper/setup');

async function seedAdmin() {
    // Connect to the database
    await mongoose.connect(process.env.DATABASE_URI);

    await insertData(true)
    // Close the database connection
    await mongoose.disconnect();
}

seedAdmin().then(() => {
    console.log("Seeding completed");
    process.exit(0);
}).catch((err) => {
    console.error("Error seeding admin:", err);
    process.exit(1);
});

// Given 2 coordinate base and other need to find if the base cordinate is within the 10 m reach through geofencing
// Create a qr code  which contain a corrdinate scan it and then check if the coordinate is with the 10m range or not.