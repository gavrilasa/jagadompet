import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import back from "../images/return.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSign = (e) => {
    e.preventDefault();
    navigate("/sign");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Login
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        alert("Login failed: " + errorData.message);
        return;
      }

      const data = await res.json();
      const token = data.token;
      const user_id = data.user_id;

      // Step 2: Save token and user_id to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user_id);

      // Step 3: Fetch protected profile
      const profileRes = await fetch("http://localhost:5000/api/auth/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!profileRes.ok) {
        const profileErr = await profileRes.json();
        alert("Failed to fetch profile: " + profileErr.message);
        return;
      }

      const profile = await profileRes.json();
      console.log("User profile:", profile);

      // Step 4: Navigate to protected route
      navigate("/view");

    } catch (error) {
      alert("Error connecting to server: " + error.message);
    }
  };

  const backSign = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="relative w-full h-screen">
      {/* Form wrapper */}
      <div className="absolute z-10 w-full flex min-h-screen justify-center">
        <div className="text-[16px] leading-[18px]">
          {/* Header */}
          <div className="text-[18px] mt-[44px] mb-[56px] justify-center grid place-items-center w-[375px] h-[64px] text-center font-semibold">
            <button className="absolute left-[20px]" onClick={backSign}>
              <img src={back} alt="Back" className="w-[24px] h-[24px]" />
            </button>
            <p className="font-semibold text-[18px]">Login</p>
          </div>

          {/* Form Login */}
          <form className="mx-[16px] items-center" onSubmit={handleSubmit}>
            <div className="flex mb-[24px] w-[343px] h-[56px] items-center border rounded-[16px] py-[8px] px-[16px] gap-[10px]">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="outline-none w-full bg-transparent text-gray-800 placeholder-gray-500"
                required
              />
            </div>

            <div className="flex mb-[40px] w-[343px] h-[56px] items-center border rounded-[16px] py-[8px] px-[16px] gap-[10px]">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none w-full bg-transparent text-gray-800 placeholder-gray-500"
                required
              />
              <span className="mr-2 text-2xl">
                <IoEyeOutline />
              </span>
            </div>

            <button
              type="submit"
              className="text-[18px] leading-[100%] bg-[#42AB39] hover:bg-white hover:text-black text-white mb-[24px] w-[343px] h-[56px] py-[8px] px-[16px] gap-[10px] rounded-[16px] font-semibold"
            >
              Login
            </button>
            <div className="text-center text-[#91919F] cursor-pointer">
              Don’t have an account yet?{" "}
              <a className="text-[#42AB39] underline" onClick={handleSign}>
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
