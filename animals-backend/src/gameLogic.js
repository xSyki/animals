const exchangeTable = require("./utils/exchangeTable");
const dices = require("./utils/dices");

let io;
let gameSocket;

let games = [];

let players = [];

const messages = {};

const { firstDice, secondDice } = dices;

const initializeGame = (sio, socket) => {
  io = sio;
  gameSocket = socket;

  gameSocket.on("disconnect", disconnect);

  gameSocket.on("createNewGame", createNewGame);

  gameSocket.on("playerJoinGame", playerJoinsGame);

  gameSocket.on("userNameUpdate", userNameUpdate);

  gameSocket.on("sendMessage", sendMessage);

  gameSocket.on("startGame", startGame);

  gameSocket.on("dice", dice);

  gameSocket.on("exchange", exchange);

  gameSocket.on("exchangeWithPlayer", exchangeAnimalWithPlayer);

  gameSocket.on("answerOffer", answerOffer);

  gameSocket.on("endRound", endRound);

  gameSocket.on("endGame", endGame);

  gameSocket.on("createNextGame", createNextGame);
};

function createNewGame(gameId) {
  const defaultGameHerd = {
    rabbit: 60,
    sheep: 24,
    pig: 20,
    cow: 12,
    horse: 6,
    smallDog: 4,
    bigDog: 2,
  };

  games.push({
    gameId,
    round: "",
    started: false,
    isEnded: false,
    herd: defaultGameHerd,
    players: [],
  });

  messages[gameId] = [];

  this.emit(
    "createNewGame",
    games.find((game) => game.gameId === gameId)
  );
}

function playerJoinsGame(idData) {
  const sock = this;

  const { gameId, name } = idData;

  const game = games.find((game) => game.gameId === gameId);

  if (!game) {
    io.sockets.to(sock.id).emit("gameDoesntExist");
    return;
  }

  const joinedPlayers = players.filter((player) => player.gameId === gameId);

  const maxPlayers = 6;
  if (game.started || joinedPlayers.length === maxPlayers) {
    io.sockets.to(sock.id).emit("gameDoesntExist");
    return;
  }

  if (players.find((player) => player.playerId === this.id)) {
    players = players.filter((player) => player.playerId !== this.id);
  }

  let creator = false;
  if (
    players.filter((player) => player.gameId === idData.gameId).length === 0
  ) {
    creator = true;
  }

  idData.mySocketId = sock.id;

  sock.join(idData.gameId);

  const newName = name ? name : `Player#${idData.mySocketId.slice(0, 5)}`;

  const defaultHerd = {
    rabbit: 0,
    sheep: 0,
    pig: 0,
    cow: 0,
    horse: 0,
    smallDog: 0,
    bigDog: 0,
  };

  players.push({
    name: newName,
    playerId: idData.mySocketId,
    gameId: idData.gameId,
    creator,
    herd: defaultHerd,
  });

  games.find((game) => game.gameId === idData.gameId).players.push(sock.id);

  io.sockets
    .to(idData.mySocketId)
    .emit("mySocketId", { mySocketId: idData.mySocketId, creator });
  io.sockets.in(idData.gameId).emit(
    "playersUpdate",
    players.filter((player) => player.gameId === idData.gameId)
  );
  io.sockets.in(idData.gameId).emit(
    "gameUpdate",
    games.find((game) => game.gameId === idData.gameId)
  );
  io.sockets.in(gameId).emit("messagesUpdate", messages[idData.gameId]);
}

function userNameUpdate({ mySocketId, newName, gameId }) {
  const player = players.find((player) => player.playerId === mySocketId);

  if (!player) return;

  player.name = newName;

  io.sockets.in(gameId).emit(
    "playersUpdate",
    players.filter((player) => player.gameId === gameId)
  );
}

function startGame(gameId) {
  const gamePlayers = players.filter((player) => player.gameId === gameId);

  const randomPlayerIndex = getRandomInt(0, gamePlayers.length - 1);

  const game = games.find((game) => game.gameId === gameId);

  if (game) {
    game.round = gamePlayers[randomPlayerIndex].playerId;
    game.started = true;
  }

  io.sockets.in(gameId).emit(
    "gameUpdate",
    games.find((game) => game.gameId === gameId)
  );
  io.sockets.in(gameId).emit(
    "playersUpdate",
    players.filter((player) => player.gameId === gameId)
  );
}

function exchange({ gameId, socketId, index, offerFor, offerWhat }) {
  const player = players.find((player) => player.playerId === socketId);
  const game = games.find((game) => game.gameId === gameId);

  if (!player || !game) return;

  const newGameHerd = game.herd;
  const newPlayerHerd = player.herd;

  const exchangeTablForAmount = exchangeTable[index].find(
    (offer) => offer.animal === offerFor
  ).amount;
  const exchangeTablWhatAmount = exchangeTable[index].find(
    (offer) => offer.animal === offerWhat
  ).amount;

  if (
    newPlayerHerd[offerFor] >= exchangeTablForAmount &&
    newGameHerd[offerWhat] >= exchangeTablWhatAmount
  ) {
    newPlayerHerd[offerFor] -= exchangeTablForAmount;
    newPlayerHerd[offerWhat] += exchangeTablWhatAmount;
    newGameHerd[offerWhat] -= exchangeTablWhatAmount;
    newGameHerd[offerFor] += exchangeTablForAmount;
  }

  io.sockets.in(gameId).emit(
    "playersUpdate",
    players.filter((player) => player.gameId === gameId)
  );
  io.sockets.in(gameId).emit(
    "gameUpdate",
    games.find((game) => game.gameId === gameId)
  );

  checkIsWinner(newPlayerHerd, socketId, gameId);
}

