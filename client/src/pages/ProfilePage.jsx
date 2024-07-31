import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
// import PlacesPage from "./PlacesPage.jsx";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null); // redirect to homepage
  const { ready, user, setUser } = useContext(UserContext);

  //   let { subpage } = useParams();
  //   if (subpage === undefined) {
  //     subpage = "profile";
  //   }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
    toast.success(`Visit again ${user.name}!!`);
  }

  if (!ready) {
    return (
      <p className="text-xl font-semibold text-gray-700 flex justify-center m-12  min-h-screen">
        Loading the Profile Page...
      </p>
    );
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav />
      {/* {subpage === "profile" && ( */}
      <div className="text-center max-w-lg mx-auto">
        Logged in as {user.name} ({user.email})<br />
        <button
          onClick={logout}
          className="inline-flex gap-1 bg-red-500 text-white py-2 px-6 rounded-full m-4"
        >
          <span>Logout</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
