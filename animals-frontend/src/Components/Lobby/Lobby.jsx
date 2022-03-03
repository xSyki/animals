import React from 'react';
import game from '../../gameTemplate';
import Animals from '../Animals/Animals';

const players = [
    {
        id: '12',
        name: 'test'
    },
    {},
    {},
    {},
    {},
    {}
];

function Lobby() {

    const renderLobby = () => {
        return (players.map(player => {
            console.log(player ? "true" : "false");
            if (!player.id) {
                return (
                    <div className='lobby__player'>
                        <button>Join</button>
                    </div>
                )
            } else {
                return (
                    <div className='lobby__player'>
                        <div>{player.name}</div>
                        <button>Ready</button>
                    </div>
                )
            }

        }))
    }

    return (
        <div className='lobby'>
            <div className='lobby__players'>
                {renderLobby()}
            </div>
        </div>
    );
}

export default Lobby;
