import { Toaster } from "react-hot-toast";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-green-50">
      <Toaster
        // position="bottom-center"
        toastOptions={{
          // Define default options
          // icon:"🫵",
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            borderRadius: '10px',
            color: "#fff",
          },
        }}
      />
      <div className="py-4 px-3 flex flex-col min-h-screen max-w-4xl mx-auto">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
