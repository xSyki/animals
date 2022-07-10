import { animalInterface } from '../Components/TableExchange/exchangeTable'

export interface offerReceivedInterface {
    socketId: string,
    toPlayerId: string,
    gameId: string,
    offerFor: animalInterface,
    offerWhat: animalInterface
}

type offerReceivedType = offerReceivedInterface | undefined;

export default offerReceivedType;