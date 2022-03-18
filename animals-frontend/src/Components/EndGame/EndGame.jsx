import { useEffect, useState } from 'react';
import { socket } from '../../socket';
import { useNavigate } from "react-router-dom";
const { v4: uuid } = require('uuid');

function EndGame(props) {

    const [newGameId, setNewGameId] = useState();
    let navigate = useNavigate();

    const createNextGame = () => {
        const id = uuid().slice(0, 5).toUpperCase();
        socket.emit('createNextGame', { gameId: props.gameId, newGameRoomId: id })
        socket.emit('createNewGame', id);
        const name = props.players.find(player => player.playerId === props.mySocketId).name;
        const idData = {
            gameId: id,
            name
        }
        socket.emit("playerJoinGame", idData);
        props.reset();
        navigate(`/game/${id}`);
    };

    socket.on("nextGameCreated", id => {
        setNewGameId(id);
    });

    const joinNextGame = () => {
        const name = props.players.find(player => player.playerId === props.mySocketId).name;
        const idData = {
            gameId: newGameId,
            name: name
        }
        socket.emit("playerJoinGame", idData);
        props.reset();
        navigate(`/game/${newGameId}`);
    };

    useEffect(() => {
        socket.emit('endGame', { gameId: props.gameId, mySocketId: props.mySocketId });
    }, []);

    return (
        <>
            <div className='end-screen__bg'>
                <div className='end-screen'>
                    <div className='end-screen__winner'>
                        <h2 className='end-screen__winner-title'>
                            Winner:
                        </h2>
                        <h1 className='end-screen__winner-name'>
                            {props.winner.name}
                        </h1>
                        {props.isCreator ?
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

export default EndGame;