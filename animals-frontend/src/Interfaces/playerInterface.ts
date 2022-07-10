import herdInterface from './herdInterface';

export default interface playerInterface {
    name: string,
    playerId: string,
    gameId: string,
    creator: string,
    herd: herdInterface
}