import HerdInterface from "./HerdInterface";

interface PlayerInterface {
  name: string;
  playerId: string;
  gameId: string;
  creator: string;
  herd: HerdInterface;
}

export default PlayerInterface;
