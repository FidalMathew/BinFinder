import {
  DirectionsRenderer,
  // DirectionsService,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Destination (example: Delhi)
const destination = { lat: 28.7041, lng: 77.1025 };

const MyMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // 🔑 Replace with your API key
  });

  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  // Track live user location (via Sensors or GPS)
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(loc);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Whenever currentLocation changes, recalculate directions
  useEffect(() => {
    if (!currentLocation) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: currentLocation,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        } else {
          console.error("Directions request failed:", result);
        }
      }
    );
  }, [currentLocation]); // 🔑 Re-run when Sensors location changes

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation ?? destination}
      zoom={12}
    >
      {/* Show current location marker */}
      {currentLocation && <Marker position={currentLocation} />}
      {/* Show destination marker */}
      <Marker position={destination} />

      {/* Render latest route */}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  ) : (
    <p>Loading Map...</p>
  );
};

export default MyMap;
