const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AnimalsPlayer {
    constructor(socketio, gameSocket){
        this.socketio=socketio;
        this.gameSocket = gameSocket;
        this.currentTable = undefined;
        this.currentSeat = undefined;
        this.user = undefined;
        this.herd = {
                rabbit: 0,
                sheep: 0,
                pig: 0,
                cow: 0,
                horse: 0,
                smallDog: 0,
                bigDog: 0
        }

        gameSocket.on('disconnect', this.disconnectFromTable);
        gameSocket.on('leaveTable', this.disconnectFromTable);

        gameSocket.on('createTable', this.createTable);
        gameSocket.on('joinTable', this.joinActiveTable);
        gameSocket.on('sitTable', this.sitTable);
        gameSocket.on('rollDice', this.rollDice);
        gameSocket.on('exchangeAnimals', this.exchangeAnimals);
    }

    joinActiveTable = data => {
        this.disconnectFromTable();
        var {tableId} = data;

        var tableRoom = this.socketio.sockets.rooms.get(tableId);

        var table = activeTables[tableId];

        if(tableRoom === undefined || table === undefined) {
            this.gameSocket.emit('status', 'Unknown animals table');
        }
        if(table.joinTable(this)) {

        }
    }
}

export default AnimalsPlayer;