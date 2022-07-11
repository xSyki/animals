import React, { useState } from "react";
import { FaArrowRight, FaCheck } from "react-icons/fa";
import socket from "../../../connection/socket";
import PlayerInterface from "../../../Interfaces/PlayerInterface";
import { AnimalInterface } from "../../TableExchange/exchangeTable";

interface OfferToPlayerPropsInterface {
  offerOne: AnimalInterface;
  offerTwo: AnimalInterface;
  mySocketId: string;
  gameId: string;
  players: PlayerInterface[];
  setOfferSent: React.Dispatch<React.SetStateAction<boolean>>;
}

function OfferToPlayer(props: OfferToPlayerPropsInterface) {
  const { offerOne, offerTwo, mySocketId, gameId, players, setOfferSent } =
    props;

  const [selectedPlayer, setSelectedPlayer] = useState(players[0].playerId);

  const exchangeAnimalWithPlayer = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setOfferSent(true);
    socket.emit("exchangeWithPlayer", {
      socketId: mySocketId,
      toPlayerId: selectedPlayer,
      gameId,
      offerFor: offerOne,
      offerWhat: offerTwo,
    });
  };

  return (
    <div className="exchange__offer offer-player">
      <div className="offer-player__what">
        {offerOne.amount}
        <img
          src={offerOne.image}
          className="offer-player__img"
          alt={offerOne.animal}
        />
      </div>
      <FaArrowRight className="offer-player__arrow" />
      <div className="offer-player__for">
        {offerTwo.amount}
        <img
          src={offerTwo.image}
          className="offer-player__img"
          alt={offerTwo.animal}
        />
      </div>
      <form className="offer-player__player-offer">
        <select
          name="availablePlayer"
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
          className="offer-player__select"
        >
          ;
          {players.map((player) => {
            if (player.herd[offerTwo.animal] >= offerTwo.amount) {
              return (
                <option
                  value={player.playerId}
                  className="offer-player__option"
                  key={player.playerId}
                >
                  {player.name}
                </option>
              );
            }
            return null;
          })}
        </select>
        <button
          type="submit"
          onClick={(e) => exchangeAnimalWithPlayer(e)}
          className="offer-player__player-submit-btn"
        >
          <FaCheck />
        </button>
      </form>
    </div>
  );
}

export default OfferToPlayer;
