import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { socket } from '../../connection/socket';
// const { v4: uuid } = require('uuid');
import { v4 as uuid } from 'uuid';

function SplashScreen() {
    const [code, setCode] = useState('');
    let navigate = useNavigate();

    const handleCreateGame = () => {
        const id = uuid().slice(0, 5).toUpperCase();
        socket.emit('createNewGame', id);
        navigate(`/game/${id}`);
    }

    const handleJoinGame = (e) => {
        e.preventDefault();
        navigate(`/game/${code.toUpperCase()}`);
    }

    return (
        <div className='splash-screen'>
            <h1 className='splash-screen__title'>Super Farmer</h1>
            <div className='splash-screen__handle-game'>
                <div className='splash-screen__join-game'>
                    <h2 className='splash-screen__join-title'>Join game!</h2>
                    <div className='splash-screen__join-box'>
                        <form htmlFor="" className='splash-screen__join-label' onSubmit={handleJoinGame}>
                            <input type="text" placeholder='CODE' className='splash-screen__join-input' minLength={5} maxLength={5} value={code} onChange={(event) => setCode(event.target.value.toLocaleUpperCase())} />
                            <button className='splash-screen__join-button' disabled={code.length !== 5} onClick={handleJoinGame}>Join</button>
                        </form>
                    </div>
                </div>
                <div className='splash-screen__or'>or</div>
                <div className='splash-screen__create-game'>
                    <button className='splash-screen__create-button' onClick={handleCreateGame} >Create game!</button>
                </div>
            </div>
        </div>
    );
}

export default SplashScreen;