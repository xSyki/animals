import { useState } from "react";
import PlayerInterface from "../../Interfaces/PlayerInterface";
import Animals from "../Animals/Animals";

interface PlayerPropsInterface {
  players: PlayerInterface[];
  player: PlayerInterface;
  mySocketId: string;
  updateNickName: (newName: any) => void;
  isStarted: boolean;
  gameRound: string;
}

function Player(props: PlayerPropsInterface) {
  const { players, player, mySocketId, updateNickName, isStarted, gameRound } =
    props;

  const [name, setName] = useState(player.name);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateNickName(name);
  };

  const isMe = player.playerId === mySocketId;

  const index = players.findIndex(
    (playerA) => playerA.playerId === player.playerId
  );

  return (
    <div className={`player player__${index}`}>
      <div className="player__profile">
        {isMe && !isStarted ? (
          <form onSubmit={(e) => handleSubmit(e)} className="player__name-form">
            <input
              className="player__name-input"
              maxLength={12}
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {player.name !== name && (
              <button
                type="submit"
                className="player__input-submit"
                onClick={() => updateNickName(name)}
              >
                Submit
              </button>
            )}
          </form>
        ) : (
          <div
            className={`player__nickname ${
              player.playerId === gameRound ? "active" : ""
            }`}
          >
            {player.name}
          </div>
        )}
      </div>
      <Animals animals={player.herd} />
    </div>
  );
}

export default Player;
