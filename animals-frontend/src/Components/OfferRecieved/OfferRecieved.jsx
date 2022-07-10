import { FaArrowRight } from 'react-icons/fa';
import { socket } from '../../connection/socket';

function OfferRecieved(props) {

    const { offerRecieved, players, setOfferRecieved } = props;

    const { socketId, toPlayerId, gameId, index, offerFor, offerWhat } = offerRecieved;

    const who = players.find(player => player.playerId === socketId);

    const to = players.find(player => player.playerId === toPlayerId);

    const acceptOffer = () => {
        setOfferRecieved();
        socket.emit("answerOffer",
            {
                answer: true,
                socketId,
                toPlayerId,
                gameId,
                index,
                offerFor,
                offerWhat
            });
    }

    const denyOffer = () => {
        setOfferRecieved();
        socket.emit("answerOffer",
            {
                answer: false,
                socketId,
                toPlayerId,
                gameId,
                index,
                offerFor,
                offerWhat
            });
    }

    return (
        <div className='offer-recieved' >
            <div className='offer-recieved__players'>
                <div className='offer-recieved__who'>
                    {who.name}
                </div>
                <FaArrowRight className='offer-recieved__arrow' />
                <div className='offer-recieved__to'>
                    {to.name}
                </div>
            </div>
            <div className='offer-recieved__offer'>
                <div className='offer-recieved__what'>
                    {offerFor.amount}
                    <img src={offerFor.image} className='offer-recieved__img' alt={offerFor.animal} />
                </div>
                <FaArrowRight className='offer-recieved__arrow' />
                <div className='offer-recieved__for'>
                    {offerWhat.amount}
                    <img src={offerWhat.image} className='offer-recieved__img' alt={offerWhat.animal} />
                </div>
            </div>
            <div className='offer-recieved__buttons'>
                <button
                    onClick={denyOffer}
                    className="offer-recieved__deny-btn"
                >
                    Deny
                </button>
                <button
                    onClick={acceptOffer}
                    className="offer-recieved__accept-btn"
                >
                    Accept
                </button>
            </div>
        </div>
    )
}

export default OfferRecieved;