import io from 'socket.io-client'

const URL = 'http://superfarmer.io/';

const socket = io(URL)

var mySocketId

export {
    socket,
    mySocketId
}