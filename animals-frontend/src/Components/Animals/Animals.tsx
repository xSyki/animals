import React from 'react';
import animalsInterface from '../../interfaces/animalsInterface'


interface propsInterface {
    animals: animalsInterface
}

function Animals(props: propsInterface) {

    const { rabbit, sheep, pig, cow, horse, smallDog, bigDog } = props.animals;
    return (
        <div className='animals'>
            <div className='animals__rabbit animal'>
                <img className='animal__photo' src="https://syki.pl/wp-content/uploads/2022/03/694-6941483_thumb-image-rabbit-pixel-art-minecraft-hd-png.png" alt="" />
                <p className='animal__name'>{rabbit}</p>
            </div>
            <div className='animals__sheep animal'>
                <img className='animal__photo' src="https://syki.pl/wp-content/uploads/2022/03/cartoon-sheep-pixel-design_61878-536.jpeg" />
                <p className='animal__name'>{sheep}</p>
            </div>
            <div className='animals__pig animal'>
                <img className='animal__photo' src="https://syki.pl/wp-content/uploads/2022/03/67c09f1c4df1c224258cb51b0214d3c7.png" alt="" />
                <p className='animal__name'>{pig}</p>
            </div>
            <div className='animals__cow animal'>
                <img className='animal__photo' src="https://syki.pl/wp-content/uploads/2022/03/4e0ce113d3898c4.png" alt="" />
                <p className='animal__name'>{cow}</p>
            </div>
            <div className='animals__horse animal'>
                <img className='animal__photo' src="https://syki.pl/wp-content/uploads/2022/03/271cf234747654b.png" alt="" />
                <p className='animal__name'>{horse}</p>
            </div>
            <div className='animals__smallDog animal'>
                <img className='animal__photo' src="https://syki.pl/wp-content/uploads/2022/03/piq_58417_400x400.png" alt="" />
                <p className='animal__name'>{smallDog}</p>
            </div>
            <div className='animals__bigDog animal'>
                <img className='animal__photo' src="https://syki.pl/wp-content/uploads/2022/03/kisspng-pixel-art-drawing-pixelation-dog-pixilart-Щенок-by-computer-school-5b62b07a925456.5254540415331943625994.jpg" alt="" />
                <p className='animal__name'>{bigDog}</p>
            </div>
        </div>

    );
}

export default Animals;
