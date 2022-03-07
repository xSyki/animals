import React, { useEffect, useState } from 'react';

const rabbit = "https://syki.pl/wp-content/uploads/2022/03/rabbit.png";
const sheep = "https://syki.pl/wp-content/uploads/2022/03/sheep.png";
const pig = "https://syki.pl/wp-content/uploads/2022/03/pig.png";
const cow = "https://syki.pl/wp-content/uploads/2022/03/4e0ce113d3898c4.png";
const horse = "https://syki.pl/wp-content/uploads/2022/03/271cf234747654b.png";
const nov = "https://syki.pl/wp-content/uploads/2022/03/piq_58417_400x400.png"
const wolf = "https://syki.pl/wp-content/uploads/2022/03/wolf-outline.png";

const firstDiceType = [
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "sheep",
        image: sheep
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "pig",
        image: pig
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "sheep",
        image: sheep
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "sheep",
        image: sheep
    },
    {
        animal: "cow",
        image: cow
    },
    {
        animal: "wolf",
        image: wolf
    }
]

const secoundDiceType = [
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "sheep",
        image: sheep
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "pig",
        image: pig
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "sheep",
        image: sheep
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "rabbit",
        image: rabbit
    },
    {
        animal: "pig",
        image: pig
    },
    {
        animal: "horse",
        image: horse
    },
    {
        animal: "nov",
        image: nov
    }
]

function Dize(props) {

    const [actualDizeRoll, setActualDizeRoll] = useState(props.dize);

    const [actualDize, setActualDize] = useState(props.type === "first" ? firstDiceType : secoundDiceType);

    useEffect(() => {
        setActualDizeRoll(props.dize);
    }, [props.dize])

    return (
        <>
            <div id="wrapper" className="">
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