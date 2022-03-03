import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { socket } from '../../socket';
const { v4: uuid } = require('uuid');

function SplashScreen(props) {
    const [code, setCode] = useState('');
    const [gameId, setGameId] = useState('');
    let navigate = useNavigate();

    const handleCreateGame = () => {
        const id = send();
        navigate(`/game/${id}`)
    }

    const handleJoinGame = () => {
        console.log("join");
    }

    const send = () => {
        const newGameRoomId = uuid();
        socket.emit('createNewGame', newGameRoomId);
        return newGameRoomId;
    }

    return (
        <div className='splash-screen'>
            <h1 className='splash-screen__title'>Super Farmer</h1>
            <div className='splash-screen__handle-game'>
                {/* <div className='splash-screen__join-game'>
                    <h2 className='splash-screen__join-title'>Join game!</h2>
                    <label htmlFor="" className='splash-screen__join-label' onSubmit={handleJoinGame}>
                        Code:
                        <input type="text" className='splash-screen__join-input' maxLength={5} value={code} onChange={(event) => setCode(event.target.value)} />
                        <button className='splash-screen__join-button' onClick={handleJoinGame}>Join</button>
                    </label>
                </div>
                <div className='splash-screen__or'>or</div> */}
                <div className='splash-screen__create-game'>
                    <button className='splash-screen__create-button' onClick={handleCreateGame} >Create game!</button>
                </div>
            </div>
        </div>
    );
}

export default SplashScreen;