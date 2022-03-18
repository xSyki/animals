import { useEffect, useState } from 'react';
import exchangeTable from '../../exchangeTable';
import Offer from './Offer/Offer';

function Exchange(props) {
    const [playerHerd, setPlayerHerd] = useState(props.players.find(player => player.playerId === props.mySocketId).herd);
    const [gameHerd, setGameHerd] = useState(props.gameHerd);

    const canExchange = () => {
        let isExchanges = false;
        exchangeTable.forEach(offer => {
            const offerOne = playerHerd[offer[0].animal] >= offer[0].amount && gameHerd[offer[1].animal] >= offer[1].amount;
            const offerTwo = playerHerd[offer[1].animal] >= offer[1].amount && gameHerd[offer[0].animal] >= offer[0].amount;

            if (offerOne || offerTwo) {
                isExchanges = true
            }
        })
        if (!isExchanges) {
            props.setIsExchanged(true);
        }
    }

    const renderOffers = () => {
        return exchangeTable.map((offer, index) => {
            const offerOne = playerHerd[offer[0].animal] >= offer[0].amount && gameHerd[offer[1].animal] >= offer[1].amount;
            const offerTwo = playerHerd[offer[1].animal] >= offer[1].amount && gameHerd[offer[0].animal] >= offer[0].amount;

            let jsx = [];

            if (offerOne) {
                jsx.push(
                    <Offer
                        index={index}
                        offerOne={offer[0]}
                        offerTwo={offer[1]}
                        mySocketId={props.mySocketId}
                        gameId={props.gameId}
                    />
                )
            }
            if (offerTwo) {
                jsx.push(
                    <Offer
                        index={index}
                        offerOne={offer[1]}
                        offerTwo={offer[0]}
                        mySocketId={props.mySocketId}
                        gameId={props.gameId}
                    />
                )
            }

            return jsx;
        })
    }

    useEffect(() => {
        setPlayerHerd(props.players.find(player => player.playerId === props.mySocketId).herd);
        setGameHerd(props.gameHerd);
    }, [props.players || props.gameHerd])

    useEffect(() => {
        canExchange();
    }, [])

    return (
        <>
            {canExchange && <div className='game__exchange exchange'>
                <div className='exchange__offers'>
                    {renderOffers()}
                </div>
            </div>}
        </>
    )
}

export default Exchange;