import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import socket from '../../connection/socket'
import PlayerInterface from '../../interfaces/playerInterface'

interface EndGameScreenPropsInterface {
    gameId: string
    mySocketId: string
    players: PlayerInterface[]
    reset: () => void
    winner: PlayerInterface
    isCreator: boolean
}

function EndGameScreen(props: EndGameScreenPropsInterface) {
    const { gameId, mySocketId, players, reset, winner, isCreator } = props

    const [newGameId, setNewGameId] = useState()
    const navigate = useNavigate()

    socket.on('nextGameCreated', (id) => {
        setNewGameId(id)
    })

    const createNextGame = () => {
        const id = uuid().slice(0, 5).toUpperCase()
        socket.emit('createNextGame', { gameId, newGameRoomId: id })
        socket.emit('createNewGame', id)
        const nextGameCreator = players.find(
            (player) => player.playerId === mySocketId
        )
        const name = nextGameCreator ? nextGameCreator.name : ''
        const idData = {
            gameId: id,
            name,
        }
        socket.emit('playerJoinGame', idData)
        reset()
        navigate(`/game/${id}`)
    }

    const joinNextGame = () => {
        const nextGamePlayer = players.find(
            (player) => player.playerId === mySocketId
        )
        const name = nextGamePlayer ? nextGamePlayer.name : ''
        const idData = {
            gameId: newGameId,
            name,
        }
        socket.emit('playerJoinGame', idData)
        reset()
        navigate(`/game/${newGameId}`)
    }

    return (
        <div className="end-screen__bg">
            <div className="end-screen">
                <div className="end-screen__winner">
                    <h2 className="end-screen__winner-title">Winner:</h2>
                    <h1 className="end-screen__winner-name">{winner.name}</h1>
                    {isCreator ? (
                        <button
                            type="submit"
                            onClick={createNextGame}
                            className="end-screen__create-game-btn"
                        >
                            Create next game!
                        </button>
                    ) : (
                        <button
                            type="submit"
                            onClick={joinNextGame}
                            className="end-screen__join-game-btn"
                            disabled={!newGameId}
                        >
                            Join next game!
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EndGameScreen
