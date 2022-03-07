import React, { useState } from 'react';
import Animals from '../Animals/Animals';


function Player(props) {

    const { player } = props;

    const [name, setName] = useState(player.name)

    return (
        <>
            <div className='player'>
                <div className='player__profile'>
                    {player.playerId === props.mySocketId && !props.isStarted ?
                        <>
                            <input className='player__name-input' type="text" value={name} onChange={(event) => setName(event.target.value)} />
                            {props.player.name !== name &&
                                <button onClick={() => props.updateNickName(name)}>Submit</button>}
                        </> :
                        <div className='player__nickname'>
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
