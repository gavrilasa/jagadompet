import React, { useEffect,useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import back from "../images/return.png";
import { useNavigate } from "react-router-dom";
import {apiClient} from "../utils/apiClient";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [slowNetwork, setSlowNetwork] = useState(false);
  const [error, setError] = useState(false);

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

      // Store token and user data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/view");
    } catch (error) {
      alert("Error connecting to server: " + error.message);
    }
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

  const backSign = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="relative w-full h-screen">
       {/* Slow network warning */}
        {/* Slow-network modal overlay */}
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
                type={showPassword ? "text" : "password"} // toggle input type
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="outline-none w-full bg-transparent text-gray-800 placeholder-gray-500"
                required
              />
              <span
                className="mr-2 text-2xl cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
            </div>

            <button
              type="submit"
              className="text-[18px] leading-[100%] bg-[#42AB39] hover:bg-white hover:text-black text-white mb-[24px] w-[343px] h-[56px] py-[8px] px-[16px] gap-[10px] rounded-[16px] font-semibold"
            >
              Login
            </button>
            <div className="text-center text-[#91919F] cursor-pointer">
              Don't have an account yet?{" "}
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