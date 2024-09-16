import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();
  
    const handleLogout = () => {
    
      Cookies.remove('token');
     
      navigate('/login');
    };
  
    const handleShowConfirmation = () => {
      setShowConfirmation(true);
    };
  
    const handleCancel = () => {
      setShowConfirmation(false);
    };

  return (
   <>
     <div className='flex justify-end items-center mx-4 my-4'>
        <button className='bg-red-500 px-2 py-1 rounded-md text-white hover:bg-red-700'
        onClick={handleShowConfirmation}
        >Logout</button>
        </div>
        {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to sign out?</h2>
            <div className="flex justify-center">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
   </>
  );
}

export default Logout;
