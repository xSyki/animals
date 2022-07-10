import { useEffect, useState } from 'react';
import herdInterface from '../../Interfaces/herdInterface';
import playerInterface from '../../Interfaces/playerInterface';
import exchangeTable from '../TableExchange/exchangeTable';
import Offer from './Offer/Offer';
import OfferToPlayer from './OfferToPlayer/OfferToPlayer';

import { defaultPlayers } from '../Game/defaultValues';

interface exchangePropsInterface {
    players: playerInterface[],
    gameHerd: herdInterface,
    setIsExchanged: React.Dispatch<React.SetStateAction<boolean>>,
    mySocketId: string,
    gameId: string,
    setOfferSent: React.Dispatch<React.SetStateAction<boolean>>,
    offerSent: boolean
}

function Exchange(props: exchangePropsInterface) {
    const [gameHerd, setGameHerd] = useState(props.gameHerd);
    const [players, setPlayers] = useState(props.players);

    const player = props.players.find(player => player.playerId === props.mySocketId)
    const playerHerd = player ? player.herd : defaultPlayers[0].herd;

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
                        key={offer[0].animal + "-" + offer[1].animal}
                    />
                )
            } else if (offerOnePlayer) {
                jsx.push(
                    <OfferToPlayer
                        players={otherPlayers.filter(player => player.herd[offer[1].animal] >= offer[1].amount)}
                        offerOne={offer[0]}
                        offerTwo={offer[1]}
                        mySocketId={props.mySocketId}
                        gameId={props.gameId}
                        setOfferSent={props.setOfferSent}
                        key={offer[0].animal + "-" + offer[1].animal}
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
                        key={offer[1].animal + "-" + offer[0].animal}
                    />
                )
            } else if (offerTwoPlayer) {
                jsx.push(
                    <OfferToPlayer
                        players={otherPlayers.filter(player => player.herd[offer[0].animal] >= offer[0].amount)}
                        offerOne={offer[1]}
                        offerTwo={offer[0]}
                        mySocketId={props.mySocketId}
                        gameId={props.gameId}
                        setOfferSent={props.setOfferSent}
                        key={offer[1].animal + "-" + offer[0].animal}
                    />
                )
            }

            return jsx;
        })
    }

    useEffect(() => {
        setGameHerd(props.gameHerd);
        setPlayers(props.players);
    })

    useEffect(() => {
        canExchange();
    }, [])

    return (
        <>
            {!props.offerSent && <div className='game__exchange exchange'>
                <div className='exchange__offers'>
                    {renderOffers()}
                </div>
            </div>}
            {props.offerSent &&
                <div className='exchange__wait'>
                    <div className='dot-pulse'></div>
                </div>
            }
        </>
    )
}

export default Exchange;