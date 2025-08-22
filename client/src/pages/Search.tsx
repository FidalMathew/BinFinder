import {
  DirectionsRenderer,
  GoogleMap,
  // InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import BottomBar from "../components/BottomBar";
import Nav from "../components/Nav";

const bins = [
  {
    id: 1,
    lat: 28.7041,
    lng: 77.1025,
    landmark: "Near Connaught Place",
    image: "map.png",
  },
  {
    id: 2,
    lat: 28.61,
    lng: 77.23,
    landmark: "Near India Gate",
    image: "map.png",
  },
];

const MyMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
    lat: 28.7041,
    lng: 77.1025,
  });

  type Bin = {
    id: number;
    lat: number;
    lng: number;
    landmark: string;
    image: string;
  };

  const [selectedBin, setSelectedBin] = useState<Bin | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  // Get live location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setCurrentLocation(loc);
          setMapCenter(loc);
        },
        (err) => console.error("Error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Calculate directions when bin is selected
  useEffect(() => {
    if (currentLocation && selectedBin) {
      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: currentLocation,
          destination: { lat: selectedBin.lat, lng: selectedBin.lng },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result);
          }
        }
      );
    }
  }, [selectedBin, currentLocation]);

  return isLoaded ? (
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <Nav />

      {/* Main content area: map + sidebar */}
      <div className="flex flex-1">
        {/* Map */}
        <div className="flex-1">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={mapCenter}
            zoom={14}
          >
            {/* Current location */}
            {currentLocation && (
              <Marker
                position={currentLocation}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                }}
              />
            )}

            {/* All bins */}
            {bins.map((bin) => (
              <Marker
                key={bin.id}
                position={{ lat: bin.lat, lng: bin.lng }}
                onClick={() => {
                  setSelectedBin(bin);
                  setMapCenter({ lat: bin.lat, lng: bin.lng });
                }}
              />
            ))}

            {/* Directions */}
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>

        {/* Sidebar */}
        <div className="w-72 bg-white shadow-lg border-l p-4 overflow-y-auto">
          {selectedBin ? (
            <div>
              <img
                src={selectedBin.image}
                alt={selectedBin.landmark}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h2 className="text-lg font-semibold">{selectedBin.landmark}</h2>
              <p className="text-sm text-gray-600 mt-1">
                Latitude: {selectedBin.lat}, Longitude: {selectedBin.lng}
              </p>
              <button
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                onClick={() => setDirections(null)}
              >
                Clear Route
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Click on a bin to see details</p>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <BottomBar />
    </div>
  ) : (
    <p>Loading map...</p>
  );
};

export default MyMap;
