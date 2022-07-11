import { FaArrowRight } from "react-icons/fa";
import socket from "../../connection/socket";
import OfferReceivedType, {
  OfferReceivedInterface,
} from "../../Interfaces/OfferInterface";
import playerInterface from "../../Interfaces/PlayerInterface";

interface OfferReceivedPropsInterface {
  offerReceived: OfferReceivedInterface;
  players: playerInterface[];
  setOfferReceived: React.Dispatch<React.SetStateAction<OfferReceivedType>>;
}

function OfferReceived(props: OfferReceivedPropsInterface) {
  const { offerReceived, players, setOfferReceived } = props;

  const { socketId, toPlayerId, gameId, offerFor, offerWhat } = offerReceived;

  const who = players.find((player) => player.playerId === socketId) || {
    name: "",
  };

  const to = players.find((player) => player.playerId === toPlayerId) || {
    name: "",
  };

  const acceptOffer = () => {
    setOfferReceived(undefined);
    socket.emit("answerOffer", {
      answer: true,
      socketId,
      toPlayerId,
      gameId,
      offerFor,
      offerWhat,
    });
  };

  const denyOffer = () => {
    setOfferReceived(undefined);
    socket.emit("answerOffer", {
      answer: false,
      socketId,
      toPlayerId,
      gameId,
      offerFor,
      offerWhat,
    });
  };

  return (
    <div className="offer-received">
      <div className="offer-received__players">
        <div className="offer-received__who">{who.name}</div>
        <FaArrowRight className="offer-received__arrow" />
        <div className="offer-received__to">{to.name}</div>
      </div>
      <div className="offer-received__offer">
        <div className="offer-received__what">
          {offerFor.amount}
          <img
            src={offerFor.image}
            className="offer-received__img"
            alt={offerFor.animal}
          />
        </div>
        <FaArrowRight className="offer-received__arrow" />
        <div className="offer-received__for">
          {offerWhat.amount}
          <img
            src={offerWhat.image}
            className="offer-received__img"
            alt={offerWhat.animal}
          />
        </div>
      </div>
      <div className="offer-received__buttons">
        <button
          type="submit"
          onClick={denyOffer}
          className="offer-received__deny-btn"
        >
          Deny
        </button>
        <button
          type="submit"
          onClick={acceptOffer}
          className="offer-received__accept-btn"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export default OfferReceived;
