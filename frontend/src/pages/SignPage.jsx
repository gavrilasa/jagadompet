// src/pages/loginpage.js
import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import back from "../images/return.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSign = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  const handleView = (e) => {
    e.preventDefault();
    navigate("/view");
  };
  const backSign = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="relative w-full h-screen">
      {/* Form wrapper */}
      <div className="absolute z-10 w-full flex min-h-screen justify-center ">
        <div className="text-[16px] leading-[18px]">
          {/* Header */}
          <div className="text-[18px] mt-[44px] mb-[56px] justify-center grid place-items-center w-[375px] h-[64px] text-center font-semibold">
            <button className= "absolute left-[20px]" onClick={backSign}>
              <img src={back} alt="Back" className="w-[24px] h-[24px]" />
            </button>
            <p className="font-semibold text-[18px]">Expense</p>
          </div>

          {/* Form Login */}
          <form className="mx-[16px] items-center">
            <div className="flex mb-[24px] w-[343px] h-[56px] items-center border rounded-[16px] py-[8px] px-[16px] gap-[10px]">
              <input
                type="text"
                placeholder="Name"
                className="my-1 outline-none w-full bg-transparent text-gray-800 placeholder-gray-500"
              />
            </div>

            <div className="flex mb-[24px] w-[343px] h-[56px] items-center border rounded-[16px] py-[8px] px-[16px] gap-[10px]">
              <input
                type="email"
                placeholder="Email"
                className="outline-none w-full bg-transparent text-gray-800 placeholder-gray-500"
              />
            </div>

            <div className="flex mb-[24px] w-[343px] h-[56px] items-center border rounded-[16px] py-[8px] px-[16px] gap-[10px]">
              <input
                type="password"
                placeholder="Password"
                className="outline-none w-full bg-transparent text-gray-800 placeholder-gray-500"
              />
              <span className="mr-2 text-2xl ">
                <IoEyeOutline />
              </span>
            </div>

            <div class="flex items-center mb-[24px]">
              <input
                type="checkbox"
                className="w-[32px] h-[32px] mr-[10px] accent-[#42AB39]"
              />
              <label className="text-[14px] text-[#000000] font-medium">
                By signing up, you agree to the Terms of Service and Privacy
                Policy
              </label>
            </div>
            <button
              type="submit"
              className="text-[18px] leading-[100%] bg-[#42AB39] hover:bg-white hover:text-black text-white mb-[24px] w-[343px] h-[56px] py-[8px] px-[16px] gap-[10px] rounded-[16px] font-semibold"
              onClick={handleView}
            >
              Sign Up
            </button>
            <div className="text-center text-[#91919F] cursor-pointer font-medium">
              Already have an account?{" "}
              <a className="text-[#42AB39] underline" onClick={handleSign}>
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
