"use client"; // For Next.js
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const logout = () => {
    Cookies.remove("loggedIn");
    // console.log(Cookies);
    console.log("Logging out...");
    router.push("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-blue-600">My Dashboard</h1>
        </div>
        <div className=" flex justify-center items-center  bg-gray-300 h-10">
          <button
            className="text-2xl font-semibold text-black"
            type="submit"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-semibold text-gray-700">
          Welcome to Dashboard
        </h2>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">
            You successfully arrived in dashboard page.
          </p>
        </div>
      </div>
    </div>
  );
}
