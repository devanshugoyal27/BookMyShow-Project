// Import necessary modules
const mongodb = require('mongodb');
const dotenv = require("dotenv");
dotenv.config();

// Retrieve MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;

// Import Mongoose library
let mongoose = require('mongoose');
// Import the schema definition for the book movie collection
const { bookMovieSchema } = require('./schema')

// Connect to the MongoDB database using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection established with MongoDB server online");
    })
    .catch(err => {
        console.log("Error while connecting to MongoDB:", err);
    });

// Create a Mongoose model based on the book movie schema
let collection_connection = mongoose.model('bookmovietickets', bookMovieSchema);

// Export the Mongoose model for the book movie collection
exports.connection = collection_connection;
