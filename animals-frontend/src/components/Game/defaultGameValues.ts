import GameInterface from '../../interfaces/gameInterface'
import HerdInterface from '../../interfaces/herdInterface'
import PlayerInterface from '../../interfaces/playerInterface'

const defaultGameHerd: HerdInterface = {
    rabbit: 60,
    sheep: 24,
    pig: 20,
    cow: 12,
    horse: 6,
    smallDog: 4,
    bigDog: 2,
}

const defaultHerd = {
    rabbit: 0,
    sheep: 0,
    pig: 0,
    cow: 0,
    horse: 0,
    smallDog: 0,
    bigDog: 0,
}

export const defaultGame: GameInterface = {
    gameId: '',
    round: '',
    started: false,
    isEnded: false,
    herd: defaultGameHerd,
    players: [],
}

export const defaultPlayers: PlayerInterface[] = [
    {
        name: '',
        playerId: '',
        gameId: '',
        creator: '',
        herd: defaultHerd,
    },
]

export const defaultDiceRoll = { firstDice: 1, secondDice: 1 }
