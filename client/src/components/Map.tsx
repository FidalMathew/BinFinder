import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import BottomBar from "./BottomBar";
import Nav from "./Nav";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

function MapUI() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // replace with your key
  });

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error("Location permission denied:", err);
          setLocation(null);
        }
      );
    }
  }, []);

  return (
    <div className="w-full h-screen relative">
      {/* Background Map */}
      {isLoaded && location ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={15}
          options={{ disableDefaultUI: true }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200">
          <p className="text-gray-700">Enable location to view map</p>
        </div>
      )}

      {/* Overlay (semi-transparent) */}
      <div className="absolute inset-0 bg-white/10 z-10"></div>

      {/* Foreground UI */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between pointer-events-none">
        <Nav />

        {/* Spotlight-style Search */}
        <div className="flex justify-center items-start pointer-events-auto w-full relative bottom-60">
          <div className="w-3/4 max-w-xl">
            <button className=" cursor-pointer w-full px-6 py-5 bg-white text-green-600 text-3xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition">
              <Search className="inline-block w-10 h-10 pb-2 pr-2" />
              Find bin's nearby ?
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <BottomBar />
      </div>
    </div>
  );
}

export default MapUI;
