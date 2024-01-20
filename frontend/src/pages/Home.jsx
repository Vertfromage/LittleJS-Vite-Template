// src/pages/Home.jsx
import React from 'react';
import { useState } from 'react'
import NavBar from '../components/GameNavBar';
import Info from '../components/Info';
import Settings from '../components/Settings';
import LoginForm from '../components/LogInForm';
import LittleGame from '../game/LittleGame';

const Home = () => {
  const [info, setInfo] = useState(false)
  const [settings, setSettings] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    loggedIn ? (<>
    <NavBar 
        info={info} 
        setInfo={setInfo} 
        settings={settings} 
        setSettings={setSettings} 
      />
    {
  info ? (
    // This content is shown if the 'info' state is true
    <div>
      {/* Content or component for the Info screen */}
      <Info />
    </div>
  ) : settings ? (
    // This content is shown if the 'settings' state is true
    <div>
      {/* Content or component for the Settings screen */}
      <Settings setLoggedIn={setLoggedIn}/>
    </div>
  ) : (
    // This content is shown if neither 'info' nor 'settings' is true
    <div>
      {/* Content or component for the default screen */}
      {/* <CanvasGame/> */}
      <LittleGame/>
    </div>
  )
}
    </>) : 
  //  Not loggedIn
    (<>
    <div>
      <LoginForm setLoggedIn={setLoggedIn} />
    </div>
    </>)
  );
};


export default Home;
