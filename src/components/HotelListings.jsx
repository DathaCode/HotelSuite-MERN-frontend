import { useGetHotelsForSearchQueryQuery } from "@/lib/api";
import { useState } from "react";
import HotelCard from "./HotelCard";
import LocationTab from "./LocationTab";
import { useSelector } from "react-redux";

export default function HotelListings() {
  // Retrieve any text-based search input from Redux state
  const searchValue = useSelector((state) => state.search.value);

  // State for country filter
  const locations = ["ALL", "France", "Italy", "Australia", "Japan"];
  const [selectedLocation, setSelectedLocation] = useState("ALL");

  // State for price filtering
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // State for sort order (ascending or descending)
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSelectedLocation = (location) => {
    setSelectedLocation(location);
  };

  const {
    data: hotels,
    isLoading,
    isError,
    error,
  } = useGetHotelsForSearchQueryQuery({
    query: searchValue,
    location: selectedLocation,
    minPrice,
    maxPrice,
    sort: sortOrder,
  });

  if (isLoading) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top trending hotels worldwide</h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top trending hotels worldwide</h2>
          <p className="text-lg text-muted-foreground">
            Discover the most trending hotels worldwide for an unforgettable experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <p className="text-red-500">{error.toString()}</p>
        </div>
      </section>
    );
  }

  // Use filtered hotels directly as filtering is handled by the backend
  const displayedHotels = hotels;

  return (
    <section className="px-8 py-8 lg:py-16">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Top trending hotels worldwide</h2>
        <p className="text-lg text-muted-foreground">
          Discover the most trending hotels worldwide for an unforgettable experience.
        </p>
      </div>

      {/* Country Filter Tabs */}
      <div className="flex items-center gap-x-4 mb-4">
        {locations.map((location, i) => (
          <LocationTab
            key={i}
            selectedLocation={selectedLocation}
            name={location}
            onClick={handleSelectedLocation}
          />
        ))}
      </div>

      {/* Price Range and Sort Filter Inputs */}
      <div className="flex flex-wrap items-center gap-x-4 mb-4">
        <div>
          <label htmlFor="minPrice" className="mr-2">Min Price:</label>
          <input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="mr-2">Max Price:</label>
          <input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div>
          <label htmlFor="sortOrder" className="mr-2">Sort by Price:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {displayedHotels.map(({ hotel, confidence }) => (
          <HotelCard key={hotel._id} hotel={hotel} confidence={confidence} />
        ))}
      </div>
    </section>
  );
}
