import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserDataContext } from "./UserDataContext";

function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";

  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
    } catch (err) {
      console.error(err);
    }
  };

const getGeminiResponse = async (command) => {
  try {
    console.log(command);
    const result = await axios.post(
      `${serverUrl}/api/user/asktoassistant`,
      { userPrompt: command }, // ✅ match backend expectation
      { withCredentials: true }
    );
    return result.data;
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
