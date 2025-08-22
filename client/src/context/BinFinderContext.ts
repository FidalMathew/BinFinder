import React from "react";

interface Bin {
  id: number;
  latitude: number;
  longitude: number;
}

export interface BinFinderContextType {
  bins: Bin[];
  addBin: (bin: Bin) => void;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isCameraOn: boolean;
}

// Create context
export const BinFinderContext = React.createContext<
  BinFinderContextType | undefined
>(undefined);
