import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { socket } from '../../connection/socket';
import { FaCopy } from 'react-icons/fa';

import Player from '../Player/Player';
import Animals from '../Animals/Animals';
import Dice from '../Dice/Dice';
import Exchange from '../Exchange/Exchange';
import OfferRecieved from '../OfferRecieved/OfferRecieved';
import EndGame from '../EndGameScreen/EndGameScreen';

import TableExchange from '../TableExchange/TableExchange';
import Chat from '../Chat/Chat';

function Game() {

    let { id } = useParams();

    const [players, setPlayers] = useState();

    const [game, setGame] = useState({})

    const [mySocketId, setMySocketId] = useState('');

    const [isCreator, setisCreator] = useState(false);

    const [actualDice, setActualDice] = useState({ firstDice: 1, secoundDice: 1 });

    const [isExchanged, setIsExchanged] = useState(false);

    const [offerSent, setOfferSent] = useState(false);

    const [offerRecieved, setOfferRecieved] = useState(false);

    const [isDiced, setIsDiced] = useState(false);

    const [winner, setWinner] = useState();

    let navigate = useNavigate();

    useEffect(() => {
        const idData = {
            gameId: id,
        }
        socket.emit("playerJoinGame", idData);
    }, [id])

    socket.on("createNewGame", game => {
        setGame(...game);
    })

    socket.on("mySocketId", data => {
        setMySocketId(data.mySocketId);
        setisCreator(data.creator);
    })

    socket.on("gameDoesntExist", () => {
        navigate(`/`);
    })

    socket.on("gameUpdate", game => {
        setGame(...game);
    })

    socket.on("playersUpdate", players => {
        setPlayers(players);
    })

    socket.on('recieveDice', data => {
        setActualDice(data);
    })

    socket.on("acceptExchange", (data) => {
        setOfferRecieved(data);
    })

    socket.on("endExchangeWithPlayer", (answer) => {
        setOfferSent(false);
    })

    socket.on("winner", winner => {
        setWinner(winner);
    })

    const handleStartGame = () => {
        socket.emit("startGame", game.gameId);
    }

    const handleNickNameUpdate = (newName) => {
        socket.emit("userNameUpdate", { mySocketId: mySocketId, newName, gameId: game.gameId })
    }

    const handleDice = () => {
        socket.emit("dice", { gameId: game.gameId, socketId: mySocketId });
        setIsDiced(true);

        const timer = setTimeout(() => {
            socket.emit("endRound", { socketId: mySocketId, gameId: game.gameId });
        }, 1600)

        const timer2 = setTimeout(() => {
            setIsDiced(false);
            setIsExchanged(false);
        }, 2000)

        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
        };
    }

    const renderPlayers = () => {
        if (players) {
            return players.map(player => {
                return <Player gameRound={game.round} key={player.playerId} player={player} players={players} mySocketId={mySocketId} updateNickName={handleNickNameUpdate} isStarted={game.started} />
            })
        }
    }

    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            const dummyElement = document.createElement('span');
            dummyElement.style.whiteSpace = 'pre'
            dummyElement.textContent = text;
            document.body.appendChild(dummyElement)

            const selection = window.getSelection();
            selection.removeAllRanges()
            const range = document.createRange()
            range.selectNode(dummyElement)
            selection.addRange(range)

            document.execCommand('copy');

            selection.removeAllRanges()
            document.body.removeChild(dummyElement)
        }
    }

    const reset = () => {
        setPlayers();
        setGame({});
        setMySocketId('');
        setisCreator(false);
        setActualDice({ firstDice: 1, secoundDice: 1 });
        setIsExchanged(false);
        setWinner();
    }

    const isMyRound = game.round === mySocketId;

    const isAfterExchanged = game.started && isMyRound && isExchanged;

    const isNotMyTurn = game.started && !isMyRound && !offerRecieved;

    const showDice = isAfterExchanged || isNotMyTurn;

    const showExchange = isMyRound && !isExchanged && !offerRecieved;

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
                            <div>
                                <Dice dice={actualDice.firstDice} type={"first"} />
                            </div>
                            <div>
                                <Dice dice={actualDice.secoundDice} type={"secound"} />
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
                                    setIsExchanged={setIsExchanged}
                                    offerSent={offerSent}
                                    setOfferSent={setOfferSent}
                                />
                            }
                        </>
                    }
                    {offerRecieved &&
                        <OfferRecieved offerRecieved={offerRecieved} players={players} setOfferRecieved={setOfferRecieved} />
                    }
                    <div className='game__buttons'>
                        {!game.started && isCreator &&
                            <button onClick={handleStartGame} className="game__start-game-btn" disabled={players && players.length === 1}>
                                Start Game
                            </button>}
                        {isMyRound && isExchanged && !isDiced &&
                            <button onClick={handleDice} className="game__button">
                                Dice
                            </button>
                        }
                        {isMyRound && !isExchanged && !offerSent &&
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
                <Chat
                    mySocketId={mySocketId}
                    gameId={game.gameId}
                />
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
