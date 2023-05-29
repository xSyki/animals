import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import socket from '../../connection/socket'

function SplashScreen() {
    const [code, setCode] = useState('')
    const navigate = useNavigate()

    const handleCreateGame = () => {
        const id = uuidv4().slice(0, 5).toUpperCase()
        socket.emit('createNewGame', id)
        navigate(`/game/${id}`)
    }

    const handleJoinGame = (e?: React.FormEvent<HTMLFormElement>) => {
        if (e) {
            e.preventDefault()
        }
        navigate(`/game/${code.toUpperCase()}`)
    }

    return (
        <div className="splash-screen">
            <h1 className="splash-screen__title">Super Farmer</h1>
            <div className="splash-screen__handle-game">
                <div className="splash-screen__join-game">
                    <h2 className="splash-screen__join-title">Join game!</h2>
                    <div className="splash-screen__join-box">
                        <form
                            className="splash-screen__join-label"
                            onSubmit={(e) => handleJoinGame(e)}
                        >
                            <input
                                type="text"
                                placeholder="CODE"
                                className="splash-screen__join-input"
                                minLength={5}
                                maxLength={5}
                                value={code}
                                onChange={(event) =>
                                    setCode(
                                        event.target.value
                                            .toLocaleUpperCase()
                                            .slice(0, 5)
                                    )
                                }
                            />
                            <button
                                type="submit"
                                className="splash-screen__join-button"
                                disabled={code.length !== 5}
                                onClick={() => handleJoinGame()}
                            >
                                JOIN
                            </button>
                        </form>
                    </div>
                </div>
                <div className="splash-screen__or">or</div>
                <div className="splash-screen__create-game">
                    <button
                        type="submit"
                        className="splash-screen__create-button"
                        onClick={handleCreateGame}
                    >
                        Create game!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SplashScreen
