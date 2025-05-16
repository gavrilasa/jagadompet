import React, { useEffect, useState } from 'react';
import './view.css';
import sukses from '../images/success.png';
import { useNavigate } from 'react-router-dom';


const ViewPage = () => {
    const [visible, setVisible] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault(); // mencegah reload halaman
        navigate('/dash'); 
      };

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 1000); // Delay for 1 second
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
          if (!token) {
            navigate("/login");
          }
        }, [token, navigate]);
      
        if (!token) {
          return null; // Render nothing while redirecting
        }
      
      return (
        <div className="w-full h-[100dvh] flex items-center justify-center lg:fixed lg:inset-0 lg:z-50 lg:flex lg:justify-center lg:items-center" onClick={handleLogin}>
            {visible && (
                <div className="success-container flex justify-center flex-col lg:mx-auto">
                    <div className="circle ml-[14px]">
                        <div className="checkmark"><img src={sukses} /></div>
                    </div>
                    <h2 className='font-inter font-medium'>You are set!</h2>
                </div>
            )}
        </div>
    );
};

export default ViewPage;