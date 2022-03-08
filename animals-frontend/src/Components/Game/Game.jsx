import React, { useEffect, useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import Player from '../Player/Player';
import Animals from '../Animals/Animals';
import { useParams, useNavigate } from "react-router-dom";
import { socket } from '../../socket';
import Dize from '../Dize/Dize';
import Exchange from '../Exchange/Exchange';
import EndGame from '../EndGame/EndGame';

function Game(props) {

    const [players, setPlayers] = useState();

    const [game, setGame] = useState({})

    const [mySocketId, setMySocketId] = useState('');

    const [isCreator, setisCreator] = useState(false);

    const [isDized, setIsDized] = useState(false);

    const [actualDize, setActualDize] = useState({ firstDize: 1, secoundDize: 1 });

    const [isExchanged, setIsExchanged] = useState(false);

    const [winner, setWinner] = useState();
    let navigate = useNavigate();

    socket.on("createNewGame", game => {
        game.map(game => {
            setGame(game);
        })
    })

    socket.on("gameDoesntExist", () => {
        navigate(`/`);
    })

    socket.on("gameUpdate", game => {
        game.map(game => {
            setGame(game);
        })
    })

    socket.on("winner", winner => {
        setWinner(winner);
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
        setIsExchanged(false);
    }

    let { id } = useParams();

    useEffect(() => {
        const idData = {
            gameId: id,
        }
        socket.emit("playerJoinGame", idData);

        // return () => {
        //     socket.emit("disconnect");
        // }
    }, [])

    const renderPlayers = () => {
        if (players) {
            return players.map(player => {
                return <Player gameRound={game.round} key={player.playerId} player={player} mySocketId={mySocketId} updateNickName={handleNickNameUpdate} isStarted={game.started} />
            })
        }
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }

    const reset = () => {
        setPlayers();
        setGame({});
        setMySocketId('');
        setisCreator(false);
        setIsDized(false);
        setActualDize({ firstDize: 1, secoundDize: 1 });
        setIsExchanged(false);
        setWinner();
    }

    const isMyRound = game.round === mySocketId;

    return (
        <>
            <div className='game'>
                <div className='game__board'>
                    {!game.started && <div className='game__code'>Code: {id} <button className='game__code-copy-link' onClick={() => copyToClipboard(id)}><FaCopy /></button></div>}
                    {game.started && isMyRound && isExchanged && <div className='game__dice'>
                        <div className='game__dize-1'><Dize dize={actualDize.firstDize} type={"first"} /></div>
                        <div className='game__dize-2'><Dize dize={actualDize.secoundDize} type={"secound"} /></div>
                    </div>}
                    {game.started && !isMyRound && <div className='game__dice'>
                        <div className='game__dize-1'><Dize dize={actualDize.firstDize} type={"first"} /></div>
                        <div className='game__dize-2'><Dize dize={actualDize.secoundDize} type={"secound"} /></div>
                    </div>}
                    {!game.started && isCreator &&
                        <div className='game__start'>
                            <button onClick={handleStartGame} className="game__start-game-btn" disabled={players && players.length === 1}>
                                Start Game
                            </button>
                        </div>}
                    {isMyRound && !isDized && isExchanged &&
                        <button onClick={handleDize} className="game__button">
                            Dice
                        </button>
                    }
                    {isMyRound && !isExchanged &&
                        <>
                            {players &&
                                <Exchange
                                    gameHerd={game.herd}
                                    mySocketId={mySocketId}
                                    gameId={game.gameId}
                                    players={players}
                                    setIsExchanged={setIsExchanged} />
                            }
                        </>
                    }
                    {isMyRound && isDized &&
                        <button onClick={endRound} className="game__button">
                            End round
                        </button>
                    }
                    {game.started && <div className='game__herd'>
                        <div className='game__herd-title'>Game herd</div>
                        {game.herd && <Animals animals={game.herd} />}
                    </div>}
                </div>
                <div className='game__players'>
                    {renderPlayers()}
                </div>
                {winner && <EndGame winner={winner} isCreator={isCreator} gameId={game.gameId} mySocketId={mySocketId} reset={reset} players={players} />}
            </div >
        </>
    );
}

export default Game;
