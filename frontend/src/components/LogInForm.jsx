// LoginForm.jsx
import React, { useState } from 'react';


const LoginForm = ({ setLoggedIn}) => {
  const handleLogin = () => {setLoggedIn(true)}

  return (
    <div className="flex items-center justify-center h-screen bg-blue-300"> {/* Adjusted to a fishtank-like blue background */}
      <div className="flex flex-col items-center justify-center p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        <h2 className="text-lg text-center font-bold mb-8 text-purple-600"> {/* Purple text for the header */}
          Login
        </h2>
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        >
          Login
        </button>
      </div>
    </div>
  );
};




export default LoginForm;
