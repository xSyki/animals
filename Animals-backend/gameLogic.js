var io
var gameSocket

var games = [];

var players = [];



const initializeGame = (sio, socket) => {
    io = sio;
    gameSocket = socket;

    gameSocket.on("createNewGame", createNewGame);

    gameSocket.on("playerJoinGame", playerJoinsGame);

    gameSocket.on("userNameUpdate", userNameUpdate);

    gameSocket.on("startGame", startGame);

    gameSocket.on("dize", dize);

    gameSocket.on("endRound", endRound);
}


function playerJoinsGame(idData) {

    if(players.filter(player => player.gameId === idData.gameId).length >= 6 ) return;

    var sock = this;

    let creator = false;
    if(players.filter(player => player.gameId === idData.gameId).length === 0 ) creator = true;

    idData.mySocketId = sock.id;

    sock.join(idData.gameId);

    players.push({
        name: `Player#${players.length}`,
        playerId: idData.mySocketId,
        gameId: idData.gameId,
        creator: creator,
        herd: {
            rabbit: 0,
            sheep: 0,
            pig: 0,
            cow: 0,
            horse: 0,
            smallDog: 0,
            bigDog: 0
        }
    })

    idData.players = players.filter(player => player.gameId === idData.gameId);

    // if (room.length === 6) {
    //     io.sockets.in(idData.gameId).emit('start game', idData.mySocketId)
    // }
    io.sockets.to(idData.mySocketId).emit('mySocketId', {mySocketId: idData.mySocketId, creator});
    io.sockets.in(idData.gameId).emit('playerJoinedRoom', idData);
    io.sockets.in(idData.gameId).emit('gameUpdate', games.filter(game => game.gameId === idData.gameId));
}


