# Book My Show

This is a full stack project on Book My Show.
Project is live on:
    server : "https://bookmyshow-project-4ldv.onrender.com/api/booking"
    client : "https://book-my-show-project-devanshugoyal27.vercel.app/"


## Introduction 
Welcome to the BookMyShow project! This is a web application that allows users to book movie tickets online. Users can browse available movies, select a movie, choose a showtime, and book their desired seats. The project uses both local storage and MongoDB for temporary and permanent data storage, respectively

## Features 

- Browse a list of available movies with details such as movie name and showtimes.

- Select a movie and view available showtimes for that movie.. 

- Reserve seats for a selected showtime.

- Store temporary booking details using local storage to allow users to continue their booking process even if they close the browser or refresh the page. 

- Save completed bookings to MongoDB for permanent storage and retrieval.

- View the details of the last booked movie

## Tech Stack 

- Node.js and Express.js for the server-side application.
- MongoDB with Mongoose for permanent data storage.
- Webpack for bundling and managing frontend assets.
- Babel for transpiling modern JavaScript code for better browser compatibility.
- React for building the user interface.

## Clone And Run

1. Clone the repository from GitHub:

```bash
# Clone this repository
$ git clone https://github.com/devanshugoyal27/BookMyShow-Project.git

# Go into the repository
$ cd BookMyShow-Project

# Install dependencies for both client and server
$ npm install
```
3. Set up the MongoDB connection:

   - Create a MongoDB database for the BookMyShow project and Write the connection string.

4. Configure the .env:

   - Create a `.env` file in server directory
   - Add the following environment variables to the `.env` file:

   ```bash
   MONGO_URI = your_uri_here  # The MongoDB connection string
   ```
5. Start the application:

```bash
# start the application for both client and server
$ npm start  
```

    - Server will run at "http://localhost:8080".
    - Client will run at "http://localhost:3000"



Thank you..