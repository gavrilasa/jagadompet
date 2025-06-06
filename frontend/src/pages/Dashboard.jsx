import React, { useEffect } from 'react';
import Home from './Home';
import { useNavigate } from "react-router-dom";

const WelcomeinPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className='absolute bg-gradient-to-b from-[#E0FFDE] to-white w-[100dvw] h-[100dvh]'>
      <Home />
    </div>
  );
};

export default WelcomeinPage;
