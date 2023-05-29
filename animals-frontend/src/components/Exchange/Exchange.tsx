import React from 'react'

import HerdInterface from '../../interfaces/herdInterface'
import PlayerInterface from '../../interfaces/playerInterface'
import { defaultPlayers } from '../Game/defaultGameValues'
import exchangeTable from '../TableExchange/exchangeTable'

import Offer from './Offer/Offer'
import OfferToPlayer from './OfferToPlayer/OfferToPlayer'

interface ExchangePropsInterface {
    players: PlayerInterface[]
    gameHerd: HerdInterface
    setIsExchanged: React.Dispatch<React.SetStateAction<boolean>>
    mySocketId: string
    gameId: string
    setOfferSent: React.Dispatch<React.SetStateAction<boolean>>
    offerSent: boolean
}

function Exchange(props: ExchangePropsInterface) {
    const {
        players,
        gameHerd,
        setIsExchanged,
        mySocketId,
        gameId,
        setOfferSent,
        offerSent,
    } = props

    const player = players.find(
        (otherPlayer) => otherPlayer.playerId === mySocketId
    )
    const playerHerd = player ? player.herd : defaultPlayers[0].herd

    const canExchange = () => {
        let isExchanges = false
        exchangeTable.forEach((offer) => {
            const offerOne =
                playerHerd[offer[0].animal] >= offer[0].amount &&
                gameHerd[offer[1].animal] >= offer[1].amount
            const offerTwo =
                playerHerd[offer[1].animal] >= offer[1].amount &&
                gameHerd[offer[0].animal] >= offer[0].amount

            if (offerOne || offerTwo) {
                isExchanges = true
            }
        })
        if (!isExchanges) {
            setIsExchanged(true)
        }
    }

    const renderOffers = () => {
        canExchange()

        const otherPlayers = players.filter(
            (otherPlayer) => otherPlayer.playerId !== mySocketId
        )
        return exchangeTable.map((offer, index) => {
            const offerOne =
                playerHerd[offer[0].animal] >= offer[0].amount &&
                gameHerd[offer[1].animal] >= offer[1].amount
            const offerOnePlayer =
                playerHerd[offer[0].animal] >= offer[0].amount &&
                otherPlayers.find(
                    (otherPlayer) =>
                        otherPlayer.herd[offer[1].animal] >= offer[1].amount
                )
            const offerTwo =
                playerHerd[offer[1].animal] >= offer[1].amount &&
                gameHerd[offer[0].animal] >= offer[0].amount
            const offerTwoPlayer =
                playerHerd[offer[1].animal] >= offer[1].amount &&
                otherPlayers.find(
                    (otherPlayer) =>
                        otherPlayer.herd[offer[0].animal] >= offer[0].amount
                )
            const jsx = []

            if (offerOne) {
                jsx.push(
                    <Offer
                        index={index}
                        offerOne={offer[0]}
                        offerTwo={offer[1]}
                        mySocketId={mySocketId}
                        gameId={gameId}
                        key={offer[0].animal}
                    />
                )
            } else if (offerOnePlayer) {
                jsx.push(
                    <OfferToPlayer
                        players={otherPlayers.filter(
                            (otherPlayer) =>
                                otherPlayer.herd[offer[1].animal] >=
                                offer[1].amount
                        )}
                        offerOne={offer[0]}
                        offerTwo={offer[1]}
                        mySocketId={mySocketId}
                        gameId={gameId}
                        setOfferSent={setOfferSent}
                        key={offer[1].animal}
                    />
                )
            }
            if (offerTwo) {
                jsx.push(
                    <Offer
                        index={index}
                        offerOne={offer[1]}
                        offerTwo={offer[0]}
                        mySocketId={mySocketId}
                        gameId={gameId}
                        key={offer[1].animal}
                    />
                )
            } else if (offerTwoPlayer) {
                jsx.push(
                    <OfferToPlayer
                        players={otherPlayers.filter(
                            (otherPlayer) =>
                                otherPlayer.herd[offer[0].animal] >=
                                offer[0].amount
                        )}
                        offerOne={offer[1]}
                        offerTwo={offer[0]}
                        mySocketId={mySocketId}
                        gameId={gameId}
                        setOfferSent={setOfferSent}
                        key={offer[0].animal}
                    />
                )
            }

            return jsx
        })
    }

    return (
        <>
            {!offerSent && (
                <div className="game__exchange exchange">
                    <div className="exchange__offers">{renderOffers()}</div>
                </div>
            )}
            {offerSent && (
                <div className="exchange__wait">
                    <div className="dot-pulse" />
                </div>
            )}
        </>
    )
}

export default Exchange
