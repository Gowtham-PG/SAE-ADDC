const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Use bodyParser middleware to parse JSON data
app.use(bodyParser.json());

// Connect to MongoDB database (replace 'your_db_url' with the actual database URL)
mongoose.connect('your_db_url', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema for the data
const DataSchema = new mongoose.Schema({
    latitude: String,
    longitude: String,
});

// Create a model based on the schema
const DataModel = mongoose.model('Data', DataSchema);

// Handle saving data to the database
app.post('/save-data', async (req, res) => {
    const { latitude, longitude } = req.body;

    // Create a new data object
    const newData = new DataModel({
        latitude,
        longitude,
    });

    try {
        // Save the data to the database
        await newData.save();
        res.status(200).send('Data saved successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
