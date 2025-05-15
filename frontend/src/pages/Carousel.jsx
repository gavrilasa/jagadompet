import React, { useEffect, useState } from "react";
import car1 from "../images/car1.png";
import car2 from "../images/car2.png";
import car3 from "../images/car3.png";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../utils/apiClient";

const Carousel = () => {
  const navigate = useNavigate();
  const images = [car1, car2, car3];

  const texts = [
    "Gain total control of your money",
    "Know where your money goes",
    "Planning ahead for your finance ",
  ];

  const caption = [
    "Become your own money manager and make every cent count",
    "Track your transaction easily,with categories and financial report",
    "Setup your budget for each category so you in control",
  ];

  const handleSign = (e) => {
    e.preventDefault();
    navigate("/sign");
  };
  const handleLogin = (e) => {
    navigate("/login");
  };

  const [index, setIndex] = useState(0);
  const [slowNetwork, setSlowNetwork] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { error: err, slowNetwork: isSlow } = await apiClient(
        "/api/auth/session",
        // "http://localhost:5000/wrong-url",
        { method: "GET" },
        1000
      );

      if (!isMounted) return;
      if (!navigator.onLine) {
        setError(true);
        setSlowNetwork(false);
        return;
      }

      // 2) Else if it timed out, mark slow network
      if (isSlow) {
        setSlowNetwork(true);
        setError(false);
        return;
      }

      // 3) Any other fetch error (e.g. CORS, DNS)
      if (err) {
        setError(true);
        setSlowNetwork(false);
        return;
      }

      // 4) Otherwise, clear both flags
      setError(false);
      setSlowNetwork(false);
      // you could also handle error !== null if you want to detect backend down
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="relative w-full max-w-[375px] h-screen mx-auto">
      {/* Slow network warning */}
      {/* Slow-network modal overlay */}
      {slowNetwork && (
        <div className="fixed inset-0 bg-opacity-50 flex h-25 justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-xs text-center shadow-xl">
            <p className="text-yellow-800 font-semibold mb-2">
              ⚠️ Slow Network Detected
            </p>
            <p className="text-gray-600 text-sm">
              Some features may not load optimally until your connection
              improves.
            </p>
          </div>
        </div>
      )}
      {/* Offline error banner (you can style as you like) */}
      {error && !slowNetwork && (
        <div className="fixed top-0 text font-bold left-0 w-full h-full flex justify-center items-center bg-[#FA2F34] text-white py-2 text-center z-50">
          🚫 You appear to be offline or the server is unreachable.
        </div>
      )}
      <div className="overflow-hidden rounded-lg">
        <img
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="w-[312px] h-[312px] mt-[76px] mx-[31px] object-cover"
        />
      </div>
      {/* Dynamic Text */}
      <div className="text-center mt-[41px] font-bold text-[32px] leading-[39px] mx-[49px]">
        {texts[index]} {/* Display corresponding text */}
      </div>
      <div className="text-center mt-[16px] text-[#91919F] font-medium text-[16px]  mx-[49px]">
        {caption[index]} {/* Display corresponding text */}
      </div>
      <div className="flex justify-center space-x-2 mt-[38px]">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === index ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
      {/* No button to transition */}
      <div className="w-full flex  justify-center mt-[38px]">
        <button
          type="submit"
          className="text-[18px] leading-[100%] bg-[#42AB39] hover:bg-white hover:text-black text-white w-[343px] h-[56px] py-[8px] px-[16px] gap-[10px] rounded-[16px] font-semibold"
          onClick={handleSign}
        >
          Sign Up
        </button>
      </div>
      <div className="w-full flex justify-center mt-[16px]">
        <button
          type="submit"
          className="text-[18px]  bg-[#CCFFC8] hover:bg-white hover:text-black text-[#02791D] mb-[24px] w-[343px] h-[56px] py-[8px] px-[16px] gap-[10px] rounded-[16px] font-semibold"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Carousel;
