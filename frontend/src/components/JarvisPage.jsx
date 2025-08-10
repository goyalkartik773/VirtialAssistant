import React from "react";
import "./JarvisPage.css";
import img1 from "../assets/audio1.gif";
import img2 from "../assets/audio2.gif";
// const JarvisPage = () => {
//   return (
//     <div className="jarvis-container">
//       <div className="overlay">
//         <img
//           src={img1} // 🔁 Replace with your local or hosted robot image
//           alt="Jarvis"
//           className="robot-image"
//         />
//         <h2>I'm Jarvis</h2>
//       </div>
//     </div>
//   );
// };
// import React from "react";

const JarvisPage = () => {
  return (
     <div
      className="relative h-screen w-full flex flex-col items-center justify-center bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: 'url("/images/wave.gif")' }} // Replace with your GIF path
    >
      <img
        src={img2} // Replace with your robot image path
        alt="Jarvis"
        className="w-56 h-56 border-4 border-white shadow-lg mb-4 object-cover"
        // Removed rounded-full to keep original shape
      />
      <h2 className="text-white text-xl font-semibold">I'm Jarvis</h2>
    </div>
  );
};


export default JarvisPage;
