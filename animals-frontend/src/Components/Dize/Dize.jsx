import { useEffect, useState } from 'react';

import { firstDiceType, secoundDiceType } from '../../dizeTypes';

function Dize(props) {

    const [actualDizeRoll, setActualDizeRoll] = useState(props.dize);

    const [actualDize, setActualDize] = useState(props.type === "first" ? firstDiceType : secoundDiceType);

    useEffect(() => {
        setActualDizeRoll(props.dize);
    }, [props.dize]);

    const className = props.type === "first" ? "side-one" : "side-two";

    return (
        <>
            <div id="wrapper" className={className}>
                <div id="d12" className={`dice dice__show-${actualDizeRoll}`}>
                    <div className="cap-top">
                        <div className="side one">
                            <div className="number center">
                                <img className='animal-img' src={actualDize[0].image} />
                            </div>
                        </div>
                        <div className="side two">
                            <div className="number center">
                                <img className='animal-img' src={actualDize[1].image} />
                            </div>
                        </div>
                        <div className="side three">
                            <div className="number center">
                                <img className='animal-img' src={actualDize[2].image} />
                            </div>
                        </div>
                        <div className="side four">
                            <div className="number center">
                                <img className='animal-img' src={actualDize[3].image} />
                            </div>
                        </div>
                        <div className="side five">
                            <div className="number center">
                                <img className='animal-img' src={actualDize[4].image} />
                            </div>
                        </div>
                        <div className="side six">
                            <div className="number center">
                                <img className='animal-img' src={actualDize[5].image} />
                            </div>
                        </div>
                    </div>
                    <div className="cap-bottom">
                        <div className="side seven">
                            <div className="number center">
                                <img className='animal-img' src={actualDize[6].image} />
                            </div>
                        </div>
                        <div className="side eight">
                            <div className="number center">
                                <img className='animal-img' src={actualDize[7].image} />
                            </div>
                        </div>
                        <div className="side nine">
                            <div className="number center">
                                <img className='animal-img' src={actualDize[8].image} />
                            </div>
                        </div>
                        <div className="side ten">
                            <div className="number center">
                                <img className='animal-img' src={actualDize[9].image} />
                            </div>
                        </div>
                        <div className="side eleven">
                            <div className="number center">
                                <img className='animal-img' src={actualDize[10].image} />
                            </div>
                        </div>
                        <div className="side twelve">
                            <div className="number center">
                                <img className='animal-img' src={actualDize[11].image} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dize;