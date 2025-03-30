import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateBookingMutation, useGetHotelByIdQuery } from "@/lib/api";
import { Coffee, MapPin, MenuIcon as Restaurant, Star, Tv, Wifi } from "lucide-react";
import { useParams } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { BookingDialog } from "@/components/BookingDialog";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function HotelPage() {
  const { id } = useParams();
  const { data: hotel, isLoading, isError } = useGetHotelByIdQuery(id);
  const [createBooking, { isLoading: isCreateBookingLoading }] = useCreateBookingMutation();
  const navigate = useNavigate();

  const handleBook = async (bookingData) => {
    try {
      const booking = await createBooking(bookingData).unwrap();
      navigate(`/booking/payment?bookingId=${booking._id}`);
      toast.success("Booking successful");
    } catch (error) {
      console.error(error);
      toast.error("Booking failed");
    }
  };

  if (isLoading)
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen">
        {/* ... Loading skeletons ... */}
        <p>Loading...</p>
      </div>
    );

  if (isError) return <p className="text-red">Error loading hotel details.</p>;

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative w-full h-[400px]">
            <img src={hotel.image} alt={hotel.name} className="absolute object-cover rounded-lg" />
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary">Rooftop View</Badge>
            <Badge variant="secondary">French Cuisine</Badge>
            <Badge variant="secondary">City Center</Badge>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <div className="flex items-center mt-2">
                <MapPin className="h-5 w-5 text-muted-foreground mr-1" />
                <p className="text-muted-foreground">{hotel.location}</p>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Star className="h-4 w-4" />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="font-bold">{hotel?.rating ?? "No rating"}</span>
            <span className="text-muted-foreground">({hotel?.reviews?.toLocaleString() ?? "No"} reviews)</span>
          </div>
          <p className="text-muted-foreground">{hotel.description}</p>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Wifi className="h-5 w-5 mr-2" />
                  <span>Free Wi-Fi</span>
                </div>
                <div className="flex items-center">
                  <Restaurant className="h-5 w-5 mr-2" />
                  <span>Restaurant</span>
                </div>
                <div className="flex items-center">
                  <Tv className="h-5 w-5 mr-2" />
                  <span>Flat-screen TV</span>
                </div>
                <div className="flex items-center">
                  <Coffee className="h-5 w-5 mr-2" />
                  <span>Coffee maker</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">${hotel.price}</p>
              <p className="text-sm text-muted-foreground">per night</p>
            </div>
            <BookingDialog
              hotelName={hotel.name}
              hotelId={id}
              onSubmit={handleBook}
              isLoading={isCreateBookingLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
