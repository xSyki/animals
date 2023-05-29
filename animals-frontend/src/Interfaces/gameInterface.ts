import HerdInterface from './herdInterface'

interface GameInterface {
    gameId: string
    round: string
    started: boolean
    isEnded: boolean
    herd: HerdInterface
    players: string[]
}

export default GameInterface
