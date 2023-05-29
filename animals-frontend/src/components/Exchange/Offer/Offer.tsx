import { FaArrowRight } from 'react-icons/fa'

import socket from '../../../connection/socket'
import { AnimalInterface } from '../../TableExchange/exchangeTable'

interface OfferInterface {
    index: number
    offerOne: AnimalInterface
    offerTwo: AnimalInterface
    mySocketId: string
    gameId: string
}

function Offer(props: OfferInterface) {
    const { index, offerOne, offerTwo, mySocketId, gameId } = props

    const exchangeAnimalWithHerd = (offerFor: string, offerWhat: string) => {
        socket.emit('exchange', {
            socketId: mySocketId,
            gameId,
            index,
            offerFor,
            offerWhat,
        })
    }

    return (
        <div className="exchange__offer offer">
            <div className="offer__what">
                {offerOne.amount}
                <img
                    src={offerOne.image}
                    className="offer__img"
                    alt={offerOne.animal}
                />
            </div>
            <FaArrowRight className="offer__arrow" />
            <div className="offer__for">
                {offerTwo.amount}
                <img
                    src={offerTwo.image}
                    className="offer__img"
                    alt={offerTwo.animal}
                />
            </div>
            <button
                type="submit"
                onClick={() =>
                    exchangeAnimalWithHerd(offerOne.animal, offerTwo.animal)
                }
                className="offer__submit-btn"
            >
                Exchange
            </button>
        </div>
    )
}

export default Offer
