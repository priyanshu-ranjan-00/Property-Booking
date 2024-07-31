import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
// import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(0); //to avoid error => "A component is changing an uncontrolled input to be controlled", always Provide a default value,
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data?.title);
      setAddress(data?.address);
      setAddedPhotos(data?.photos);
      setDescription(data?.description);
      setPerks(data?.perks);
      setExtraInfo(data?.extraInfo);
      setCheckIn(data?.checkIn);
      setCheckOut(data?.checkOut);
      setMaxGuests(data?.maxGuests);
      setPrice(data?.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-gray-800 text-lg mt-4 ml-2">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 ml-2 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // if got id => update this
      await axios.put("/places", {
        id,
        ...placeData,
      });
      toast.success("Changes have been made, others can find it");

      setRedirect(true);
    } else {
      // add it as a new place;
      await axios.post("/places", placeData);
      toast.success("Congrats, you have added the place, others can find it");
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput("Title", "")}
        <input
          type="text"
          required
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Any name for your place along with category for eg: Hostel, Lodge or Apartment, better if it's short"
        />
        {preInput("Address", "")}
        <input
          type="text"
          value={address}
          required
          onChange={(ev) => setAddress(ev.target.value)}
          placeholder="Address of the property"
        />

        {preInput("Add Photos", "")}
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        {preInput("Description about the property", "")}
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          placeholder="What is the property for, and so on...."
        />

        {preInput("Perks & Facilities", "")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selectedPerks={perks} setPerks={setPerks} />
        </div>

        {preInput("Other info for the guest or tenant", "")}
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
          placeholder="Any more info you would like to provide, write here"
        />

        {/* {preInput("Check-in & check-out time", "")} */}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1 ml-2">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              placeholder="00 (24-hr format)"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 ml-2">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              placeholder="00 (24-hr format)"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 ml-2">Max number of persons</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              placeholder="1"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 ml-2">Price per day</h3>
            <input
              type="number"
              value={price}
              required
              onChange={(ev) => setPrice(ev.target.value)}
              placeholder="₹"
            />
          </div>
        </div>
        <button className="primary my-4">Save</button>
      </form>
    </div>
  );
}
