var io
var gameSocket

var games = [];

var players = [];

const exchangeTable = require('./exchangeTable');

const firstDiceType = require('./firstDiceType');
const secoundDiceType = require('./secoundDiceType');

const initializeGame = (sio, socket) => {
    io = sio;
    gameSocket = socket;

    gameSocket.on("disconnect", disconnect)

    gameSocket.on("endGame", endGame);

    gameSocket.on("createNewGame", createNewGame);

    gameSocket.on("playerJoinGame", playerJoinsGame);

    gameSocket.on("userNameUpdate", userNameUpdate);

    gameSocket.on("startGame", startGame);

    gameSocket.on("exchange", exchange);

    gameSocket.on("dize", dize);

    gameSocket.on("endRound", endRound);

    gameSocket.on("createNextGame", createNextGame);
}

function createNewGame(gameId) {

    games.push({
        gameId: gameId,
        round: '',
        started: false,
        isEnded: false,
        herd: {
            rabbit: 60,
            sheep: 24,
            pig: 20,
            cow: 12,
            horse: 6,
            smallDog: 4,
            bigDog: 2
        },
        players: []
    })

    this.emit('createNewGame', games.filter(game => game.gameId === gameId));
}

function playerJoinsGame(idData) {
    var sock = this;

    const { gameId, name } = idData

    const game = games.find(game => game.gameId === gameId )

    const joinedPlayers = players.filter(player => player.gameId === gameId)
    
    if(!game) {
        io.sockets.to(sock.id).emit('gameDoesntExist');
        return;
    };

    if(game.started) {
        io.sockets.to(sock.id).emit('gameDoesntExist');
        return;
    }

    const maxPlayers = 6
    if(joinedPlayers.length === maxPlayers) {
        io.sockets.to(sock.id).emit('gameDoesntExist');
        return;
    }

    if(players.find(player => player.playerId === this.id) ) {
        players = players.filter(player => player.playerId !== this.id);
    }

    let creator = false;
    if(players.filter(player => player.gameId === idData.gameId).length === 0 ) creator = true;

    idData.mySocketId = sock.id;

    sock.join(idData.gameId);

    let newName = name ? name : `Player#${idData.mySocketId.slice(0, 5)}`;

    players.push({
        name: newName,
        playerId: idData.mySocketId,
        gameId: idData.gameId,
        creator: creator,
        herd: {
            rabbit: 0,
            sheep: 2,
            pig: 1,
            cow: 1,
            horse: 1,
            smallDog: 0,
            bigDog: 0
        }
    })

    games.find(game => game.gameId === idData.gameId ).players.push(sock.id);

    io.sockets.to(idData.mySocketId).emit('mySocketId', {mySocketId: idData.mySocketId, creator});
    io.sockets.in(idData.gameId).emit('playersUpdate', players.filter(player => player.gameId === idData.gameId));
    io.sockets.in(idData.gameId).emit('gameUpdate', games.filter(game => game.gameId === idData.gameId));
}

function userNameUpdate({mySocketId, newName, gameId}) {
    const player = players.find(player => player.playerId === this.id);

    if(player) {
        player.name = newName;
    }

    io.sockets.in(gameId).emit('playersUpdate', players.filter(player => player.gameId === gameId));
}

function startGame(gameId) {
    const gamePlayers = players.filter(player => player.gameId === gameId);

    const randomPlayerIndex = getRandomInt(0, gamePlayers.length-1);

    const game = games.find(game => game.gameId === gameId)

    if(game) {
        game.round = gamePlayers[randomPlayerIndex].playerId;
        game.started = true;
    }

    io.sockets.in(gameId).emit('gameUpdate', games.filter(game => game.gameId === gameId));
    io.sockets.in(gameId).emit('playersUpdate', players.filter(player => player.gameId === gameId));
}

