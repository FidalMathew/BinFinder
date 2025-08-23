import axios from "axios";
import { Calendar, MapPin, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BottomBar from "../components/BottomBar";
import { useBinFinder } from "../utils/useBinContext";

type Bin = {
  id: number;
  location: string;
  landmark: string;
  image: string;
  createdAt: string;
};

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const { userName, setUserName, backendURL } = useBinFinder();

  const navigate = useNavigate();

  // Example bins added by the user (replace with API data later)
  const [bins, setBins] = useState<Bin[]>([
    {
      id: 1,
      location: "MG Road, Bangalore",
      landmark: "Near Metro Station",
      image: "map.png",
      createdAt: "2025-08-10",
    },
    {
      id: 2,
      location: "Koramangala 6th Block",
      landmark: "Beside Park",
      image: "map.png",
      createdAt: "2025-08-15",
    },
    {
      id: 3,
      location: "Indiranagar 100ft Road",
      landmark: "Opposite Café",
      image: "BinFinder.png",
      createdAt: "2025-08-20",
    },
  ]);
  useEffect(() => {
    const token = localStorage.getItem("binfinder_token");

    if (!token) {
      // No token → redirect immediately
      navigate("/login", { replace: true });
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/user/get-user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserName(response.data.userName);
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login", { replace: true }); // Invalid token → redirect
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [backendURL, navigate, setUserName]);

  // Delete a bin (local state update for now)
  const deleteBin = (id: number) => {
    setBins(bins.filter((bin) => bin.id !== id));
  };

  // Show loading spinner until we know user status
  if (loading) {
    return <p className="text-center mt-20">Loading profile...</p>;
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-green-400 text-white py-8 px-6  shadow-md flex justify-evenly">
        <div className="flex items-center space-x-4">
          <img
            src={`https://ui-avatars.com/api/?name=${userName}&background=34D399&color=fff`}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border-2 border-white shadow-md"
          />
          <div>
            <h2 className="text-xl font-semibold">{userName}</h2>
            {/* <p className="text-sm text-green-100">user@email.com</p> */}
          </div>
        </div>
        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("binfinder_token");
            setUserName(""); // Clear user in context
            navigate("/login", { replace: true }); // Redirect to login
          }}
          className="
          cursor-pointer
          ml-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Logout
        </button>
      </div>

      {/* User's Bins */}
      <div className="flex-1 p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Bins</h3>

        {bins.length > 0 ? (
          <div className="grid gap-4">
            {bins.map((bin) => (
              <div
                key={bin.id}
                className="bg-white rounded-2xl shadow-md p-5 flex items-center space-x-5 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Bin Image */}
                <img
                  src={bin.image}
                  alt="Bin"
                  className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                />

                {/* Bin Details */}
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold text-gray-800 flex items-center text-lg">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    {bin.location}
                  </h4>
                  <p className="text-sm text-gray-600">{bin.landmark}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    Added on {new Date(bin.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteBin(bin.id)}
                  className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors duration-200"
                  title="Delete Bin"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            You haven't added any bins yet.
          </p>
        )}
      </div>

      <BottomBar />
    </div>
  );
}
