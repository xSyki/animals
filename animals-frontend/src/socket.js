import io from 'socket.io-client'

const URL = 'https://www.superfarmer.io';

const socket = io(URL)

var mySocketId

export {
    socket,
    mySocketId
}