import { Routes, Route } from "react-router-dom";

import Game from './Game/Game';
import SplashScreen from './Splash-screen/SplashScreen';
import NotFound from './NotFound/NotFound';

function App() {

  return (
    <>
      <div className='app__bg'></div>
      <div className='app'>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
