import React, { useState } from 'react';
import Animals from '../Animals/Animals';


function Player(props) {

    const { player } = props;

    const [name, setName] = useState(player.name)

    const handleSubmit = (e) => {
        e.preventDefault();
        props.updateNickName(name);
    }

    return (
        <>
            <div className='player'>
                <div className='player__profile'>
                    {player.playerId === props.mySocketId && !props.isStarted ?
                        <>
                            <form onSubmit={handleSubmit} className="player__name-form">
                                <input className='player__name-input' maxLength={12} type="text" value={name} onChange={(event) => setName(event.target.value)} />
                                {props.player.name !== name &&
                                    <button className='player__input-submit' onClick={() => props.updateNickName(name)}>
                                        Submit
                                    </button>}
                            </form>
                        </> :
                        <div className={`player__nickname ${props.player.playerId === props.gameRound ? "active" : ""}`}>
                            {player.name}
                        </div>
                    }
                </div>
                <Animals animals={player.herd} />
            </div>
        </>
    );
}

export default Player;
