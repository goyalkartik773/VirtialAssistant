import React, { useContext } from "react";
import { UserDataContext } from "../context/UserDataContext";

function Card({ image }) {
  const {
    selectedImage,
    setSelectedImage,
    setFrontendImage,
    setBackendImage
    
  } = useContext(UserDataContext);

  const isSelected = selectedImage === image;

  return (
    <div
      onClick={() => {
      setSelectedImage(image)
      setBackendImage(null);
      setFrontendImage(null);
     }}
      className={`
        w-[70px] h-[140px] lg:w-[150px] lg:h-[250px]
        bg-gradient-to-b from-[#0d0d26] to-[#030326]
        border ${isSelected ? "border-4 border-white shadow-amber-50" : "border-[#3b3bff4d]"}
        rounded-2xl overflow-hidden shadow-md transform transition duration-300
        ${!isSelected ? "hover:scale-105 hover:shadow-amber-50 hover:border-white" : ""}
        cursor-pointer
      `}
    >
      <img
        src={image}
        alt="img"
        className={`w-full h-full object-cover transition-transform duration-300 ${!isSelected ? "hover:scale-110" : ""}`}
      />
    </div>
  );
}

export default Card;
