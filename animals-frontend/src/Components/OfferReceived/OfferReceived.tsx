import { FaArrowRight } from 'react-icons/fa';
import { socket } from '../../connection/socket';
import { offerReceivedInterface } from '../../Interfaces/offerInterface';
import playerInterface from '../../Interfaces/playerInterface';

interface offerReceivedPropsInterface {
    offerRecieved: offerReceivedInterface,
    players: playerInterface[],
    setOfferRecieved: React.Dispatch<React.SetStateAction<offerReceivedInterface | undefined>>
}

function OfferReceived(props: offerReceivedPropsInterface) {

    const { offerRecieved, players, setOfferRecieved } = props;

    const { socketId, toPlayerId, gameId, offerFor, offerWhat } = offerRecieved;

    const who = players.find(player => player.playerId === socketId) || { name: "" };

    const to = players.find(player => player.playerId === toPlayerId) || { name: "" };

    const acceptOffer = () => {
        setOfferRecieved(undefined);
        socket.emit("answerOffer",
            {
                answer: true,
                socketId,
                toPlayerId,
                gameId,
                offerFor,
                offerWhat
            });
    }

    const denyOffer = () => {
        setOfferRecieved(undefined);
        socket.emit("answerOffer",
            {
                answer: false,
                socketId,
                toPlayerId,
                gameId,
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

export default OfferReceived;