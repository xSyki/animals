import HerdInterface from "./HerdInterface";

interface GameInterface {
  gameId: string;
  round: string;
  started: boolean;
  isEnded: boolean;
  herd: HerdInterface;
  players: string[];
}

export default GameInterface;
