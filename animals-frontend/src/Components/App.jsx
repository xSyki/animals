import { Routes, Route } from "react-router-dom";

import Game from './Game/Game';
import SplashScreen from './Splash-screen/SplashScreen';
import NotFoundPage from './NotFoundPage/NotFoundPage';

function App() {

  return (
    <>
      <div className='app'>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
