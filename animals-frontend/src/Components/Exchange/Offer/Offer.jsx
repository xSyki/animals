import { FaArrowRight } from 'react-icons/fa';
import { socket } from '../../../connection/socket';

function Offer(props) {

    const { index, offerOne, offerTwo, mySocketId, gameId } = props;

    const exchangeAnimalWithHerd = (index, offerFor, offerWhat) => {
        socket.emit("exchange",
            {
                socketId: mySocketId,
                gameId: gameId,
                index,
                offerFor,
                offerWhat
            });
    }

    return (
        <div className='exchange__offer offer' >
            <div className='offer__what'>
                {offerOne.amount}
                <img src={offerOne.image} className='offer__img' alt={offerOne.animal} />
            </div>
            <FaArrowRight className='offer__arrow' />
            <div className='offer__for'>
                {offerTwo.amount}
                <img src={offerTwo.image} className='offer__img' alt={offerTwo.animal} />
            </div>
            <button
                onClick={() => exchangeAnimalWithHerd(index, offerOne.animal, offerTwo.animal)}
                className="offer__submit-btn"
            >
                Exchange
            </button>
        </div>
    )
}

export default Offer;