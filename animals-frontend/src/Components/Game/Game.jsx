import React, { useEffect, useState } from 'react';
import Player from '../Player/Player';
import Animals from '../Animals/Animals';
import { useParams } from "react-router-dom";
import { socket } from '../../socket';
import Dize from '../Dize/Dize'

function Game(props) {

    const [players, setPlayers] = useState([]);

    const [game, setGame] = useState({})

    const [mySocketId, setMySocketId] = useState('');

    const [isCreator, setisCreator] = useState(false);

    const [isDized, setIsDized] = useState(false);

    const [actualDize, setActualDize] = useState({ firstDize: 1, secoundDize: 1 });

    socket.on("createNewGame", game => {
        game.map(game => {
            setGame(game);
        })
    })

    socket.on("gameUpdate", game => {
        game.map(game => {
            setGame(game);
        })
    })

    const handleNickNameUpdate = (newName) => {
        socket.emit("userNameUpdate", { mySocketId: mySocketId, newName, gameId: game.gameId })
    }

    socket.on("playersUpdate", players => {
        setPlayers(players);
    })

    socket.on("playerJoinedRoom", data => {
        setPlayers(data.players);
    })

    socket.on("mySocketId", data => {
        setMySocketId(data.mySocketId);
        setisCreator(data.creator);
    })

    const handleStartGame = () => {
        socket.emit("startGame", game.gameId);
    }

    const handleDize = () => {
        socket.emit("dize", { gameId: game.gameId, socketId: mySocketId });
        setIsDized(true);
    }

    socket.on('recieveDize', data => {
        setActualDize(data);
    })

    const endRound = () => {
        setIsDized(false);
        socket.emit("endRound", { socketId: mySocketId, gameId: game.gameId });
    }

    let { id } = useParams();

    useEffect(() => {
        const idData = {
            gameId: id,
        }
        socket.emit("playerJoinGame", idData);
    }, [])

    const renderPlayers = () => {
        if (players) {
            return players.map(player => {
                return <Player key={player.playerId} player={player} mySocketId={mySocketId} updateNickName={handleNickNameUpdate} isStarted={game.started} />
            })
        }
    }

    const isMyRound = game.round === mySocketId;

    return (
        <div className='game'>
            <div className='game__board'>
                <p>{id}</p>
                <div className='game__dice'>
                    <div className='game__dize-1'><Dize dize={actualDize.firstDize} type={"first"} /></div>
                    <div className='game__dize-2'><Dize dize={actualDize.secoundDize} type={"secound"} /></div>
                </div>
                {!game.started && isCreator && <div>
                    <button onClick={handleStartGame}>Start Game</button>
                </div>}
                {isMyRound && !isDized &&
                    <div>
                        <button onClick={handleDize}>
                            Dize
                        </button>
                    </div>
                }
                {isDized &&
                    <div>
                        <button onClick={endRound}>End round</button>
                    </div>
                }
                <div className='game__herd'>
                    <div className='game__herd-title'>Herd</div>
                    {game.herd && <Animals animals={game.herd} />}
                </div>
            </div>
            <div className='game__players'>
                {renderPlayers()}
            </div>
        </div>
    );
}

export default Game;
