import React, { useEffect } from 'react';
import Listo from './HistroyPage';
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
    <div className='flex justify-center w-full h-full '>
        <div className='w-[375px] h-[812px] bg-white'>
            <Listo />
        </div>
      
    </div>
  );
};

export default WelcomeinPage;
