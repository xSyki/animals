import { useEffect, useState } from 'react'
import { FaCopy } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'

import socket from '../../connection/socket'
import DiceRollInterface, { DiceEnum } from '../../interfaces/diceInterface'
import GameInterface from '../../interfaces/gameInterface'
import { OfferReceivedInterface } from '../../interfaces/offerInterface'
import PlayerInterface from '../../interfaces/playerInterface'
import Animals from '../Animals/Animals'
import Chat from '../Chat/Chat'
import Dice from '../Dice/Dice'
import EndGame from '../EndGameScreen/EndGameScreen'
import Exchange from '../Exchange/Exchange'
import OfferReceived from '../OfferReceived/OfferReceived'
import Player from '../Player/Player'
import TableExchange from '../TableExchange/TableExchange'

import {
    defaultDiceRoll,
    defaultGame,
    defaultPlayers,
} from './defaultGameValues'

function Game() {
    const { id } = useParams()

    const [players, setPlayers] = useState<PlayerInterface[]>([])

    const [game, setGame] = useState<GameInterface>(defaultGame)

    const [mySocketId, setMySocketId] = useState('')

    const [isCreator, setisCreator] = useState(false)

    const [actualDice, setActualDice] =
        useState<DiceRollInterface>(defaultDiceRoll)

    const [isExchanged, setIsExchanged] = useState(false)

    const [offerSent, setOfferSent] = useState(false)

    const [offerReceived, setOfferReceived] = useState<
        OfferReceivedInterface | undefined
    >(undefined)

    const [isDiced, setIsDiced] = useState(false)

    const [winner, setWinner] = useState<PlayerInterface | undefined>()

    const navigate = useNavigate()

    useEffect(() => {
        const idData = {
            gameId: id,
        }
        socket.emit('playerJoinGame', idData)
    }, [id])

    socket.on('createNewGame', (createdGame: GameInterface) => {
        setGame(createdGame)
    })

    socket.on('mySocketId', (data) => {
        setMySocketId(data.mySocketId)
        setisCreator(data.creator)
    })

    socket.on('gameDoesntExist', () => {
        navigate(`/`)
    })

    socket.on('gameUpdate', (gameUpdated: GameInterface) => {
        setGame(gameUpdated)
    })

    socket.on('playersUpdate', (playersUpdated: PlayerInterface[]) => {
        setPlayers(playersUpdated)
    })

    socket.on('receiveDice', (diceRollUpdated: DiceRollInterface) => {
        setActualDice(diceRollUpdated)
    })

    socket.on(
        'acceptExchange',
        (offerReceivedUpdated: OfferReceivedInterface) => {
            setOfferReceived(offerReceivedUpdated)
        }
    )

    socket.on('endExchangeWithPlayer', () => {
        setOfferSent(false)
    })

    socket.on('winner', (winnerUpdated: PlayerInterface) => {
        setWinner(winnerUpdated)
        socket.emit('endGame', { gameId: game.gameId, mySocketId })
    })

    const handleStartGame = () => {
        socket.emit('startGame', game.gameId)
    }

    const handleNickNameUpdate = (newName: string) => {
        socket.emit('userNameUpdate', {
            mySocketId,
            newName,
            gameId: game.gameId,
        })
    }

    const handleDice = () => {
        socket.emit('dice', { gameId: game.gameId, socketId: mySocketId })
        setIsDiced(true)

        const timer = setTimeout(() => {
            socket.emit('endRound', {
                socketId: mySocketId,
                gameId: game.gameId,
            })
        }, 1600)

        const timer2 = setTimeout(() => {
            setIsDiced(false)
            setIsExchanged(false)
        }, 2000)

        return () => {
            clearTimeout(timer)
            clearTimeout(timer2)
        }
    }

    function renderPlayers() {
        return players.map((player) => (
            <Player
                gameRound={game.round}
                key={player.playerId}
                player={player}
                players={players}
                mySocketId={mySocketId}
                updateNickName={handleNickNameUpdate}
                isStarted={game.started}
            />
        ))
    }

    const reset = () => {
        setPlayers(defaultPlayers)
        setGame(defaultGame)
        setMySocketId('')
        setisCreator(false)
        setActualDice({ firstDice: 1, secondDice: 1 })
        setIsExchanged(false)
        setWinner(undefined)
    }

    const isMyRound = game.round === mySocketId

    const isAfterExchanged = game.started && isMyRound && isExchanged

    const isNotMyTurn = game.started && !isMyRound && !offerReceived

    const showDice = isAfterExchanged || isNotMyTurn

    const showExchange = isMyRound && !isExchanged && !offerReceived

    return (
        <div
            className={`game game__players-${
                players.length
            } game__my-index-${players.findIndex(
                (playerA) => playerA.playerId === mySocketId
            )}`}
        >
            <div className="game__board">
                {!game.started && (
                    <div className="game__start-options">
                        <div className="game__code">
                            Code: {id}
                            <button
                                type="submit"
                                className="game__code-copy-link"
                                onClick={() =>
                                    navigator.clipboard.writeText(id || '')
                                }
                            >
                                <FaCopy />
                            </button>
                        </div>
                    </div>
                )}
                {showDice && (
                    <div className="game__dice">
                        <div>
                            <Dice
                                dice={actualDice.firstDice}
                                type={DiceEnum.first}
                            />
                        </div>
                        <div>
                            <Dice
                                dice={actualDice.secondDice}
                                type={DiceEnum.second}
                            />
                        </div>
                    </div>
                )}
                {showExchange && players && (
                    <Exchange
                        gameHerd={game.herd}
                        mySocketId={mySocketId}
                        gameId={game.gameId}
                        players={players}
                        setIsExchanged={setIsExchanged}
                        offerSent={offerSent}
                        setOfferSent={setOfferSent}
                    />
                )}
                {offerReceived && (
                    <OfferReceived
                        offerReceived={offerReceived}
                        players={players}
                        setOfferReceived={setOfferReceived}
                    />
                )}
                <div className="game__buttons">
                    {!game.started && isCreator && (
                        <button
                            type="submit"
                            onClick={handleStartGame}
                            className="game__start-game-btn"
                            disabled={players && players.length === 1}
                        >
                            Start Game
                        </button>
                    )}
                    {game.started && isMyRound && isExchanged && !isDiced && (
                        <button
                            type="submit"
                            onClick={handleDice}
                            className="game__button"
                        >
                            Dice
                        </button>
                    )}
                    {isMyRound && !isExchanged && !offerSent && (
                        <button
                            type="submit"
                            className="exchange__end-btn"
                            onClick={() => setIsExchanged(true)}
                        >
                            End exchanges
                        </button>
                    )}
                </div>
                {game.started && (
                    <div className="game__herd">
                        <div className="game__herd-title">Game herd</div>
                        {game.herd && <Animals animals={game.herd} />}
                    </div>
                )}
            </div>
            {renderPlayers()}
            <TableExchange />
            <Chat mySocketId={mySocketId} gameId={game.gameId} />
            {winner && (
                <EndGame
                    winner={winner}
                    isCreator={isCreator}
                    gameId={game.gameId}
                    mySocketId={mySocketId}
                    reset={reset}
                    players={players}
                />
            )}
        </div>
    )
}

export default Game
