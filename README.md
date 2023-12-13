# Book My Show

MERN Stack Project for Online Movie Ticket Booking.

The live version of the project is accessible at:

- server : "https://bookmyshow-project-4ldv.onrender.com/api/booking"
- client : "https://book-my-show-project-devanshugoyal27.vercel.app/"

## Introduction 
Welcome to the BookMyShow project, a sophisticated web application facilitating seamless online movie ticket booking. Users can effortlessly peruse available movies, select preferred showtimes, and book desired seats. The project employs both local storage and MongoDB for temporary and permanent data storage, respectively.

## Features 

- Browse a curated list of available movies with detailed information, including movie names and showtimes.
- Select a movie and explore available showtimes for a personalized cinema experience.
- Reserve seats for a selected showtime effortlessly.
- Utilize local storage to store temporary booking details, ensuring users can resume their booking process even after closing the browser or refreshing the page.
- Save completed bookings to MongoDB for permanent storage and retrieval.
- Access details of the most recently booked movie for convenient reference.

## Tech Stack 

- Node.js and Express.js power the server-side application.
- MongoDB, integrated with Mongoose, facilitates robust and efficient permanent data storage.
- Webpack manages frontend assets through bundling.
- Babel transpiles modern JavaScript code for optimal browser compatibility.
- React is employed to craft an intuitive and engaging user interface.

## Clone And Run

1. Clone the repository from GitHub:

   ```bash
   # Clone this repository
   $ git clone https://github.com/devanshugoyal27/BookMyShow-Project.git

   # Navigate into the repository
   $ cd BookMyShow-Project

   # Install dependencies for both client and server
   $ npm install
   
2. Set up the MongoDB connection:

- Create a MongoDB database for the BookMyShow project and copy the connection string.

3. Configure the .env:

   - Create a `.env` file in server directory
   - Add the following environment variables to the `.env` file:

   ```bash
   MONGO_URI=your_uri_here  # Replace with your MongoDB connection string
   ```
4. Start the application:

```bash
# start the application for both client and server
$ npm start  
```


- Server will run at "http://localhost:8080".
- Client will run at "http://localhost:3000"



Thank you for exploring our BookMyShow project!