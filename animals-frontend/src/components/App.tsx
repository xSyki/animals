import { Route, Routes } from 'react-router-dom'

import Game from './Game/Game'
import NotFoundPage from './NotFoundPage/NotFoundPage'
import SplashScreen from './Splash-screen/SplashScreen'

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/game/:id" element={<Game />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    )
}

export default App
