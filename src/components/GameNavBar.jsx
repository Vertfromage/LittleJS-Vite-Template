import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

// Icons
import settingsIcon from '../assets/gear.svg';
import infoIcon from '../assets/info.svg';
import backIcon from '../assets/back.svg';

const renderButtons = () => (
  <>
    <button className="text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-full p-2 mx-1 my-1">
      <a href="#" className="block mt-4 md:mt-0">Button one</a>
    </button>
    <button className="text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-full p-2 mx-1 my-1">
      <a href="#" className="block mt-4 md:mt-0">Button two</a>
    </button>
    <button className="text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-full p-2 mx-1 my-1">
      <a href="#" className="block mt-4 md:mt-0">Button three</a>
    </button>
  </>
);

const NavBar = ({ info, setInfo, settings, setSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const showBackButton = info || settings;

  useEffect(() => {
    // Define the function to be called on resize
    const handleResize = () => {
      setIsOpen(false);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="bg-purple-500 p-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-lg font-bold">
          LittleJS Game Integration
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className={`flex ${isOpen ? 'flex-col md:flex-row' : 'hidden'}`}>
        {renderButtons()}
        </div>

        <div className="hidden md:flex justify-center items-center space-x-2">
          {renderButtons()}
        </div>



        {/* Round Buttons */}
        <div className="md:block">
        {showBackButton ? (
        // Show Back button if either 'info' or 'settings' is true
        <button onClick={() => {
          setInfo(false);
          setSettings(false);
        }} className="text-white bg-yellow-500 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-full p-2 mx-1">
          <img src={backIcon} alt="Back" className="h-6 w-6" />
        </button>
      ) : (
        <>
          <button className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-full p-2 mx-1" onClick={setInfo}>
          <img src={infoIcon} alt="Info" className="h-6 w-6" />
          </button>
          <button className="text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-full p-2 mx-1" onClick={setSettings}>
            <img src={settingsIcon} alt="Settings" className="h-6 w-6" />
          </button>
          </>
      )}
        </div>
      </div>
</nav>
);
};

export default NavBar;
