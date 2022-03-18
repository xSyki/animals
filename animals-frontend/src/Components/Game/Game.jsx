import { useEffect, useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import TableExchange from '../TableExchange/TableExchange';
import Player from '../Player/Player';
import Animals from '../Animals/Animals';
import { useParams, useNavigate } from "react-router-dom";
import { socket } from '../../socket';
import Dize from '../Dize/Dize';
import Exchange from '../Exchange/Exchange';
import EndGame from '../EndGame/EndGame';

function Game() {

    let { id } = useParams();

    const [players, setPlayers] = useState();

    const [game, setGame] = useState({})

    const [mySocketId, setMySocketId] = useState('');

    const [isCreator, setisCreator] = useState(false);

    const [actualDize, setActualDize] = useState({ firstDize: 1, secoundDize: 1 });

    const [isExchanged, setIsExchanged] = useState(false);

    const [isDized, setIsDized] = useState(false);

    const [winner, setWinner] = useState();
    let navigate = useNavigate();

    socket.on("createNewGame", game => {
        setGame(...game);
    })

    socket.on("gameDoesntExist", () => {
        navigate(`/`);
    })

    socket.on("gameUpdate", game => {
        setGame(...game);
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

        const timer = setTimeout(() => {
            socket.emit("endRound", { socketId: mySocketId, gameId: game.gameId });
        }, 1600)

        const timer2 = setTimeout(() => {
            setIsDized(false);
            setIsExchanged(false);
        }, 2000)

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }

    socket.on('recieveDize', data => {
        setActualDize(data);
    })

    useEffect(() => {
        const idData = {
            gameId: id,
        }
        socket.emit("playerJoinGame", idData);
    }, [])

    const renderPlayers = () => {
        if (players) {
            return players.map(player => {
                return <Player gameRound={game.round} key={player.playerId} player={player} players={players} mySocketId={mySocketId} updateNickName={handleNickNameUpdate} isStarted={game.started} />
            })
        }
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(`${text}`);
    }

    const reset = () => {
        setPlayers();
        setGame({});
        setMySocketId('');
        setisCreator(false);
        setActualDize({ firstDize: 1, secoundDize: 1 });
        setIsExchanged(false);
        setWinner();
    }

    const isMyRound = game.round === mySocketId;

    const isAfterExchanged = game.started && isMyRound && isExchanged;
    const isNotMyTurn = game.started && !isMyRound;
    const showDice = isAfterExchanged || isNotMyTurn;

    const showExchange = isMyRound && !isExchanged;

    return (
        <>
            <div className={`game ${players ? `game__players-${players.length}` : ""} ${players ? `game__my-index-${players.findIndex(playerA => playerA.playerId === mySocketId)}` : ""}`}>
                <div className='game__board'>
                    {!game.started &&
                        <div className='game__start-options'>
                            <div className='game__code'>
                                Code: {id}
                                <button className='game__code-copy-link' onClick={() => copyToClipboard(id)}>
                                    <FaCopy />
                                </button>
                            </div>
                        </div>
                    }
                    {showDice &&
                        <div className='game__dice'>
                            <div className='game__dize-1'>
                                <Dize dize={actualDize.firstDize} type={"first"} />
                            </div>
                            <div className='game__dize-2'>
                                <Dize dize={actualDize.secoundDize} type={"secound"} />
                            </div>
                        </div>
                    }
                    {showExchange &&
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
                    <div className='game__buttons'>
                        {!game.started && isCreator &&
                            <button onClick={handleStartGame} className="game__start-game-btn" disabled={players && players.length === 1}>
                                Start Game
                            </button>}
                        {isMyRound && isExchanged && !isDized &&
                            <button onClick={handleDize} className="game__button">
                                Dice
                            </button>
                        }
                        {isMyRound && !isExchanged &&
                            <button className='exchange__end-btn' onClick={() => setIsExchanged(true)}>End exchanges</button>
                        }
                    </div>
                    {game.started &&
                        <div className='game__herd'>
                            <div className='game__herd-title'>
                                Game herd
                            </div>
                            {game.herd && <Animals animals={game.herd} />}
                        </div>
                    }
                </div>
                {renderPlayers()}
                <TableExchange />
                {winner &&
                    <EndGame
                        winner={winner}
                        isCreator={isCreator}
                        gameId={game.gameId}
                        mySocketId={mySocketId}
                        reset={reset}
                        players={players}
                    />
                }
            </div >
        </>
    );
}

export default Game;
