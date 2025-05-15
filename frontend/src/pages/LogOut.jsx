import React from "react";
import { LuPen } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import profile from "../images/pp.png";
import back from "../images/return.png";
import { useState } from "react";
import { useEffect } from "react";
import { apiClient } from "../utils/apiClient";

const LogoutPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const [username, setUsername] = useState("");
  const [slowNetwork, setSlowNetwork] = useState(false);
  const [error, setError] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  const handleLogoutClick = () => {
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token", token);
    localStorage.removeItem("user", user);
    navigate("/");
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUsername(user.name); // Set username from name field
      } catch (err) {
        console.error("Failed to parse user data:", err);
      }
    }
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null; // Render nothing while redirecting
  }
  const backSign = (e) => {
    e.preventDefault();
    navigate("/dash");
  };
  useEffect(() => {
        let isMounted = true;
    
        (async () => {
          const { error: err, slowNetwork: isSlow } = await apiClient(
            "/api/auth/session",
            // "http://localhost:5000/wrong-url",
            { method: 'GET' },
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
            } 
        )();
    
        return () => {
          isMounted = false;
        };
      }, []);

  return (
    <div className="relative w-full h-screen">
      {slowNetwork && (
        <div className="fixed inset-0 bg-opacity-50 flex h-25 justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-xs text-center shadow-xl">
            <p className="text-yellow-800 font-semibold mb-2">
              ⚠️ Slow Network Detected
            </p>
            <p className="text-gray-600 text-sm">
              Some features may not load optimally until your connection improves.
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
      <div className="absolute z-10 w-full flex min-h-screen justify-center ">
        <div>
          {/* Header */}
          <div className="text-[18px] mt-[44px] mb-[56px] justify-center grid place-items-center w-[375px] h-[64px] text-center font-semibold">
            <button className="absolute left-[20px]" onClick={backSign}>
              <img src={back} alt="Back" className="w-[24px] h-[24px]" />
            </button>
            <p className="font-semibold text-[18px]">Login</p>
          </div>
          <div>
            <img
              className="w-[200px] h-[200px] mx-[88px] mt-[24px]"
              alt="bg"
              src={profile}
            />
          </div>

          <p className="font-medium text-[14px] text-[#91919F] mt-[34px] ml-[16px]">
            Username
          </p>
          <div className="flex items-center">
            <p className="mt-[7px] leading-[100%] font-semibold text-[24px] text-[#161719] ml-[16px]">
               {username} 
            </p>
          </div>
          <div className="w-full flex  justify-center mt-[287px]">
            <button
              type="submit"
              onClick={handleLogoutClick}
              className="text-[18px] leading-[100%] bg-[#FA2F34] hover:bg-red-200 hover:text-[#FA2F34] text-white w-[343px] h-[56px] py-[8px] px-[16px] gap-[10px] rounded-[16px] font-semibold"
            >
              Logout
            </button>
          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
              <div className="bg-white rounded-[21.7px] w-[340px] h-[174.21px] text-center">
                <div className="m-[13px]">
                  <div className="flex flex-col h-[80px]">
                    <div className="text-[21.7px] font-semibold mb-2 mt-[13px]">
                      Logout?
                    </div>
                    <p className="text-[14.47px] text-[#91919F] font-medium mb-6 ">
                      Are you sure do you wanna logout?
                    </p>
                  </div>
                  <div className="flex justify-between mt-[12px]">
                    <button
                      onClick={handleCancel}
                      className="bg-red-100 text-red-500 font-semibold rounded-[15px] w-[148px] h-[50px]"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="bg-red-500 text-white font-semibold rounded-[15px] w-[148px] h-[50px]"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
