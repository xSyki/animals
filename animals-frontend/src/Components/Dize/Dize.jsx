import React, { useEffect, useState } from 'react';

const rabbit = "https://syki.pl/wp-content/uploads/2022/03/694-6941483_thumb-image-rabbit-pixel-art-minecraft-hd-png.png";
const sheep = "https://syki.pl/wp-content/uploads/2022/03/cartoon-sheep-pixel-design_61878-536.jpeg";
const pig = "https://syki.pl/wp-content/uploads/2022/03/67c09f1c4df1c224258cb51b0214d3c7.png";
const cow = "https://syki.pl/wp-content/uploads/2022/03/4e0ce113d3898c4.png";
const horse = "https://syki.pl/wp-content/uploads/2022/03/271cf234747654b.png";
const nov = "https://syki.pl/wp-content/uploads/2022/03/piq_58417_400x400.png"
const wolf = "https://syki.pl/wp-content/uploads/2022/03/kisspng-pixel-art-drawing-pixelation-dog-pixilart-Щенок-by-computer-school-5b62b07a925456.5254540415331943625994.jpg";

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

    const [actualDize, setActualDize] = useState(props.type === "first" ? firstDiceType : secoundDiceType)

    useEffect(() => {
        setActualDizeRoll(props.dize)
    }, [props.dize])

    return (
        <>
            <div id="d12" class={`dice dice__show-${actualDizeRoll}`}>
                <div class="cap-top">
                    <div class="side one">
                        <div class="number center">
                            <img className='animal-img' src={actualDize[0].image} />
                        </div>
                    </div>
                    <div class="side two">
                        <div class="number center">
                            <img className='animal-img' src={actualDize[1].image} />
                        </div>
                    </div>
                    <div class="side three">
                        <div class="number center">
                            <img className='animal-img' src={actualDize[2].image} />
                        </div>
                    </div>
                    <div class="side four">
                        <div class="number center">
                            <img className='animal-img' src={actualDize[3].image} />
                        </div>
                    </div>
                    <div class="side five">
                        <div class="number center">
                            <img className='animal-img' src={actualDize[4].image} />
                        </div>
                    </div>
                    <div class="side six">
                        <div class="number center">
                            <img className='animal-img' src={actualDize[5].image} />
                        </div>
                    </div>
                </div>
                <div class="cap-bottom">
                    <div class="side seven">
                        <div class="number center">
                            <img className='animal-img' src={actualDize[6].image} />
                        </div>
                    </div>
                    <div class="side eight">
                        <div class="number center">
                            <img className='animal-img' src={actualDize[7].image} />
                        </div>
                    </div>
                    <div class="side nine">
                        <div class="number center">
                            <img className='animal-img' src={actualDize[8].image} />
                        </div>
                    </div>
                    <div class="side ten">
                        <div class="number center">
                            <img className='animal-img' src={actualDize[9].image} />
                        </div>
                    </div>
                    <div class="side eleven">
                        <div class="number center">
                            <img className='animal-img' src={actualDize[10].image} />
                        </div>
                    </div>
                    <div class="side twelve">
                        <div class="number center">
                            <img className='animal-img' src={actualDize[11].image} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dize;