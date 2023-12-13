import React, { useState, useEffect } from "react";
import "../styles/App.css";
import "../styles/bootstrap.min.css";
import { movies, slots, seats } from "./data";

const App = () => {
  // State for selected movie, slot, and seats
  const [selectedMovie, setSelectedMovie] = useState(
    localStorage.getItem("selectedMovie") || null
  );
  const [selectedSlot, setSelectedSlot] = useState(
    localStorage.getItem("selectedSlot") || null
  );
  const [selectedSeats, setSelectedSeats] = useState(
    JSON.parse(localStorage.getItem("selectedSeats")) || []
  );
  // State for tracking the total seats selected
  const [totalSeat, setTotalSeat] = useState({
    A1: 0,
    A2: 0,
    A3: 0,
    A4: 0,
    D1: 0,
    D2: 0,
  });

  // State for storing the last booking details
  const [bookingData, setBookingData] = useState({
    movie: "",
    slot: "",
    seats: {
      A1: 0,
      A2: 0,
      A3: 0,
      A4: 0,
      D1: 0,
      D2: 0,
    },
  });

  // Effect to fetch last booking details on component mount
  useEffect(() => {
    // Load last booking details from localStorage on component mount
    const lastBookingData = JSON.parse(localStorage.getItem("lastBookingData"));
    if (lastBookingData) {
      setBookingData(lastBookingData);
    } else {
      // If there are no last booking details, set initial selections
      setSelectedMovie(localStorage.getItem("selectedMovie") || null);
      setSelectedSlot(localStorage.getItem("selectedSlot") || null);
      setSelectedSeats(JSON.parse(localStorage.getItem("selectedSeats")) || []);
    }
  }, []);

  // Handle movie selection
  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    localStorage.setItem("selectedMovie", movie);
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    localStorage.setItem("selectedSlot", slot);
  };

  // Handle seat selection
  const handleSeatSelect = (seat, quantity) => {
    // Check if the seat is already selected
    const existingSeatIndex = selectedSeats.findIndex(
      (selectedSeat) => selectedSeat.seat === seat
    );

    // If the seat is not already selected, add it to the selectedSeats array
    if (existingSeatIndex === -1) {
      setSelectedSeats([...selectedSeats, { seat, quantity }]);
    } else {
      // If the seat is already selected, update its quantity
      const updatedSeats = [...selectedSeats];
      updatedSeats[existingSeatIndex].quantity = quantity;
      setSelectedSeats(updatedSeats);
    }
    // Save selected seats to localStorage
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  };

  // Handle the booking process
  const handleBookNow = async () => {
    try {
      // Check if all required data is selected
      if (selectedMovie && selectedSlot && selectedSeats.length > 0) {
        // Calculate total seats based on selected seats
        const updatedTotalSeat = { ...totalSeat };

        selectedSeats.forEach(({ seat, quantity }) => {
          updatedTotalSeat[seat] += quantity;
        });

        // Prepare data for the POST request
        const bookingData = {
          movie: selectedMovie,
          slot: selectedSlot,
          seats: updatedTotalSeat,
        };

        // Make a POST request to the server
        const response = await fetch(
          "https://bookmyshow-project-4ldv.onrender.com/api/booking",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
          }
        );

        if (response.ok) {
          // If the booking is successful, fetch the last booking details
          const lastBookingResponse = await fetch(
            "https://bookmyshow-project-4ldv.onrender.com/api/booking"
          );
          const lastBookingData = await lastBookingResponse.json();

          // Update the state with the last booking details
          // Assuming you have a state variable like lastBookingData in your component
          // setLastBookingData(lastBookingData);
          setBookingData(lastBookingData);
          // Reset selectedSeats and totalSeat after successful booking
          localStorage.setItem(
            "lastBookingData",
            JSON.stringify(lastBookingData)
          );
          setSelectedSeats([]);
          setTotalSeat({
            A1: 0,
            A2: 0,
            A3: 0,
            A4: 0,
            D1: 0,
            D2: 0,
          });

          // Clear selections after successful booking
          setSelectedMovie(null);
          setSelectedSlot(null);
          setSelectedSeats([]);

          // Clear selections in localStorage after successful booking
          localStorage.setItem("selectedMovie", null);
          localStorage.setItem("selectedSlot", null);
          localStorage.setItem("selectedSeats", JSON.stringify([]));
          alert("Booking Success");
        } else {
          alert("Booking failed");
        }
      } else {
        alert("Please select a movie, slot, and at least one seat.");
      }
    } catch (error) {
      console.error("An error occurred while booking:", error);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="mt-5 mb-3">Book That Show!!</h2>
        <div className="d-flex justify-content-between mflex">
          {/* movie selection  */}
          <div className="">
            {/* select movie  */}
            <div className="movie-row">
              <h3>Select A movie</h3>
              {movies.map((data, i) => (
                <button
                  key={i}
                  className={`movie-column ${
                    selectedMovie === data ? "movie-column-selected" : ""
                  }`}
                  onClick={() => handleMovieSelect(data)}
                >
                  <h6>{data} </h6>
                </button>
              ))}
            </div>
            {/* select slot  */}
            <div className="slot-row">
              <h3>Select a Time slot</h3>
              {slots.map((data, i) => (
                <button
                  key={i}
                  className={`slot-column ${
                    selectedSlot === data ? "slot-column-selected" : ""
                  }`}
                  onClick={() => handleSlotSelect(data)}
                >
                  <h6>{data}</h6>
                </button>
              ))}
            </div>
            {/* select seats  */}
            <div className="seat-row">
              <h3>Select the seats</h3>
              {seats.map((data, i) => (
                <button
                  key={i}
                  className={`seat-column ${
                    selectedSeats.some(
                      (selectedSeat) => selectedSeat.seat === data
                    )
                      ? "seat-column-selected"
                      : ""
                  }`}
                  onClick={(e) =>
                    handleSeatSelect(data, parseInt(e.target.value))
                  }
                >
                  <h6> Type {data} </h6>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    onChange={(e) =>
                      handleSeatSelect(data, parseInt(e.target.value))
                    }
                  />
                </button>
              ))}
            </div>

            <button onClick={handleBookNow} className="book-button mt-3">
              Book Now
            </button>
          </div>

          {/* booking details  */}
          <div className="last-order booking">
            {bookingData.movie ? (
              <div className="">
                <h5>Last Booking Details</h5>
                <p>
                  <strong>seats:-</strong>
                </p>

                <p>
                  <strong>A1:</strong>
                  {bookingData.seats.A1}
                </p>
                <p>
                  <strong>A2:</strong>
                  {bookingData.seats.A2}
                </p>
                <p>
                  <strong>A3:</strong>
                  {bookingData.seats.A3}
                </p>
                <p>
                  <strong>A4:</strong>
                  {bookingData.seats.A4}
                </p>
                <p>
                  <strong>D1:</strong>
                  {bookingData.seats.D1}
                </p>
                <p>
                  <strong>D2:</strong>
                  {bookingData.seats.D2}
                </p>
                <p>
                  <strong>slot:</strong>
                  {bookingData.slot}
                </p>
                <p>
                  <strong>movie:</strong>
                  {bookingData.movie}
                </p>
              </div>
            ) : (
              <h4>No previous booking found</h4>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
