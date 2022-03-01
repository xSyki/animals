const AnimalsPlayer = require('./AnimalsPlayer');

class AnimalsTable {
    constructor(socketio, tableId) {
        this.socketio = socketio;
        this.tableId = tableId;
        this.players = [];
        this.herd = {
            rabbit: 60,
            sheep: 24,
            pig: 20,
            cow: 12,
            horse: 6,
            smallDog: 4,
            bigDog: 2
        }
    }
}

joinTable = PokerPlayer => {
    if(this.plater.length < 6) {
        this.player.push(PokerPlayer);
        return true;
    }
    return false;
}

updatePlayer = () => {
    const { table, socketio } = this;

    const tableData = {
        seats: table.seats()
    }

    this.players.forEach(player => {
        if (player.currentSeat !== undefined && player.user) {
            tableData.seats[player.currentSeat].name = player.user.name;
            tableData.seats[player.currentSeat].image = player.user.image;
            tableData.seats[player.currentSeat].socketId = player.user.socketId;
        }
    })

    if (table.isHandInProgress()) {
    }
}