function createNewGame(gameId) {

    games.push({
        gameId: gameId,
        round: '',
        started: false,
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

function userNameUpdate({mySocketId, newName, gameId}) {
    const objIndex = players.findIndex(player => player.playerId === mySocketId);

    if(objIndex !== -1) {
        players[objIndex].name = newName;
    }

    io.sockets.in(gameId).emit('playersUpdate', players.filter(player => player.gameId === gameId));
}

function startGame(gameId) {
    const gamePlayers = players.filter(player => player.gameId === gameId);

    const startGame = getRandomInt(0, gamePlayers.length-1);

    const objIndex = games.findIndex(game => game.gameId === gameId);

    if(objIndex !== -1) {
        games[objIndex].round = gamePlayers[startGame].playerId;
        games[objIndex].started = true;
    }

    io.sockets.in(gameId).emit('gameUpdate', games.filter(game => game.gameId === gameId));
}

function dize({gameId, socketId}) {
    const firstDize = getRandomInt(1, 12);
    const secoundDize = getRandomInt(1, 12);

    io.sockets.in(gameId).emit('recieveDize', {firstDize, secoundDize});

    const firstDiceType = [
        {
            animal: "rabbit",
        },
        {
            animal: "sheep",
        },
        {
            animal: "rabbit",
        },
        {
            animal: "pig",
        },
        {
            animal: "rabbit",
        },
        {
            animal: "sheep",
        },
        {
            animal: "rabbit",
        },
        {
            animal: "rabbit",
        },
        {
            animal: "rabbit",
        },
        {
            animal: "sheep",
        },
        {
            animal: "cow",
        },
        {
            animal: "wolf",
        }
    ]
    
    const secoundDiceType = [
        {
            animal: "rabbit",
        },
        {
            animal: "sheep",
        },
        {
            animal: "rabbit",
        },
        {
            animal: "pig",
        },
        {
            animal: "rabbit",
        },
        {
            animal: "sheep",
        },
        {
            animal: "rabbit",
        },
        {
            animal: "rabbit",
        },
        {
            animal: "rabbit",
        },
        {
            animal: "pig",
        },
        {
            animal: "horse",
        },
        {
            animal: "nov",
        }
    ]

    const firstDiceAnimal = firstDiceType[firstDize-1].animal;
    const secoundDiceAnimal = secoundDiceType[secoundDize-1].animal;

    console.log({firstDiceAnimal, secoundDiceAnimal});

    const objIndex = players.findIndex(player => player.playerId === socketId);

    const gameIndex = games.findIndex(game => game.gameId === gameId);

    if(gameIndex === -1) return;

    const newGameHerd = games[gameIndex].herd;

    if(objIndex === -1) return;
    const newHerd = players[objIndex].herd;

    if(firstDiceAnimal === "wolf") {
        if(newHerd.bigDog >= 1) {
            newHerd.bigDog = newHerd.bigDog -1;
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
            newHerd.smallDog = newHerd.smallDog -1;
            newGameHerd.smallDog++;
        } else {
            newGameHerd.rabbit += newHerd.rabbit;
            newHerd.rabbit = 0;
        }
    }

    if(firstDiceAnimal === secoundDiceAnimal) {
        if(newGameHerd[firstDiceAnimal] >= Math.floor(newHerd[firstDiceAnimal]/2) + 1) {
            newHerd[firstDiceAnimal] =  newHerd[firstDiceAnimal] + Math.floor(newHerd[firstDiceAnimal]/2) + 1;
            newGameHerd[firstDiceAnimal] = newGameHerd[firstDiceAnimal] - Math.floor(newHerd[firstDiceAnimal]/2) - 1;
        } else {
            newHerd[firstDiceAnimal] = newHerd[firstDiceAnimal] + newGameHerd[firstDiceAnimal];
            newGameHerd[firstDiceAnimal] = 0;
        }

    } else if(newHerd[firstDiceAnimal] >= 1) {
        if(newGameHerd[firstDiceAnimal] >= Math.floor((newHerd[firstDiceAnimal]+1)/2)) {
            newHerd[firstDiceAnimal] =  newHerd[firstDiceAnimal] + Math.floor((newHerd[firstDiceAnimal]+1)/2);
            newGameHerd[firstDiceAnimal] = newGameHerd[firstDiceAnimal] - Math.floor((newHerd[firstDiceAnimal]+1)/2);
        } else {
            newHerd[firstDiceAnimal] = newHerd[firstDiceAnimal] + newGameHerd[firstDiceAnimal];
            newGameHerd[firstDiceAnimal] = 0;
        }
    } else if(newHerd[secoundDiceAnimal] >= 1) {
        if(newGameHerd[secoundDiceAnimal] >= Math.floor((newHerd[secoundDiceAnimal]+1)/2)) {
            newHerd[secoundDiceAnimal] =  newHerd[secoundDiceAnimal] + Math.floor((newHerd[secoundDiceAnimal]+1)/2);
            newGameHerd[secoundDiceAnimal] = newGameHerd[secoundDiceAnimal] - Math.floor((newHerd[secoundDiceAnimal]+1)/2);
        } else {
            newHerd[secoundDiceAnimal] =  players[objIndex].herd[secoundDiceAnimal] + newGameHerd[secoundDiceAnimal];
            newGameHerd[firstDiceAnimal] = 0;
        }
    }

    players[objIndex].herd = newHerd;
    games[gameIndex].herd = newGameHerd;

    io.sockets.in(gameId).emit('playersUpdate', players.filter(player => player.gameId === gameId));
    io.sockets.in(gameId).emit('gameUpdate', games.filter(game => game.gameId === gameId));

    if(checkIsWinner(newHerd)) {
        io.sockets.in(gameId).emit('winner', players.filter(player => player.playerId === socketId));
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
    const objIndex = games.findIndex(game => game.gameId === gameId);
    if(objIndex === -1) return;

    if(socketId !== games[objIndex].round) return;

    const gamePlayers = players.filter(player => player.gameId === gameId);

    const actualIndex = gamePlayers.findIndex(player => player.playerId == socketId);

    let newRoundPlayerIndex = actualIndex+1;

    if(newRoundPlayerIndex === gamePlayers.length) newRoundPlayerIndex = 0;

    games[objIndex].round = gamePlayers[newRoundPlayerIndex].playerId;

    io.sockets.in(gameId).emit('gameUpdate', games.filter(game => game.gameId === gameId));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

exports.initializeGame = initializeGame;