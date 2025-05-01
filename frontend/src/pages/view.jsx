import React, { useEffect, useState } from 'react';
import './view.css';
import sukses from '../images/success.png';
import { useNavigate } from 'react-router-dom';

const ViewPage = () => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault(); // mencegah reload halaman
        navigate('/home'); 
      };

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 1000); // Delay for 1 second
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="container" onClick={handleLogin}>
            {visible && (
                <div className="success-container">
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