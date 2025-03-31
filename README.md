# HotelSuite

HotelSuite is a full-stack web application designed to simplify hotel reservations and streamline travel planning. The platform offers seamless hotel browsing, booking, and detailed information for travelers looking for luxury, affordability, or a mix of both.

---

## Description

HotelSuite provides an intuitive interface for users to explore hotel listings, view detailed hotel information, and make secure bookings.  
The application incorporates robust back-end services for handling hotel data, user management, and payment processing, along with a modern and responsive React front end.

### BACKEND REPO
The HotelSuite backend is built on Node.js and Express, with MongoDB serving as the primary data store for hotels and bookings. It provides RESTful API endpoints for hotel listings, hotel details, and booking management. Authentication is seamlessly integrated using Clerk, ensuring secure access to booking operations. All filtering and sorting logic for hotels, such as price range filtering, is processed on the server side for optimal performance.

https://github.com/DathaCode/HotelSuite-MERN-backend

Key Features:
- **Hotel Listings:** View and filter hotels by price range, location, and other amenities.
- **Hotel Details:** Detailed pages for each hotel with images, descriptions, ratings, and user reviews.
- **Integrated Booking:** Make reservations with a smooth booking process.
- **User Authentication:** Secure user sign-in and registration using Clerk.
- **Responsive Design:** Optimized for both desktop and mobile browsing.

---

## API Reference

### Get all hotels
- **Endpoint:** `GET /api/hotels`
- **Description:** Retrieves a list of all hotels.
- **Query Parameters:**
  - `api_key` (string, required): Your API key.
  - `location` (string, optional): Filter hotels by location.
  - `minPrice` (number, optional): Minimum hotel price.
  - `maxPrice` (number, optional): Maximum hotel price.
  - `sort` (string, optional): Sort order for the price (`asc` or `desc`).

### Get hotel details
- **Endpoint:** `GET /api/hotels/{id}`
- **Description:** Fetches detailed information for a specific hotel.
- **Parameters:**
  - `id` (string, required): Id of the hotel to fetch.

### Create a booking
- **Endpoint:** `POST /api/bookings`
- **Description:** Creates a new hotel booking.
- **Request Body:**
  ```json
  {
    "hotelId": "string",
    "userId": "string",
    "checkIn": "ISO Date String",
    "checkOut": "ISO Date String",
    "roomNumber": "number"
  }

---

### Environment Variables
To run this project locally, create a .env file in the project root and add the following variables:

VITE_BACKEND_UR
VITE_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
OPENAI_API_KEY


