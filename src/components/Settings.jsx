import React from 'react'

function Settings({setLoggedIn}) {
    // onClick functions for each button
  const handleSoundClick = () => {
    // Logic for Sound button click
  };

  const handleMusicClick = () => {
    // Logic for Music button click
  };

  const handleLogOut = () => {
    setLoggedIn(false)
    window.location.reload();
  };

  const handleButton2Click = () => {
    // Logic for Button 2 click
  };

  const handleButton3Click = () => {
    // Logic for Button 3 click
  };

    return (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className='text-center'>Settings</p>
          <br/>
          {/* Sound and Music settings */}
          <div className="flex justify-center items-center space-x-4 mb-4">
            <button className="bg-blue-500 text-white rounded-full p-4" onClick={handleSoundClick}>
              Sound
            </button>
            <button className="bg-green-500 text-white rounded-full p-4" onClick={handleMusicClick}>
              Music
            </button>
          </div>
    
          {/* Oval Buttons */}
          <div className="flex flex-col items-center space-y-2">
            <button className="bg-purple-500 text-white rounded-lg px-6 py-2"  onClick={handleLogOut}>
              LogOut
            </button>
            <button className="bg-purple-500 text-white rounded-lg px-6 py-2"  onClick={handleButton2Click}>
              Button2
            </button>
            <button className="bg-purple-500 text-white rounded-lg px-6 py-2"  onClick={handleButton3Click}>
              Button3
            </button>
          </div>
        </div>
      );
}

export default Settings