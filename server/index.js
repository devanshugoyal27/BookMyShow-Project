const express = require("express");
const bodyParser = require("body-parser");
const bookMovieSchema = require("./schema");
const cors = require("cors");
const path = require("path");
const { connection } = require("./connector");
const app = express();
const port = 8080;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// MongoDB model for booking
const BookMovie = connection.model("bookmovietickets", bookMovieSchema);

// POST endpoint to handle new bookings
app.post("/api/booking", async (req, res) => {
  // Extract movie, slot, and seats from the request body
  const { movie, slot, seats } = req.body;

  try {
    // Create a new instance of the model with the request data
    const newBooking = new BookMovie({ movie, slot, seats });

    // Save the new booking to the MongoDB database
    await newBooking.save();
    
    // Log the booking details
    console.log(movie, slot, seats);

    // Respond with a success message
    res.status(200).json({ message: "Booking created successfully" });
  } catch (error) {
    console.error("Error while creating booking:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the booking" });
  }
});

// GET endpoint to fetch the last booking
app.get("/api/booking", async (req, res) => {
  try {
    // Retrieve the last booking from the database
    const lastBooking = await BookMovie.findOne().sort({ _id: -1 }).limit(1);

    // Check if no previous booking found
    if (!lastBooking) {
      return res.json({ message: "No Previous Booking Found" });
    }

    // Respond with the last booking details
    res.status(200).json(lastBooking);
  } catch (error) {
    console.error("Error while fetching the last booking:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the last booking" });
  }
});


app.listen(port, () => console.log(`App listening on port ${port}!`));


module.exports = app;
