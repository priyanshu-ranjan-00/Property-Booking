import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";
import toast from "react-hot-toast";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    if (!user) {
      toast.error("Please login/register to book this property");
      setRedirect("/login"); // Set redirect path to state
      return;
    }

    if (!checkIn || !checkOut || !numberOfGuests || !name || !phone) {
      return toast.error(
        "Please fill out the respective fields to book the property"
      );
    }

    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    toast.success(`The property has been booked for ${numberOfNights} nights`);
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-green-50 shadow p-4 rounded-2xl sm:mt-6">
      <div className="text-xl text-center">
        Price: ₹{place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex flex-col md:flex-row">
          <div className="py-3 px-4 w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Check in:
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div className="py-3 px-4 border-t md:border-t-0 md:border-l w-full md:w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Check out:
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        <div className="py-3 px-4 border-t">
          <label className="block text-sm font-medium text-gray-700">
            Number of guests:
          </label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label className="block text-sm font-medium text-gray-700">
              Your full name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
            />
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Phone number:
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        )}
      </div>
      <button onClick={bookThisPlace} className="primary mt-4 w-full md:w-auto">
        Book this place
        {numberOfNights > 0 && (
          <span> for ₹{numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
}
