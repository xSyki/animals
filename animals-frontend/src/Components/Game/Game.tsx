import React from 'react';
import Player from '../Player/Player';
import players from '../../playerTemplate';
import game from '../../gameTemplate';
import Animals from '../Animals/Animals';

function Game() {

    const renderPlayers = () => {
        return players.map(player => {
            return <Player player={player} />
        })
    }

    return (
        <div className='game'>
            <div className='game__board'>
                <div className='game__dice'>
                    <div className='game__dive-1'>Test1</div>
                    <div className='game__dive-2'>Test2</div>
                </div>
                <div className='game__herd'>
                    <div className='game__herd-title'>Herd</div>
                    <Animals animals={game.herd} />
                </div>
            </div>
            <div className='game__players'>
                {renderPlayers()}
            </div>
        </div>
    );
}

export default Game;
