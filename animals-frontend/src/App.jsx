import React, { useState } from 'react';
import './css/styles.css';
import { Routes, Route } from "react-router-dom";
import Game from './Components/Game/Game';
import SplashScreen from './Components/Splash-screen/Splash-screen';

function App() {

  const [userName, setUserName] = useState();

  return (
    <>
      <div className='app__bg'></div>
      <div className='app'>
        <Routes>
          <Route path="/" element={<SplashScreen setUserName={setUserName} />} />
          <Route path="/game/:id" element={<Game userName={userName} />} />
          {/* <Lobby /> */}
          {/*  */}
        </Routes>
      </div>
    </>
  );
}

export default App;