function exchange({gameId, socketId, index, offerFor, offerWhat}) {

    const player = players.find(player => player.playerId === socketId);
    const game = games.find(game => game.gameId === gameId);

    if(!player) return;
    if(!game) return;

    const newGameHerd = game.herd;
    const newPlayerHerd = player.herd;

    const exchangeTablForAmount = exchangeTable[index].find(offer => offer.animal === offerFor).amount;
    const exchangeTablWhatAmount = exchangeTable[index].find(offer => offer.animal === offerWhat).amount;

    if(newPlayerHerd[offerFor] >= exchangeTablForAmount && newGameHerd[offerWhat] >= exchangeTablWhatAmount ) {
        newPlayerHerd[offerFor] -= exchangeTablForAmount;
        newPlayerHerd[offerWhat] += exchangeTablWhatAmount;
        newGameHerd[offerWhat] -= exchangeTablWhatAmount;
        newGameHerd[offerFor] += exchangeTablForAmount; 
    }

    io.sockets.in(gameId).emit('playersUpdate', players.filter(player => player.gameId === gameId));
    io.sockets.in(gameId).emit('gameUpdate', games.filter(game => game.gameId === gameId));

    if(checkIsWinner(newPlayerHerd)) {
        io.sockets.in(gameId).emit('winner', players.find(player => player.playerId === socketId));
    }
}

function dize({gameId, socketId}) {
    const firstDize = getRandomInt(1, 12);
    const secoundDize = getRandomInt(1, 12);

    io.sockets.in(gameId).emit('recieveDize', {firstDize, secoundDize});

    const firstDiceAnimal = firstDiceType[firstDize-1].animal;
    const secoundDiceAnimal = secoundDiceType[secoundDize-1].animal;

    const player = players.find(player => player.playerId === socketId);
    const game = games.find(game => game.gameId === gameId);

    if(!player) return;
    if(!game) return;

    const newGameHerd = game.herd;
    const newHerd = player.herd;

    if(firstDiceAnimal === "wolf") {
        if(newHerd.bigDog >= 1) {
            newHerd.bigDog--;
            newGameHerd.bigDog++;
        } else {
            newGameHerd.rabbit += newHerd.rabbit;
            newHerd.rabbit = 0;
            newGameHerd.sheep += newHerd.sheep;
            newHerd.sheep = 0;
            newGameHerd.pig += newHerd.pig;
            newHerd.pig = 0;
            newGameHerd.cow += newHerd.cow;
            newHerd.cow = 0;
        }
    }

    if(secoundDiceAnimal === "nov") {
        if(newHerd.smallDog >= 1) {
            newHerd.smallDog--;
            newGameHerd.smallDog++;
        } else {
            newGameHerd.rabbit += newHerd.rabbit;
            newHerd.rabbit = 0;
        }
    }

    if(firstDiceAnimal === secoundDiceAnimal) {
        if(newGameHerd[firstDiceAnimal] >= Math.floor(newHerd[firstDiceAnimal]/2) + 1) {
            newGameHerd[firstDiceAnimal] -= Math.floor(newHerd[firstDiceAnimal]/2) + 1;
            newHerd[firstDiceAnimal] +=   Math.floor(newHerd[firstDiceAnimal]/2) + 1;
        } else {
            newHerd[firstDiceAnimal] += newGameHerd[firstDiceAnimal];
            newGameHerd[firstDiceAnimal] = 0;
        }
    } else {
        if(newHerd[firstDiceAnimal] >= 1) {
            if(newGameHerd[firstDiceAnimal] >= Math.floor((newHerd[firstDiceAnimal]+1)/2)) {
                newGameHerd[firstDiceAnimal] -= Math.floor((newHerd[firstDiceAnimal]+1)/2);
                newHerd[firstDiceAnimal] +=  Math.floor((newHerd[firstDiceAnimal]+1)/2);
            } else {
                newHerd[firstDiceAnimal] += newGameHerd[firstDiceAnimal];
                newGameHerd[firstDiceAnimal] = 0;
            }
        }
        if(newHerd[secoundDiceAnimal] >= 1) {
            if(newGameHerd[secoundDiceAnimal] >= Math.floor((newHerd[secoundDiceAnimal]+1)/2)) {
                newGameHerd[secoundDiceAnimal] -= Math.floor((newHerd[secoundDiceAnimal]+1)/2);
                newHerd[secoundDiceAnimal] += Math.floor((newHerd[secoundDiceAnimal]+1)/2);
            } else {
                newHerd[secoundDiceAnimal] += newGameHerd[secoundDiceAnimal];
                newGameHerd[firstDiceAnimal] = 0;
            }
        }
    }

    io.sockets.in(gameId).emit('playersUpdate', players.filter(player => player.gameId === gameId));
    io.sockets.in(gameId).emit('gameUpdate', games.filter(game => game.gameId === gameId));

    if(checkIsWinner(newHerd)) {
        io.sockets.in(gameId).emit('winner', players.find(player => player.playerId === socketId));
    }
}

