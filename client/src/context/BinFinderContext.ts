import React from "react";

// interface Bin {
//   id: number;
//   latitude: number;
//   longitude: number;
// }

export interface BinFinderContextType {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  backendURL: string;
};

// Create context
export const BinFinderContext = React.createContext<
  BinFinderContextType | undefined
>(undefined);
