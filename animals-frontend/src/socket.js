import io from 'socket.io-client'

const URL = 'https://super-farmer.herokuapp.com';

const socket = io(URL)

var mySocketId

export {
    socket,
    mySocketId
}