function exchangeAnimalWithPlayer({
  socketId,
  toPlayerId,
  gameId,
  offerFor,
  offerWhat,
}) {
  const fromPlayer = players.find((player) => player.playerId === socketId);
  const toPlayer = players.find((player) => player.playerId === toPlayerId);

  if (!fromPlayer && !toPlayer) return;
  if (fromPlayer.herd[offerFor.animal] < offerFor.amount) return;
  if (toPlayer.herd[offerWhat.animal] < offerWhat.amount) return;
  io.sockets.to(toPlayerId).emit("acceptExchange", {
    socketId,
    toPlayerId,
    gameId,
    offerFor,
    offerWhat,
  });
}

function answerOffer({
  answer,
  socketId,
  toPlayerId,
  gameId,
  offerFor,
  offerWhat,
}) {
  if (!answer) {
    io.sockets.to(socketId).emit("endExchangeWithPlayer", answer);
    return;
  }
  const fromPlayer = players.find((player) => player.playerId === socketId);
  const toPlayer = players.find((player) => player.playerId === toPlayerId);

  if (!fromPlayer && !toPlayer) return;

  fromPlayer.herd[offerFor.animal] -= offerFor.amount;
  fromPlayer.herd[offerWhat.animal] += offerWhat.amount;

  toPlayer.herd[offerFor.animal] += offerFor.amount;
  toPlayer.herd[offerWhat.animal] -= offerWhat.amount;

  io.sockets.in(gameId).emit(
    "playersUpdate",
    players.filter((player) => player.gameId === gameId)
  );
  io.sockets.to(socketId).emit("endExchangeWithPlayer", answer);
}

