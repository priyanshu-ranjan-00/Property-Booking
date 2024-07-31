import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import toast from "react-hot-toast";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    setIsLoading(true);

    try {
      const data = await axios.post("/register", {
        name,
        email,
        password,
      });
      console.log(data.data);
      toast.success("Registration successful. Please log in");

      setName("");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.log(e.response.data.error);
      toast.error(
        e.response.data.error || "Registration failed, please try again"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className=" min-h-screen mt-4 grow flex items-center justify-around">
      {/* <Toaster
        position="bottom-center"
        background="#333"
        reverseOrder={false}
      /> */}

      <div className="mb-64 bg-green-100 p-4 shadow-lg rounded-lg">
        <h1 className="text-2xl text-center mb-4">Register yourself</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="your name"
            value={name}
            required={true}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            required={true}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            required={true}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
