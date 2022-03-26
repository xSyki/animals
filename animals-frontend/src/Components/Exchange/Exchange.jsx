import { useEffect, useState } from 'react';
import exchangeTable from '../../exchangeTable';
import Offer from './Offer/Offer';
import OfferToPlayer from './OfferToPlayer/OfferToPlayer';

function Exchange(props) {
    const [playerHerd, setPlayerHerd] = useState(props.players.find(player => player.playerId === props.mySocketId).herd);
    const [gameHerd, setGameHerd] = useState(props.gameHerd);
    const [players, setPlayers] = useState(props.players);

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
        const otherPlayers = players.filter(player => player.playerId !== props.mySocketId);
        return exchangeTable.map((offer, index) => {
            const offerOne = playerHerd[offer[0].animal] >= offer[0].amount && gameHerd[offer[1].animal] >= offer[1].amount;
            const offerOnePlayer = playerHerd[offer[0].animal] >= offer[0].amount && otherPlayers.find(player => player.herd[offer[1].animal] >= offer[1].amount);
            const offerTwo = playerHerd[offer[1].animal] >= offer[1].amount && gameHerd[offer[0].animal] >= offer[0].amount;
            const offerTwoPlayer = playerHerd[offer[1].animal] >= offer[1].amount && otherPlayers.find(player => player.herd[offer[0].animal] >= offer[0].amount);
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
            } else if (offerOnePlayer) {
                jsx.push(
                    <OfferToPlayer
                        players={otherPlayers.filter(player => player.herd[offer[1].animal] >= offer[1].amount)}
                        index={index}
                        offerOne={offer[0]}
                        offerTwo={offer[1]}
                        mySocketId={props.mySocketId}
                        gameId={props.gameId}
                        setOfferSent={props.setOfferSent}
                    />
                )
            }
            if (offerTwo) {
                jsx.push(
                    <Offer
                        type="gameOffer"
                        index={index}
                        offerOne={offer[1]}
                        offerTwo={offer[0]}
                        mySocketId={props.mySocketId}
                        gameId={props.gameId}
                    />
                )
            } else if (offerTwoPlayer) {
                jsx.push(
                    <OfferToPlayer
                        players={otherPlayers.filter(player => player.herd[offer[0].animal] >= offer[0].amount)}
                        index={index}
                        offerOne={offer[1]}
                        offerTwo={offer[0]}
                        mySocketId={props.mySocketId}
                        gameId={props.gameId}
                        setOfferSent={props.setOfferSent}
                    />
                )
            }

            return jsx;
        })
    }

    useEffect(() => {
        setPlayerHerd(props.players.find(player => player.playerId === props.mySocketId).herd);
        setGameHerd(props.gameHerd);
        setPlayers(props.players);
    })

    useEffect(() => {
        canExchange();
    }, [])

    return (
        <>
            {canExchange && !props.offerSent && <div className='game__exchange exchange'>
                <div className='exchange__offers'>
                    {renderOffers()}
                </div>
            </div>}
            {props.offerSent &&
                <div className='exchange__wait'>
                    {/* Wait... */}
                    <div className='dot-pulse'></div>
                </div>
            }
        </>
    )
}

export default Exchange;