function dice({ gameId, socketId }) {
  const firstDiceNumber = getRandomInt(1, 12);
  const secondDiceNumber = getRandomInt(1, 12);

  io.sockets.in(gameId).emit("receiveDice", {
    firstDice: firstDiceNumber,
    secondDice: secondDiceNumber,
  });

  const firstDiceAnimal = firstDice[firstDiceNumber - 1];
  const secondDiceAnimal = secondDice[secondDiceNumber - 1];

  const player = players.find((player) => player.playerId === socketId);
  const game = games.find((game) => game.gameId === gameId);

  if (!player || !game) return;

  const newGameHerd = game.herd;
  const newHerd = player.herd;

  if (firstDiceAnimal === "wolf") {
    if (newHerd.bigDog >= 1) {
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

  if (secondDiceAnimal === "nov") {
    if (newHerd.smallDog >= 1) {
      newHerd.smallDog--;
      newGameHerd.smallDog++;
    } else {
      newGameHerd.rabbit += newHerd.rabbit;
      newHerd.rabbit = 0;
    }
  }

  if (firstDiceAnimal === secondDiceAnimal) {
    if (
      newGameHerd[firstDiceAnimal] >=
      Math.floor(newHerd[firstDiceAnimal] / 2) + 1
    ) {
      newGameHerd[firstDiceAnimal] -=
        Math.floor(newHerd[firstDiceAnimal] / 2) + 1;
      newHerd[firstDiceAnimal] += Math.floor(newHerd[firstDiceAnimal] / 2) + 1;
    } else {
      newHerd[firstDiceAnimal] += newGameHerd[firstDiceAnimal];
      newGameHerd[firstDiceAnimal] = 0;
    }
  } else {
    if (newHerd[firstDiceAnimal] >= 1) {
      if (
        newGameHerd[firstDiceAnimal] >=
        Math.floor((newHerd[firstDiceAnimal] + 1) / 2)
      ) {
        newGameHerd[firstDiceAnimal] -= Math.floor(
          (newHerd[firstDiceAnimal] + 1) / 2
        );
        newHerd[firstDiceAnimal] += Math.floor(
          (newHerd[firstDiceAnimal] + 1) / 2
        );
      } else {
        newHerd[firstDiceAnimal] += newGameHerd[firstDiceAnimal];
        newGameHerd[firstDiceAnimal] = 0;
      }
    }
    if (newHerd[secondDiceAnimal] >= 1) {
      if (
        newGameHerd[secondDiceAnimal] >=
        Math.floor((newHerd[secondDiceAnimal] + 1) / 2)
      ) {
        newGameHerd[secondDiceAnimal] -= Math.floor(
          (newHerd[secondDiceAnimal] + 1) / 2
        );
        newHerd[secondDiceAnimal] += Math.floor(
          (newHerd[secondDiceAnimal] + 1) / 2
        );
      } else {
        newHerd[secondDiceAnimal] += newGameHerd[secondDiceAnimal];
        newGameHerd[secondDiceAnimal] = 0;
      }
    }
  }

  io.sockets.in(gameId).emit(
    "playersUpdate",
    players.filter((player) => player.gameId === gameId)
  );
  io.sockets.in(gameId).emit(
    "gameUpdate",
    games.find((game) => game.gameId === gameId)
  );

  checkIsWinner(newHerd, socketId, gameId);
}

function checkIsWinner(newHerd, socketId, gameId) {
  if (
    newHerd.rabbit >= 1 &&
    newHerd.pig >= 1 &&
    newHerd.sheep >= 1 &&
    newHerd.cow >= 1 &&
    newHerd.horse >= 1
  ) {
    io.sockets.in(gameId).emit(
      "winner",
      players.find((player) => player.playerId === socketId)
    );
  }
}

function endRound({ gameId, socketId }) {
  const game = games.find((game) => game.gameId === gameId);

  if (!game) return;

  const { round, isEnded } = game;

  if (isEnded) return;
  if (socketId !== round) return;

  const gamePlayers = players.filter((player) => player.gameId === gameId);

  const actualIndex = gamePlayers.findIndex(
    (player) => player.playerId === socketId
  );
  let newRoundPlayerIndex = actualIndex + 1;
  if (newRoundPlayerIndex === gamePlayers.length) newRoundPlayerIndex = 0;
  game.round = gamePlayers[newRoundPlayerIndex].playerId;

  io.sockets.in(gameId).emit(
    "gameUpdate",
    games.find((game) => game.gameId === gameId)
  );
}

function createNextGame({ gameId, newGameRoomId }) {
  games
    .find((game) => game.gameId === gameId)
    .players.forEach((player) =>
      io.sockets.to(player).emit("nextGameCreated", newGameRoomId)
    );
  games = games.filter((game) => game.gameId !== gameId);
}

function endGame({ gameId, mySocketId }) {
  const socket = this;

  const game = games.find((game) => game.gameId === gameId);

  if (game) {
    game.isEnded = true;
    delete messages[gameId];
  }

  socket.leave(gameId);
  players = players.filter((player) => player.playerId !== mySocketId);
}

function disconnect() {
  const socket = this;

  const player = players.find((player) => player.playerId === socket.id);
  if (!player) return;

  const { gameId, playerId, creator } = player;
  players = players.filter((player) => player.playerId !== socket.id);

  const game = games.find((game) => game.gameId === gameId);
  if (!game) return;

  let { players: gamePlayers, round } = game;
  const { started, isEnded } = game;

  const actualIndex = gamePlayers.findIndex((playerId) => playerId === round);
  gamePlayers = gamePlayers.filter((playerId) => playerId !== socket.id);

  //Deleting game
  const playerZero = gamePlayers.length === 0;
  const gameOver = started && gamePlayers.length === 1;
  const deleteGame = playerZero || gameOver;
  if (deleteGame) {
    gamePlayers.forEach((playerM) => {
      players = players.filter((player) => player.playerId !== playerM.id);
    });
    games = games.filter((game) => game.gameId !== gameId);
    delete messages[gameId];
    io.sockets.in(gameId).emit("gameDoesntExist");
    return;
  }

  //Change round
  if (round === playerId && !isEnded) {
    if (actualIndex === -1) return;

    let newRoundPlayerIndex = actualIndex + 1;
    if (newRoundPlayerIndex >= gamePlayers.length) newRoundPlayerIndex = 0;
    round = gamePlayers[newRoundPlayerIndex];
  }

  //Change Creator
  if (creator && !isEnded) {
    let newCreatorSocketId = gamePlayers[0];
    let newCreator = players.find(
      (player) => player.playerId === newCreatorSocketId
    );
    if (newCreator) {
      newCreator.creator = true;
    } else {
      gamePlayers = gamePlayers.filter(
        (playerId) => playerId !== newCreatorSocketId
      );
      newCreatorSocketId = gamePlayers[0];
      newCreator = players.find(
        (player) => player.playerId === newCreatorSocketId
      );
      if (!newCreator) return;
      newCreator.creator = true;
    }

    io.sockets
      .to(newCreatorSocketId)
      .emit("mySocketId", { mySocketId: newCreatorSocketId, creator: true });
  }

  game.players = gamePlayers;
  game.round = round;

  io.sockets.in(gameId).emit(
    "gameUpdate",
    games.find((game) => game.gameId === gameId)
  );
  io.sockets.in(gameId).emit(
    "playersUpdate",
    players.filter((player) => player.gameId === gameId)
  );
}

function getRandomInt(min, max) {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

function sendMessage({ socketId, gameId, message }) {
  const player = players.find((player) => player.playerId === socketId);
  if (!player) return;

  messages[gameId].push({ author: player.name, content: message });

  io.sockets.in(gameId).emit("messagesUpdate", messages[gameId]);
}

exports.initializeGame = initializeGame;
