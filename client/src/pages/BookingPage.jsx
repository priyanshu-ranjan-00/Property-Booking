import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-2xl">{booking.place.title}</h1>
      <AddressLink className="my-3 block">{booking.place.address}</AddressLink>
      <div className="bg-green-100 p-6 my-6 rounded-2xl flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl mb-2">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="flex md:flex-col items-center justify-center gap-2 bg-primary p-4 text-lg text-white rounded-2xl">
          <div>Property booked for</div>
          <div className="text-xl">₹{booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}
