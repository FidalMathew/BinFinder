import { Calendar, MapPin, Trash2 } from "lucide-react";
import { useState } from "react";
import BottomBar from "../components/BottomBar";

export default function Profile() {
  // Example bins added by the user (replace with API data later)
  const [bins, setBins] = useState([
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

  // Delete a bin (local state update for now)
  const deleteBin = (id: number) => {
    setBins(bins.filter((bin) => bin.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-green-400 text-white py-8 px-6  shadow-md">
        <div className="flex items-center space-x-4">
          <img
            src="https://ui-avatars.com/api/?name=User+Name&background=34D399&color=fff"
            alt="User Avatar"
            className="w-16 h-16 rounded-full border-2 border-white shadow-md"
          />
          <div>
            <h2 className="text-xl font-semibold">User Name</h2>
            <p className="text-sm text-green-100">user@email.com</p>
          </div>
        </div>
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
