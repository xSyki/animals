import herdInterface from "./herdInterface";

export default interface gameInterface {
    gameId: string,
    round: string,
    started: boolean,
    isEnded: boolean,
    herd: herdInterface,
    players: string[]
}