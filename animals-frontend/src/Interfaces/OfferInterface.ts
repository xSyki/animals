import { AnimalInterface } from "../Components/TableExchange/exchangeTable";

export interface OfferReceivedInterface {
  socketId: string;
  toPlayerId: string;
  gameId: string;
  offerFor: AnimalInterface;
  offerWhat: AnimalInterface;
}

type OfferReceivedType = OfferReceivedInterface | undefined;

export default OfferReceivedType;
