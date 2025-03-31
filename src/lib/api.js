import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const BACKEND_URL = "http://localhost:8000";

// console.log("BACKEND_URL", BACKEND_URL);
// console.log("BACKEND_URL", process.env.REACT_BACKEND_URL)

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://aidf-horizone-backend-vidath.onrender.com/api/",
    prepareHeaders: async (headers, { getState }) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => "hotels",
    }),
    getHotelsForSearchQuery: builder.query({
      // Accept filtering parameters: text query, hotel location, min/max price, and sort order.
      query: ({ query, location, minPrice, maxPrice, sort }) => {
        const params = new URLSearchParams();
        if (query) {
          params.append("query", query);
        }
        if (location && location !== "ALL") {
          params.append("location", location);
        }
        if (minPrice) {
          params.append("minPrice", minPrice);
        }
        if (maxPrice) {
          params.append("maxPrice", maxPrice);
        }
        if (sort) {
          params.append("sort", sort);
        }
        return `hotels/search/retrieve?${params.toString()}`;
      },
    }),
    getHotelById: builder.query({
      query: (id) => `hotels/${id}`,
    }),
    createHotel: builder.mutation({
      query: (hotel) => ({
        url: "hotels",
        method: "POST",
        body: hotel,
      }),
    }),
    createBooking: builder.mutation({
      query: (booking) => ({
        url: "bookings",
        method: "POST",
        body: booking,
      }),
    }),
    getBookingById: builder.query({
      query: (id) => `bookings/${id}`,
    }),
    createCheckoutSession: builder.mutation({
      query: () => ({
        url: `payments/create-checkout-session`,
        method: "POST",
      }),
    }),
    getCheckoutSessionStatus: builder.query({
      query: (sessionId) => `payments/session-status?session_id=${sessionId}`,
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelsForSearchQueryQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useCreateBookingMutation,
  useGetBookingByIdQuery,
  useCreateCheckoutSessionMutation,
  useGetCheckoutSessionStatusQuery,
} = api;
