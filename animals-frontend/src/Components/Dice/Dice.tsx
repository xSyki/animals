import { useEffect, useState } from 'react';
import { diceEnum } from '../../Interfaces/diceInterface';

import { firstDiceType, secoundDiceType } from './diceTypes';

interface dicePropsInterface {
    dice: number,
    type: diceEnum
}

function Dice(props: dicePropsInterface) {

    const { dice, type } = props;

    const [actualDiceRoll, setActualDiceRoll] = useState(dice);

    const actualDice = type === diceEnum.first ? firstDiceType : secoundDiceType;

    useEffect(() => {
        setActualDiceRoll(dice);
    }, [dice]);

    const className = type === diceEnum.first ? "side-one" : "side-two";

    return (
        <>
            <div id="wrapper" className={className}>
                <div id="d12" className={`dice dice__show-${actualDiceRoll}`}>
                    <div className="cap-top">
                        <div className="side one">
                            <div className="number center">
                                <img className='animal-img' src={actualDice[0].image} alt={actualDice[0].name} />
                            </div>
                        </div>
                        <div className="side two">
                            <div className="number center">
                                <img className='animal-img' src={actualDice[1].image} alt={actualDice[1].name} />
                            </div>
                        </div>
                        <div className="side three">
                            <div className="number center">
                                <img className='animal-img' src={actualDice[2].image} alt={actualDice[2].name} />
                            </div>
                        </div>
                        <div className="side four">
                            <div className="number center">
                                <img className='animal-img' src={actualDice[3].image} alt={actualDice[3].name} />
                            </div>
                        </div>
                        <div className="side five">
                            <div className="number center">
                                <img className='animal-img' src={actualDice[4].image} alt={actualDice[4].name} />
                            </div>
                        </div>
                        <div className="side six">
                            <div className="number center">
                                <img className='animal-img' src={actualDice[5].image} alt={actualDice[5].name} />
                            </div>
                        </div>
                    </div>
                    <div className="cap-bottom">
                        <div className="side seven">
                            <div className="number center">
                                <img className='animal-img' src={actualDice[6].image} alt={actualDice[6].name} />
                            </div>
                        </div>
                        <div className="side eight">
                            <div className="number center">
                                <img className='animal-img' src={actualDice[7].image} alt={actualDice[7].name} />
                            </div>
                        </div>
                        <div className="side nine">
                            <div className="number center">
                                <img className='animal-img' src={actualDice[8].image} alt={actualDice[8].name} />
                            </div>
                        </div>
                        <div className="side ten">
                            <div className="number center">
                                <img className='animal-img' src={actualDice[9].image} alt={actualDice[9].name} />
                            </div>
                        </div>
                        <div className="side eleven">
                            <div className="number center">
                                <img className='animal-img' src={actualDice[10].image} alt={actualDice[10].name} />
                            </div>
                        </div>
                        <div className="side twelve">
                            <div className="number center">
                                <img className='animal-img' src={actualDice[11].image} alt={actualDice[11].name} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dice;