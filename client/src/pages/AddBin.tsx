import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import BottomBar from "../components/BottomBar";
import Nav from "../components/Nav";
import { BinFinderContext } from "../context/BinFinderContext";

export default function AddBin() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [landmark, setLandmark] = useState("");
  const [location, setLocation] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const context = useContext(BinFinderContext);
  const userName = context?.userName;
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!userName) {
      navigate("/login", { replace: true });
    }
  }, [userName, navigate]);

  // Ask location on load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => console.error("Error getting location", err)
    );
  }, []);

  // Start camera automatically
  useEffect(() => {
    startCamera();
    return stopCamera; // stop camera when component unmounts
  }, []);

  // Start camera
  const startCamera = async () => {
    if (videoRef.current && !videoRef.current.srcObject) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Capture photo
  const capturePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, 320, 240);

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "bin.jpg", { type: "image/jpeg" });
        setPhoto(file);
        setPreview(URL.createObjectURL(blob));
      }
    }, "image/jpeg");

    stopCamera();
  };

  // Retake photo
  const retakePhoto = () => {
    setPhoto(null);
    setPreview(null);
    startCamera();
  };

  // Submit data
  const handleSubmit = async () => {
    if (!photo) {
      alert("Please capture a photo");
      return;
    }

    const formData = new FormData();
    formData.append("image", photo);
    formData.append("landmark", landmark);
    formData.append("latitude", location.lat?.toString() ?? "");
    formData.append("longitude", location.lng?.toString() ?? "");

    try {
      // Example: uncomment when backend is ready
      // const res = await fetch("/api/bins", { method: "POST", body: formData });
      // if (res.ok) alert("Bin added successfully!");
      // else alert("Error adding bin");
      console.log("Submitting Bin Data:", photo, landmark, location);
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  return (
    <>
      <Nav />
      <div className="p-6 space-y-4 min-h-[80vh] flex flex-col items-center bg-gray-50">
        <div className="text-center space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Add New Bin
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Capture a photo and help keep our city clean 🌍
          </p>
        </div>

        {!preview ? (
          <div className="flex flex-col items-center space-y-2">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              width={320}
              height={240}
              className="rounded-lg shadow-md"
            />
            <canvas
              ref={canvasRef}
              width={320}
              height={240}
              className="hidden"
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={startCamera}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Start Camera
              </button>
              <button
                onClick={capturePhoto}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Capture Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <img
              src={preview}
              alt="Preview"
              className="w-80 rounded-xl shadow-md"
            />
            <button
              onClick={retakePhoto}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              Retake
            </button>

            <div className="w-full flex justify-center mt-4">
              <div className="w-full sm:max-w-md space-y-3 text-center">
                <input
                  type="text"
                  placeholder="Optional Landmark"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full p-3 text-sm md:text-base border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none shadow-sm"
                />
                <button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto px-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 md:py-3 text-sm md:text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Submit Bin
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bottom-10 w-full relative">
        <BottomBar />
      </div>
    </>
  );
}
