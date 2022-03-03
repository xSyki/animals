import io from 'socket.io-client'

const URL = 'http://localhost:3000' 

const socket = io(URL)

var mySocketId
// register preliminary event listeners here:

// socket.on('test', data => {
//     console.log(data);
// })

export {
    socket,
    mySocketId
}