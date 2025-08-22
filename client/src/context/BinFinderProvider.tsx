import React, { useRef, useState } from "react";
import { BinFinderContext } from "./BinFinderContext";

interface Bin {
  id: number;
  latitude: number;
  longitude: number;
}

export const BinFinderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bins, setBins] = useState<Bin[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const addBin = (bin: Bin) => {
    setBins((prev) => [...prev, bin]);
  };

  const [isCameraOn, setIsCameraOn] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setIsCameraOn(true);
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.pause();
    }

    setIsCameraOn(false);
    console.log("Camera stopped ✅");
  };

  return (
    <BinFinderContext.Provider
      value={{ bins, addBin, startCamera, stopCamera, videoRef, isCameraOn }}
    >
      {children}
    </BinFinderContext.Provider>
  );
};
