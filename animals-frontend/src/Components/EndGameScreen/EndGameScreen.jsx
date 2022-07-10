import { useEffect, useState } from 'react';
import { socket } from '../../connection/socket';
import { useNavigate } from "react-router-dom";
const { v4: uuid } = require('uuid');

function EndGameScreen(props) {

    const { gameId, mySocketId, players, reset, winner, isCreator } = props;

    const [newGameId, setNewGameId] = useState();
    let navigate = useNavigate();

    useEffect(() => {
        socket.emit('endGame', { gameId, mySocketId: mySocketId });
    }, []);

    socket.on("nextGameCreated", id => {
        setNewGameId(id);
    });

    const createNextGame = () => {
        const id = uuid().slice(0, 5).toUpperCase();
        socket.emit('createNextGame', { gameId, newGameRoomId: id })
        socket.emit('createNewGame', id);
        const name = players.find(player => player.playerId === mySocketId).name;
        const idData = {
            gameId: id,
            name
        }
        socket.emit("playerJoinGame", idData);
        reset();
        navigate(`/game/${id}`);
    };

    const joinNextGame = () => {
        const name = players.find(player => player.playerId === mySocketId).name;
        const idData = {
            gameId: newGameId,
            name: name
        }
        socket.emit("playerJoinGame", idData);
        reset();
        navigate(`/game/${newGameId}`);
    };

    return (
        <>
            <div className='end-screen__bg'>
                <div className='end-screen'>
                    <div className='end-screen__winner'>
                        <h2 className='end-screen__winner-title'>
                            Winner:
                        </h2>
                        <h1 className='end-screen__winner-name'>
                            {winner.name}
                        </h1>
                        {isCreator ?
                            <button onClick={createNextGame} className='end-screen__create-game-btn'>
                                Create next game!
                            </button>
                            :
                            <button onClick={joinNextGame} className='end-screen__join-game-btn' disabled={!newGameId}>
                                Join next game!
                            </button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EndGameScreen;