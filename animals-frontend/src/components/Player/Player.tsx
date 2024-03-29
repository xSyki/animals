import { useState } from 'react'

import PlayerInterface from '../../interfaces/playerInterface'
import Animals from '../Animals/Animals'

interface PlayerPropsInterface {
    players: PlayerInterface[]
    player: PlayerInterface
    mySocketId: string
    updateNickName: (newName: string) => void
    isStarted: boolean
    gameRound: string
}

function Player(props: PlayerPropsInterface) {
    const {
        players,
        player,
        mySocketId,
        updateNickName,
        isStarted,
        gameRound,
    } = props

    const [temporaryName, setTemporaryName] = useState(player.name)
    const [name, setName] = useState(player.name)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setName(temporaryName)
        updateNickName(temporaryName)
    }

    const isMe = player.playerId === mySocketId

    const index = players.findIndex(
        (playerA) => playerA.playerId === player.playerId
    )

    return (
        <div className={`player player__${index}`}>
            <div className="player__profile">
                {isMe && !isStarted ? (
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="player__name-form"
                    >
                        <input
                            className="player__name-input"
                            maxLength={12}
                            type="text"
                            value={temporaryName}
                            onChange={(event) =>
                                setTemporaryName(event.target.value)
                            }
                        />
                        {temporaryName !== name && (
                            <button
                                type="submit"
                                className="player__input-submit"
                                onClick={() => updateNickName(name)}
                            >
                                Submit
                            </button>
                        )}
                    </form>
                ) : (
                    <div
                        className={`player__nickname ${
                            player.playerId === gameRound ? 'active' : ''
                        }`}
                    >
                        {player.name}
                    </div>
                )}
            </div>
            <Animals animals={player.herd} />
        </div>
    )
}

export default Player