function checkIsWinner(newHerd) {
    if(newHerd.rabbit >= 1 && newHerd.pig >= 1 && newHerd.sheep >= 1 && newHerd.cow >= 1 && newHerd.horse >= 1) {
        return true;
    } else {
        return false;
    }
}

function endRound({gameId, socketId}) {
    const game = games.find(game => game.gameId === gameId);

    if(!game) return;

    let { round, isEnded } = game;
    
    if(isEnded) return;
    if(socketId !== round) return;

    const gamePlayers = players.filter(player => player.gameId === gameId);

    const actualIndex = gamePlayers.findIndex(player => player.playerId == socketId);
    let newRoundPlayerIndex = actualIndex+1;
    if(newRoundPlayerIndex === gamePlayers.length) newRoundPlayerIndex = 0;
    game.round = gamePlayers[newRoundPlayerIndex].playerId;

    io.sockets.in(gameId).emit('gameUpdate', games.filter(game => game.gameId === gameId));
}

function createNextGame({gameId, newGameRoomId}) {
    games.find(game => game.gameId === gameId).players.forEach(player =>
        io.sockets.to(player).emit('nextGameCreated', newGameRoomId)
    );
    games = games.filter(game => game.gameId !== gameId);
}

function endGame({gameId, mySocketId}) {
    var socket = this;

    const game = games.find(game => game.gameId === gameId);

    if(game) {
        game.isEnded = true;
    }
    
    socket.leave(gameId);
    players = players.filter(player => player.playerId !== mySocketId);
}

function disconnect() {
    var socket = this;

    const player = players.find((player) => player.playerId === socket.id);
    if(!player) return;
    const { gameId, playerId, creator } = player;
    players = players.filter(player => player.playerId !== socket.id);

    const game = games.find(game => game.gameId === gameId);
    if(!game) return;
    let { players: gamePlayers, round, started, isEnded } = game;
    const actualIndex = gamePlayers.findIndex(playerId => playerId === round);
    gamePlayers = gamePlayers.filter(playerId => playerId !== socket.id);

    //Deleting game
    const playerZero = gamePlayers.length === 0;
    const gameOver = started && gamePlayers.length === 1;
    const deleteGame = playerZero || gameOver;
    if(deleteGame) {
        gamePlayers.map(playerM => {
            players = players.filter((player)=> player.playerId !== playerM.id);
        });
        games = games.filter(game => game.gameId !== gameId);
        io.sockets.in(gameId).emit('gameDoesntExist');
        return;
    }

    //Change round
    if(round === playerId && !isEnded) {
        if(actualIndex === -1) return;
    
        let newRoundPlayerIndex = actualIndex+1;
        if(newRoundPlayerIndex >= gamePlayers.length) newRoundPlayerIndex = 0;
        round = gamePlayers[newRoundPlayerIndex];
    }

    //Change Creator
    if(creator && !isEnded) {
        let newCreatorSocketId = gamePlayers[0];
        let newCreator = players.find(player => player.playerId === newCreatorSocketId);
        if(newCreator) {
            newCreator.creator = true;
        } else {
            gamePlayers = gamePlayers.filter(playerId => playerId !== newCreatorSocketId);
            newCreatorSocketId = gamePlayers[0];
            newCreator = players.find(player => player.playerId === newCreatorSocketId);
            if(!newCreator) return;
            newCreator.creator = true;
        }

        io.sockets.to(newCreatorSocketId).emit('mySocketId', {mySocketId: newCreatorSocketId, creator: true});
    }

    game.players = gamePlayers;
    game.round = round;

    io.sockets.in(gameId).emit('gameUpdate', games.filter(game => game.gameId === gameId));
    io.sockets.in(gameId).emit('playersUpdate', players.filter(player => player.gameId === gameId));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.initializeGame = initializeGame;