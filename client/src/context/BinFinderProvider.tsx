import axios from "axios";
import React, { useEffect, useState } from "react";
import { BinFinderContext } from "./BinFinderContext";

export const BinFinderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userName, setUserName] = useState<string>("");

  const backendURL = "http://localhost:8080";

  useEffect(() => {
    const getUserDetails = async () => {
      console.log("Fetching user details...");
      try {
        const response = await axios.get(`${backendURL}/api/user/get-user`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("binfinder_token")}`,
          },
        });
        setUserName(response.data.userName);
        console.log(
          "User details fetched successfully",
          response.data.userName
        );
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    // if (localStorage.getItem("binfinder_token")) {
    getUserDetails();
    // }

    console.log("User:", userName);
    console.log("Token:", localStorage.getItem("binfinder_token"));
  }, [userName]);

  return (
    <BinFinderContext.Provider value={{ userName, setUserName, backendURL }}>
      {children}
    </BinFinderContext.Provider>
  );
};
