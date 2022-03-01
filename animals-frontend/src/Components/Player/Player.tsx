import React from 'react';
import playersInterface from '../../interfaces/playerInterface';
import Animals from '../Animals/Animals';

interface propsInterface {
    player: playersInterface
}



function Player(props: propsInterface) {

    const { player } = props;

    return (
        <>
            <div className='player'>
                <div className='player__profile'>
                    <div className='player__nickname'>
                        {player.name}
                    </div>
                </div>
                <Animals animals={player.animals} />
            </div>
        </>
    );
}

export default Player;
