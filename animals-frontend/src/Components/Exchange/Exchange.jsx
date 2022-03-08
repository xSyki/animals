import { FaArrowRight } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { socket } from '../../socket';
import exchangeTable from '../../exchangeTable';

function Exchange(props) {

    const [playerHerd, setPlayerHerd] = useState(props.players.find(player => player.playerId === props.mySocketId).herd);
    const [gameHerd, setGameHerd] = useState(props.gameHerd);

    const exchangeAnimalWithHerd = (index, offerFor, offerWhat) => {
        socket.emit("exchange",
            {
                socketId: props.mySocketId,
                gameId: props.gameId,
                index,
                offerFor,
                offerWhat
            });
    }

    useEffect(() => {
        setPlayerHerd(props.players.find(player => player.playerId === props.mySocketId).herd);
        setGameHerd(props.gameHerd);
    })

    const renderOffers = () => {
        return exchangeTable.map((offer, index) => {
            const offerOne = playerHerd[offer[0].animal] >= offer[0].amount && gameHerd[offer[1].animal] >= offer[1].amount;
            const offerTwo = playerHerd[offer[1].animal] >= offer[1].amount && gameHerd[offer[0].animal] >= offer[0].amount;

            let jsx = <></>;

            if (offerOne && offerTwo) {
                jsx = (<>
                    <div className='exchange__offer' key={`${offer[0].animal}-${offer[1].animal}`}>
                        <div className='exchange__offer-what'>
                            {offer[0].amount}
                            <img src={offer[0].image} className='exchange__offer-img' />
                        </div>
                        <FaArrowRight className='exchange__arrow' />
                        <div className='exchange__offer-for'>
                            {offer[1].amount}
                            <img src={offer[1].image} className='exchange__offer-img' />
                        </div>
                        <button onClick={() => exchangeAnimalWithHerd(index, offer[0].animal, offer[1].animal)} className="exchange__submit-btn">Exchange</button>
                    </div>
                    <div className='exchange__offer' key={`${offer[1].animal}-${offer[0].animal}`}>
                        <div className='exchange__offer-what'>
                            {offer[1].amount}
                            <img src={offer[1].image} className='exchange__offer-img' />
                        </div>
                        <FaArrowRight className='exchange__arrow' />
                        <div className='exchange__offer-for'>
                            {offer[0].amount}
                            <img src={offer[0].image} className='exchange__offer-img' />
                        </div>
                        <button onClick={() => exchangeAnimalWithHerd(index, offer[1].animal, offer[0].animal)} className="exchange__submit-btn">Exchange</button>
                    </div>
                </>)
            } else if (offerOne) {
                jsx = (<>
                    <div className='exchange__offer' key={`${offer[0].animal}-${offer[1].animal}`}>
                        <div className='exchange__offer-what'>
                            {offer[0].amount}
                            <img src={offer[0].image} className='exchange__offer-img' />
                        </div>
                        <FaArrowRight className='exchange__arrow' />
                        <div className='exchange__offer-for'>
                            {offer[1].amount}
                            <img src={offer[1].image} className='exchange__offer-img' />
                        </div>
                        <button onClick={() => exchangeAnimalWithHerd(index, offer[0].animal, offer[1].animal)} className="exchange__submit-btn">Exchange</button>
                    </div>
                </>)
            } else if (offerTwo) {
                jsx = (<>
                    <div className='exchange__offer' key={`${offer[1].animal}-${offer[0].animal}`}>
                        <div className='exchange__offer-what'>
                            {offer[1].amount}
                            <img src={offer[1].image} className='exchange__offer-img' />
                        </div>
                        <FaArrowRight className='exchange__arrow' />
                        <div className='exchange__offer-for'>
                            {offer[0].amount}
                            <img src={offer[0].image} className='exchange__offer-img' />
                        </div>
                        <button onClick={() => exchangeAnimalWithHerd(index, offer[1].animal, offer[0].animal)} className="exchange__submit-btn">Exchange</button>
                    </div>
                </>)
            }

            return jsx;
        })
    }

    const isExchanges = () => {
        let isExchanges = false;
        exchangeTable.map(offer => {
            const offerOne = playerHerd[offer[0].animal] >= offer[0].amount && gameHerd[offer[1].animal] >= offer[1].amount;
            const offerTwo = playerHerd[offer[1].animal] >= offer[1].amount && gameHerd[offer[0].animal] >= offer[0].amount;

            if (offerOne || offerTwo) {
                isExchanges = true
            }
            if (!isExchanges) {
                props.setIsExchanged(true);
            }
        })
    }

    useEffect(() => {
        isExchanges();
    }, [])

    return (
        <>
            <div className='game__exchange exchange'>
                <div className='exchange__offers'>
                    {renderOffers()}
                </div>
                <button className='exchange__end-btn' onClick={() => props.setIsExchanged(true)}>End exchanges</button>
            </div>
        </>
    )
}

export default Exchange;